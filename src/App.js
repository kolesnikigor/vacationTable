import {useState, useEffect} from 'react';

import './Styles/App.scss';
import {Navigation} from "./components/Navigation/Navigation";
import {Table} from "./components/Table/Table";
import {Modal} from "./components/Modal/Modal";
import {LoadingIndicator} from "./components/LoadingIndicator/LoadingIndicator";
import {convertDateForStore, convertDateToShow, getDaysOfActivePeriod, convertDateToCompare} from "./utils/utils";
import {fetchCalendar} from './Apis/api';
import {Context} from './Context'

const App = () => {
  const [state, setState] = useState(
    {
      date: new Date(),
      teams: null,
      isModalActive: false,
      teamSelectValue: "Team name",
      userSelectValue: "User name",
      typeDayOff: "Type Of Day Off",
      startDayVocation: convertDateToShow(new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })),
      endDayVocation: convertDateToShow(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })),
      isFormValid: false,
    }
  );

  useEffect(() => {
      fetchCalendar().then((json) => {
        setState({...state, teams: json.teams});
      });
      handleKeyPress();
    }, []
  );

  const nextMonth = () => {
    setState({...state, date: new Date(state.date.setMonth(state.date.getMonth() + 1))});
  }

  const prevMonth = () => {
    setState({...state, date: new Date(state.date.setMonth(state.date.getMonth() - 1))});
  }

  const handleKeyPress = () => {
    const body = document.querySelector('body');
    body.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft') {
        prevMonth()
      } else if (e.code === 'ArrowRight') {
        nextMonth()
      }
    })
  }

  const handlerModal = () => {
    setState({...state, isModalActive: !state.isModalActive});
  }

  const handleTeamSelect = (e) => {
    setState(prevState => ({...prevState, teamSelectValue: e.target.value}));
  }

  const handleUserSelect = (e) => {
    setState({...state, userSelectValue: e.target.value});
  }

  const handleDayOffSelect = (e) => {
    setState({...state, typeDayOff: e.target.value});
  }

  const handleStartDayVocation = (e) => {
    setState({...state, startDayVocation: e.target.value});
  }

  const handleEndDayVocation = (e) => {
    setState({...state, endDayVocation: e.target.value});
  }

  const isFormValid = () => {
    if (convertDateToCompare(state.startDayVocation) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      && convertDateToCompare(state.startDayVocation) <= convertDateToCompare(state.endDayVocation)
      && state.teamSelectValue !== "Team name"
      && state.userSelectValue !== "User name"
      && state.typeDayOff !== "Type Of Day Off") {
      setState(prevState => ({...prevState, isFormValid: true}))
    } else {
      setState(prevState => ({...prevState, isFormValid: false}))
    }
  }

  useEffect(() => {
    isFormValid();
  }, [state.teamSelectValue, state.userSelectValue, state.typeDayOff, state.startDayVocation, state.endDayVocation])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeams = state.teams;
    const teamIndex = state.teams.findIndex(item => item.name === state.teamSelectValue);
    const memberIndex = state.teams[teamIndex].members.findIndex(item => item.name === state.userSelectValue);
    newTeams[teamIndex].members[memberIndex].vacations.push(
      {
        startDate: convertDateForStore(state.startDayVocation),
        endDate: convertDateForStore(state.endDayVocation),
        type: state.typeDayOff
      });
    setState({...state, teams: newTeams});
    handlerModal();
  }

  const context = {
    state,
    nextMonth,
    prevMonth,
    allDays: getDaysOfActivePeriod(state),
    modalToggle: handlerModal,
    handleTeamSelect,
    handleUserSelect,
    handleDayOffSelect,
    handleStartDayVocation,
    handleEndDayVocation,
    handleSubmit
  }

  return (
    <div className="container">
      <Context.Provider value={context}>
        <Navigation/>
        {state.isModalActive && <Modal/>}
        {state.teams ? <Table/> : <LoadingIndicator/>}
      </Context.Provider>
    </div>
  )
}
export default App;

import './Styles/App.scss';
import {Component} from 'react';
import {Navigation} from "./components/Navigation/Navigation";
import {Table} from "./components/Table/Table";
import {Modal} from "./components/Modal/Modal";
import {LoadingIndicator} from "./components/LoadingIndicator/LoadingIndicator";
import {convertDateForStore, convertDateToShow} from "./utils/utils";
import {fetchCalendar} from './Apis/api';
import {Context} from './Context'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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
      teams: null
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.handlerModal = this.handlerModal.bind(this);
    this.handleTeamSelect = this.handleTeamSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleDayOffSelect = this.handleDayOffSelect.bind(this);
    this.handleStartDayVocation = this.handleStartDayVocation.bind(this);
    this.handleEndDayVocation = this.handleEndDayVocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTeamSelect(e) {
    this.setState({teamSelectValue: e.target.value});
    if (e.target.value !== "Team name"
      && this.state.userSelectValue !== "User name"
      && this.state.typeDayOff !== "Type Of Day Off") {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  handleUserSelect(e) {
    this.setState({userSelectValue: e.target.value});
    if (this.state.teamSelectValue !== "Team name"
      && e.target.value !== "User name"
      && this.state.typeDayOff !== "Type Of Day Off") {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  handleDayOffSelect(e) {
    this.setState({typeDayOff: e.target.value});
    if (this.state.teamSelectValue !== "Team name"
      && this.state.userSelectValue !== "User name"
      && e.target.value !== "Type Of Day Off") {
      this.setState((prev) => {
        return {isFormValid: !prev.isFormValid}
      })
    } else {
      this.setState({isFormValid: false})
    }
  }

  handleStartDayVocation(e) {
    this.setState({startDayVocation: e.target.value});
  }

  handleEndDayVocation(e) {
    this.setState({endDayVocation: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTeams = this.state.teams;
    const teamIndex = this.state.teams.findIndex(item => item.name === this.state.teamSelectValue);
    const memberIndex = this.state.teams[teamIndex].members.findIndex(item => item.name === this.state.userSelectValue);
    newTeams[teamIndex].members[memberIndex].vacations.push(
      {
        startDate: convertDateForStore(this.state.startDayVocation),
        endDate: convertDateForStore(this.state.endDayVocation),
        type: this.state.typeDayOff
      });
    this.setState({teams: newTeams});
  }

  nextMonth() {
    this.setState({date: new Date(this.state.date.setMonth(this.state.date.getMonth() + 1))});
    this.getDaysOfActivePeriod();
  }

  prevMonth() {
    this.setState({date: new Date(this.state.date.setMonth(this.state.date.getMonth() - 1))});
    this.getDaysOfActivePeriod();
  }

  handlerModal() {
    this.setState({isModalActive: !this.state.isModalActive});
  }

  getDaysOfActivePeriod() {
    const year = this.state.date.getFullYear();
    const month = this.state.date.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      const item = new Date(date);
      days.push({
        dayName: item.toLocaleDateString("en-US", {weekday: "short"}),
        date: item.getDate(),
        isDayOff: item.getDay() === 0 || item.getDay() === 6,
        fullDate: item,
      });
      date.setDate(date.getDate() + 1);
    }
    return days
  }

  componentDidMount() {
    fetchCalendar().then((json) => {
      this.setState({teams: json.teams});
    });
  }

  render() {
    const context = {
      state: this.state,
      next: this.nextMonth,
      prev: this.prevMonth,
      allDays: this.getDaysOfActivePeriod(),
      modalToggle: this.handlerModal,
      handleTeamSelect: this.handleTeamSelect,
      handleUserSelect: this.handleUserSelect,
      handleDayOffSelect: this.handleDayOffSelect,
      handleStartDayVocation: this.handleStartDayVocation,
      handleEndDayVocation: this.handleEndDayVocation,
      handleSubmit: this.handleSubmit
    };
    return (
      <div className="container">
        <Context.Provider value={context}>
          <Navigation/>
          {this.state.isModalActive && <Modal/>}
          {this.state.teams ? <Table/> : <LoadingIndicator/>}
        </Context.Provider>
      </div>
    )
  }
}

export default App;

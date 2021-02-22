import './Styles/App.scss';
import {Component} from 'react';
import teamIcon from "./images/team.svg";
import toggleIcon from "./images/toggle.svg";
import plusIcon from "./images/plus.svg";
import PropTypes from "prop-types";

// utilits_____________________________________________________________________________________________________________
function checkVacationsDate(vacations, date) {
  let result = false;
  vacations.forEach((item) => {
    const startDateNumbers = item.startDate.split(".");
    const startDate = `${startDateNumbers[2]}/${startDateNumbers[1]}/${startDateNumbers[0]}`;
    const endDateNumbers = item.endDate.split(".");
    const endDate = `${endDateNumbers[2]}/${endDateNumbers[1]}/${endDateNumbers[0]}`;
    if (date >= new Date(startDate) && date <= new Date(endDate)) {
      result = true;
    }
  });
  return result;
}

function Navigation({date, next, prev}) {
  return <div className="calendarBar">
    <button onClick={prev} className="calendarBar__nav calendarBar__nav_prev"/>
    <span className="calendarBar__current">{date.toLocaleDateString("en-US", {month: "long", year: "numeric"})}</span>
    <button onClick={next} className="calendarBar__nav calendarBar__nav_next"/>
  </div>
}

function Teams({teams, allDays, date}) {
  return teams.map((team, i) =>
    <>
      <tr className="calendarTable__team-header">
        <td key={i}>
          <div className="calendarTable__team-title">
            <span className="calendarTable__team-name">{team.name}</span>
            <span className="calendarTable__team-count">
                  <img src={teamIcon}/>
                  <span>{team.members.length}</span>
                </span>
            <span className="calendarTable__percentage">{team.percentageOfAbsent[date.getMonth()]}%</span>
            <button className="calendarTable__team-toogle">
              <img src={toggleIcon}/>
            </button>
          </div>
        </td>
        {allDays.map((day, i) => {
            return <td key={i} className={day.isDayOff ? "calendarTable__dayOff" : ""}>
            </td>
          }
        )}
      </tr>
      {team.members.map(((member, i) => {
        return <tr key={i}>
          <td>
            <div className="calendarTable__team-title">{member.name}</div>
          </td>
          {allDays.map((day, i) => {
              return <td key={i}
                         className={`${day.isDayOff ? "calendarTable__dayOff" : ""} ${checkVacationsDate(member.vacations, day.fullDate) ? "calendarTable__vacations" : ""}`}>
              </td>
            }
          )}
        </tr>
      }))}
    </>
  )
}

function Table({allDays, teams, date, modalToggle}) {
  return <table className="calendarTable">
    <thead>
    <tr>
      <td className="calendarTable__addVocation">
        <button onClick={modalToggle} className="button button_a">
          <img src={plusIcon} alt="#"/>
          <span>Add Vacation</span>
        </button>
      </td>
      {allDays.map((day, i) => {
          return <td key={i} className={day.isDayOff ? "calendarTable__dayOff" : ""}>
            <span>{day.dayName}</span>
            <span>{day.date}</span>
          </td>
        }
      )}
    </tr>
    </thead>
    <tbody>
    <Teams allDays={allDays} teams={teams} date={date}/>
    </tbody>
  </table>
}

Table.propTypes = {
  allDays: PropTypes.arrayOf(PropTypes.object),
  teams: PropTypes.array,
  date: PropTypes.object
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelectValue: "Team name",
      userSelectValue: "User name",
      typeDayOff: "Type Of Day Off",
      startDayVocation: "2021-02-22",
      endDayVocation: new Date().toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" })
    }
    this.handleTeamSelect = this.handleTeamSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleDayOffSelect = this.handleDayOffSelect.bind(this);
    this.handleStartDayVocation = this.handleStartDayVocation.bind(this);
    this.handleEndDayVocation = this.handleEndDayVocation.bind(this);
  }

  handleTeamSelect(e) {this.setState({teamSelectValue: e.target.value});}

  handleUserSelect(e) {this.setState({userSelectValue: e.target.value});}

  handleDayOffSelect(e) {this.setState({typeDayOff: e.target.value});}

  handleStartDayVocation(e) {this.setState({startDayVocation: e.target.value});}

  handleEndDayVocation(e) {this.setState({endDayVocation: e.target.value});}

  render() {
    // console.log("Start render",this.state.startDayVocation)
    // console.log("End render",this.state.endDayVocation)
    return <div className="modal">
      <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">Vacation Request</h2>
          <span className="modal__vacation-period">8 Days</span>
        </div>
        <form className="form" action="">
          <h3 className="form__title">Dates</h3>
          <div className="form__date flex-row">
            <label className="form__date-label flex-column" htmlFor="start">
              From
              <input className="form__date-input" value={this.state.startDayVocation} onChange={this.handleStartDayVocation} id="start" type="date"/>
            </label>
            <label className="form__date-label flex-column" htmlFor="end">
              To
              <input className="form__date-input" value={this.state.endDayVocation} onChange={this.handleEndDayVocation} id="end" type="date"/></label>
          </div>

          <label className="form__title flex-column">
            Team
            <select className="form__select" value={this.state.teamSelectValue} onChange={this.handleTeamSelect}>
              <option>Team name</option>
              {this.props.teams
                ? this.props.teams.map((team, i) => <option value={team.name} key={i}>{team.name}</option>)
                : null}
            </select>
          </label>
          <label className="form__title flex-column">
            User
            <select className="form__select" value={this.state.userSelectValue} onChange={this.handleUserSelect}>
              <option>User name</option>
              {this.props.teams
                ? (this.state.teamSelectValue && this.state.teamSelectValue !== "Team name"
                    ? this.props.teams.find(item => item.name === this.state.teamSelectValue).members.map((member, i) =>
                      <option value={member.name} key={i}>{member.name}</option>)
                    : null
                  )
                : null}
            </select>
          </label>
          <label className="form__title flex-column">
            Vac Type
            <select className="form__select" value={this.state.typeDayOff} onChange={this.handleDayOffSelect}>
              <option>Type Of Day Off</option>
              <option value="Paid">Paid Day Off (PD)</option>
              <option value="UnPaid">UnPaid Day Off (UPD)</option>
            </select>
          </label>
          <div className="form__footer">
            <button className="button button_b" onClick={this.props.modalToggle}>Cancel</button>
            <button className="button button_a">Send</button>
          </div>
        </form>
      </div>
    </div>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      teams: null,
      allMonthDays: [],
      isModalActive: false
    }
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.fetchCalendar = this.fetchCalendar.bind(this);
    this.handlerModal = this.handlerModal.bind(this);
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
    this.setState({allMonthDays: days})
  }

  fetchCalendar() {
    const departmentTeams = {
      teams: [
        {
          name: "Frontend Team",
          percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
          members: [
            {
              name: "FE_Team_User1",
              vacations: [
                {startDate: "20.02.2021", endDate: "22.03.2021", type: "Paid"},
                {startDate: "20.11.2020", endDate: "22.11.2020", type: "Paid"},
              ],
            },
            {
              name: "FE_Team_User2",
              vacations: [
                {startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid"},
                {startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid"},
              ],
            },
          ],
        },
        {
          name: "Backend Team",
          percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
          members: [
            {
              name: "BE_Team_User1",
              vacations: [
                {startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid"},
                {startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid"},
              ],
            },
            {
              name: "BE_Team_User2",
              vacations: [
                {startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid"},
                {startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid"},
              ],
            },
          ],
        },
      ],
    };
    return fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify(departmentTeams),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({teams: json.teams});
      }).catch(err => console.log(err));
  }

  componentDidMount() {
    this.getDaysOfActivePeriod();
    this.fetchCalendar();
  }

  render() {
    return <div className="container">
      <Navigation next={this.nextMonth} prev={this.prevMonth} date={this.state.date}/>
      {this.state.isModalActive
        ? <Modal
          teams={this.state.teams}
          modalToggle={this.handlerModal}
          isModalActive={this.state.isModalActive}/>
      : null}
      {this.state.teams
        ? <Table allDays={this.state.allMonthDays} teams={this.state.teams} date={this.state.date}
                 modalToggle={this.handlerModal}
        />
        : <div className="loading__wrapper">
          <div className="lds-dual-ring"/>
        </div>
      }
    </div>
  }
}

export default App;

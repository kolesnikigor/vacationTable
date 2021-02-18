import './App.css';
import {Component} from 'react';
import teamIcon from "./images/team.svg";
import toggleIcon from "./images/toggle.svg";


function Navigation({date, next, prev}) {
  return <div className="calendarBar">
    <button onClick={prev} className="calendarBar__nav calendarBar__nav_prev"/>
    <span className="calendarBar__current">{date.toLocaleDateString("en-US", {month: "long", year: "numeric"})}</span>
    <button onClick={next} className="calendarBar__nav calendarBar__nav_next"/>
  </div>
}

function Table({allDays, teams, date}) {
  let Rows = [];

  if (teams && allDays) {
    teams.forEach((team, i) => {
      Rows.push(
        <>
          <tr className="calendarTable__team-header">
            <td key={i}>
              <div className="calendarTable__team-title">
                <span className="calendarTable__team-name">{team.name}</span>>
                <span>
                  <img src={teamIcon}/>
                  <span className="calendarTable__team-count">{team.members.length}</span>
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
            return <tr>
              <td key={i}>{member.name}</td>
              {allDays.map((day, i) => {
                  return <td key={i} className={day.isDayOff ? "calendarTable__dayOff" : ""}>
                  </td>
                }
              )}
            </tr>
          }))}
        </>)
    })
  }
  return <table className="calendarTable">
    <thead>
    <tr>
      <td className="calendarTable__addVocation">
        <button>Add Vacation</button>
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
    {teams
      ? <tbody>{Rows}</tbody>
      : <tr className="loading__wrapper">
        <div className="lds-dual-ring"></div>
      </tr>
    }
  </table>
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      teams: null,
      allMonthDays: []
    }
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.fetchCalendar = this.fetchCalendar.bind(this);
  }

  nextMonth() {
    this.setState({date: new Date(this.state.date.setMonth(this.state.date.getMonth() + 1))});
    this.getDaysOfActivePeriod();
  }

  prevMonth() {
    this.setState({date: new Date(this.state.date.setMonth(this.state.date.getMonth() - 1))});
    this.getDaysOfActivePeriod();
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
              name: "FE_Team_User1",
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
              name: "FE_Team_User1",
              vacations: [
                {startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid"},
                {startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid"},
              ],
            },
            {
              name: "FE_Team_User1",
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
        this.setState({teams: json.teams});
      });
  }

  componentDidMount() {
    this.getDaysOfActivePeriod();
    this.fetchCalendar();

  }

  render() {
    return <div className="container">
      <Navigation next={this.nextMonth} prev={this.prevMonth} date={this.state.date}/>
      <Table allDays={this.state.allMonthDays} teams={this.state.teams} date={this.state.date}/>
    </div>
  }
}

export default App;

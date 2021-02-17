import './App.css';
import {Component} from 'react';

function Navigation({date, next, prev}) {
  return <div className="calendarBar">
    <button onClick={prev} className="calendarBar__nav calendarBar__nav_prev"/>
    <span className="calendarBar__current">{date.toLocaleDateString("en-US", {month: "long", year: "numeric"})}</span>
    <button onClick={next} className="calendarBar__nav calendarBar__nav_next"/>
  </div>
}

function Table({allDays}) {
  return <table className="calendarTable">
    <thead>
    <tr>
      <td className="calendarTable__addVocation">
        <button>Add Vacation</button>
      </td>
      {allDays.map(day => {
          return <td className={day.isDayOff ? "calendarTable__dayOff" : ""}>
            <span>{day.dayName}</span>
            <span>{day.date}</span>
          </td>
        }
      )}
    </tr>
    </thead>
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
    // this.fetchCalendar = this.fetchCalendar.bind(this);
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
    this.setState({allMonthDays: days});
  }


  render() {
    return <div className="container">
      <Navigation next={this.nextMonth} prev={this.prevMonth} date={this.state.date}/>
      <Table allDays={this.state.allMonthDays}/>
    </div>
  }
}

export default App;

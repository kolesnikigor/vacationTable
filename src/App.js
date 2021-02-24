import './Styles/App.scss';
import {Component, React} from 'react';
import {Navigation} from "./components/Navigation/Navigation";
import {Table} from "./components/Table/Table";
import {Modal} from "./components/Modal/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      teams: null,
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
    return days
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
        this.setState({teams: json.teams});
      }).catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchCalendar();
  }

  render() {
    return <div className="container">
      <Navigation next={this.nextMonth} prev={this.prevMonth} date={this.state.date}/>
      {this.state.isModalActive && <Modal
        teams={this.state.teams}
        modalToggle={this.handlerModal}
        isModalActive={this.state.isModalActive}/>
      }
      {this.state.teams
        ? <Table allDays={this.getDaysOfActivePeriod()} teams={this.state.teams} date={this.state.date}
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

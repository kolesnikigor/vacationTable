import './Styles/App.scss'
import { Component, React } from 'react'
import { Navigation } from './components/Navigation/Navigation'
import { Table } from './components/Table/Table'
import { Modal } from './components/Modal/Modal'
import { convertDateForStore, convertDateToShow, convertDateToCompare } from './utils/utils'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date(),
			isModalActive: false,
			teamSelectValue: 'Team name',
			userSelectValue: 'User name',
			typeDayOff: 'Type Of Day Off',
			startDayVocation: convertDateToShow(
				new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
			endDayVocation: convertDateToShow(
				new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
			isFormValid: false,
			teams: null,
		}
		this.nextMonth = this.nextMonth.bind(this)
		this.prevMonth = this.prevMonth.bind(this)
		this.fetchCalendar = this.fetchCalendar.bind(this)
		this.handlerModal = this.handlerModal.bind(this)
		this.handleTeamSelect = this.handleTeamSelect.bind(this)
		this.handleUserSelect = this.handleUserSelect.bind(this)
		this.handleDayOffSelect = this.handleDayOffSelect.bind(this)
		this.handleStartDayVocation = this.handleStartDayVocation.bind(this)
		this.handleEndDayVocation = this.handleEndDayVocation.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.isFormValid = this.isFormValid.bind(this)
	}

	handleTeamSelect(e) {
		this.setState({ teamSelectValue: e.target.value }, () => {
			this.isFormValid()
		})
	}

	handleUserSelect(e) {
		this.setState({ userSelectValue: e.target.value }, () => {
			this.isFormValid()
		})
	}

	handleDayOffSelect(e) {
		this.setState({ typeDayOff: e.target.value }, () => {
			this.isFormValid()
		})
	}

	handleStartDayVocation(e) {
		this.setState({ startDayVocation: e.target.value }, () => {
			this.isFormValid()
		})
	}

	handleEndDayVocation(e) {
		this.setState({ endDayVocation: e.target.value }, () => {
			this.isFormValid()
		})
	}

	isFormValid() {
		if (
			convertDateToCompare(this.state.startDayVocation) >=
				new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) &&
			convertDateToCompare(this.state.startDayVocation) <= convertDateToCompare(this.state.endDayVocation) &&
			this.state.teamSelectValue !== 'Team name' &&
			this.state.userSelectValue !== 'User name' &&
			this.state.typeDayOff !== 'Type Of Day Off'
		) {
			this.setState({ isFormValid: true })
		} else {
			this.setState({ isFormValid: false })
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		const newTeams = this.state.teams
		const teamIndex = this.state.teams.findIndex((item) => item.name === this.state.teamSelectValue)
		const memberIndex = this.state.teams[teamIndex].members.findIndex(
			(item) => item.name === this.state.userSelectValue
		)
		newTeams[teamIndex].members[memberIndex].vacations.push({
			startDate: convertDateForStore(this.state.startDayVocation),
			endDate: convertDateForStore(this.state.endDayVocation),
			type: this.state.typeDayOff,
		})
		this.setState({
			teams: newTeams,
			isModalActive: !this.state.isModalActive,
			teamSelectValue: 'Team name',
			userSelectValue: 'User name',
			typeDayOff: 'Type Of Day Off',
			startDayVocation: convertDateToShow(
				new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
			endDayVocation: convertDateToShow(
				new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
		})
	}

	nextMonth() {
		this.setState({ date: new Date(this.state.date.setMonth(this.state.date.getMonth() + 1)) })
		this.getDaysOfActivePeriod()
	}

	prevMonth() {
		this.setState({ date: new Date(this.state.date.setMonth(this.state.date.getMonth() - 1)) })
		this.getDaysOfActivePeriod()
	}

	handlerModal() {
		this.setState({
			isModalActive: !this.state.isModalActive,
			teamSelectValue: 'Team name',
			userSelectValue: 'User name',
			typeDayOff: 'Type Of Day Off',
			startDayVocation: convertDateToShow(
				new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
			endDayVocation: convertDateToShow(
				new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			),
		})
	}

	getDaysOfActivePeriod() {
		const year = this.state.date.getFullYear()
		const month = this.state.date.getMonth()
		const date = new Date(year, month, 1)
		const days = []
		while (date.getMonth() === month) {
			const item = new Date(date)
			days.push({
				dayName: item.toLocaleDateString('en-US', { weekday: 'short' }),
				date: item.getDate(),
				isDayOff: item.getDay() === 0 || item.getDay() === 6,
				fullDate: item,
			})
			date.setDate(date.getDate() + 1)
		}
		return days
	}

	fetchCalendar() {
		const departmentTeams = {
			teams: [
				{
					name: 'Frontend Team',
					percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
					members: [
						{
							name: 'FE_Team_User1',
							vacations: [
								{ startDate: '20.02.2021', endDate: '22.03.2021', type: 'Paid' },
								{ startDate: '20.11.2020', endDate: '22.11.2020', type: 'Paid' },
							],
						},
						{
							name: 'FE_Team_User2',
							vacations: [
								{ startDate: '20.02.2020', endDate: '22.02.2020', type: 'UnPaid' },
								{ startDate: '20.03.2020', endDate: '22.03.2020', type: 'UnPaid' },
							],
						},
					],
				},
				{
					name: 'Backend Team',
					percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
					members: [
						{
							name: 'BE_Team_User1',
							vacations: [
								{ startDate: '15.02.2020', endDate: '22.02.2020', type: 'UnPaid' },
								{ startDate: '20.03.2020', endDate: '22.03.2020', type: 'UnPaid' },
							],
						},
						{
							name: 'BE_Team_User2',
							vacations: [
								{ startDate: '20.02.2020', endDate: '22.02.2020', type: 'UnPaid' },
								{ startDate: '20.03.2020', endDate: '22.03.2020', type: 'UnPaid' },
							],
						},
					],
				},
			],
		}
		return fetch('https://jsonplaceholder.typicode.com/posts/1', {
			method: 'PUT',
			body: JSON.stringify(departmentTeams),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ teams: json.teams })
			})
			.catch((err) => console.log(err))
	}

	componentDidMount() {
		this.fetchCalendar()
	}

	render() {
		return (
			<div className='container'>
				<Navigation next={this.nextMonth} prev={this.prevMonth} date={this.state.date} />
				{this.state.isModalActive && (
					<Modal
						teams={this.state.teams}
						modalToggle={this.handlerModal}
						teamSelectValue={this.state.teamSelectValue}
						userSelectValue={this.state.userSelectValue}
						typeDayOff={this.state.typeDayOff}
						startDayVocation={this.state.startDayVocation}
						endDayVocation={this.state.endDayVocation}
						handleTeamSelect={this.handleTeamSelect}
						handleUserSelect={this.handleUserSelect}
						handleDayOffSelect={this.handleDayOffSelect}
						handleStartDayVocation={this.handleStartDayVocation}
						handleEndDayVocation={this.handleEndDayVocation}
						handleSubmit={this.handleSubmit}
						isFormValid={this.state.isFormValid}
					/>
				)}
				{this.state.teams ? (
					<Table
						allDays={this.getDaysOfActivePeriod()}
						teams={this.state.teams}
						date={this.state.date}
						modalToggle={this.handlerModal}
					/>
				) : (
					<div className='loading__wrapper'>
						<div className='lds-dual-ring' />
					</div>
				)}
			</div>
		)
	}
}

export default App

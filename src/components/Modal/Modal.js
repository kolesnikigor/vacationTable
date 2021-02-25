import { React, Component } from 'react'
import PropTypes from 'prop-types'
import './modal.scss'

export class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			teamSelectValue: 'Team name',
			userSelectValue: 'User name',
			typeDayOff: 'Type Of Day Off',
			startDayVocation: '2021-02-22',
			endDayVocation: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
		}
		this.handleTeamSelect = this.handleTeamSelect.bind(this)
		this.handleUserSelect = this.handleUserSelect.bind(this)
		this.handleDayOffSelect = this.handleDayOffSelect.bind(this)
		this.handleStartDayVocation = this.handleStartDayVocation.bind(this)
		this.handleEndDayVocation = this.handleEndDayVocation.bind(this)
	}

	handleTeamSelect(e) {
		this.setState({ teamSelectValue: e.target.value })
	}

	handleUserSelect(e) {
		this.setState({ userSelectValue: e.target.value })
	}

	handleDayOffSelect(e) {
		this.setState({ typeDayOff: e.target.value })
	}

	handleStartDayVocation(e) {
		this.setState({ startDayVocation: e.target.value })
	}

	handleEndDayVocation(e) {
		this.setState({ endDayVocation: e.target.value })
	}

	render() {
		return (
			<div className='modal'>
				<div className='modal__container'>
					<div className='modal__header'>
						<h2 className='modal__title'>Vacation Request</h2>
						<span className='modal__vacation-period'>8 Days</span>
					</div>
					<form className='form' action=''>
						<h3 className='form__title'>Dates</h3>
						<div className='form__date flex-row'>
							<label className='form__date-label flex-column' htmlFor='start'>
								From
								<input
									className='form__date-input'
									value={this.state.startDayVocation}
									onChange={this.handleStartDayVocation}
									id='start'
									type='date'
								/>
							</label>
							<label className='form__date-label flex-column' htmlFor='end'>
								To
								<input
									className='form__date-input'
									value={this.state.endDayVocation}
									onChange={this.handleEndDayVocation}
									id='end'
									type='date'
								/>
							</label>
						</div>

						<label className='form__title flex-column'>
							Team
							<select className='form__select' value={this.state.teamSelectValue} onChange={this.handleTeamSelect}>
								<option>Team name</option>
								{this.props.teams &&
									this.props.teams.map((team, i) => (
										<option value={team.name} key={i}>
											{team.name}
										</option>
									))}
							</select>
						</label>
						<label className='form__title flex-column'>
							User
							<select className='form__select' value={this.state.userSelectValue} onChange={this.handleUserSelect}>
								<option>User name</option>
								{this.props.teams
									? this.state.teamSelectValue &&
									  this.state.teamSelectValue !== 'Team name' &&
									  this.props.teams
											.find((item) => item.name === this.state.teamSelectValue)
											.members.map((member, i) => (
												<option value={member.name} key={i}>
													{member.name}
												</option>
											))
									: null}
							</select>
						</label>
						<label className='form__title flex-column'>
							Vac Type
							<select className='form__select' value={this.state.typeDayOff} onChange={this.handleDayOffSelect}>
								<option>Type Of Day Off</option>
								<option value='Paid'>Paid Day Off (PD)</option>
								<option value='UnPaid'>UnPaid Day Off (UPD)</option>
							</select>
						</label>
						<div className='form__footer'>
							<button className='button button_b' onClick={this.props.modalToggle}>
								Cancel
							</button>
							<button className='button button_a'>Send</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	teams: PropTypes.arrayOf(PropTypes.object).isRequired,
	isModalActive: PropTypes.bool.isRequired,
	modalToggle: PropTypes.func.isRequired,
}

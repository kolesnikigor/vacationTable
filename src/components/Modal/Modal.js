import { React } from 'react'
import PropTypes from 'prop-types'

export const Modal = ({
	teams,
	modalToggle,
	teamSelectValue,
	userSelectValue,
	typeDayOff,
	startDayVocation,
	endDayVocation,
	handleTeamSelect,
	handleUserSelect,
	handleDayOffSelect,
	handleStartDayVocation,
	handleEndDayVocation,
	handleSubmit,
	isFormValid,
}) => {
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
								value={startDayVocation}
								onChange={handleStartDayVocation}
								id='start'
								type='date'
							/>
						</label>
						<label className='form__date-label flex-column' htmlFor='end'>
							To
							<input
								className='form__date-input'
								value={endDayVocation}
								onChange={handleEndDayVocation}
								id='end'
								type='date'
							/>
						</label>
					</div>

					<label className='form__title flex-column'>
						Team
						<select className='form__select' value={teamSelectValue} onChange={handleTeamSelect}>
							<option value='Team name'>Team name</option>
							{teams &&
								teams.map((team, i) => (
									<option value={team.name} key={i}>
										{team.name}
									</option>
								))}
						</select>
					</label>
					<label className='form__title flex-column'>
						User
						<select className='form__select' value={userSelectValue} onChange={handleUserSelect}>
							<option value='User name'>User name</option>
							{teams
								? teamSelectValue &&
								  teamSelectValue !== 'Team name' &&
								  teams
										.find((item) => item.name === teamSelectValue)
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
						<select className='form__select' value={typeDayOff} onChange={handleDayOffSelect}>
							<option value='Type Of Day Off'>Type Of Day Off</option>
							<option value='Paid'>Paid Day Off (PD)</option>
							<option value='UnPaid'>UnPaid Day Off (UPD)</option>
						</select>
					</label>
					{console.log(isFormValid)}
					{!isFormValid && <div style={{ color: 'red' }}>Please fill in the form correctly!</div>}
					<div className='form__footer'>
						<button className='button button_b' onClick={modalToggle}>
							Cancel
						</button>
						<button disabled={!isFormValid} className='button button_a' onClick={handleSubmit}>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Modal.propTypes = {
	teams: PropTypes.arrayOf(PropTypes.object).isRequired,
	modalToggle: PropTypes.func.isRequired,
	teamSelectValue: PropTypes.string.isRequired,
	userSelectValue: PropTypes.string.isRequired,
	typeDayOff: PropTypes.string.isRequired,
	startDayVocation: PropTypes.string.isRequired,
	endDayVocation: PropTypes.string.isRequired,
	handleTeamSelect: PropTypes.func.isRequired,
	handleUserSelect: PropTypes.func.isRequired,
	handleDayOffSelect: PropTypes.func.isRequired,
	handleStartDayVocation: PropTypes.func.isRequired,
	handleEndDayVocation: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isFormValid: PropTypes.bool.isRequired,
}

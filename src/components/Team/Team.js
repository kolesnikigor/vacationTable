import teamIcon from '../../images/team.svg'
import toggleIcon from '../../images/toggle.svg'
import { React, useState } from 'react'
import PropTypes from 'prop-types'
import checkVacationsDate from '../../utils/utils.js'

export const Team = ({ team, date, allDays }) => {
	const [isTeamsMembersShown, setIsTeamsMembersShown] = useState(true)

	const toggleHandler = () => {
		setIsTeamsMembersShown((prev) => !prev)
	}
	return (
		<>
			<tr className='calendarTable__team-header'>
				<td>
					<div className='calendarTable__team-title'>
						<span className='calendarTable__team-name'>{team.name}</span>
						<span className='calendarTable__team-count'>
							<img src={teamIcon} />
							<span>{team.members.length}</span>
						</span>
						<span className='calendarTable__percentage'>{team.percentageOfAbsent[date.getMonth()]}%</span>
						<button className='calendarTable__team-toogle' onClick={toggleHandler}>
							<img src={toggleIcon} style={{ transform: isTeamsMembersShown ? 'none' : 'rotate(180deg)' }} />
						</button>
					</div>
				</td>
				{allDays.map((day, i) => {
					return <td key={i} className={day.isDayOff ? 'calendarTable__dayOff' : ''}></td>
				})}
			</tr>
			{team.members.map((member, i) => {
				return (
					<tr key={i} style={{ display: isTeamsMembersShown ? 'table-row' : 'none' }}>
						<td>
							<div className='calendarTable__team-title'>{member.name}</div>
						</td>
						{allDays.map((day, i) => {
							return (
								<td
									key={i}
									className={`${day.isDayOff ? 'calendarTable__dayOff' : ''} ${
										checkVacationsDate(member.vacations, day.fullDate) ? 'calendarTable__vacations' : ''
									}`}
								></td>
							)
						})}
					</tr>
				)
			})}
		</>
	)
}

Team.propTypes = {
	team: PropTypes.shape({
		name: PropTypes.string,
		members: PropTypes.arrayOf(PropTypes.object),
		percentageOfAbsent: PropTypes.arrayOf(PropTypes.number),
	}).isRequired,
	allDays: PropTypes.arrayOf(PropTypes.object).isRequired,
	date: PropTypes.object.isRequired,
}

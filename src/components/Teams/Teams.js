import { Team } from '../Team/Team'
import { React } from 'react'
import PropTypes from 'prop-types'

export function Teams({ teams, allDays, date }) {
	return teams.map((team) => <Team team={team} key={team.name} allDays={allDays} date={date} />)
}

Teams.propTypes = {
	allDays: PropTypes.arrayOf(PropTypes.object),
	teams: PropTypes.arrayOf(PropTypes.object),
	date: PropTypes.object,
}

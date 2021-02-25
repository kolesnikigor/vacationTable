import {React} from "react";
import PropTypes from "prop-types";
import './navigation.scss'


export function Navigation({date, next, prev}) {
    return <div className="calendarBar">
        <button onClick={prev} className="calendarBar__nav calendarBar__nav_prev"/>
        <span className="calendarBar__current">{date.toLocaleDateString("en-US", {month: "long", year: "numeric"})}</span>
        <button onClick={next} className="calendarBar__nav calendarBar__nav_next"/>
    </div>
}

Navigation.propTypes = {
    date: PropTypes.object,
    next:PropTypes.func.isRequired,
    prev:PropTypes.func.isRequired
}

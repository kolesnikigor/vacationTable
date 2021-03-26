import React, {useContext} from "react";

import {Context} from '../../Context';

export const Navigation = () => {
  const {state, nextMonth, prevMonth} = useContext(Context);

  return (
    <>
      <div className="calendarBar">
        <button onClick={prevMonth} className="calendarBar__nav calendarBar__nav_prev"/>
        <span className="calendarBar__current">{state.date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        })}</span>
        <button onClick={nextMonth} className="calendarBar__nav calendarBar__nav_next"/>
      </div>
    </>
  )
}

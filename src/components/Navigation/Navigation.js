import React, {useContext} from "react";

import {Context} from '../../Context';

export const Navigation = () => {
  const {state, next, prev} = useContext(Context);

  return (
    <>
      <div className="calendarBar">
        <button onClick={prev} className="calendarBar__nav calendarBar__nav_prev"/>
        <span className="calendarBar__current">{state.date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        })}</span>
        <button onClick={next} className="calendarBar__nav calendarBar__nav_next"/>
      </div>
    </>
  )
}

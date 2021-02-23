// import plusIcon from "../../images/plus.svg";
// import {Teams} from "../Teams/Teams";
// import {React} from "react";
// import {PropTypes} from 'react'
//
// export function Table({allDays, teams, date, modalToggle}) {
//     return <table className="calendarTable">
//         <thead>
//         <tr>
//             <td className="calendarTable__addVocation">
//                 <button onClick={modalToggle} className="button button_a">
//                     <img src={plusIcon} alt="#"/>
//                     <span>Add Vacation</span>
//                 </button>
//             </td>
//             {allDays.map((day, i) => {
//                     return <td key={i} className={day.isDayOff ? "calendarTable__dayOff" : ""}>
//                         <span>{day.dayName}</span>
//                         <span>{day.date}</span>
//                     </td>
//                 }
//             )}
//         </tr>
//         </thead>
//         <tbody>
//         <Teams allDays={allDays} teams={teams} date={date}/>
//         </tbody>
//     </table>
// }
//
// Table.propTypes = {
//     allDays: PropTypes.array,
//     teams: PropTypes.array,
//     date: PropTypes.object
// }
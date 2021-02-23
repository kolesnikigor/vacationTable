import {Team} from "../Team/Team";
import {React} from "react";

export function Teams({teams, allDays, date}) {
    return(
        teams.map((team)=> <Team team ={team} key={team.name} allDays={allDays} date={date} />)
    );
}
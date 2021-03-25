import {useContext} from "react";

import {Team} from "../Team/Team";
import {Context} from '../../Context'

export function Teams() {
  const {state} = useContext(Context);
  return (
    state.teams.map((team) => <Team team={team} key={team.name}/>)
  );
}


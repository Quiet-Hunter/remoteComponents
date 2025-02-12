import React from "react";
import { Common, Player, Team } from "../types/BattleResults";

interface BattleResultsProps {
  data: {
    common: Common;
  };
}

const BattleResults: React.FC<BattleResultsProps> = ({ data }) => {
  const renderPlayerStats = (player: Player, id: string) => {
    const { user_name, role, level, team } = player.player_info;
    const { damage, frags, deaths, heal } = player.stats;

    return (
      <tr key={id}>
        <td>{user_name}</td>
        <td>{role}</td>
        <td>{level}</td>
        <td>{team}</td>
        <td>{damage}</td>
        <td>{frags}</td>
        <td>{deaths}</td>
        <td>{heal}</td>
      </tr>
    );
  };

  const renderTeam = (teamData: Team, teamIndex: number) => {
    const { scores, players } = teamData;

    return (
      <div key={teamIndex}>
        <h2>
          Team {teamIndex + 1} - Score: {scores}
        </h2>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Level</th>
              <th>Team</th>
              <th>Damage</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Healing</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(players).map(([id, player]) =>
              renderPlayerStats(player, id)
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1>Battle Results</h1>
      {data.common.teams.map((team, index) => renderTeam(team, index))}
    </div>
  );
};

export default BattleResults;

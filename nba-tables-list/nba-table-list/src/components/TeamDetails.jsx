import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const TeamDetails = ({ selectedTeam }) => {
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${selectedTeam.id}&per_page=1`
    )
      .then((res) => res.json())
      .then((res) => setGameDetails(res));
  }, [selectedTeam]);

  return (
    <div>
      <Typography padding={2} fontWeight="bold" variant="h5">
        {selectedTeam.name}
      </Typography>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Team Full Name</TableCell>
            <TableCell>{selectedTeam.full_name}</TableCell>
          </TableRow>
          {gameDetails && (
            <TableRow>
              <TableCell>Total games in 2021</TableCell>
              <TableCell>{gameDetails.meta.total_count}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {gameDetails && (
        <>
          <Typography marginTop={3} fontWeight="bold">
            Random Game Details:
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell fontWeight="bold">Date</TableCell>
                <TableCell>
                  {new Date(gameDetails.data[0].date).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Home Team</TableCell>
                <TableCell>{gameDetails.data[0].home_team.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Home Team Score</TableCell>
                <TableCell>{gameDetails.data[0].home_team_score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Visitor Team</TableCell>
                <TableCell>{gameDetails.data[0].visitor_team.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Visitor Team Score</TableCell>
                <TableCell>{gameDetails.data[0].visitor_team_score}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default TeamDetails;

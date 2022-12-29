import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Drawer, TextField, Typography } from "@mui/material";
import TeamDetails from "./TeamDetails";

const NBATeams = () => {
  const [response, setResponse] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/teams`)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
      });
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Team Name",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    { field: "city", headerName: "City", flex: 1, disableColumnMenu: true },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "conference",
      headerName: "Conference",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "division",
      headerName: "Division",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  console.log(response);
  console.log(searchText);

  const rows = React.useMemo(
    () =>
      response?.data.filter((team) =>
        team.name.toLowerCase().startsWith(searchText.toLowerCase())
      ),
    //   .filter((team) => team?.data?.name.startsWith(searchText))
    [response, searchText]
  );

  return (
    <Container maxWidth="lg" sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="blue">
        NBA TEAMS
      </Typography>
      <TextField
        onChange={(e) => setSearchText(e.target.value)}
        margin="normal"
        id="search"
        label="Search"
        variant="outlined"
        sx={{
          width: 350,
        }}
      />

      {response?.data && (
        <DataGrid
          autoHeight={true}
          columns={columns}
          rows={rows}
          pageSize={7}
          disableSelectionOnClick
          onRowClick={(params) => setSelectedTeam(params.row)}
        />
      )}
      <Drawer
        anchor="right"
        open={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
      >
        <Container maxWidth="lg">
          {selectedTeam && <TeamDetails selectedTeam={selectedTeam} />}
        </Container>
      </Drawer>
    </Container>
  );
};

export default NBATeams;

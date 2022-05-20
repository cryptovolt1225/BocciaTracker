import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SelectField } from "./FormFields";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function HistoryTable(props) {
  const [playerList, setPlayersList] = useState([]);
  const {
    formField: { playerName },
  } = props;

  useEffect(() => {
    loadPlayerName();
  }, []);

  const loadPlayerName = async () => {
    let data = await axios.get("/api/players");
    console.log("data:", data);
    let players = await Promise.all(
      data.data.map(async (i) => {
        console.log("i", i);
        let item = {
          value: i.full_name,
          label: i.full_name,
        };
        return item;
      })
    );
    console.log("players:", players);
    setPlayersList(players);
  };

  return (
    <TableContainer component={Paper}>
       <Typography variant="h6" gutterBottom>
        Choose a player!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        {/* <SelectField
            name={playerName.name}
            label={playerName.label}
            data={playerList}
            fullWidth
          /> */}
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HistoryTable;

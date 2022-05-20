import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { SelectField } from "../../FormFields";
import axios from "axios";

function ChoosePlayer(props) {
  const [playerList, setPlayersList] = useState([]);
  const [coachID, setCoachID] = useState(null);
  const {
    formField: { playerName },
  } = props;

  useEffect(() => {
    loadPlayerName();
  }, []);

  const loadPlayerName = async () => {
    const coach = (JSON.parse(localStorage.getItem("coach")));

    let data = await axios.get("/api/coaches/62849fbcd7ee60c47cd61910");

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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose a player!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={playerName.name}
            label={playerName.label}
            data={playerList}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default ChoosePlayer;

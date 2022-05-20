import { useState, useEffect } from "react";
import "./Overview.scss";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddPlayerStepper from "../Components/Stepper/AddPlayerStepper";
import axios from "axios";
import { useNavigate } from "react-router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const loginState = localStorage.getItem('login');
    if (loginState !== "true") navigate('/login')
  }, [])

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Overview() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [timeText, setTimeText] = useState("");
  // const [players, setPlayers] = useState([]);
  // const [playersName, setPlayersName] = useState([]);
  const [coach, setCoach] = useState([]);
  const [playerList, setPlayersList] = useState([]);

  console.log("playerList", playerList);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    loadPlayerName();
    loadCoach();
  }, []);

  const loadPlayerName = async () => {
    let data = await axios.get("/api/players");
    console.log("data:", data);
    let players = await Promise.all(
      data.data.map(async (i) => {
        let item = {
          value: i.full_name,
          label: i.full_name,
        };
        return item;
      })
    );
    setPlayersList(players);
  };

  const loadCoach = async () => {
    // let data = await axios.get("/api/coaches/622c7f1a4ab2a0506cf7f2aa");
    // console.log("loadCoach:", data);
    // console.log("loadCoach:", data.data);
    var coach = JSON.parse(localStorage.getItem("coach"));
    console.log("coach", coach);
    console.log("coachName", coach.full_name);
    setCoach(coach);
  };

  // useEffect(() => {
  //   axios.get("/api/coaches/622c7f1a4ab2a0506cf7f2aa")
  //     .then((res) => res.json())
  //     .then(
  //       (data) => {
  //         setCoach(data);
  //         console.log("coach", coach);
  //       },
  //       (error) => {
  //         console.log("error" , error);
  //       }
  //     );
  // }, []);

  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const today = new Date();
    const curHr = today.getHours();
    let text = "";
    if (curHr < 12) {
      setTimeText("Morning");
    } else if (curHr < 18) {
      setTimeText("Afternoon");
    } else {
      setTimeText("Evening");
    }
  };

  // console.log(players, "players");

  return (
    <div className="over-view-page">
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
      </div>
      {playerList.length > 0 && (
        <div className="page-container">
          <div className="over-view-head">
            <div>
              <h4>{`Good ${timeText} Coach ${coach?.full_name}`}</h4>

              <div className="over-view-head-desc">
                Welcome back to your dashboard! What would you like to do today?
              </div>
            </div>
          </div>
          <div className="over-view-data">
            <div className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                <Tab label="Add Player" icon={<AddIcon />} {...a11yProps(0)} />
                <Tab
                  label="View Players"
                  icon={<PeopleOutlineIcon />}
                  {...a11yProps(1)}
                />
                <Tab
                  label="Start Training"
                  icon={<PlayCircleOutlineIcon />}
                  {...a11yProps(2)}
                />
              </Tabs>
              {/* </AppBar> */}
              <TabPanel value={value} index={0}>
                <AddPlayerStepper coach={coach} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ul>
                  {playerList?.map((item) => (
                    <li>{item?.full_name}</li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Button variant="contained" color="primary" href="/session">
                  Start a new training session!
                </Button>
              </TabPanel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Overview;

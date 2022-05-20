import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  icon:{
    color: "red",
    // backgroundColor: "#0d6efd",
    
  },
  buttons: {
    // display: "flex",
    // justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#0d6efd",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    // margin: theme.spacing(1),
    // position: "relative",
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonProgress: {
    // position: "absolute",
    top: "50%",
    left: "50%",
  },
  errorField: {
    color: "red",
  },
  hasError: {
    color: "red"
  }
}));

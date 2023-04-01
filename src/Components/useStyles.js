import { makeStyles } from "@mui/styles";
import theme from './theme'
const useStyles = makeStyles({
    input: {
      width: "50%",
      marginBottom: "1rem",
      marginTop: "10rem"
    },
    heading: {
      //backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(6),
      textAlign: "center"
    }
  });
  export default useStyles
import React, { Component } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles =  (theme) => ({
  modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      modalContent: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: "none",
        width: "40%",
        border:"10px solid #37474f",
        maxHeight: "80vh",
        overflowY: "auto",
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          //width: "80%",
        },
      },
      posterAndPlot: {
        width: "50%"
      },
      closeButton: {
        position: "absolute",
        top: "0",
        right: "0",
      },
      imageContainer: {
        flexBasis: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          height: "40%",
          flexBasis: "100%",
        },
      },
      image: {
        maxWidth: "50%",
        height: "auto",
        borderRadius: "5px",
        boxShadow: theme.shadows[2],
        margin: 0,
        padding: 0,
      },
      movieDetails: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent:"space-between",
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
          marginLeft: 0,
        },
      },
      movieTitle: {
        marginBottom: theme.spacing(2),
      },
      movieYear: {
        marginBottom: theme.spacing(2),
      },
      moviePlot: {
        marginBottom: theme.spacing(2),
        textAlign: "justify"
      },
    
});

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { title, year, poster, movie, modal, toggle } = this.props;
    //const { modal } = this.state;
    const classes = this.props.classes;

    return (
      <div>
        <Modal
          className={classes.modal}
          open={modal}
          onClose={toggle}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <div className={classes.modalContent}>
              <Box className={classes.posterAndPlot}>
                <Box className={classes.imageContainer}>
                  <img className={classes.image} src={poster} alt={title} />
                </Box>
                <Typography variant="body1" className={classes.moviePlot}>
                  {movie.Plot}
                </Typography>
              </Box>
              <div className={classes.movieDetails}>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.movieTitle}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.movieYear}
                >
                  Release Year: {year}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.movieYear}
                >
                  Director: {movie.Director}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.movieYear}
                >
                  IMDB Rating: {movie.imdbRating}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.movieYear}
                >
                  Genre: {movie.Genre}
                </Typography>
                <div className={classes.modalFooter}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggle}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
        <Button onClick={toggle}>Open Modal</Button>
      </div>
    );
  }
}

export default withStyles(styles)(ModalButton);


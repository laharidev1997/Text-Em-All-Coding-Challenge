import React, { Component, ReactNode } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { blueGrey } from "@material-ui/core/colors";
import ModalButton from './ModalButton';
import { AxiosResponse } from 'axios';

interface Props extends WithStyles<typeof styles> {
id: string;
title: string;
year: string;
poster: string;
modal?: boolean;
}
type Movie = {
    
    [key: string]: any; // optional, to allow other unspecified keys
  };
interface State {
isModalVisible: boolean;
// movie: Record<string, any>;
movie: Movie
}
const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
      background: blueGrey[50],
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    header: {
      background: blueGrey[800],
      color: blueGrey[50],
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      "&:hover": {
        overflow: "visible",
        whiteSpace: "normal",
      },
    },
    content: {
      color: blueGrey[800],
    },
    year: {
      color: blueGrey[600],
    },
    imdbId: {
      color: blueGrey[600],
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      position: "relative",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      display: "flex",
      minHeight: "420px",
      width: "50%",
      margin: "0 auto 50px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    imageContainer: {
      flex: 4,
      clipPath: "circle(90% at 30px 30px)",
    },
    bgImage: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top left",
      width: "100%",
      height: "100%",
    },
    movieInfo: {
      flex: 3,
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
      textAlign: "right",
      padding: "30px 20px 30px 0",
      zIndex: 1,
    },
    movieInfoH2: {
      textTransform: "uppercase",
      margin: "0",
      padding: "0 0 10px",
      borderBottom: "2px solid rgba(0, 0, 0, 0.3)",
    },
    movieInfoH1: {
      fontWeight: "bold",
      fontSize: "36px",
      margin: "20px 0 0",
    },
    movieInfoH4: {
        margin: '20px 0 10px',
      },
      movieInfoP: {
        fontSize: '14px',
        margin: '10px 0',
        width: '130%',
      },
      tagsContainer: {
        position: 'relative',
        width: '225%',
      },
      tag: {
        border: '2px solid black',
        borderRadius: '4px',
        display: 'inline-block',
        fontSize: '12px',
        marginRight: '5px',
        marginBottom: '5px',
        padding: '2px 5px',
      },
  });
  class MovieCard extends Component<Props, State> {
    constructor(props: Props) {
    super(props);
    this.state = {
    isModalVisible: false,
    movie: {},
    };
    }
    
    componentDidMount(): void {
    this.apiCall();
    }
    
    apiCall = async (): Promise<void> => {
        const { id } = this.props;
        try {
          const response: AxiosResponse<any> = await axios.get(`http://www.omdbapi.com/?apikey=15cf981a&i=${id}`);
          this.setState({ movie: response.data });
        } catch (err) {
          console.error(err);
        }
      };
      
    
    toggleModalVisibility = (): void => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    
    handleCloseModal = (): void => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    
    render(): ReactNode {
    const { classes, id, title, year, poster } = this.props;
    const { isModalVisible, movie } = this.state;
    return (
    <>
    <Card className={classes.root} onClick={this.toggleModalVisibility}>
    <CardHeader
    className={classes.header}
    title={title}
    titleTypographyProps={{ variant: "h6" }}
    titleAccess={title}
    />
    <CardMedia className={classes.media} image={poster} title="Movie Poster" />
    <CardContent className={classes.content}>
    <Typography variant="body2" className={classes.year}>
    Released Year: {year}
    </Typography>
    </CardContent>
    </Card>
    {isModalVisible && (
    <ModalButton
             modal={isModalVisible}
             toggle={this.toggleModalVisibility}
             id={id}
             title={title}
             year={year}
             poster={poster}
             movie={movie}
           />
    // <div>hello</div>
    )}
    </>
    );
    }
    }
    export default withStyles(styles)(MovieCard);
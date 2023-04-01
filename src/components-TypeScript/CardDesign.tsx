import React, { Component, ChangeEvent } from "react";
import { TextField } from "@mui/material";
//mport MovieCard from "./MovieCard";
import { Grid, Typography } from "@material-ui/core";
import axios from 'axios';
import { withStyles, Theme } from '@material-ui/core/styles';
import MovieCard from "./MovieCard";

interface CardListProps {
  classes: Record<string, string>;
}

interface CardListState {
  searchQuery: string;
  movies: Movie[];
  randomNum: number;
}

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const styles = (theme: Theme) => ({
  input: {
    width: "50%",
    marginBottom: "1rem",
    marginTop: "10rem"
  },
  heading: {
    color: "#37474f",
    padding: theme.spacing(2),
    //marginBottom: theme.spacing(6),
    textAlign: "center"
  },
});

class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      searchQuery: "movies",
      movies: [],
      randomNum: 1
    };
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount() {
    this.apiCall(this.state.searchQuery);
  }

  componentDidUpdate(prevProps: CardListProps, prevState: CardListState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.apiCall(this.state.searchQuery);
    }
  }

  handleSearchQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    this.setState({
      searchQuery: query.length ? query : "movies",
    });
  }

  async apiCall(query: string) {
    // const randomNum = 1;
    // const randomNum = Math.floor(Math.random() * 100) + 1;
    console.log("api call")
    let url = `https://www.omdbapi.com/?apikey=15cf981a&s=${query}&page=${this.state.randomNum}`;
    try {
      const response = await axios.get(url);
      this.setState({
        movies: response.data.Search,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { classes } = this.props;
    const { searchQuery, movies } = this.state;
    const filteredCards = movies && movies.filter((movie) =>
      movie && movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems:"center",
          padding: "2rem"
        }}
      >
        <Typography variant="h4" component="h1" className={classes.heading}>
          Movies Application
        </Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          placeholder="Search Movies..."
          onChange={this.handleSearchQueryChange}
        />
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "2rem",
            backgroundColor: "nirvana blue",
            justifyContent:"center"
          }}
        >
          {filteredCards && filteredCards.length > 0 && filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.imdbID}>
            <MovieCard
              id={card.imdbID}
              title={card.Title}
              year={card.Year}
              poster={card.Poster}
            //   movies = {movies}
            />
            {/* <div>hello</div> */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
}

export default withStyles(styles as any)(CardList);

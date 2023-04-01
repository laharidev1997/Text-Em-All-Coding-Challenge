import React, { Component } from "react";
import { TextField } from "@mui/material";
import MovieCard from "./MovieCard";
import { Grid, Typography } from "@material-ui/core";
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import theme from './theme'

const styles = {
  input: {
    width: "50%",
    marginBottom: "1rem",
    marginTop: "10rem"
  },
  heading: {
    color: "#37474f",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(6),
    textAlign: "center"
  },
};

class CardList extends Component {
  constructor(props) {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.apiCall(this.state.searchQuery);
    }
  }

  handleSearchQueryChange(event) {
    const query = event.target.value;
    this.setState({
      searchQuery: query.length ? query : "movies",
    });
  }

  async apiCall(query) {
    // const randomNum = 1;
    // const randomNum = Math.floor(Math.random() * 100) + 1;
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <MovieCard
                id={card.imdbID}
                title={card.Title}
                year={card.Year}
                poster={card.Poster}
                movies = {movies}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CardList);

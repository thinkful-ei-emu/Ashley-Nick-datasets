const express = require('express');
const server = express();
const morgan = require('morgan');
const movies = require('./movies');
server.use(morgan('dev'));
require('dotenv').config();


function getGenre(arr){
  let newArr = arr.map(item => item['genre']);
  return newArr;
}
function getCountry(arr){
  let newArr = arr.map(item => item['country']);
  return newArr;
}
function getVotes(arr){
  let newArr = arr.map(item => Number(item['avg_vote']));
  return newArr;
}

let genreArr = getGenre(movies);
let countryArr = getCountry(movies);
let voteArr = getVotes(movies);


server.get('/movie', (req, res) => {
  const { genre, country, avg_vote } = req.query;

  let filteredMovies = [...movies];

  if (!genre && !country && !avg_vote) {
    return res.status(400).json({error: 'Please search by country, genre or avg_vote.'})
  }

  if (genre && !genreArr.includes(genre)){
    return res.status(400).json({error: 'Please enter valid genre. ex: action'});
  }

  if (country && !countryArr.includes(country)){
    return res.status(400).json({error: 'Please enter valid country. ex: United States'});
  }

  if (avg_vote && !(avg_vote > 0 && avg_vote <= 10)){
    return res.status(400).json({error: 'Please enter valid avg_vote. (Between 1 - 10) ex: 6.4'});
  }

  if (genre) {
    let convertedGenre = genre.toLowerCase();
    filteredMovies = filteredMovies.filter(movie => movie['genre'].toLowerCase().includes(convertedGenre));
  }

  if (country) {
    let convertedCountry = country.toLowerCase();
    filteredMovies = filteredMovies.filter(movie => movie['country'].toLowerCase().includes(convertedCountry));
  }

  if (avg_vote) {
    let convertedVote = Number(avg_vote);
    console.log(avg_vote);
    filteredMovies = filteredMovies.filter(movie => Number(movie['avg_vote']) >= convertedVote);
  }





  res.json(filteredMovies);
});

server.listen(8080, () => console.log('Server on 8080 is running'));

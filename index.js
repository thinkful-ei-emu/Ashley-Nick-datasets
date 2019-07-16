const express = require('express');
const server = express();
const morgan = require('morgan');
const movies = require('./movies');
server.use(morgan('dev'));
require('dotenv').config();


console.log(process.env.API_TOKEN);

// function titlize(str){
//   return str.charAt(0).tolowerCase() + str.slice(1);
// }

server.get('/movie', (req, res) => {
 const {genre, country, avg_vote} = req.query;
  let filteredMovies = [...movies];

  if(genre){
    let convertedGenre = genre.toLowerCase();

    filteredMovies= filteredMovies.filter(movie => movie["genre"].toLowerCase().includes(convertedGenre));

  }
  
  if(country){
    let convertedCountry = country.toLowerCase();

    filteredMovies= filteredMovies.filter(movie => movie["country"].toLowerCase().includes(convertedCountry));

  }





 res.json(filteredMovies);
});

server.listen(8080, () => console.log('Server on 8080 is running'))
  
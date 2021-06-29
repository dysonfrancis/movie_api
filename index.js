const express = require('express');
const app = express();
morgan = require('morgan');

const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

let fav10Movies = [
  {
    Movie_Title: 'Harry Potter and the Sorcerer\'s Stone',
    Director: 'J.K. Rowling'
  },
  {
    Movie_Title: 'Lord of the Rings',
    Director: 'J.R.R. Tolkien'
  },
  {
    Movie_Title: 'Twilight',
    Director: 'Stephanie Meyer'
  },
  {
    Movie_Title: 'The Shawshank Redemption',
    Director: 'Frank Darabont'
  },
  {
    Movie_Title: 'Apocalypto',
    Director: 'Mel Gibson'
  },
  {
    Movie_Title: 'The Sound of Music',
    Director: ' Robert Wise'
  },
  {
    Movie_Title: 'The Godfather',
    Director: 'Francis Ford Coppola'
  },
  {
    Movie_Title: 'The Good, the Bad and the Ugly',
    Director: 'Sergio Leone'
  },
  {
    Movie_Title: 'Mystic River',
    Director: 'Clint Eastwood'
  },
  {
    Movie_Title: 'Inception',
    Director: ' Christopher Nolan'
  }
];

//Static file path
app.use(express.static('public'));

//Console log all requests to terminal
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(methodOverride());

//Root folder
app.get('/', (req, res) => {                  
  res.send('Welcome to Dyson\'s app!');
});

//call top 10 movies
app.get('/movies', (req, res) => {                  
  res.json(fav10Movies);
});


//Port listener
app.listen(8080, () => {
  console.log('Dyson\'s app is listening on port 8080.');
});


//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
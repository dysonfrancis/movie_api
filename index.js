const express = require('express');
const app = express();
morgan = require('morgan'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

let movies = [
  {
    title: 'Face/Off',
    genre: 'Action Thriller',
    director: {
      name: 'John Woo',
      bio: 'John Woo Yu-Sen SBS is a Chinese film director, producer and screenwriter of action genre films in the Hong Kong film industry.',
      born: '1 May 1946',
      died: '-'
  }},
  {
    title: 'Lord of the Rings',
    genre: 'Fantasy Adventure',
    director: {
      name: 'Peter Jackson',
      bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, producer, and screenwriter.',
      born: '31 October 1961',
      died: '-'
  }},
  {
    title: 'Indiana Jones and the Last Crusade',
    genre: 'Action-Adventure',
    director: {
      name: 'Steven Spielberg',
      bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter.',
      born: '18 December 1946',
      died: '-'
  }},
  {
    title: 'The Shawshank Redemption',
    genre: 'Drama/Thriller',
    director: {
      name: 'Frank Darabont',
      bio: 'Frank Árpád Darabont is a French-American film director, screenwriter and producer of Hungarian descent.',
      born: '28 January 1959',
      died: '-'
  }},
  {
    title: 'Apocalypto',
    genre: 'Historical/Adventure/Thriller',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson is an American actor, film director, producer, and screenwriter. ',
      born: '3 January 1956',
      died: '-'
  }},
  {
    title: 'The Sound of Music',
    genre: 'Drama/Musical',
    director: {
      name: 'Robert Wise',
      bio: 'Robert Earl Wise was an American film director, producer, and editor.',
      born: '10 September 1914',
      died: '14 September 2005'
  }},
  {
    title: 'The Godfather',
    genre: 'Crime/Thriller',
    director: {
      name: 'Francis Ford Coppola',
      bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter. ',
      born: '7 April 1939',
      died: '-'
  }},
  {
    title: 'The Good, the Bad and the Ugly',
    genre: 'Western/Thriller',
    director: {
      name: 'Sergio Leone',
      bio: 'Sergio Leone was an Italian film director, producer and screenwriter, credited as the creator of the Spaghetti Western genre ',
      born: '29 January 1929',
      died: '30	April 1989'
  }},
    {
    title: 'Mystic River',
    genre: 'Neo-Noir',
    director: {
      name: 'Clint Eastwood',
      bio: 'Clinton Eastwood Jr. is an American actor, film director, composer, and producer. ',
      born: '31 May 1930',
      died: '-'
  }},
  
  {
    title: 'Inception',
    genre: 'Fantasy/Thriller',
    director: {
      name: 'Christopher Nolan',
      bio: 'Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter.',
      born: '30 July 1970',
      died: '-'
  }},
];


let users = [
  {
    id: 1,
    username: 'Dyson',
    password: 'password1',
    email: 'dyson@gmail.com',
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
  res.send('Welcome to Dyson\'s Favorite Movie Database!');
});

//Return a list of ALL movies to the user
app.get('/movies', (req, res) => {                  
  res.json(movies);
});


//Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
	res.json(movies.find((movie) => 
		{ return movie.title === req.params.title }));
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/genres/:title', (req, res) => {
	res.json(movies.find((genre) => 
		{ return genre.title === req.params.title }));
});



//Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:name', (req, res) => {
  res.json(movies.find((movie) => 
  { return movie.director.name === req.params.name }));
});

//Get list of users
app.get('/users', (req, res) => {
  res.json(users);
});

// Allow new users to register
app.post('/users', (req, res) => {
	let newUser = req.body;

	if (!newUser.username) {
		const message = 'Missing Username in request body';
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).send(newUser);
	}
});



// Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
	let user = users.find((user) => 
			res.status(400).send('Username was not found.'));
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.put('/users/movies/:favorites', (req, res) => {
	let userFavorite = movies.find((movie) => 
	res.status(201).send('Movie added to favorites'));
});

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/users/movies/:favorites', (req, res) => {
	let userFavorite = movies.find((movie) => 
	res.status(201).send('Movie deleted from favorites'));
});

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:username', (req, res) => {
	let deRegister = users.find((user) => 
	res.status(201).send('User email has been removed'));
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
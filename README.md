# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Dependencies
- **fs:** To read from random.txt file and log the data in log.txt file.
- **inquirer:** To make an interactive interface.
- **node-spotify-api:** To access the Spotify API and search for song information.
- **request:** For request and grab data from the OMDB API.
- **twitter:** Used to access my twitter feed and return the last 20 tweets.
### Installing
Open Terminal/bash window
- Clone this repo. `git clone https://github.com/Jhongert/liri-node-app.git`
- Navigate to liri-node-app folder. `cd liri-node-app`
- Install all dependencies. `npm install`
### Application Structure
- `keys.js` - To store Twitter API keys.
- `liri.js` - Entry point file.
- `log.txt` - To log all the data from each command.
- `node_modules/` - This folder contains all node modules
- `package.json` - This file contains meta data about the app. It includes the list of dependencies to install from npm when running npm install
- `random.txt` - This file contains a default song's name.
- `.git/` - Git folder
- `.gitignore` - To tell git not to track node_modules files, and thus they won't be committed to Github. 
- `README.md` - This file.
## Built With
- Node.js
- javascript
## Usage
To run this app you must have node.js installed on your computer.
- Run `node liri.js` in your terminal/bash window
- Choose one of the following commands:
	- `my-tweets` This shows my last 20 tweets and when they were created at in your terminal/bash window.
	- `spotify-this-song` This command will ask you for the name of a song, If no song is provided then the program will show you information about the default song, "The Sign". The following information about the song will be shown in your terminal/bash window.
		- Artist(s)
		- The song's name
		- A preview link of the song from Spotify
		- The album that the song is from
	- `movie-this` This command will ask you for the name of a movie, If no movie is provided then the program will show you information about the default movie, "Mr. Nobody". The following information about the movie will be shown in your terminal/bash window.
		- Title of the movie
		- Year the movie came out
		- IMDB Rating of the movie
		- Rotten Tomatoes Rating of the movie
		- Country where the movie was produce
		- Languages of the movie
		- Plot of the movie
		- Actors in the movie
	- `do-what-it-says` LIRI will take the text inside of random.txt and then use it to call one of the LIRI's commands
## Author
- Jhongert Fuertes

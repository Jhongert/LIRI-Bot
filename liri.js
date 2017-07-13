//Load required Modules
var fs = require('fs');
var inquirer = require("inquirer");

//Ask the user to select what to do
inquirer.prompt([
	{
		type: 'list',
		name: 'choice',
		message: 'Choose a command:',
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
	}
	]).then(function(response){
		//Take an action based on user selection
		switch(response.choice){
			case 'my-tweets':
				myTweets();
				break;
			case 'spotify-this-song':
				//Ask user to type the song's name.
				inquirer.prompt([{
					type: 'input',
					message: 'Type the song\'s name: ',
					name: 'songName'
				}]).then(function(response){
					//assing the nome of the song to the variable songName 
					//or "The sign" if not song was entered
					var songName = response.songName.trim() || 'The sign';
					spotifyThisSong(songName);
				});
				break;
			case 'movie-this':
				//Ask user to type the movie's name.
				inquirer.prompt([{
					type: 'input',
					message: 'Type the movie\'s name: ',
					name: 'movieName'
				}]).then(function(response){
					//assing the nome of the movie to the variable movieName 
					//or "Mr. Nobody" if not movie was entered
					var movieName = response.movieName.trim() || 'Mr. Nobody'
					movieThis(movieName);
				});
				break;
			case 'do-what-it-says':
				doWhatItSays();
				break;
		}
	}
);

//my tweets function
function myTweets(){
	//Load the node twitter module
	var twitter = require('twitter');
	var keys = require('./keys.js');
	var twitterKeys = keys.twitterKeys;

	var client = new twitter(twitterKeys);
	var params = {count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error && response.statusCode === 200) {
  			var tweetsInfo = '\n ************************ My tweets ************************ \n';
    		
    		for(var i = 0; i < tweets.length; i++){
    			tweetsInfo += 'Created on: ' + tweets[i].created_at + '\n';
    			tweetsInfo += 'Content: ' + tweets[i].text + '\n';
    			tweetsInfo += '---------------------------------------------------------------- \n';
    		}
    		tweetsInfo += '************************ end my tweets ************************ \n';
    		//console log tweets
    		console.log(tweetsInfo);
    		
    		//Append tweets to log.txt file
			fs.appendFile('log.txt', tweetsInfo, function(err){
				if (err) return console.log(err);
			});
  		} else console.log(error)
	});
}

//spotify this song function
function spotifyThisSong(song){
	//Load the node spotify module
	var Spotify = require('node-spotify-api');	

	var spotify = new Spotify({
  		id: 'ac7ccdeac17a4079a92297a3144f7749',
  		secret: '36cb3539b0ca4e3a9d74ef9ab6acdc7f'
	});
 
	spotify.search({ 
		type: 'track', 
		query: song, 
		limit: 1}, 
		function(error, response) {
  			if (!error){
	  			//get data from the responce
	  			var data = response.tracks.items[0];

	  			//if no data was found return and error message
	  			if(!data)
	  				return console.log('No information was found about this song.');

	  			//put the name of the first artist in artists string
	  			var artists = data.artists[0].name;
	  		
	  			//if there are more than 1 artist name, concatenate those names with artists string 
	  			for(var i = 1; i < data.artists.length; i++){
	  				artists += ', ' + data.artists[i].name;
	  			}

	  			//create a string with all info
	  			var songInfo = '\n ************************ spotify-this-song ************************ \n';
	  			songInfo += 'Artist(s): ' + artists + '\n';
	  			songInfo += 'Song\'s Name: ' + data.name + '\n';
	  			songInfo += 'Preview Link: ' + data.preview_url + '\n';
	  			songInfo += 'Album Name: ' + data.album.name + '\n';
	  			songInfo += '************************ end spotify-this-song ************************ \n';

	  			//console log song's info
	  			console.log(songInfo);

	  			//Append song's info to log.txt file
				fs.appendFile('log.txt', songInfo, function(err){
					if (err) return console.log(err);
				});
			} else console.log('Error occurred: ' + error);
		}
	);
}

//movie this function
function movieThis(movieName){
	//Load the request module
	var request = require('request');

	//creat a url
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&type=movie&apikey=40e9cece";
	request(queryUrl, function(error, response, body){
		
		//check for error
		if(!error && response.statusCode === 200){
			//parse the body into movieData variable
			var movieData = JSON.parse(body);

			if(movieData.Error)
				return console.log(movieData.Error);

			// Because not all movies have the Rotten Tomatoes Rating
			var rottenTomatoes = "N/A";
			for(var i = 0; i < movieData.Ratings.length; i++){
				if(movieData.Ratings[i].Source == 'Rotten Tomatoes')
					rottenTomatoes = movieData.Ratings[i].Value;
			}

			//create a string with all info
			var movieInfo = '\n ************************ movie-this ************************ \n';
			movieInfo += 'Title: ' + movieData.Title + '\n';
			movieInfo += 'Year: ' + movieData.Year + '\n';
			movieInfo += 'IMDB Rating: ' + movieData.imdbRating + '\n';
			movieInfo += 'Rotten Tomatoes Rating: ' + rottenTomatoes + '\n';
			movieInfo += 'Country: ' + movieData.Country + '\n';
			movieInfo += 'Language: ' + movieData.Language + '\n';
			movieInfo += 'Plot: ' + movieData.Plot + '\n';
			movieInfo += 'Actors: ' + movieData.Actors + '\n';
			movieInfo += '************************ end movie-this ************************ \n';

			//console log movie's info
			console.log(movieInfo);
			
			//Append movie's info to log.txt file
			fs.appendFile('log.txt', movieInfo, function(err){
				if (err) return console.log(err);
			});
		} else console.log('Error occurred: ' + error);
	});
}

//do what it says function
function doWhatItSays(){
	//read random.txt file
	fs.readFile('random.txt', 'utf8', function(error, data){
		if (!error){
	  		//create an array with the info in random.txt file
	  		var dataArr = data.split(',');
	  		//The command is the first element and the argument is the 2nd element in the array
	  		var command = dataArr[0];
	  		var argument = dataArr[1];
	  		//Remove "" from the argument
	  		argument = argument.replace(/"/g, '');
	  		//Call the function base on the command
	  		switch(command){
	  			case 'spotify-this-song':
	  				spotifyThisSong(argument);
	  				break;
	  			case 'movie-this':
	  				movieThis(argument);
	  				break;
	  		}	
	  	} else return console.log(error);
	});
}
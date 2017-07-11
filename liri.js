//Load fs Modules
var fs = require('fs');

// Get the command(my-tweets, movie-this, etc) from process.argv
// The command will be the 3rd argumet
var command = process.argv[2];
var parameter;

//if there are more than 3 arguments in process.argv
//then those arguments are the movie's name or song's name
if(process.argv.length > 3){
	//get all arguments from process.argv starting on position 3 in a new array
	var arr = process.argv.slice(3);

	//create a string separated by plus(+) sign with the arguments in arr array
	//this strin is the movie's name or song's name
	parameter = arr.join('+');
}

//check the command typed and call the corresponding function
switch(command){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		if(parameter)
			spotifyThisSong(parameter);
		else 
			spotifyThisSong('The Sign');
		break;
	case 'movie-this':
		if(parameter)
			movieThis(parameter)
		else 
			movieThis('Mr. Nobody');
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}

//my tweets function
function myTweets(){
	//Load the node twitter module
	var twitter = require('twitter');
	var keys = require('./keys.js');
	var twitterKeys = keys.twitterKeys;

	var client = new twitter(twitterKeys);
	var params = {count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			var tweetsInfo = '************************ My tweets ************************ \n';
    		
    		for(var i = 0; i < tweets.length; i++){
    			tweetsInfo += 'Created on: ' + tweets[i].created_at + '\n';
    			tweetsInfo += 'Content: ' + tweets[i].text + '\n';
    		}
    		tweetsInfo += '************************ end my tweets ************************ \n';
    		
    		//console log tweets
    		console.log(tweetsInfo);

    		//Append tweets to log.txt file
			fs.appendFile('log.txt', songInfo, function(err){
				if (err) return console.log(err);
			});

  		} else {console.log(error)}
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
		function(err, response) {
  			if (err) return console.log('Error occurred: ' + err);

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
  			var songInfo = '************************ spotify-this-song ************************ \n';
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

			if(movieData.Error){
				return console.log(movieData.Error);
			}

			// Because not all movies have the Rotten Tomatoes Rating
			var rottenTomatoes = "N/A";
			for(var i = 0; i < movieData.Ratings.length; i++){
				if(movieData.Ratings[i].Source == 'Rotten Tomatoes')
					rottenTomatoes = movieData.Ratings[i].Value;
			}

			//create a string with all info
			var movieInfo = '************************ movie-this ************************ \n';
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
		}
	});
}

//do what it says function
function doWhatItSays(){
	//read random.txt file
	fs.readFile('random.txt', 'utf8', function(error, data){
		if (error) {
    		return console.log(error);
  		}
  		//create an array with the info in random.txt file
  		var dataArr = data.split(',');
  		//The song's name is the 2nd element in the array
  		var song = dataArr[1];
  		//Remove "" from the song's name
  		song = song.replace(/"/g, '');
  		//Call spotify function
  		spotifyThisSong(song);
	});
}
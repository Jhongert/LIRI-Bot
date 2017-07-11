

var command = process.argv[2];

switch(command){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		spotifyThisSong();
		break;
	case 'movie-this':
		movieThis();
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}

function myTweets(){

}

function spotifyThisSong(song = 'The Sign'){
	var Spotify = require('node-spotify-api');

	if(process.argv.length > 3){
		var arr = process.argv.slice(3);
		song = arr.join('+');
	}

	var spotify = new Spotify({
  		id: 'ac7ccdeac17a4079a92297a3144f7749',
  		secret: '36cb3539b0ca4e3a9d74ef9ab6acdc7f'
	});
 
	spotify.search({ 
		type: 'track', 
		query: song, 
		limit: 1}, function(err, response) {

  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  	
  		var data = response.tracks.items[0];
  		var artists = data.artists[0].name;
  		
  		for(var i = 1; i < data.artists.length; i++){
  			artists += ', ' + data.artists[i].name;
  		}
  		console.log('************************ spotify-this-song ************************');
  		console.log('Artist(s): ' + artists);
		console.log('Song\'s Name: ' + data.name); 
		console.log('Preview Link: ' + data.preview_url);
		console.log('Album Name: ' + data.album.name);
		console.log('************************ end spotify-this-song ************************');
	});
}

function movieThis(){
	var request = require('request');
	var movieName = "";
	var arr = process.argv.slice(3);

	movieName = arr.join('+');

	if(movieName == ""){
		movieName = 'Mr. Nobody';
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&type=movie&apikey=40e9cece";
	request(queryUrl, function(error, response, body){
		var movieData = JSON.parse(body);

		if(!error && response.statusCode === 200){
			if(movieData.Error){
				return console.log(movieData.Error);
			}
			console.log('************************ movie-this ************************');
			console.log('Title: ' + movieData.Title);
			console.log('Year: ' + movieData.Year);
			console.log('IMDB Rating: ' + movieData.imdbRating);
			console.log('Rotten Tomatoes Rating: ' + movieData.Ratings[1].Value);
			console.log('Country: ' + movieData.Country);
			console.log('Language: ' + movieData.Language);
			console.log('Plot: ' + movieData.Plot);
			console.log('Actors: ' + movieData.Actors);
			console.log('************************ end movie-this ************************');
		}
	});
}

function doWhatItSays(){
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(error, data){
		if (error) {
    		return console.log(error);
  		}
  		var dataArr = data.split(',');
  		var song = dataArr[1];
  		song = song.replace(/"/g, '');
  		spotifyThisSong(song);
	});
}
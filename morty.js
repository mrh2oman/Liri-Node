var keys = require("./keys.js");
var media = require("twitter");
var Music = require("node-spotify-api");
var movies = require("omdb");
var request = require("request");
var fs = require("fs");
var colors = require("colors");

var userPrompt = process.argv[2];
var userCommand = process.argv[3];


	switch(userPrompt){

		case "my-tweets":
		getMedia();
		break;

    case "spotify-this-song":
		getMusic();
		break;

		case "movie-this":
		getMovie(userCommand);
		break;

		case "do-what-it-says":
		getDo();
		break;

	}
function getMedia(){
	console.log("Here come the tweeeeeeeeeeeeeets".black.bgWhite);

	var client = new media({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {
		user_id: "liribootcamp",
	};

	client.get("statuses/user_timeline.json" , params, function(error, tweets, response){
		if (!error) {

          for (i=0; i<tweets.length; i++) {

              var output = ("Number: " + (i+1)+ "\n" + tweets[i].created_at + "\n" + tweets[i].text + '\n');

              console.log("-------------------------".yellow);
              console.log((output).green);
	            console.log("-------------------------".yellow);

	        }
	    };
	});
};



function getMusic(nullTrack){

	var spotify = new Music ({
		id: "d8c7ed0f57b4455c979c7565eac1f0d4",
		secret: "2bd2b98f352547389c9fe3108fde5901"

	});
	console.log(("Hot Beats Coming Your Way...").black.bgWhite);

	if (userCommand == null) {
		userCommand = "same drugs";
	}
	spotify.search({
		type: "track",
		query: userCommand
	}, function (error, data) {
		if (error) {
			console.log("error: " + error);
			return;
		}

		console.log(("____________________________________________________________________________________________________").blue);
		console.log("Person or Group - ".grey + (data.tracks.items[0].artists[0].name).red);
		console.log("Song Name - ".grey + (data.tracks.items[0].name).red);
		console.log("Preview - ".grey +(data.tracks.items[0].preview_url).red);
		console.log("Album Name -  ".grey +(data.tracks.items[0].album.name).red);
		console.log(("____________________________________________________________________________________________________").blue);

	});
}

function getMovie(userCommand){
	if (userCommand == null){
		userCommand = "Baby Driver";
		console.log(userCommand);
	}
	console.log("Here comes the film...".black.bgWhite);
	request ("http://www.omdbapi.com/?t="+userCommand+"&y=&plot=short&apikey=40e9cece", function(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log(("____________________________________________________________________________________________________").blue);
			console.log("Title: ".grey + JSON.parse(body).Title.cyan);
			console.log("Year: ".grey + JSON.parse(body).Year.cyan);
			console.log("IMDB Rating: ".grey + JSON.parse(body).imdbRating.cyan);
			console.log("Rotten Tomatoes: ".grey + JSON.parse(body).Ratings[1].Value.cyan);
			console.log("Imagine a country so free, one can throw glass on the streets: ".grey + JSON.parse(body).Country.cyan); //coming to america quote
			console.log("Do you understand the words coming out of my mouth?: ".grey + JSON.parse(body).Language.cyan + " motherfucker, do you speak it?".grey);//first quote "Rush Hour" second quote "Pulp Fiction"
			console.log("Plot: ".grey + JSON.parse(body).Plot.cyan);
			console.log("Actors: ".grey + JSON.parse(body).Actors.cyan);
			console.log(("____________________________________________________________________________________________________").blue);
		}
	});
}

function getDo(){

	fs.readFile("random.txt", "utf8", function(error, file){
		if (error) {
			console.log("Error: " + error);
		} else {

			var fileSplit = file.split(',');
			        userPrompt = fileSplit[0];
			        userCommand = fileSplit[1];
							console.log(fileSplit[1]);

							getMusic(userPrompt, userCommand);

		}
	});
}

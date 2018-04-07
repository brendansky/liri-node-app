require("dotenv").config();
var fs = require('fs');
var keys = require('./keys');
var request = require("request");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var parameter = process.argv[3];

function askSpotify() {

    spotify
        .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

};

function askTwitter() {

    client
        .request("https:/api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular")
        .then(function (data) {
            console.log(data)

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        })

}

function askMovie(movie) {

    request(`https://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

        if (error) {
            console.log(error);

        } else {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating + "/10");
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            console.log("<---------------------------->")
        }

    });
};


if (action === "movie-this") {
    console.log(`You requested information about: ${parameter}`);
    askMovie(parameter);
}

if (action === "my-tweets") {
    console.log("here are some sweet tweets");
    askTwitter();
}

if (action === "spotify-this-song") {
    console.log(`Informatoin about: ${parameter}`);
    askSpotify(parameter);
}

console.log("hello");


askSpotify();
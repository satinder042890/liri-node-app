require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
const command= process.argv[2];
var queryString =process.argv[3];
console.log(command);
console.log(queryString);


switch(command){
    case "concert-this":
         concerts();
         break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
         randomFile();
         break;
    default:
         console.log("wrong choice");
         break;
};
function concerts(){
    queryString =process.argv.slice(3).join(" ");
    request('https://rest.bandsintown.com/artists/' + queryString + '/events?app_id=codingbootcamp', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if(!error){
            var js=JSON.parse(body);
            var moment = require('moment');
            console.log("VENUE DETAILS");
            for(var i=0 ; i<js.length ; i++){
                console.log("________________________________________________________________________");
                console.log("Name of venue = "+js[i].venue.name);
                console.log("Location of venue = "+js[i].venue.city+" , "+js[i].venue.country);
                console.log("Date of Event = "+moment(js[i].datetime).format("MM/DD/YYYY"));
                console.log("________________________________________________________________________");
            }
        }
    });
};

function spotifySong(){
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    if(queryString == undefined){
        queryString="The Sign ace of base";
    }
    else{
        queryString =process.argv.slice(3).join(" ");
    }
    spotify.search({ type: 'track', query: queryString, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("________________________________________________________________________");
        console.log("Artist Name = "+data.tracks.items[0].artists[0].name); 
        console.log("Song Name = "+data.tracks.items[0].name); 
        console.log("Preview Link = "+data.tracks.items[0].preview_url); 
        console.log("Album Name = "+data.tracks.items[0].album.name); 
        console.log("________________________________________________________________________");
    });
};

function movieSearch(){
    if(queryString == undefined){
        queryString= "Mr. Nobody";
    }
    else{
        queryString =process.argv.slice(3).join(" ");
    }
    request("http://www.omdbapi.com/?t=" + queryString + "&y=&plot=short&apikey=trilogy",function(err,response,body){
        if(!err){
            console.log("________________________________________________________________________");
            console.log("Title = "+ JSON.parse(body).Title);
            console.log("Year = "+ JSON.parse(body).Year);
            console.log("Rating = "+ JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes = "+ JSON.parse(body).Ratings[1].Value);
            console.log("Country = "+ JSON.parse(body).Country);
            console.log("Language = "+ JSON.parse(body).Language);
            console.log("Plot = "+ JSON.parse(body).Plot);
            console.log("Actors = "+ JSON.parse(body).Actors);
            console.log("_________________________________________________________________________");
        }
    });
};


function randomFile(){
    const fs=require("fs");
    fs.readFile("random.txt","Utf8",function(err,data){
        if(err){
            return console.log(err);
        }
        var fileData=data.split(",");
        var action=fileData[0];
        queryString=fileData[1];
        console.log(action);
        console.log(queryString);
        if(action === "concert-this"){
            concerts();
        }
        else if(action === "spotify-this-song"){
            spotifySong();
        }
        else if(action === "movie-this"){
            movieSearch();
        }

    });
};
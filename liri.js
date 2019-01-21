require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
const command= process.argv[2];
var queryString =process.argv[3];


//switch statement of multiple choices for the user
switch(command){
    case "concert-this":
         queryString =process.argv.slice(3).join(" ");
         concerts();
         break;

    case "spotify-this-song":
        if(queryString == undefined){
            queryString="The Sign ace of base";
        }
        else{
            queryString =process.argv.slice(3).join(" ");
        }
        spotifySong();
        break;

    case "movie-this":
        if(queryString == undefined){
            queryString= "Mr. Nobody";
        }
        else{
            queryString =process.argv.slice(3).join(" ");
        }
        movieSearch();
        break;

    case "do-what-it-says":
         randomFile();
         break;

    default:
         saveToFile("wrong choice");
         break;

};

//function that displays the information of concerts using bandsintown api

function concerts(){
    request('https://rest.bandsintown.com/artists/' + queryString + '/events?app_id=codingbootcamp', function (error, response, body) {
        if(error){
            saveToFile('error:', error); // Print the error if one occurred
            saveToFile('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
        if(!error){
            var js=JSON.parse(body);
            var moment = require('moment');
            saveToFile("VENUE DETAILS");
            for(var i=0 ; i<js.length ; i++){
                saveToFile("________________________________________________________________________");
                saveToFile("Name of venue = "+js[i].venue.name);
                saveToFile("Location of venue = "+js[i].venue.city+" , "+js[i].venue.country);
                saveToFile("Date of Event = "+moment(js[i].datetime).format("MM/DD/YYYY"));
                saveToFile("________________________________________________________________________");
            }
        }
    });
};


//function that displays the song details using spotify api

function spotifySong(){
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: queryString, limit: 1 }, function(err, data) {
        if (err) {
          return saveToFile('Error occurred: ' + err);
        }
        saveToFile("________________________________________________________________________");
        saveToFile("Artist Name = "+data.tracks.items[0].artists[0].name); 
        saveToFile("Song Name = "+data.tracks.items[0].name); 
        saveToFile("Preview Link = "+data.tracks.items[0].preview_url); 
        saveToFile("Album Name = "+data.tracks.items[0].album.name); 
        saveToFile("________________________________________________________________________");
    });
};


//function that displays the movies information using omdb api

function movieSearch(){
    request("http://www.omdbapi.com/?t=" + queryString + "&y=&plot=short&apikey=trilogy",function(err,response,body){
        if(!err){
            saveToFile("________________________________________________________________________");
            saveToFile("Title = "+ JSON.parse(body).Title);
            saveToFile("Year = "+ JSON.parse(body).Year);
            saveToFile("Rating = "+ JSON.parse(body).imdbRating);
            saveToFile("Rotten Tomatoes = "+ JSON.parse(body).Ratings[1].Value);
            saveToFile("Country = "+ JSON.parse(body).Country);
            saveToFile("Language = "+ JSON.parse(body).Language);
            saveToFile("Plot = "+ JSON.parse(body).Plot);
            saveToFile("Actors = "+ JSON.parse(body).Actors);
            saveToFile("_________________________________________________________________________");
        }
    });
};

//function that read data from file and run that command

function randomFile(){
    const fs=require("fs");
    fs.readFile("random.txt","Utf8",function(err,data){
        if(err){
            return saveToFile(err);
        }
        var fileData=data.split(",");
        var action=fileData[0];
        queryString=fileData[1];
        if(action == "concert-this"){
            concerts();
        }
        else if(action == "spotify-this-song"){
            spotifySong();
        }
        else if(action == "movie-this"){
            movieSearch();
        }
        else{
            saveToFile("something wrong");
        }

    });
};

function saveToFile(output){
    console.log(output);
    const fs=require("fs");
    fs.appendFile("log.txt",output +"\n",function(err){
        if(err){
            return console.log(err);
        }
    });
};
# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
liri.js can take in one of the following commands:

### 1. node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

* Name of the venue

* Venue location

* Date of the Event (use moment to format this as "MM/DD/YYYY")

![Alt text](https://github.com/satinder042890/liri-node-app/blob/master/images/concerts.png)

### 2. node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

*If no song is provided then your program will default to "The Sign" by Ace of Base.*

![Alt text](https://github.com/satinder042890/liri-node-app/blob/master/images/spotify.png)

### 3. node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  
*If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'*

![Alt text](https://github.com/satinder042890/liri-node-app/blob/master/images/movie.png)

**You'll use the request package to retrieve data from the OMDB API. The OMDB API requires an API key. You may use trilogy.**

### 4. node liri.js do-what-it-says

* Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

* Edit the text in random.txt to test out the feature for movie-this and my-tweets

![Alt text](https://github.com/satinder042890/liri-node-app/blob/master/images/dowhatitsays.png)

### 5. In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
* Make sure you append each command you run to the log.txt file. 
* Do not overwrite your file each time you run a command.

![Alt text](https://github.com/satinder042890/liri-node-app/blob/master/images/logfile.png)


##### Video Link

https://drive.google.com/drive/folders/1-Q8IyDImDj8BBK--ET-99baweEDgriLG

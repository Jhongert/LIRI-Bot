# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Dependencies
- **fs:** To log the information searched in the log.txt file and read information from random.txt file.
- **inquirer:** To make an interactive interface.
- **node-spotify-api:** To access the Spotify API and search for song information.
- **request:** For equest and grab data from the OMDB API.
- **twitter:** Used to access my twitter feed and return the last 20 tweets.
### Installing
open Terminal/bash window
- Clone this repo. `git clone https://github.com/Jhongert/liri-node-app.git`
- Navigate to liri-node-app folder. `cd liri-node-app`
- Install all dependencies. `npm install`
### Application Structure
- `git/` - Git folder
- `.gitignore` - To tell git not to track node_modules files, and thus they won't be committed to Github. 
- `keys.js` - To store Twitter API keys.
- `liri.js` - Entry point file.
- `log.txt` - To log all the data from each command.
- `node_modules/` - This folder contains all node modules
- `package.json` - This file contains meta data about the app. It includes the list of dependencies to install from npm when running npm install
- `random.txt` - This file contains a default song's name.
- `README.md` - This file.

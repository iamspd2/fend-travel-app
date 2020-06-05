# Travel App

This capstone project aims to give us the opportunity to put all of the skills we have learned into one project to build our own custom travel app. It is all done in a Webpack environment, using an Express server, and wrapped up with service workers.

## About

The user can plan trips using this app by entering the name of the destination along with the country code. I use Geonames API to get the latitude and longitude of the place in order to retrieve the exact weather forecast from WeatherBit API, and an image of the place from Pixabay API. The user can save those trips for future reference.

## How To Start

- Clone this repo
- `cd` into your new folder and run `npm install` to install npm packages
- Open a terminal at the root level of the project
- Type `npm run build` to generate `dist` 
- Type `npm run start` to run the server at port 8080
- To run the server in development mode, type `npm run dev`
- Type `npm run test` to run the test suites

## Additional Inputs

As suggested, I included an additional feature which is pulling weather forecast for multiple days. I am pulling the forecast for the next 16 days from WeatherBit API, and displaying the exact weather forecast over the next 16 days to the user. If the number of days to go for the planned departure is beyond that, I am showing the farthest possible forecast, which is the 16th day. I will add more functionalities to this project.

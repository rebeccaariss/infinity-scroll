import config from './config.js';

// API documentation for HTTP Authorization header method (see "headers," below):
// https://unsplash.com/documentation#authorization

const count = 10;
const apiUrl = 'https://api.unsplash.com/photos/random/';
const headers = {
  Authorization: `Client-ID ${config.apiKey}`,
};

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl + `?count=${count}`, { headers });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Error handling here
  }
}

// On load
getPhotos();
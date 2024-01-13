import config from './config';

// Unsplash API
const count = 10;
const apiKey = config.apiKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Error handling here
  }
}

// On load
getPhotos();
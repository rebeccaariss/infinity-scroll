import config from './config.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// API documentation for HTTP Authorization header method (see "headers," below):
// https://unsplash.com/documentation#authorization

const count = 10;
const apiUrl = 'https://api.unsplash.com/photos/random/';
const headers = {
  Authorization: `Client-ID ${config.apiKey}`,
};

// Create elements for links & photos, add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html); // links to image preview on Unsplash
    item.setAttribute('target', '_blank');

    // Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular); // source for displaying image
    img.setAttribute('alt', photo.alt_description); // description provided by API
    img.setAttribute('title', photo.alt_description);

    // Nest <img> inside <a>, then both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl + `?count=${count}`, { headers });
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Error handling here
  }
}

// On load
getPhotos();
import config from './config.js';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// API documentation for HTTP Authorization header method (see "headers," below):
// https://unsplash.com/documentation#authorization

const count = 30;
const apiUrl = 'https://api.unsplash.com/photos/random/';
const headers = {
  Authorization: `Client-ID ${config.apiKey}`,
};

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    console.log('ready = ', ready);
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images = ', totalImages);

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html, // links to image preview on Unsplash
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular, // source for displaying image
      alt: photo.alt_description, // description provided by API
      title: photo.alt_description,
    });

    // Event listener: check when each is finished loading
    img.addEventListener('load', imageLoaded);

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

// Check to see if scrolling near bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
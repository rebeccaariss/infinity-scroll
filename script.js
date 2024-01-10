import config from './config';

// Unsplash API
const count = 10;
const apiKey = config.apiKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
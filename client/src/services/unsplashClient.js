import axios from 'axios';

const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${apiKey}`,
  },
});

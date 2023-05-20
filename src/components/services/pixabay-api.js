import axios from 'axios';

const API_KEY = '34900910-a3a7207292faa050babd964c9';
const BASE_URL = 'https://pixabay.com/api/?';

export async function fetchImages(query, page) {
  try {
    return await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        page: page,
        per_page: 12,
      },
    });
  } catch (error) {
    return error;
  }
}

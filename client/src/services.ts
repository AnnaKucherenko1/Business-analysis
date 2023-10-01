import axios from 'axios';

const BASE_URL = 'https://priklad.docflow.ai/';

export const getData = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
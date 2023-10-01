import axios from 'axios';

export const getData = async () => {
  try {
    return await axios.get('https://priklad.docflow.ai/');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
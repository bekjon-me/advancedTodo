import axios from 'axios';

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem('tokens'));
  config.headers.common['Authorization'] = `bearer ${tokensData.access_token}`;
  return config;
});
export default jwtInterceoptor;

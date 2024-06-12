import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANTS: 'https://restaurant-api.dicoding.dev/list',
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;

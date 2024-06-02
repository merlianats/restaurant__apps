import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANT: `${CONFIG.BASE_URL}/list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SMALL_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/small/${pictureId}`,
  MEDIUM_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}`,
  LARGE_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/large/${pictureId}`,
};

export default API_ENDPOINT;

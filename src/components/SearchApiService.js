import axios from 'axios';

export default class SearchAPIService {
  //   constructor() {
  //     this.searchQuery = '';
  //   }

  fetchPictures(pageNum, searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';

    const options = {
      params: {
        key: '27689909-7d1690a50f11c45e1b62c3fca',
        q: `${searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNum,
        per_page: 12,
      },
    };

    return axios.get(BASE_URL, options);
  }

  //   get query() {
  //     return this.searchQuery;
  //   }
  //   set query(newQuery) {
  //     this.searchQuery = newQuery;
  //   }
}

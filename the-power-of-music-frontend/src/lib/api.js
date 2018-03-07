import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, tags}) => axios.post('/api/post', {title, body, tags});
export const getPost = (id) => axios.get(`/api/post/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/post/?${queryString.stringify({tag, page})}`);
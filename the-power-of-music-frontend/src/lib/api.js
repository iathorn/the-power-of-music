import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, tags, trackName, uploadedTrackList, uploadedCover, artist}) => axios.post('/api/post', {title, body, tags, trackName, uploadedTrackList, uploadedCover, artist});
export const ajaxUpload = (formData, config) => axios.post('/api/post/ajax', formData, config);
export const ajaxCoverUpload = (formData, config) => axios.post('/api/post/ajaxCover', formData, config);
export const getPost = (id) => axios.get(`/api/post/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/post/?${queryString.stringify({tag, page})}`);
export const removePost = (id) => axios.delete(`/api/post/${id}`);
export const adminLogin = (password) => axios.post('/api/auth/login/admin', {password});
export const adminLoginCheck = () => axios.get('/api/auth/check/admin');
export const adminLogout = () => axios.post('/api/auth/logout/admin');
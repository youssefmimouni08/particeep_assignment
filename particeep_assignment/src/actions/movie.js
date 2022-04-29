import {
  GET_MOVIES,
  MOVIES_ERROR,
  SET_CATEGORY,
  HANDLE_CHECK,
  UPDATE_DISLIKES,
  UPDATE_LIKES,
  DELETE_MOVIE,
  SET_PAGE_NUMBER,
  SET_MOVIES_PER_PAGE,
} from './types';
import { movies$ } from '../movies';

import store from '../store';
// GET MOVIES
export const getMovies = () => async (dispatch) => {
  try {
    const data = await movies$;
    dispatch({
      type: GET_MOVIES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MOVIES_ERROR,
      payload: { msg: 'error retrieving the movies data ', status: '404' },
    });
  }
};
export const onCategoryChange = (category) => async (dispatch) => {
  const data = await movies$;
  const filtered = data.filter((movie) => {
    return category === 'all' || category === movie.category;
  });

  dispatch({
    type: SET_CATEGORY,
    payload: { category, filtered },
  });
};
export const handleCheck = (i, options) => async (dispatch) => {
  options[i].checked = !options[i].checked;

  const checkedCategories = options.filter((c) => c.checked);

  const selected =
    checkedCategories.length === 0
      ? 'all'
      : checkedCategories.map((c) => c.value);

  dispatch({
    type: HANDLE_CHECK,
    payload: { options, selected },
  });
};
export const addLike = (id) => async (dispatch) => {
  const { movies } = store.getState().movie;
  console.log(movies);

  const data = movies;
  data.map((movie) => {
    if (movie.id === id) {
      movie.likes++;
    }
  });
  dispatch({
    type: UPDATE_LIKES,
    payload: { id, data },
  });
};
export const disLike = (id) => async (dispatch) => {
  const { movies } = store.getState().movie;

  const data = movies;
  data.map((movie) => {
    if (movie.id === id) {
      movie.dislikes++;
    }
  });

  dispatch({
    type: UPDATE_DISLIKES,
    payload: { id, data },
  });
};
export const deleteMovie = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MOVIE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: MOVIES_ERROR,
      payload: { msg: err.response, status: '404' },
    });
  }
};

export const paginate = (number) => async (dispatch) => {
  dispatch({
    type: SET_PAGE_NUMBER,
    payload: number,
  });
};
export const setMoviesPerPage = (number) => async (dispatch) => {
  dispatch({
    type: SET_MOVIES_PER_PAGE,
    payload: number,
  });
};

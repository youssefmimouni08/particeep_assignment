import {
  GET_MOVIES,
  MOVIES_ERROR,
  DELETE_MOVIE,
  SET_CATEGORY,
  HANDLE_CHECK,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  SET_PAGE_NUMBER,
  SET_MOVIES_PER_PAGE,
} from '../actions/types';

const initialState = {
  movies: [],
  visibleMovies: [],
  categories: [],
  options: [],
  selected_category: 'all',
  loading: true,
  currentPage: 1,
  moviesPerPage: 2,
  currentMovies: [],
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  let indexOfLastMovie = state.currentPage * state.moviesPerPage;
  let indexOfFirstMovie = indexOfLastMovie - state.moviesPerPage;
  // const currentMovies =
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
        categories: [...new Set(payload.map((movie) => movie.category))],
        options: [
          ...[...new Set(payload.map((movie) => movie.category))].map((c) => ({
            value: c,
            label: c,
            checked: false,
          })),
        ],
        currentMovies: state.movies.slice(indexOfFirstMovie, indexOfLastMovie),
        loading: false,
      };
    case MOVIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_CATEGORY:
      return {
        ...state,
        visibleMovies: payload.filtered,
        selected_category: payload.category,
      };
    case HANDLE_CHECK:
      let curr = [];

      let filtered = state.movies.filter((movie) => {
        return payload.selected.includes(movie.category);
      });

      if (curr.length <= 2 && filtered.length) {
        filtered.forEach((movie, i) => {
          if (!curr.includes(movie) && movie) curr.push(movie);
        });
      }

      return {
        ...state,
        options: payload.options,
        visibleMovies: state.movies.filter((movie) => {
          return payload.selected.includes(movie.category);
        }),
        selected_category: payload.selected,
        currentMovies:
          payload.selected === 'all'
            ? state.movies.slice(indexOfFirstMovie, indexOfLastMovie)
            : curr.length > 2
            ? curr.slice(indexOfFirstMovie, indexOfLastMovie)
            : curr,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        visibleMovies: payload.data.filter((movie) => {
          return state.selected_category.includes(movie.category);
        }),

        movies: payload.data,
        loading: false,
      };

    case UPDATE_DISLIKES:
      return {
        ...state,
        visibleMovies: payload.data.filter((movie) => {
          return state.selected_category.includes(movie.category);
        }),
        movies: payload.data,
        loading: false,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        visibleMovies: state.visibleMovies.filter(
          (movie) => movie.id !== payload
        ),
        movies: state.movies.filter((movie) => movie.id !== payload),
        currentMovies: state.currentMovies.filter(
          (movie) => movie.id !== payload
        ),
        loading: false,
      };
    case SET_PAGE_NUMBER:
      indexOfLastMovie = state.currentPage * state.moviesPerPage;
      indexOfFirstMovie = indexOfLastMovie - state.moviesPerPage;
      return {
        ...state,
        currentPage: payload,
        currentMovies:
          state.selected_category === 'all'
            ? state.movies.slice(indexOfFirstMovie, indexOfLastMovie)
            : state.visibleMovies.slice(indexOfFirstMovie, indexOfLastMovie),
      };
    case SET_MOVIES_PER_PAGE:
      indexOfLastMovie = state.currentPage * payload;
      indexOfFirstMovie = indexOfLastMovie - payload;
      return {
        ...state,
        moviesPerPage: payload,
        currentMovies:
          state.selected_category === 'all'
            ? state.movies.slice(indexOfFirstMovie, indexOfLastMovie)
            : state.visibleMovies.slice(indexOfFirstMovie, indexOfLastMovie),
      };

    default:
      return state;
  }
}

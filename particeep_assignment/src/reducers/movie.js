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
      indexOfLastMovie = 1 * state.moviesPerPage;
      indexOfFirstMovie = indexOfLastMovie - state.moviesPerPage;
      return {
        ...state,
        options: payload.options,
        visibleMovies: state.movies.filter((movie) => {
          return payload.selected.includes(movie.category);
        }),
        selected_category: payload.selected,
        currentPage: 1,
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
      const remainedCategories = [
        ...new Set(
          state.movies
            .filter((movie) => movie.id !== payload)
            .map((movie) => movie.category)
        ),
      ];
      indexOfLastMovie = state.currentPage * state.moviesPerPage;
      indexOfFirstMovie = indexOfLastMovie - state.moviesPerPage;
      let selected = [];
      if (
        state.selected_category.length <= 1 ||
        state.selected_category === 'all'
      ) {
        selected = remainedCategories.includes(state.selected_category[1])
          ? state.selected_category
          : 'all';
      } else if (state.selected_category.length > 1) {
        state.selected_category.forEach((c) => {
          if (!remainedCategories.includes(c)) {
            selected = state.selected_category.filter((s) => s !== c);
          } else selected = state.selected_category;
        });
      }
      let remainedOptions = [];

      remainedCategories.forEach((c) => {
        remainedOptions.push(
          ...state.options.filter((option) => option.value === c)
        );
      });
      console.log(remainedOptions);

      return {
        ...state,
        visibleMovies: state.visibleMovies.filter(
          (movie) => movie.id !== payload
        ),

        movies: state.movies.filter((movie) => movie.id !== payload),
        currentMovies:
          state.selected_category === 'all'
            ? state.movies
                .filter((movie) => movie.id !== payload)
                .slice(indexOfFirstMovie, indexOfLastMovie)
            : state.visibleMovies
                .filter((movie) => movie.id !== payload)
                .slice(indexOfFirstMovie, indexOfLastMovie),

        categories: [
          ...new Set(
            state.movies
              .filter((movie) => movie.id !== payload)
              .map((movie) => movie.category)
          ),
        ],
        options: remainedOptions,
        selected_category: selected,

        loading: false,
      };
    case SET_PAGE_NUMBER:
      indexOfLastMovie = payload * state.moviesPerPage;
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
      indexOfLastMovie = 1 * payload;
      indexOfFirstMovie = indexOfLastMovie - payload;
      return {
        ...state,
        moviesPerPage: payload,
        currentPage: 1,
        currentMovies:
          state.selected_category === 'all'
            ? state.movies.slice(indexOfFirstMovie, indexOfLastMovie)
            : state.visibleMovies.slice(indexOfFirstMovie, indexOfLastMovie),
      };

    default:
      return state;
  }
}

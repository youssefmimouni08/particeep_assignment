import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovies } from './actions/movie';
import './App.css';
import Header from './components/Header';
import FilterPane from './components/FilterPane';
//Redux

import Results from './components/Results';
function App({
  getMovies,
  movie: {
    movies,
    visibleMovies,
    loading,
    categories,
    selected_category,
    currentPage,
    moviesPerPage,
  },
}) {
  useEffect(() => {
    getMovies();
  }, [getMovies]);
  return (
    <div>
      <Header />
      <FilterPane />

      <Results />
    </div>
  );
}
App.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  movie: state.movie,
});
export default connect(mapStateToProps, { getMovies })(App);

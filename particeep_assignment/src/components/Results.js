import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import Thumbnail from './Thumbnail';

const Results = () => {
  const {
    visibleMovies,
    selected_category,
    currentMovies,
    currentPage,
    moviesPerPage,
    movies,
  } = useSelector((state) => state.movie);
  let totalMovies = selected_category === 'all' ? movies : visibleMovies;
  let moviesList = selected_category === 'all' ? currentMovies : currentMovies;
  return (
    <div className='flex flex-col justify-center'>
      <div className=' px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center  '>
        {moviesList.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        Totalmovies={totalMovies.length}
        moviesPerPage={moviesPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Results;

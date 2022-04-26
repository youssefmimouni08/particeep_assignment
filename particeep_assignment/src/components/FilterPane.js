import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  onCategoryChange,
  handleCheck,
  setMoviesPerPage,
} from '../actions/movie';

const FilterPane = ({ selectedCategory, onCategoryChange, handleCheck }) => {
  const dispatch = useDispatch();
  const { categories, options } = useSelector((state) => state.movie);
  const [moviesNumber, setMoviesNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setMoviesPerPage(moviesNumber));
  };
  return (
    <div className='px-10'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center   space-x-4 justify-center mb-5 '
      >
        <div className='flex  whitespace-nowrap space-x-2'>
          <input
            type='text'
            placeholder='How much Movies to render'
            value={moviesNumber}
            id='moviesPerPage'
            className='   h-10 w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required=''
            onChange={(e) => setMoviesNumber(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='h-10 w-fit  bg-gray-300 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-gray-800 text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
      <div className=' flex px-5 sm:px-20 text-md sm:text-xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide sm:justify-center'>
        {options.map((g, i) => (
          <div
            key={i}
            className=' last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white space-x-2 '
          >
            <input
              type='checkbox'
              name={g.value}
              id={i}
              checked={g.checked}
              onChange={(event) => handleCheck(i, options)}
            />
            <label htmlFor={g.value}>{g.value} </label>
          </div>
        ))}
      </div>
    </div>
  );
};
FilterPane.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  movie: state.movie,
});
export default connect(mapStateToProps, { onCategoryChange, handleCheck })(
  FilterPane
);

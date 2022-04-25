import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { TrashIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { addLike, disLike, deleteMovie } from '../actions/movie';

const Thumbnail = ({
  movie: { category, title, likes, dislikes, id },
  addLike,
  disLike,
  deleteMovie,
}) => {
  const movie = useSelector((state) => state.movie);

  return (
    <div className=' flex-shrink-0 m-5 rounded overflow-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 '>
      <div className='flex px-6 py-4 justify-between'>
        <div className='font-bold text-xl mb-2 text-center'>{title}</div>
        <TrashIcon
          onClick={(e) => deleteMovie(id)}
          className='h-6 hover:text-red-500'
        />
      </div>
      <div className='flex px-6 pt-4 pb-2 justify-center'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {`#${category}`}
        </span>
      </div>
      <div className='flex px-6 pt-4 pb-2 justify-center space-x-5'>
        <div className='cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-400'>
          <FontAwesomeIcon onClick={(e) => addLike(id)} icon={faThumbsUp} />
          <span>{likes > 0 && <span>{likes}</span>}</span>
        </div>
        <div className='cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-400'>
          <FontAwesomeIcon onClick={(e) => disLike(id)} icon={faThumbsDown} />
          <span>{dislikes > 0 && <span>{dislikes}</span>}</span>
        </div>
      </div>
    </div>
  );
};
Thumbnail.propTypes = {
  disLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { disLike, addLike, deleteMovie })(
  Thumbnail
);

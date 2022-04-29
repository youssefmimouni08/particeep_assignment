import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { TrashIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { addLike, disLike, deleteMovie } from '../actions/movie';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Thumbnail = ({
  movie: { category, title, img_url, likes, dislikes, id },
  addLike,
  disLike,
  deleteMovie,
}) => {
  const movie = useSelector((state) => state.movie);
  let ratio = parseInt(
    ((parseFloat(likes) - parseFloat(dislikes)) /
      (parseFloat(likes) + parseFloat(dislikes))) *
      100
  );
  if (isNaN(ratio)) {
    ratio = 0;
  }
  return (
    <div className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
      <div style={{ height: '27rem' }}>
        <LazyLoadImage
          src={img_url}
          style={{ height: '-webkit-fill-available', width: '100%' }}
          //  effect='blur'
          alt={title}
        />
      </div>
      <div className='p-2'>
        <p className='truncate max-w-md'>{category}</p>
        <div className='flex justify-between'>
          <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold'>
            {title}
          </h2>
          {ratio >= 0 ? (
            <p style={{ color: '#128c02' }}>{ratio}%</p>
          ) : (
            <p style={{ color: '#d30404' }}>{Math.abs(ratio)}%</p>
          )}
        </div>
        <div className='flex items-center opacity-0 group-hover:opacity-100 justify-between '>
          <div className='flex '>
            <div className=''>
              <FontAwesomeIcon
                className='mr-2'
                onClick={(e) => addLike(id)}
                icon={faThumbsUp}
              />
              <span>{likes > 0 && <span>{likes}</span>}</span>
            </div>
            <div className=''>
              <FontAwesomeIcon
                className='ml-2'
                onClick={(e) => disLike(id)}
                icon={faThumbsDown}
              />
              <span>{dislikes > 0 && <span>{dislikes}</span>}</span>
            </div>
          </div>
          <TrashIcon
            onClick={(e) => deleteMovie(id)}
            className='h-6 hover:text-red-500'
          />
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

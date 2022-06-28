import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onClick(image.largeImageURL, image.tags)}
    >
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

import React from 'react';
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

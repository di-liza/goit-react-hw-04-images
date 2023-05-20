import React, { forwardRef } from 'react';
import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

import PropTypes from 'prop-types';

const ImageGallery = forwardRef(({ images, setActiveIndex }, ref) => {
  return (
    <GalleryList ref={ref}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onCardClick={setActiveIndex}
        />
      ))}
    </GalleryList>
  );
});

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.node.isRequired,
    })
  ).isRequired,
  setActiveIndex: PropTypes.func.isRequired,
};

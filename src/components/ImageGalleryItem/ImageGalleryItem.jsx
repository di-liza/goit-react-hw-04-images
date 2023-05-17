import React from 'react';
import { Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  image: { webformatURL, tags, id },
  onCardClick,
}) {
  return (
    <>
      <Item>
        <img
          src={webformatURL}
          alt={tags}
          className="itemImg"
          loading="lazy"
          onClick={() => {
            onCardClick(id);
          }}
        />
      </Item>
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.node.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

import React, { useState, useEffect } from 'react';
import PixabayApi from '../services/pixabay-api';
import Button from 'components/Button/Button';

import PropTypes from 'prop-types';

import Loader from '../Loader';

import { GalleryList, ErrorMessage } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal';

import { toast } from 'react-toastify';

export default function ImageGallery(props) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeCardId, setActiveCardId] = useState(0);

  useEffect(() => {
    setStatus('pending');

    if (query) {
      PixabayApi.fetchPixabay(query, page)
        .then(({ totalHits, total, hits }) => {
          if (!total || !totalHits) {
            setStatus('idle');
            return toast.warning('Not found images for this query. Try again.');
          }
          if (totalHits / 12 <= page) {
            toast.info(
              `We're sorry, but you've reached the end of search results.`
            );
          }
          setImages(prev => [...prev, ...hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [query, page]);

  useEffect(() => {
    setQuery(props.searchQuery);
    setImages([]);
    setError(false);
    setPage(1);
  }, [props]);

  const handleLoadMoreBTN = () => {
    setPage(prev => prev + 1);
  };

  const setActiveIndex = id => {
    setActiveCardId(id);
    toggleModal();
  };
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const isEndOfListReached = images.length / 12 < page;
  const activeCard = images.find(({ id }) => id === activeCardId);

  if (status === 'rejected') {
    return (
      <ErrorMessage>
        Something went wrong, try again. <p>{error}</p>
      </ErrorMessage>
    );
  }
  if (status === 'resolved' || status === 'pending') {
    return (
      <>
        <GalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onCardClick={setActiveIndex}
            />
          ))}
        </GalleryList>
        {status === 'pending' && query && <Loader />}
        {showModal && (
          <Modal
            activeCard={activeCard}
            closeModal={toggleModal}
            showModal={showModal}
          />
        )}

        {!isEndOfListReached && status === 'resolved' && (
          <Button handleLoadMoreBTN={handleLoadMoreBTN} />
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchImages } from '../services/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal';
import Button from 'components/Button/Button';
import Loader from '../Loader';

import { GalleryList, ErrorMessage } from './ImageGallery.styled';

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeCardId, setActiveCardId] = useState(0);
  const galleryListRef = useRef();
  useEffect(() => {
    setStatus('pending');

    if (query) {
      const getCollction = async () => {
        setStatus('pending');
        try {
          const {
            data: { hits, total, totalHits },
          } = await fetchImages(query, page);

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
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
      };
      getCollction();
    }
  }, [query, page]);

  useEffect(() => {
    setQuery(searchQuery);
    setImages([]);
    setError(false);
    setPage(1);
  }, [searchQuery]);

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

  useEffect(() => {
    if (galleryListRef.current && page > 1) {
      if (galleryListRef.current.firstElementChild) {
        const { height } =
          galleryListRef.current.firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: height * 2,
          behavior: 'smooth',
          scroll: function () {},
        });
      }
    }
  }, [images, page]);

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
        <GalleryList ref={galleryListRef}>
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
          <Modal activeCard={activeCard} closeModal={toggleModal} />
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

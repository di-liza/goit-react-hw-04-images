import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../ImageGallery/ImageGallery.styled';

import { fetchImages } from '../services/pixabay-api';
// import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from 'components/Button/Button';
import Loader from '../Loader';

import ImageGallery from '../ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';

const ForwardedGallery = forwardRef((props, ref) => (
  <ImageGallery ref={ref} {...props} />
));

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeCardId, setActiveCardId] = useState(0);

  const galleryListRef = useRef();

  const getSearchbarValue = query => {
    setQuery(query);

    setImages([]);
    setError(false);
    setPage(1);
  };

  useEffect(() => {
    setStatus('pending');

    if (query || page > 1) {
      const getCollction = async () => {
        try {
          const {
            data: { hits, total, totalHits },
          } = await fetchImages(query, page);
          if (!total || !totalHits) {
            setStatus('idle');
            toast.info(`Not found images for "${query}". Try again.`);
          }
          if (totalHits && totalHits / 12 <= page) {
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
  }, [page, query]);

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

  return (
    <>
      <Searchbar onFormSubmit={getSearchbarValue} />
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />

      {status === 'rejected' && (
        <ErrorMessage>
          Something went wrong, try again. <p>{error}</p>
        </ErrorMessage>
      )}

      {(status === 'resolved' || status === 'pending') && (
        <>
          <ForwardedGallery
            ref={galleryListRef}
            images={images}
            setActiveIndex={setActiveIndex}
          />

          {status === 'pending' && query && <Loader />}
          {showModal && (
            <Modal activeCard={activeCard} closeModal={toggleModal} />
          )}
          {!isEndOfListReached && status === 'resolved' && (
            <Button handleLoadMoreBTN={handleLoadMoreBTN} />
          )}
        </>
      )}
    </>
  );
}

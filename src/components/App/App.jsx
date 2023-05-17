import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from '../ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';

export default function App() {
  const [query, setQuery] = useState('');

  const getSearchbarValue = query => {
    setQuery(query);
  };

  return (
    <>
      <Searchbar onFormSubmit={getSearchbarValue} />
      <ImageGallery searchQuery={query} />
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </>
  );
}

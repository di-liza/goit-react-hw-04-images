import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import { Header } from './Searchbar.styled';

export default function Searchbar({ onFormSubmit }) {
  const [query, setQuery] = useState('');

  const onInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const resetForm = () => {
    setQuery('');
  };

  const hanldeFormSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please enter a name of collection.');
    }
    onFormSubmit(query);
    resetForm();
  };

  return (
    <Header className="searchbar">
      <form className="form" onSubmit={hanldeFormSubmit}>
        <button type="submit" className="buttonSearch">
          <ImSearch color="grey" />
        </button>

        <input
          onChange={onInputChange}
          className="searchForm-input"
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </Header>
  );
}
Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

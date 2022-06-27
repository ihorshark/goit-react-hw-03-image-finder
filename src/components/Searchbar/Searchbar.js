import React, { Component } from 'react';
import { Notify } from 'notiflix';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onInputChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  onFormSubmit = evt => {
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (searchQuery.trim() === '') {
      Notify.info('Please enter something');
      return;
    }
    evt.preventDefault();
    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={searchQuery}
            onChange={this.onInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

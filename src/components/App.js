import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  onFormSubmit = search => {
    this.setState({ searchQuery: search });
  };

  render() {
    return (
      <section>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </section>
    );
  }
}

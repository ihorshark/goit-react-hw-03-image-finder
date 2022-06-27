import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    imageInfo: {
      url: '',
      alt: '',
    },
  };

  onFormSubmit = search => {
    this.setState({ searchQuery: search });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  onImageClick = (largeImageURL, alt) => {
    this.setState({
      imageInfo: {
        url: largeImageURL,
        alt: alt,
      },
    });
    this.toggleModal();
  };

  render() {
    return (
      <section>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          onClick={this.onImageClick}
        />
        {this.state.showModal && (
          <Modal info={this.state.imageInfo} onClose={this.toggleModal} />
        )}
      </section>
    );
  }
}

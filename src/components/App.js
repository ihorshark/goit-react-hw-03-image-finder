import React, { Component } from 'react';
import { Notify } from 'notiflix';
import SearchAPIService from 'components/SearchApiService';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
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
    page: 1,
    images: [],
    status: 'idle',
    error: null,
  };

  searchApi = new SearchAPIService();

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({
        status: 'pending',
        page: 1,
      });

      this.searchApi
        .fetchPictures(1, searchQuery)
        .then(res => {
          if (res.data.total === 0) {
            this.setState({ status: 'idle' });
            Notify.failure(`There are no images with name ${searchQuery}`);
            return;
          }
          this.setState({
            images: [...res.data.hits],
          });
          this.setState({ status: 'resolved' });
        })
        .catch(error => {
          this.setState({
            error: error.message,
            status: 'rejected',
          });
        });
    }
  }

  buttonClickHandler = () => {
    const { searchQuery, page } = this.state;

    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

    this.searchApi
      .fetchPictures(page + 1, searchQuery)
      .then(res => {
        this.setState(prevState => {
          return { images: [...prevState.images, ...res.data.hits] };
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          status: 'rejected',
        });
      })
      .finally(() => {
        this.setState({ status: 'resolved' });
      });
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
    const { status, searchQuery, error, showModal, imageInfo } = this.state;
    return (
      <section>
        <Searchbar onSubmit={this.onFormSubmit} />
        {status === 'idle' && (
          <h1 className="Welcome">Welcome to Image Gallery!</h1>
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery
            state={this.state}
            searchQuery={searchQuery}
            onClick={this.onImageClick}
          />
        )}
        {status === 'resolved' && <Button onClick={this.buttonClickHandler} />}
        {status === 'rejected' && <h1>{error}</h1>}

        {showModal && <Modal info={imageInfo} onClose={this.toggleModal} />}
      </section>
    );
  }
}

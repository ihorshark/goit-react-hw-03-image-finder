import { Notify } from 'notiflix';
import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './ImageGallery.css';
import SearchAPIService from 'components/SearchApiService';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    status: 'idle',
    error: null,
  };

  searchApi = new SearchAPIService();

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({
        search: searchQuery,
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
    const { searchQuery } = this.props;
    const { page } = this.state;

    this.setState(prevProps => {
      return { page: prevProps.page + 1 };
    });

    this.searchApi
      .fetchPictures(page + 1, searchQuery)
      .then(res => {
        this.setState(prevProps => {
          return { images: [...prevProps.images, ...res.data.hits] };
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

  render() {
    const { status, images, error } = this.state;
    const { onClick } = this.props;

    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {images.map(image => {
              return (
                <ImageGalleryItem
                  image={image}
                  key={image.id}
                  onClick={onClick}
                />
              );
            })}
          </ul>
          <Button onClick={this.buttonClickHandler} />
        </div>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }
    if (status === 'idle') {
      return <h1 className="Welcome">Welcome to Image Gallery!</h1>;
    }
  }
}

import React, { Component } from 'react';
import SearchAPIService from 'components/SearchApiService';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    // search: '',
    page: 1,
    images: [],
    status: '',
  };

  searchApi = new SearchAPIService();

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ search: searchQuery });
      this.setState({ status: 'fetched' });

      this.searchApi.fetchPictures(page, searchQuery).then(res => {
        this.setState(prevProps => {
          return {
            images: [...prevProps.images, ...res.data.hits],
            page: prevProps.page + 1,
          };
        });
      });
    }
  }

  buttonClickHandler = () => {
    this.setState(prevProps => {
      return { page: prevProps.page + 1 };
    });

    const { searchQuery } = this.props;
    const { page } = this.state;

    this.searchApi.fetchPictures(page, searchQuery).then(res => {
      this.setState(prevProps => {
        return { images: [...prevProps.images, ...res.data.hits] };
      });
    });
  };

  render() {
    if (this.state.status === 'fetched') {
      return (
        <div>
          <ul className="ImageGallery">
            {this.state.images.map(image => {
              return <ImageGalleryItem image={image} key={image.id} />;
            })}
          </ul>
          <Button onClick={this.buttonClickHandler} />
        </div>
      );
    }
  }
}

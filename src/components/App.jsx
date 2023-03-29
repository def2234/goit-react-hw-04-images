import { Section } from './Section-styled';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { GetImage } from '../GetImage/GetImage';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [serchValue, setSerchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idl');
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (serchValue === '') {
      return;
    }

    setStatus('pending');

    GetImage(serchValue, page)
      .then(item => {
        if (item.hits.length === 0) {
          return Promise.reject(
            new Error(
              `Image with name:${serchValue} not found, please try again or check input`
            )
          );
        } else {
          const image = item.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          return image;
        }
      })
      .then(image => {
        setImage(prevImage => {
          return page === 1 ? [...image] : [...prevImage, ...image];
        });
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, serchValue]);

  const handleClickButton = e => {
    setPage(prevPage => prevPage + 1);
  };

  // const toggleModal = () => {
  //   setShowModal(prevShowModal => !prevShowModal);
  // };

  const formOnsubmitHandler = value => {
    setSerchValue(value);
  };

  const handleOnPictureClick = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);

    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');

    document.body.style.position = '';
    document.body.style.top = '';
  };

  return (
    <Section>
      {showModal && <Modal image={largeImageURL} closeModal={closeModal} />}

      <Searchbar onSubmit={formOnsubmitHandler} />
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery
          serchValue={serchValue}
          image={image}
          onPictureClick={handleOnPictureClick}
        ></ImageGallery>
      )}

      {status === 'resolved' && <Button onClick={handleClickButton} />}
    </Section>
  );
}

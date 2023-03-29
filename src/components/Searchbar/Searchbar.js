import PropTypes from 'prop-types';

import { useState } from 'react';
import {
  Header,
  Form,
  Input,
  Button,
  Div,
  Svg,
} from '../Searchbar/Serchbar.styled';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInputChange = ({ target }) => {
    if (target.name === 'value') {
      setValue(target.value.toLowerCase());
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return;
    }

    onSubmit(value);
    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Button type="submit">
            <Svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
            </Svg>
          </Button>

          <Input
            type="text"
            name="value"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={value}
          />
        </Div>
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

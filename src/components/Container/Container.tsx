import React from 'react';
import { IDataItem } from '../../interfaces';

interface IProps {
  data: IDataItem[];
}

const Container = ({ data }: IProps): JSX.Element => {
  return (
    <div data-testid="container">
      {data.map(({ id, name, description, flickr_images }: IDataItem) => (
        <div key={id}>
          <h2>{name}</h2>
          <img src={flickr_images[0]} width="400px" alt={name} />
          <p>{description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Container;

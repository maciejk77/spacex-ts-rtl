import React from 'react';

interface IProps {
  data: any; // TODO any
}

// TODO any below
const Container = ({ data }: IProps) => {
  return (
    <div data-testid="container">
      {data.map((d: any) => (
        <div key={d.id}>
          <h2>{d.name}</h2>
          <img src={d.flickr_images[0]} width="400" alt={d.name} />
          <p>{d.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Container;

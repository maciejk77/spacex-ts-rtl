import React from 'react';

interface IProps {
  data: any; // TODO any
}

// TODO any below
const Container = ({ data }: IProps) =>
  data.map((d: any) => (
    <div key={d.id}>
      <h2>{d.name}</h2>
      <p>{d.description}</p>
      <hr />
    </div>
  ));

export default Container;

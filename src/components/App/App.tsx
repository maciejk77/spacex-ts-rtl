import React, { useState } from 'react';
import Tab from '../Tab/Tab';
import { BASE_URL, ROCKETS, DRAGONS } from '../../constants';
import Container from '../Container/Container';

const App = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(null);
  const [data, setData] = useState<any[]>([]); // TODO any

  const handleClick = async (e: any) => {
    // TODO any
    const { name } = e.target;
    const response = await fetch(`${BASE_URL}/${name}`);
    const json = await response.json();
    setData(json);
    setActiveTab(name);
  };

  const noDataYet = (
    <div style={{ marginTop: 10 }}>No data yet, click on tabs above</div>
  );

  return (
    <>
      <h1>SpaceX</h1>
      <>
        <Tab
          name={ROCKETS.toLowerCase()}
          onClick={handleClick}
          label={ROCKETS}
          activeTab={activeTab}
        />
        <Tab
          name={DRAGONS.toLowerCase()}
          onClick={handleClick}
          label={DRAGONS}
          activeTab={activeTab}
        />
      </>
      {data.length ? <Container data={data} /> : noDataYet}
    </>
  );
};

export default App;

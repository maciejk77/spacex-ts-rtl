import React, { useState } from 'react';
import Tab from '../Tab/Tab';
import { ROCKETS, DRAGONS } from '../../constants';
import Container from '../Container/Container';
import { fetchData } from '../../utils/fetchData';
import { IDataItem } from '../../interfaces/index';

type TActiveTab = string | null;

const App = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TActiveTab>(null);
  const [data, setData] = useState<IDataItem[]>([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const { name } = e.target as HTMLButtonElement;
    const data = await fetchData(name);
    setData(data);
    setActiveTab(name);
  };

  const noDataYet: JSX.Element = (
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

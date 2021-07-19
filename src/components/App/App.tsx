import React, { useState, useEffect } from 'react';
import Tab from '../Tab/Tab';
import { ROCKETS, DRAGONS } from '../../constants';
import Container from '../Container/Container';
import { useLazyQuery } from '@apollo/client';
import { GET_DATA } from '../../graphql/Queries';

type TActiveTab = string | null;

const App = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TActiveTab>('');
  const [allRockets, { loading, error, data }] = useLazyQuery(GET_DATA, {
    variables: { rocketType: activeTab },
  });

  useEffect(() => {
    allRockets();
  }, [data, allRockets]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const { name } = e.target as HTMLButtonElement;
    setActiveTab(name);
  };

  const noDataYet: JSX.Element = (
    <div style={{ marginTop: 10 }}>No data yet, click on tabs above</div>
  );

  const Loader = () => (
    <div style={{ marginTop: 10 }}>
      {activeTab && loading ? 'Loading...' : ''}
    </div>
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
      <Loader />
      {error && !loading && noDataYet}
      {data && <Container data={data} />}
    </>
  );
};

export default App;

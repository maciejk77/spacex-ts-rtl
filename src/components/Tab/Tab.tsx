import React from 'react';

interface IProps {
  label: string;
  name: string;
  onClick: any; // TODO any
  activeTab: string | null;
}

const Tab = ({ label, onClick, name, activeTab }: IProps): JSX.Element => {
  const isActive = activeTab === name;
  const getColor = (bool: boolean) => (bool ? 'black' : 'white');

  return (
    <button
      style={{
        backgroundColor: getColor(isActive),
        color: getColor(!isActive),
        padding: 10,
        border: '1px solid black',
        fontSize: 15,
        marginRight: 2,
      }}
      name={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;

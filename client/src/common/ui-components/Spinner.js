import React from 'react';
import spinner from '../../../img/Blocks-1s-200px.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt='loading...'
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Spinner;

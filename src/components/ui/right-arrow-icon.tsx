import React from 'react';

const RightArrowIcon=({className}: {className?: string}) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        className={className}
      >
        <path
          d="M16.25 7.72607L1.25 7.72607"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.1992 1.70149L16.2492 7.72549L10.1992 13.7505"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
};

export default RightArrowIcon
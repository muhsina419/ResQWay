// src/pages/Demo.tsx
import React from 'react';
import AmbulanceMap from '../components/LiveAmbulanceMap.js';
import { mockDispatch } from '../data/mockDispatch.js';

const Demo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold p-4">🚨 ResQWay Demo</h2>
      <AmbulanceMap
        incident={mockDispatch.incident}
        hospital={mockDispatch.hospital}
        ambulance={mockDispatch.ambulance}
        routeInfo={mockDispatch.route_info}
        statusSequence={mockDispatch.status_sequence}
      />
    </div>
  );
};

export default Demo;

import React from 'react';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div className="grid-cols-1">
      <h1 className="m-8 text-xl text-red-800">Group Tripper</h1>
      <MapContainer></MapContainer>
    </div>
  );
}

export default App;

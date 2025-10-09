import { useState } from 'react';
import axios from 'axios';
import LiveAmbulanceMap from '../components/LiveAmbulanceMap';

interface Ambulance {
  vehicle_id: string;
}

interface Hospital {
  name: string;
}

interface ResponseData {
  ambulance?: Ambulance;
  hospital?: Hospital;
}

function StatusTracker() {
  const [patientName, setPatientName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [response, setResponse] = useState<ResponseData | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/request-ambulance/', {
        patient_name: patientName,
        location_lat: lat,
        location_lng: lng
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Request Ambulance</h2>
      <input value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Patient Name" />
      <input value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude" />
      <input value={lng} onChange={e => setLng(e.target.value)} placeholder="Longitude" />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h3>Ambulance Assigned:</h3>
          <p>{response.ambulance?.vehicle_id}</p>
          <h3>Hospital Allocated:</h3>
          <p>{response.hospital?.name}</p>
          {response.ambulance?.vehicle_id && (
            <LiveAmbulanceMap vehicleId={response.ambulance.vehicle_id} />
          )}
        </div>
      )}
    </div>
  );
}

export default StatusTracker;
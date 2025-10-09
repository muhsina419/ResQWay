// import { useEffect, useState } from "react";
// import { getIncidents, reportIncident, connectIncidentWebSocket, Incident } from "../api/api";

// export default function Dashboard() {
//   const [incidents, setIncidents] = useState<Incident[]>([]);
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("");
//   const [location, setLocation] = useState<[number, number]>([0, 0]);

//   // Fetch initial incidents
//   useEffect(() => {
//     const fetchIncidents = async () => {
//       try {
//         const data = await getIncidents();
//         setIncidents(data);
//       } catch (err) {
//         console.error("Failed to fetch incidents:", err);
//       }
//     };
//     fetchIncidents();
//   }, []);

//   // Connect WebSocket for real-time updates
//   useEffect(() => {
//     const ws = connectIncidentWebSocket((update) => {
//       setIncidents((prev) => {
//         const index = prev.findIndex((i) => i.id === update.id);
//         if (index !== -1) {
//           // Update existing incident
//           const copy = [...prev];
//           copy[index] = update;
//           return copy;
//         }
//         // Add new incident
//         return [update, ...prev];
//       });
//     });
//     return () => ws.close(); // cleanup
//   }, []);

//   const handleReport = async () => {
//     try {
//       const newIncident = await reportIncident({ description, type, location });
//       setIncidents((prev) => [newIncident, ...prev]);
//       setDescription("");
//       setType("");
//     } catch (err) {
//       console.error("Failed to report incident:", err);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "20px auto" }}>
//       <h2>Dashboard</h2>

//       <div style={{ marginBottom: 20 }}>
//         <h3>Report New Incident</h3>
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />
//         <input
//           type="text"
//           placeholder="Type (Accident, Fire, etc.)"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />
//         <input
//           type="text"
//           placeholder="Location lat,lon (e.g., 12.34,56.78)"
//           value={location.join(",")}
//           onChange={(e) =>
//             setLocation(e.target.value.split(",").map(Number) as [number, number])
//           }
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />
//         <button onClick={handleReport} style={{ padding: 8 }}>
//           Report Incident
//         </button>
//       </div>

//       <div>
//         <h3>All Incidents</h3>
//         <ul>
//           {incidents.map((i) => (
//             <li key={i.id}>
//               <strong>{i.type}</strong> - {i.description} | Status: {i.status || "Pending"} | Location: {i.location.join(",")}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import type { Incident } from "../api/api";
import { getIncidents, connectIncidentWebSocket } from "../api/api";
import IncidentItem from "../components/IncidentItem";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Fetch incidents initially
    getIncidents()
      .then(setIncidents)
      .catch((err) => console.error("Failed to fetch incidents:", err));

    // Connect WebSocket for real-time updates
    const ws = connectIncidentWebSocket((updatedIncident) => {
      setIncidents((prev) => {
        // Update the incident if it exists, otherwise add it
        const exists = prev.some((i) => i.id === updatedIncident.id);
        if (exists) {
          return prev.map((i) =>
            i.id === updatedIncident.id ? updatedIncident : i
          );
        } else {
          return [...prev, updatedIncident];
        }
      });
    });

    // Cleanup WebSocket on unmount
    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {incidents.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} />
          ))}
        </ul>
      )}
    </div>
  );
}

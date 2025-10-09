mport { useEffect, useState } from "react";
import { getIncidents } from "../api";
export default function IncidentList() {
const [incidents, setIncidents] = useState([]);
useEffect(() => {
getIncidents().then(setIncidents);
}, []);
return (
<div>
<h3>Incidents</h3>
<ul>
{incidents.map((i: any) => (
    <li key={i.id}>{i.description} - {i.status}</li>
))}
</ul>
</div>
);
}

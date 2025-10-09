import type { Incident } from "../api/api";

interface Props {
  incident: Incident;
}

export default function IncidentItem({ incident }: Props) {
  return (
    <li
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    >
      <strong>ID:</strong> {incident.id} | <strong>Type:</strong> {incident.type} |{" "}
      <strong>Status:</strong> {incident.status ?? "Pending"} |{" "}
      <strong>Location:</strong> {incident.location.join(", ")} |{" "}
      <strong>Ambulance:</strong> {incident.ambulance ?? "N/A"} |{" "}
      <strong>Hospital:</strong> {incident.hospital ?? "N/A"}
    </li>
  );
}

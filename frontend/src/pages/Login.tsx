import { useState } from "react";
import { login } from "../api";
export default function Login() {
const [username, setU] = useState("");
const [password, setP] = useState("");
const handleLogin = async () => {
await login(username, password);
alert("Login successful");
};
return (
<div>
<input placeholder="Username" onChange={e => setU(e.target.value)} />
<input type="password" placeholder="Password" onChange={e => setP(e.target.value)}
/>
<button onClick={handleLogin}>Login</button>
</div>
);
}

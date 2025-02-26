'use client'
import { useState } from "react";

const Dashboard = () => {
    const [name, setName] = useState("");
    return <>
        <h1>Dashboard Page</h1>
        <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <div>Name :- {name}</div>
    </>
}

export default Dashboard;
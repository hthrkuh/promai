import React, { useState, useEffect } from "react";
import axiosInstance from "../services/httpService";
import "./style/ManageCRM.css"; // Import the CSS file

function ManageCRM() {
    const [crmData, setCrmData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch CRM data from your server
        axiosInstance
            .get("/api/crm//data")
            .then((response) => {
                setCrmData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching CRM data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Manage CRM Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>GIF ID</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {crmData.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.userId}</td>
                            <td>{entry.gifId}</td>
                            <td>{entry.amount}</td>
                            <td>{entry.currency}</td>
                            <td>{entry.paymentStatus}</td>
                            <td>
                                {new Date(entry.paymentDate).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageCRM;

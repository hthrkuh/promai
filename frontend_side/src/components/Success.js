import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
    const location = useLocation();

    // You can use location.state or query parameters to pass additional data if needed
    const sessionId = new URLSearchParams(location.search).get("session_id");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your transaction was successful.</p>
            <p>Your session ID is: {sessionId}</p>
            <p>
                You can now return to the <a href="/">homepage</a>.
            </p>
        </div>
    );
};

export default Success;

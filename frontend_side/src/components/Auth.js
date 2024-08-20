import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../services/httpService";

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const FormContainer = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem;
    margin-top: 1rem;
    width: 100%;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const WelcomeMessage = styled.h2`
    margin-bottom: 1rem;
    color: #333;
`;

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, logout, auth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", {
                username,
                password
            });
            login(response.data.token); // Update auth context with token
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container>
            <FormContainer>
                {auth ? (
                    <div>
                        <WelcomeMessage>Welcome</WelcomeMessage>
                        <Button onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button type="submit">Login</Button>
                        </form>
                    </div>
                )}
            </FormContainer>
        </Container>
    );
}

export default Auth;

import React from "react";
import styled from "styled-components";

const Styles = styled.div`
    padding: 1rem;
    width: 100%;
    text-align: center;
`;

const WelcomeMessage = styled.h2`
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
`;

const TechList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #555;
`;

const TechItem = styled.li`
    margin: 0.5rem 0;
`;

export default function Store() {
    return (
        <main
            style={{
                minHeight: "150vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <article>
                <Styles>
                    <WelcomeMessage>Welcome to the GIF Store!</WelcomeMessage>
                    <p>
                        We are thrilled to offer you a wide selection of GIFs to
                        brighten your day. Explore trending GIFs and find the
                        perfect one to share with friends or use in your
                        projects.
                    </p>
                    <p>
                        Here's a quick overview of the technologies used in this
                        project:
                    </p>
                    <TechList>
                        <TechItem>
                            React.js: For building the user interface
                        </TechItem>
                        <TechItem>Node.js: For server-side operations</TechItem>
                        <TechItem>Express.js: For API routing</TechItem>
                        <TechItem>Giphy API: To fetch GIFs</TechItem>
                        <TechItem>Stripe: For payment processing</TechItem>
                        <TechItem>
                            Styled-components: For styling the application
                        </TechItem>
                        <TechItem>Axios: For making HTTP requests</TechItem>
                    </TechList>
                </Styles>
            </article>
        </main>
    );
}

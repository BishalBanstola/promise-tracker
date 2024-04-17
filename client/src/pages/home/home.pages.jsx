import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Card = styled.div`
  width: 200px;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  cursor: pointer;
`;


export const Home = () => {

  return (
    <Container>
       <Card>
      <Link to="/add">
          <Title>Create New</Title>
        </Link>
      </Card>
      <Card>
        <Link to="/promises">
          <Title>View Promises</Title>
        </Link>
      </Card>
      <Card>
        <Link to="/stats">
          <Title>View Stats</Title>
        </Link>
      </Card>
    </Container>
  );
};

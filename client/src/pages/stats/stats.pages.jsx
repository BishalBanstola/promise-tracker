import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <StatsContainer>
      <h2>Stats</h2>
      <StatsTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Promises</th>
            <th>Fulfilled Promises</th>
            <th>Unfulfilled Promises</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item, index) => (
            <StatsTableRow key={index}>
              <td>{item.name}</td>
              <td>{item.totalPromises}</td>
              <td>{item.fulfilledPromises}</td>
              <td>{item.unfulfilledPromises}</td>
            </StatsTableRow>
          ))}
        </tbody>
      </StatsTable>
    </StatsContainer>
  );
};


const StatsContainer = styled.div`
display: block;
margin:30px auto;
max-width:500px;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StatsTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

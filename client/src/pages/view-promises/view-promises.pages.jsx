import React, { useEffect } from 'react';
import axios from 'axios';
import {useStore} from '../../store/store';
import { PromiseCard } from '../../components/promise-card/promise-card.component';


export const ViewPromises = () => {
  const { promises, setPromises } = useStore();

  useEffect(() => {
    // Fetch promises from the server when the component mounts
    const fetchPromises = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/promises');
        setPromises(response.data);
      } catch (error) {
        console.error('Error fetching promises:', error);
      }
    };

    fetchPromises();

    // Clean up function to clear promises when the component unmounts
    return () => {
      setPromises([]);
    };
  }, [setPromises]);

  return (
    <div>
      <h2>All Promises</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {promises.length>0? promises.map((promise) => (
          <PromiseCard key={promise.id} promise={promise} />
        )):'Nothing to show'}
      </div>
    </div>
  );
};

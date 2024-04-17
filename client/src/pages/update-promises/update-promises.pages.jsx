import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMessage, Message } from '../../hooks/popup.hooks';



export const UpdatePromise = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [promiseData, setPromiseData] = useState({
    name: '',
    promise: '',
    context: '',
    promised_on: '',
    to_be_completed_date: '',
    category: '',
    completed: false
  });
  const { showMessage, message, isVisible } = useMessage();

  useEffect(() => {
    const fetchPromise = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/promises/${id}`);
        setPromiseData(response.data);
      } catch (error) {
        showMessage('Failed to fetch record. Try again.')
      }
    };

    fetchPromise();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromiseData({ ...promiseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/promises/${id}`, promiseData);
      showMessage('Update successful!')
      setTimeout(() => {
        navigate('/promises');
      }, 3000); 
    } catch (error) {
        showMessage('Update Failed!')
    }
  };

  return (
    <AddPromiseContainer>
    <Message message={message} isVisible={isVisible} />
    <h2>Update Promise</h2>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Name:</label>
        <input type="text" name="name" value={promiseData.name || ''} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>Promise:</label>
        <input type="text" name="promise" value={promiseData.promise} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>Context:</label>
        <input type="text" name="context" value={promiseData.context} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>Promised On:</label>
        <input type="date" name="promisedOn" value={promiseData.promised_on} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>To be Completed Date:</label>
        <input type="date" name="toBeCompletedDate" value={promiseData.to_be_completed_date} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>Category:</label>
        <input type="text" name="category" value={promiseData.category} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <label>Completed:</label>
        <input type="checkbox" name="completed" checked={promiseData.completed} onChange={(e) => setPromiseData({ ...promiseData, completed: e.target.checked })} />
      </FormGroup>
      <SubmitButton type="submit">Update</SubmitButton>
    </Form>
  </AddPromiseContainer>
  );
};


const AddPromiseContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


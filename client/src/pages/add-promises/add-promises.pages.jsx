import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useMessage, Message } from '../../hooks/popup.hooks';

export const AddPromise = () => {
  const [promiseData, setPromiseData] = useState({
    name: '',
    promise: '',
    context: '',
    promisedOn: '',
    toBeCompletedDate: '',
    category: '',
    completed: false
  });
  const { showMessage, message, isVisible } = useMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromiseData({ ...promiseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/promises', promiseData);
      showMessage('Success')
      e.target.reset();
      setPromiseData({
        name: '',
        promise: '',
        context: '',
        promisedOn: '',
        toBeCompletedDate: '',
        category: '',
        completed: false
      });
    } catch (error) {
      showMessage('Error.Please Try again');
    }
  };

  return (
    <AddPromiseContainer>
      <h2>Add Promise</h2>
      <Message message={message} isVisible={isVisible} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Name:</label>
          <input type="text" name="name" value={promiseData.name} onChange={handleChange} />
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
          <input type="date" name="promisedOn" value={promiseData.promisedOn} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label>To be Completed Date:</label>
          <input type="date" name="toBeCompletedDate" value={promiseData.toBeCompletedDate} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label>Category:</label>
          <input type="text" name="category" value={promiseData.category} onChange={handleChange} />
        </FormGroup>
        {/* <FormGroup>
          <label>Completed:</label>
          <input type="checkbox" name="completed" checked={promiseData.completed} onChange={(e) => setPromiseData({ ...promiseData, completed: e.target.checked })} />
        </FormGroup> */}
        <SubmitButton type="submit">Add Promise</SubmitButton>
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


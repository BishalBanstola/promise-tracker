import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore} from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useMessage, Message } from '../../hooks/popup.hooks';



export const PromiseCard = ({ promise }) => {
  const { setPromises } = useStore();
  const navigate = useNavigate();
  const { showMessage, message, isVisible } = useMessage();

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the promise with the corresponding ID
      await axios.delete(`http://localhost:3000/api/promises/${promise.id}`);

      const response = await axios.get('http://localhost:3000/api/promises');
      setPromises(response.data);
      showMessage('Delete successful!');
      
    } catch (error) {
      showMessage('Delete Failed. Try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/update/${promise.id}`);
  };

  return (
    <CardContainer>
      <h3>{promise.name}</h3>
      <p><strong>Promise:</strong> {promise.promise}</p>
      <p><strong>Context:</strong> {promise.context}</p>
      <p><strong>Promised On:</strong> {promise.promised_on}</p>
      <p><strong>To be Completed Date:</strong> {promise.to_be_completed_date}</p>
      <p><strong>Category:</strong> {promise.category}</p>
      <p><strong>Fulfilled:</strong> {promise.completed?'Yes':'No'}</p>
      <ButtonContainer>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        <EditButton onClick={handleEdit}>Edit</EditButton>
      </ButtonContainer>
      <Message message={message} isVisible={isVisible} />
    </CardContainer>
  );
};


const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

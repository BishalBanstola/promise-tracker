import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const useMessage = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setMessage('');
    }, 3000); // Show message for 3 seconds
  };

  return { showMessage, message, isVisible };
};

const Message = ({ message, isVisible }) => {
  return (
    <MessageContainer isVisible={isVisible}>
      <MessageText>{message}</MessageText>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const MessageText = styled.p`
  margin: 0;
`;

export { useMessage, Message };

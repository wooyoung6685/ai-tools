import React from 'react'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchChatResponse } from './api/chatApi';
const ChatGpt= () =>  {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

 
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const chatResponse = await fetchChatResponse(query);
      setResponse(chatResponse);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the API.');
    } finally {
      setLoading(false);
    }
  };

  console.log(response);
  return (
    <div>
         <h1>ChatGpt AI!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your question"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {response && <ReactMarkdown children={response} />}
        </div>
      )}
    </div>
  );
};


export default ChatGpt
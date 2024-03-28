import React from 'react'
import { useState } from 'react';

function ChatGpt() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

  

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,

        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: query,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        }),
      });

      const result = await response.json();
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the API.');
    }
  };

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
      <div>
        <p> {response}</p>
      </div>
    </div>
  );
};


export default ChatGpt
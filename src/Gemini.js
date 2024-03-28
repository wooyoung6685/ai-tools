import React, { useState } from 'react';

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });



const Gemini = () => {
    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

 
  
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    async function aiRun() {
        setLoading(true); 
        const languageCode = "ko"; 
        const prompt = ` '${search}'`;
        try {
          const result =  await model.generateContent(prompt, {
            languageCode,
          });
          const response = await result.response;
          const text = await response.text(); 
          setResponse(text);
        } catch (error) {
          console.error("Failed to fetch AI response:", error);
          setResponse("Failed to load AI response. Please try again."); 
        } finally {
          setLoading(false);
        }
      }
      
      
      const handleClick = () => {
        aiRun();
      }

      
  return (
    <div>
    <h1>Gemini AI!</h1>


    <div >
      <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
      <button  onClick={() => handleClick()}>Search</button>
    </div>

    {
      loading == true && search != '' ?
        <p style={{ margin: '30px 0' }}>Loading ...</p>
        :
        <div style={{ margin: '30px 0' }}>
          <p>{aiResponse}</p>
        </div>
    }
  </div>
  );
};

export default Gemini;
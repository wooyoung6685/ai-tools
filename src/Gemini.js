import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import geminiApi from './api/geminiApi';


const Gemini = () => {
  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(geminiApi.getPrompt(''));

  
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangePrompt = (e) => {
    setPrompt(e.target.value);
  };
  

  const handleClick = () => {
    setLoading(true);
    const languageCode = "ko";
    const prompt = geminiApi.getPrompt(search);
    geminiApi.aiRun(prompt, languageCode).then((response) => {
      setResponse(response);
      setLoading(false);
    });
  };
  return (
    <div>
    <h1>Gemini AI!</h1>

    <div >
      <input placeholder='질문을 입력하세요' onChange={(e) => handleChangeSearch(e)} />
      <button onClick={() => handleClick()}>Search</button>
    </div>

    <div style={{ margin: '30px 0' }}>
      <textarea placeholder='Prompt를 입력하세요' value={prompt} onChange={(e) => handleChangePrompt(e)} />
    </div>

    {
      loading == true && search != '' ?
        <p style={{ margin: '30px 0' }}>Loading ...</p>
        :
        <div style={{ margin: '30px 0' }}>
          <ReactMarkdown children={aiResponse} />
        </div>
    }
  </div>
  );
};

export default Gemini;

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import LoadingBar from './LoadingBar';

const Container = styled.div`
  padding: 20px;
  width: 600px;
  margin: 40px auto;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #5c67f2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4a54e1;
  }
`;

const ButtonWrapper = styled.div``;

const ResponseContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  margin-top: 20px;
`;

function Test() {
  const [brandName, setBrandName] = useState('');
  const [subtitles, setSubtitles] = useState([
    "브랜드 역사 및 가치",
    "주요 타켓 고객층 및 니즈",
    "경쟁 브랜드 및 차별점",
    "브랜드 인지도 및 온라인 평판",
    "주요 온라인 판매 채널 및 판매량"
  ]);
  const [newSubtitle, setNewSubtitle] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBrandChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubtitleChange = (index) => (event) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index] = event.target.value;
    setSubtitles(newSubtitles);
  };

  const handleAddSubtitle = () => {
    if (newSubtitle.trim() === '') return; 
    setSubtitles([...subtitles, newSubtitle]);
    setNewSubtitle('');
  };

  const handleDeleteSubtitle = (index) => {
    const newSubtitles = subtitles.filter((_, idx) => idx !== index);
    setSubtitles(newSubtitles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 로딩 시작
    const apiResponses = await Promise.all(subtitles.map(subtitle => 
      axios.post('https://api.openai.com/v1/chat/completions', {
        messages:[
            {
            role: "system",
            content: "The answer is set in Korean, and List the texts that respond to me in a readable manner to the user,and Markdown format"
          },
          {
            role: "system",
            content: "You are in charge of e-commerce and need to list the information to explain to the client"
          },
          {
            role: "user",
            content: `${brandName} ${subtitle}`
          },
        ],
        model: "gpt-4",
        max_tokens: 600
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      }).then(response => response.data.choices[0].message.content)
        .catch(error => console.error('Error:', error))
    ));
    setResponses(apiResponses);
    setLoading(false); // 로딩 종료
  };

  return (
    <Container>
      <Title>GPT 브랜드 정보요청</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          브랜드명:
          <Input type="text" value={brandName} onChange={handleBrandChange} />
        </Label>
        프롬프트 설정
        {subtitles.map((subtitle, index) => (
          <div key={index}>
            <Label>
              <Input type="text" value={subtitle} onChange={handleSubtitleChange(index)} />
              <Button type="button" onClick={() => handleDeleteSubtitle(index)}>삭제</Button>
            </Label>
          </div>
        ))}
        <Label>
          <Input type="text" value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)} placeholder="새 소제목 추가" />
          <Button type="button" onClick={handleAddSubtitle}>추가</Button>
        </Label>
        <ButtonWrapper>
          <Button type="submit" disabled={!brandName}>정보 요청</Button>
        </ButtonWrapper>
      </Form>
      {loading ? (
        <LoadingContainer>
          <LoadingBar />
        </LoadingContainer>
      ) : (
        responses.length > 0 && (
          <ResponseContainer>
            {responses.map((response, index) => (
              <div key={index}>
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            ))}
          </ResponseContainer>
        )
      )}
    </Container>
  );
}

export default Test;

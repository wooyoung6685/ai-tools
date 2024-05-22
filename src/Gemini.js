import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import LoadingBar from "./LoadingBar";
import * as XLSX from "xlsx"; // SheetJS 라이브러리 import
import { remark } from "remark";
import remarkHtml from "remark-html";

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

const Gemini = () => {
  const [brandName, setBrandName] = useState("");
  const [subtitles, setSubtitles] = useState([
    "브랜드 역사 및 가치",
    "주요 타켓 고객층 및 니즈",
    "경쟁 브랜드 및 차별점",
    "브랜드 인지도 및 온라인 평판",
    "주요 온라인 판매 채널 및 판매량",
  ]);
  const [newSubtitle, setNewSubtitle] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleBrandChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubtitleChange = (index) => (event) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index] = event.target.value;
    setSubtitles(newSubtitles);
  };

  const handleAddSubtitle = () => {
    if (newSubtitle.trim() === "") return;
    setSubtitles([...subtitles, newSubtitle]);
    setNewSubtitle("");
  };

  const handleDeleteSubtitle = (index) => {
    const newSubtitles = subtitles.filter((_, idx) => idx !== index);
    setSubtitles(newSubtitles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const apiResponses = await Promise.all(
      subtitles.map(async (subtitle) => {
        const prompt = `${brandName} 에대한 ${subtitle}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
      })
    );
    setResponses(apiResponses);
    setLoading(false);
  };

  const handleDownloadExcel = () => {
    const dataForExcel = responses.map((response, index) => {
      const processedResponse = remark()
        .use(remarkHtml)
        .processSync(response)
        .toString();

      return {
        Subtitle: subtitles[index],
        Response: processedResponse.replace(/<\/?[^>]+(>|$)/g, ""), // HTML 태그 제거
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
      header: ["Subtitle", "Response"],
      skipHeader: false,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    // 스타일 지정
    const wscols = [
      { wch: 30 }, // Subtitle 컬럼 너비
      { wch: 100 }, // Response 컬럼 너비
    ];
    worksheet["!cols"] = wscols;

    // 셀 스타일 적용
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;
        if (R === 0) {
          worksheet[cell_ref].s = {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
          };
        } else {
          worksheet[cell_ref].s = {
            alignment: { wrapText: true, vertical: "top" },
          };
        }
      }
    }

    // Save the workbook
    XLSX.writeFile(workbook, "brand_responses.xlsx");
  };

  return (
    <Container>
      <Title>Gemini 브랜드 정보요청</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          브랜드명:
          <Input type="text" value={brandName} onChange={handleBrandChange} />
        </Label>
        프롬프트 설정
        {subtitles.map((subtitle, index) => (
          <div key={index}>
            <Label>
              <Input
                type="text"
                value={subtitle}
                onChange={handleSubtitleChange(index)}
              />
              <Button type="button" onClick={() => handleDeleteSubtitle(index)}>
                삭제
              </Button>
            </Label>
          </div>
        ))}
        <Label>
          <Input
            type="text"
            value={newSubtitle}
            onChange={(e) => setNewSubtitle(e.target.value)}
            placeholder="새 소제목 추가"
          />
          <Button type="button" onClick={handleAddSubtitle}>
            추가
          </Button>
        </Label>
        <ButtonWrapper>
          <Button type="submit" disabled={!brandName}>
            정보 요청
          </Button>
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
            <Button onClick={handleDownloadExcel}>엑셀로 다운로드</Button>
          </ResponseContainer>
        )
      )}
    </Container>
  );
};

export default Gemini;

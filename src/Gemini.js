import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
    const prompt = `
  
    Q:
    다슈
    
    A:
    브랜드 분석 및 전략 수립

    1. 브랜드 정체성 파악
    
    1.1 브랜드 역사 및 가치
    2001년 설립, 남성 헤어 스타일링 브랜드로 출발
    천연 유래 성분 함유 제품으로 차별화
    '프리미엄 남성 뷰티'라는 새로운 시장 개척
    2010년 여성 브랜드 '다슈 여성' 출시, 2015년 '다슈 헤어케어' 출시로 사업 확장
    '자연스럽고 건강한 아름다움'이라는 핵심 가치 추구

    1.2 주요 타겟 고객층 및 니즈
    20~30대 남성, 여성
    트렌드에 민감하고 개성을 추구하는 소비자
    건강한 아름다움을 중시하는 소비자
    남성: 스타일링 제품을 통해 자신감 표현
    여성: 탈모 케어, 프리미엄 헤어케어 제품에 대한 니즈

    1.3 경쟁 브랜드 및 차별점
    경쟁 브랜드: 루시스, 써모스, 앤더슨벨, 롬앤, 엠케어, AHC, 라네즈, 이지트랩
    차별점:
    천연 유래 성분 함유
    프리미엄 남성 뷰티 시장 개척
    합리적인 가격
    높은 품질과 소비자 만족도
    다양한 제품 라인업

    2. 온라인 상 포지션 분석
    
    2.1 브랜드 인지도 및 온라인 평판
    높은 브랜드 인지도:
    2020년 한국소비자만족지수 5년 연속 1위
    2023년 뷰티어워즈 올해의 브랜드 선정
    2023년 핫브랜드 대상 수상
    긍정적인 온라인 평판:
    제품 품질, 가격, 효능에 대한 만족도 높음
    '다슈 왁스', '다슈 샴푸' 등 핵심 제품 인기
    
    2.2 주요 온라인 판매 채널 및 판매량
    주요 판매 채널: 다슈 공식 홈페이지, 쿠팡, 옥션, 11번가, G마켓, 위메프, 아마존, 해외 온라인 쇼핑몰
    높은 판매량:
    2023년 1분기 기준, 남성 헤어케어 시장 점유율 1위
    2023년 1분기 기준, 천연 유래 헤어케어 시장 점유율 1위

    2.3 소비자 반응 및 니즈 분석
    긍정적인 반응:
    제품 품질, 가격, 효능에 대한 만족도 높음
    다양한 제품 라인업에 대한 긍정적 평가
    친환경, 동물실험 반대 등 기업 이미지에 대한 호감
    제안 니즈:
    여성 라인업 확대
    해외 시장 진출 확대
    친환경 제품 라인업 확대

    3. 브랜딩 및 매출 증대 전략
    
    3.1 브랜드 가치 강화
    온라인 스토리텔링:
    다슈 브랜드 히스토리, 가치관, 제품 개발 과정 등을 스토리텔링 방식으로 소개
    블로그, 유튜브, 인스타그램 등 다양한 채널 활용
    온라인 이벤트 개최:
    샘플 증정, 할인 행사, 고객 참여 이벤트 등을 통해 소비자 참여 유도
    인플루언서 마케팅:
    타겟 고객층과 일치하는 인플루언서와 협업
    제품 홍보, 브랜드 이미지 제고

3.2 다양한 고객층 공략 전략
성별 맞춤형 제품 및 마케팅:
남성: 스타일링 제품 라인업 확대, 남성 고객층 맞춤형 마케팅
여성: 탈모 케어, 프리미엄 헤어케어 제품 라인업 확대, 여성 고객층 맞춤형 마케팅
세대별 맞춤형 마케팅:
10대, 20대: 트렌드 반영 제품 개발, SNS 마케팅 강화
30대, 40대: 기능성 제품 라인업 확대, 신뢰감 주는 마케팅
라이프스타일 맞춤형 마케팅:
건강, 친환경, 동물실험 반대 등 가치관 공유하는 고객층 공략

3.3 지속적인 고객 만족 관리
고객 후기 관리:
온라인 쇼핑몰, SNS 등 고객 후기 적극 수집 및 반영
제품 개선, 고객 서비스 향상
AS 서비스 강화:
온라인 상담, 환불/교환 등 편리하고 신속한 AS 서비스 제공
고객 만족도 향상, 브랜드 충성도 강화

4. 전략 실행 및 평가

4.1 전략 실행 계획
각 전략별 실행 계획 수립 및 일정 설정
담당자 및 예산 책정
정기적인 진행 상황 점검 및 평가
    
    A:${search}
    
    Q:
     `;
    try {
      const result = await model.generateContent(prompt, {
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
        <input placeholder='질문을 입력하세요' onChange={(e) => handleChangeSearch(e)} />
        <button onClick={() => handleClick()}>Search</button>
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

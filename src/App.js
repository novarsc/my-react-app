import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Modal from './components/Modal';

const App = () => {
  // 선택된 기업 상태 관리
  const [selectedCompany, setSelectedCompany] = useState(null);

  // 관심 기업 상태 관리
  const [favorites, setFavorites] = useState([]);

  // 더미 기업 데이터
  const companies = [
    {
      name: '삼성전자',
      position: '소프트웨어 엔지니어',
      deadline: '2024-12-31',
      description: '삼성전자는 글로벌 IT 기업으로 혁신적인 제품과 기술을 제공합니다.',
    },
    {
      name: '네이버',
      position: '프론트엔드 개발자',
      deadline: '2024-12-25',
      description: '네이버는 한국을 대표하는 검색 엔진 기업으로 다양한 IT 서비스를 제공합니다.',
    },
    {
      name: '카카오',
      position: '백엔드 엔지니어',
      deadline: '2024-12-28',
      description: '카카오는 메신저와 다양한 플랫폼 서비스를 통해 혁신을 주도하는 IT 기업입니다.',
    },
  ];

  // 기업명을 클릭했을 때 모달 열기
  const handleCompanyClick = (companyName) => {
    const company = companies.find((comp) => comp.name === companyName);
    setSelectedCompany(company || null);
  };

  // 관심 기업 추가/제거
  const toggleFavorite = (companyName) => {
    const company = companies.find((comp) => comp.name === companyName);
    if (!company) return;

    if (favorites.some((fav) => fav.name === company.name)) {
      // 관심 기업 제거
      setFavorites(favorites.filter((fav) => fav.name !== company.name));
    } else {
      // 관심 기업 추가
      setFavorites([...favorites, company]);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>메인 페이지</h1>
              {/* 캘린더와 관심 기업 리스트를 렌더링 */}
              <Calendar
                onCompanyClick={handleCompanyClick}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
              {selectedCompany && (
                <Modal onClose={closeModal} company={selectedCompany} />
              )}
              {/* 관심 기업 리스트 */}
              <div className="favorites">
                <h3>관심 기업</h3>
                <ul>
                  {favorites.length > 0 ? (
                    favorites.map((company, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleCompanyClick(company.name)}
                        >
                          {company.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <p>아직 관심 기업이 없습니다.</p>
                  )}
                </ul>
              </div>
            </>
          }
        />
        <Route path="/about" element={<h1>서비스 소개</h1>} />
        <Route path="/write-intro" element={<h1>자기소개서 작성 페이지</h1>} />
        <Route path="/login" element={<h1>로그인 페이지</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

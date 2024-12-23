import React, { useState } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import CompanyList from '../components/CompanyList';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState([]); // 서버에서 가져온 캘린더 데이터

  const handleSearch = (query) => {
    // 검색 결과 처리
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Calendar data={data} />
      <CompanyList favorites={favorites} onSelect={(company) => console.log(company)} />
    </div>
  );
};

export default Home;

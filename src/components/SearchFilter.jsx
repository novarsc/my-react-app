import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onFilterChange }) => {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onFilterChange(e.target.value, filterType);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    onFilterChange(searchText, e.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="기업 검색"
        value={searchText}
        onChange={handleSearch}
      />
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="">전체 직무</option>
        <option value="소프트웨어 엔지니어">소프트웨어 엔지니어</option>
        <option value="프론트엔드 개발자">프론트엔드 개발자</option>
        <option value="백엔드 엔지니어">백엔드 엔지니어</option>
      </select>
    </div>
  );
};

export default SearchFilter;

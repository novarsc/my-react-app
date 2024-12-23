import React from 'react';

const CompanyList = ({ favorites, onSelect }) => {
  return (
    <div className="company-list">
      <h3>관심 기업</h3>
      <ul>
        {favorites.map((company) => (
          <li key={company.id}>
            <button onClick={() => onSelect(company)}>{company.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;

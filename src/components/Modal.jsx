import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ onClose, company, onAddToFavorites }) => {
  const [activeTab, setActiveTab] = useState('details'); // 기본 탭 설정
  const [closing, setClosing] = useState(false); // 닫기 애니메이션 상태

  // ESC 키 입력으로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 닫기 애니메이션 처리
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300); // 애니메이션 시간과 일치
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className={`modal-content ${closing ? 'fade-out' : ''}`}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않음
      >
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>{company?.name || '기업 정보'}</h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* 탭 버튼 */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            상세 정보
          </button>
          <button
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            회사 소개
          </button>
          <button
            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            채용 절차
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="modal-body">
          {activeTab === 'details' && (
            <>
              <p><strong>직무:</strong> {company?.position || '정보 없음'}</p>
              <p><strong>마감일:</strong> {company?.deadline || '정보 없음'}</p>
              <p><strong>상세 정보:</strong> {company?.description || '정보 없음'}</p>
            </>
          )}
          {activeTab === 'about' && <p>여기에 회사 소개 내용을 추가하세요.</p>}
          {activeTab === 'process' && <p>여기에 채용 절차 내용을 추가하세요.</p>}
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button
            className="action-btn"
            onClick={() => onAddToFavorites(company)}
          >
            관심 기업 추가
          </button>
          <button className="action-btn">지원하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onCompanyClick, onToggleFavorite, favorites }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/calendar-data'); // 실제 API 경로로 수정
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        setCalendarData([
          { date: '2024-12-22', companies: ['삼성전자', '네이버', '카카오'] },
          { date: '2024-12-23', companies: ['LG전자', '현대자동차'] },
          { date: '2024-12-25', companies: ['SK하이닉스', 'CJ ENM'] },
        ]);
      }
    };

    fetchData();
  }, [currentDate]);

  // 로컬 시간대 형식으로 날짜 변환 함수
  const formatDateToLocal = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split('T')[0];
  };

  // 현재 월의 모든 날짜 가져오기 (빈칸 포함)
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date: formatDateToLocal(date),
        day: date.getDay(),
      });
    }

    return days;
  };

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 날짜 일치 여부 확인 함수
  const isDateMatching = (entryDate, targetDate) => {
    return formatDateToLocal(new Date(entryDate)) === targetDate;
  };

  const daysInMonth = getDaysInMonth();

  return (
    <div className="calendar">
      {/* 월 이동 컨트롤 */}
      <div className="calendar-controls">
        <button onClick={handlePrevMonth}>&lt; 이전</button>
        <span>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button onClick={handleNextMonth}>다음 &gt;</button>
      </div>

      {/* 요일 헤더 */}
      <div className="calendar-header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 및 기업 정보 */}
      <div className="calendar-body">
        {daysInMonth.map((day, index) =>
          day ? (
            <div
              key={day.date}
              className={`calendar-cell ${
                day.date === formatDateToLocal(new Date()) ? 'today' : ''
              }`}
            >
              <div className="date">{day.date.split('-')[2]}</div>
              <ul className="company-list">
                {calendarData
                  .find((entry) => isDateMatching(entry.date, day.date))
                  ?.companies.map((company, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => onCompanyClick(company)}
                      >
                        {company}
                      </button>
                      <button
                        className={`favorite-btn ${
                          favorites.some((fav) => fav.name === company) ? 'active' : ''
                        }`}
                        onClick={() => onToggleFavorite(company)}
                      >
                        ★
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div key={index} className="calendar-cell empty"></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;

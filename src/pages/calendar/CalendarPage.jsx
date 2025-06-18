import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import "./CalendarPage.scss";

const emotionEmojis = {
  joy: "😊",
  sadness: "😭",
  anger: "😠",
  fear: "😨",
  disgust: "🤢",
  surprise: "😲",
};

const emotionColors = {
  joy: "#fff9c4",       // light yellow
  sadness: "#bbdefb",   // light blue
  anger: "#ffcdd2",     // light red/pink
  fear: "#d1c4e9",      // light purple
  disgust: "#c8e6c9",   // light green
  surprise: "#ffe0b2",  // light orange
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [savedEntries, setSavedEntries] = useState({});
  const [days, setDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const navigate = useNavigate();

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || {};
    setSavedEntries(entries);

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const tempDays = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      tempDays.push(day);
    }
    setDays(tempDays);
  }, [currentDate]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    setCurrentDate(new Date(selectedYear, month, 1));
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setCurrentDate(new Date(year, selectedMonth, 1));
  };

  const goToEditJournal = () => {
    if (!selectedDate) return;
    const dateString = format(selectedDate, "yyyy-MM-dd");
    navigate(`/journal?date=${dateString}`);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {monthNames.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          {[...Array(10)].map((_, index) => {
            const year = new Date().getFullYear() - 5 + index;
            return (
              <option key={year} value={year}>{year}</option>
            );
          })}
        </select>
      </div>

      <div className="calendar-wrapper">
        <button className="prev-month" onClick={handlePrevMonth}>{"<"}</button>

        <div className="calendar-grid">
          {days.map((day) => {
            const dateString = format(day, "yyyy-MM-dd");
            const entryData = savedEntries[dateString];
            const hasEntry = !!entryData;

            return (
              <div
                key={day}
                className={`calendar-day ${isSameDay(day, selectedDate) ? "selected" : ""} ${hasEntry ? "has-entry" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {format(day, "d")}
                {hasEntry && (
                  <div className={`emotion-tag ${entryData.emotion}`}>
                    {entryData.emotion} {emotionEmojis[entryData.emotion] || ""}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="next-month" onClick={handleNextMonth}>{">"}</button>
      </div>

      {selectedDate && (
        <div className="journal-section">
          <h3>Journal for {format(selectedDate, "MMMM d, yyyy")}</h3>
          <textarea
            readOnly
            value={
              savedEntries[format(selectedDate, "yyyy-MM-dd")]?.text || ""
            }
            placeholder="No journal entry for this day."
            rows={10}
            style={{
              backgroundColor:
                emotionColors[savedEntries[format(selectedDate, "yyyy-MM-dd")]?.emotion] ||
                "white",
            }}
          ></textarea>

          <div className="journal-buttons">
            <button onClick={goToEditJournal}>Edit Journal</button>
            <button
              className="emotion-button"
              disabled
              style={{
                backgroundColor:
                  emotionColors[savedEntries[format(selectedDate, "yyyy-MM-dd")]?.emotion] || "#eee",
                color: "#333",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Emotion: {savedEntries[format(selectedDate, "yyyy-MM-dd")]?.emotion || "N/A"}{" "}
              {emotionEmojis[savedEntries[format(selectedDate, "yyyy-MM-dd")]?.emotion] || ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

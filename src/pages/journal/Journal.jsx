import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Journal.scss";

function Journal() {
  const location = useLocation();

  const [entry, setEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [visibility, setVisibility] = useState({});
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  const [page, setPage] = useState(0);
  const entriesPerPage = 5;

  // Dropdown state
  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get("date");
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const parsedDate = new Date(dateParam);
      setDay(parsedDate.getDate());
      setMonth(parsedDate.getMonth() + 1);
      setYear(parsedDate.getFullYear());
    }
  }, [location.search]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || {};
    setSavedEntries(storedEntries);
  }, []);

  useEffect(() => {
    const newSelectedDate = `${year.toString().padStart(4, "0")}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    setSelectedDate(newSelectedDate);
  }, [day, month, year]);

  useEffect(() => {
    if (savedEntries[selectedDate]) {
      setEntry(savedEntries[selectedDate].text);
      setFile(null);
    } else {
      setEntry("");
      setFile(null);
    }
  }, [selectedDate, savedEntries]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setEntry((prev) => prev + " " + transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const getEmotion = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      return data.emotion;
    } catch (error) {
      console.error("Error fetching emotion:", error);
      return null;
    }
  };

  const saveEntry = async () => {
    if (!entry.trim()) {
      alert("Journal entry cannot be empty.");
      return;
    }
    setIsSaving(true);

    const detectedEmotion = await getEmotion(entry);
    const entryData = {
      text: entry,
      emotion: detectedEmotion,
      file: file ? URL.createObjectURL(file) : null,
    };

    const updatedEntries = { ...savedEntries, [selectedDate]: entryData };
    setSavedEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    setIsSaving(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const deleteEntry = (date) => {
    const updatedEntries = { ...savedEntries };
    delete updatedEntries[date];
    setSavedEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    if (date === selectedDate) {
      setEntry("");
      setFile(null);
    }
    alert(`Journal entry for ${date} deleted.`);
  };

  const toggleVisibility = (date) => {
    setVisibility((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const sortedDates = Object.keys(savedEntries).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const totalPages = Math.ceil(sortedDates.length / entriesPerPage);
  const pagedDates = sortedDates.slice(
    page * entriesPerPage,
    page * entriesPerPage + entriesPerPage
  );

  const goPrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const goNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const renderDateDropdowns = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const monthOptions = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const yearOptions = Array.from({ length: 20 }, (_, i) => today.getFullYear() - i);

    return (
      <div className="date-dropdowns">
        <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
          {dayOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {monthOptions.map((m, idx) => (
            <option key={m} value={idx + 1}>{m}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="journal">
      <h1>Your Daily Journal</h1>

      {renderDateDropdowns()}

      <div className="journal-entry">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your journal entry..."
          rows="10"
          className="journal-textarea"
        />
        <button className="voice-button" onClick={handleVoiceToggle}>
          {isListening ? "Stop Listening" : "Start Voice Input 🎤"}
        </button>
      </div>

      <div className="file-upload">
        <label htmlFor="fileInput">Attach a picture:</label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*, video/*"
        />
      </div>

      <button className="save-button" onClick={saveEntry} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Entry"}
      </button>

      <div className="previous-entries">
        <h2>Previous Entries</h2>
        {sortedDates.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <>
            <ul>
              {pagedDates.map((date) => (
                <li key={date}>
                  <strong
                    onClick={() => toggleVisibility(date)}
                    className="entry-date"
                    style={{ cursor: "pointer" }}
                  >
                    {new Date(date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })} {visibility[date] ? "▼" : "▲"}
                  </strong>
                  {visibility[date] && savedEntries[date] && (
                    <div className="entry-item">
                      <p>{savedEntries[date].text}</p>
                      <p className="emotion-display">
                        <strong>Emotion:</strong> {savedEntries[date].emotion}
                      </p>
                      {savedEntries[date].file && (
                        <div className="media-display">
                          {savedEntries[date].file.endsWith(".mp4") ||
                          savedEntries[date].file.endsWith(".mov") ? (
                            <video controls src={savedEntries[date].file} width="300" />
                          ) : (
                            <img
                              src={savedEntries[date].file}
                              alt="Attached media"
                              width="300"
                            />
                          )}
                        </div>
                      )}
                      <button className="edit-button" onClick={() => {
                        const d = new Date(date);
                        setDay(d.getDate());
                        setMonth(d.getMonth() + 1);
                        setYear(d.getFullYear());
                      }}>Edit</button>
                      <button className="delete-button" onClick={() => deleteEntry(date)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="pagination-buttons" style={{ marginTop: "10px" }}>
              <button className="nav-button" onClick={goPrevPage} disabled={page === 0}>
                &lt; Previous
              </button>
              <span style={{ margin: "0 10px" }}>
                Page {page + 1} of {totalPages}
              </span>
              <button className="nav-button" onClick={goNextPage} disabled={page === totalPages - 1}>
                Next &gt;
              </button>
            </div>
          </>
        )}
      </div>

      {showPopup && <div className="popup">Entry saved successfully!</div>}
    </div>
  );
}

export default Journal;

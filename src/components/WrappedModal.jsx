import React from "react";
import "./WrappedModal.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

// Warna batang berdasarkan emosi
const emotionColors = {
  joy: "#fff59d",       // light yellow
  sadness: "#90caf9",   // light blue
  anger: "#ef9a9a",     // light red/pink
  fear: "#ce93d8",      // light purple
  disgust: "#a5d6a7",   // light green
  surprise: "#ffcc80",  // light orange
};

// Psychological insights
const emotionInsights = {
  joy: `This past month, your emotional landscape has been rich in joy...`,
  sadness: `Sadness appeared frequently this month...`,
  anger: `Anger has been a dominant theme this month...`,
  fear: `Fear showed up prominently in your emotional profile...`,
  disgust: `Disgust was a common emotion for you recently...`,
  surprise: `Surprise featured heavily in your emotional responses...`,
};

// Tips
const helpfulTips = {
  joy: `Maintain your emotional momentum by practicing gratitude daily...`,
  sadness: `Make space for gentle care. Try writing about what’s weighing on you...`,
  anger: `Before reacting to triggers, pause and breathe...`,
  fear: `Reclaim control by taking small, intentional steps toward what scares you...`,
  disgust: `Explore what’s behind the discomfort...`,
  surprise: `Stay curious! Life’s unpredictability can be unsettling...`,
};

function WrappedModal({ stats, onClose }) {
  const {
    totalEntries = 0,
    dominantEmotion = "",
    emotionCounts = {},
    articles = [],
  } = stats || {};

  // Siapkan data chart
  const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
    name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    emotion,
    count,
  }));

  const insight =
    emotionInsights[dominantEmotion.toLowerCase()] ||
    "Your emotional experiences offer valuable insights.";

  const tip =
    helpfulTips[dominantEmotion.toLowerCase()] ||
    "Take small, positive steps each day to support your well-being.";

  return (
    <div className="wrapped-modal-overlay">
      <div className="wrapped-modal">
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ✖
        </button>

        <h2>Last Month's Emotion Recap</h2>

        <p><strong>Total Journal Entries:</strong> {totalEntries}</p>
        <p><strong>Dominant Emotion:</strong> {dominantEmotion?.charAt(0).toUpperCase() + dominantEmotion?.slice(1)}</p>

        <div className="insight-section">
          <h3>🔍 Psychological Insight</h3>
          <p>{insight}</p>
        </div>

        <div className="chart-container" style={{ height: 300, marginBottom: 20 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={emotionColors[entry.emotion.toLowerCase()] || "#ccc"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="tip-section">
          <h3>🧠 Helpful Tip</h3>
          <p>{tip}</p>
        </div>

        <div className="articles-section">
          <h3>📚 Related Articles</h3>
          {Array.isArray(articles) && articles.length > 0 ? (
            <ul>
              {articles.map(({ id, title }) => (
                <li key={id}>
                  <Link to={`/articles/${id}`} className="article-link">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No articles available for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WrappedModal;

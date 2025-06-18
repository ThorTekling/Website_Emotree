import React from "react";
import { Link } from "react-router-dom";
import mental1 from "../../assets/images/mental1.jpeg";
import mental2 from "../../assets/images/mental2.jpeg";
import mental3 from "../../assets/images/mental3.jpeg";
import eat from "../../assets/images/eat.jpg";
import meditate from "../../assets/images/meditate.jpg";
import journal from "../../assets/images/journal.jpg";
import screen from "../../assets/images/screen.jpg";
import sleep from "../../assets/images/sleep.jpg";
import "./Articles.scss";

const articles = [
  {
    id: 1,
    title: "Mental Health Awareness",
    summary: "An overview of mental health and its importance...",
    image: mental1,
  },
  {
    id: 2,
    title: "Understanding Stress",
    summary: "How stress affects your mental and physical health...",
    image: mental2,
  },
  {
    id: 3,
    title: "Coping with Anxiety",
    summary: "Tips and strategies for managing anxiety...",
    image: mental3,
  },
  {
    id: 4,
    title: "Benefits of Journaling",
    summary: "How writing your thoughts can improve mental clarity...",
    image: journal,
  },
  {
    id: 5,
    title: "Meditation for Beginners",
    summary: "Easy ways to start meditating today...",
    image: meditate,
  },
  {
    id: 6,
    title: "The Power of Sleep",
    summary: "Why quality sleep is key to emotional wellness...",
    image: sleep,
  },
  {
    id: 7,
    title: "Balancing Screen Time",
    summary: "Managing technology for better mental health...",
    image: screen,
  },
  {
    id: 8,
    title: "Mindful Eating",
    summary: "How what you eat affects how you feel...",
    image: eat,
  },
];

const Articles = () => {
  return (
    <div className="articles">
      <h1>Articles on Mental Health</h1>
      <div className="article-list">
        {articles.map((article) => (
          <Link to={`/articles/${article.id}`} key={article.id} className="article-link">
            <div className="article-item">
              {article.image && (
                <img src={article.image} alt={article.title} className="article-img" />
              )}
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;

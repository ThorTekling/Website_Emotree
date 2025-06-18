import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./News.scss";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Mock data for now. Later you can fetch news from an API or other source.
    const mockArticles = [
      {
        id: 1,
        title: "Technology Trends in 2024",
        content: "Stay updated with the latest technology trends in 2024...",
      },
      {
        id: 2,
        title: "Health News",
        content: "Discover the latest advancements in healthcare...",
      },
      {
        id: 3,
        title: "Global Economic Updates",
        content: "The global economy is rapidly evolving...",
      },
    ];

    setArticles(mockArticles);
  }, []);

  return (
    <div className="news">
      <h1>Latest News</h1>
      {articles.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link to={`/news/${article.id}`}>
                <h2>{article.title}</h2>
              </Link>
              <p>{article.content.substring(0, 100)}...</p> {/* Preview content */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default News;

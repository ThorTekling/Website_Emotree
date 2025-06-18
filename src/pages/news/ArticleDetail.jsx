import React from "react";
import { useParams } from "react-router-dom";
import img1 from "../../assets/images/img1.jpg"; // Adjust the path as needed
import img2 from "../../assets/images/img2.jpg"; // Adjust the path as needed
import img3 from "../../assets/images/img3.jpg"; // Adjust the path as needed
import "./ArticleDetail.scss";

const ArticleDetail = () => {
  // Use the id from the URL parameters if you need to fetch specific article data
  const { id } = useParams();

  // Mock article data (you can replace this with real data fetching logic)
  const mockArticles = [
    {
      id: 1,
      title: "Article 1 Title",
      content: "Content of the first article...",
      image: img1,
    },
    {
      id: 2,
      title: "Article 2 Title",
      content: "Content of the second article...",
      image: img2,
    },
    {
      id: 3,
      title: "Article 3 Title",
      content: "Content of the third article...",
      image: img3,
    },
  ];

  // Find the article by id
  const article = mockArticles.find((article) => article.id === parseInt(id));

  // Check if article exists
  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.image} alt="Image Description" />
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;

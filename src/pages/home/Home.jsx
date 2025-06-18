import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Environment,
  SoftShadows,
} from "@react-three/drei";
import "./Home.scss";
import WrappedModal from "../../components/WrappedModal";

// Komponen 3D tree model
function TreeModel({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} position={[0, -1.2, 0]} />;
}

// Fungsi bantu hitung dominan
function getDominantEmotion(emotionCounts) {
  let maxEmotion = null;
  let maxCount = 0;
  for (const [emotion, count] of Object.entries(emotionCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxEmotion = emotion;
    }
  }
  return { dominantEmotion: maxEmotion, maxCount };
}

function Home() {
  const [showRecap, setShowRecap] = useState(false);
  const [stats, setStats] = useState(null);
  const [dominantTreePath, setDominantTreePath] = useState(null);

  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem("journalEntries")) || {};
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const thisMonthEntries = [];
    const lastMonthEntries = [];

    Object.entries(allEntries).forEach(([dateStr, entry]) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === thisYear && date.getMonth() === thisMonth) {
        thisMonthEntries.push(entry);
      } else if (
        date.getFullYear() === lastMonthYear &&
        date.getMonth() === lastMonth
      ) {
        lastMonthEntries.push(entry);
      }
    });

    // Untuk pohon bulan ini
    const thisMonthCounts = {};
    thisMonthEntries.forEach(({ emotion }) => {
      if (emotion) thisMonthCounts[emotion] = (thisMonthCounts[emotion] || 0) + 1;
    });

    const { dominantEmotion: currentDominant, maxCount } = getDominantEmotion(
      thisMonthCounts
    );

    let level = 0;
    if (maxCount >= 15) level = 3;
    else if (maxCount >= 7) level = 2;
    else if (maxCount >= 1) level = 1;

    if (currentDominant && level > 0) {
      const capitalized = currentDominant.charAt(0).toUpperCase() + currentDominant.slice(1);
      setDominantTreePath(`/models/centered/${capitalized}Lv${level}.glb`);
    }

    // Untuk modal bulan lalu
    const emotionCounts = {};
    let totalEntries = 0;

    lastMonthEntries.forEach(({ emotion }) => {
      if (emotion) {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        totalEntries++;
      }
    });

    const { dominantEmotion } = getDominantEmotion(emotionCounts);

    const articles = [
      { id: "1", title: "Coping with Sadness" },
      { id: "2", title: "Embracing Joy in Daily Life" },
      { id: "3", title: "Understanding Emotional Triggers" },
    ];

    setStats({
      totalEntries,
      emotionCounts,
      dominantEmotion,
      articles,
    });
  }, []);

  return (
    <div className="home">
      <div className="emotion-tree-section">
        <h1>EmoTree</h1>
        <div style={{ width: "100%", height: "30vh" }}>
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            style={{ width: "100%", height: "100%", background: "#dce7e4" }}
            shadows
          >
            <SoftShadows size={25} samples={10} focus={0.5} />
            <ambientLight intensity={0.7} />
            <directionalLight
              castShadow
              position={[10, 15, 10]}
              intensity={1.5}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            <Environment preset="sunset" background={false} />

            <Suspense fallback={null}>
              {dominantTreePath && <TreeModel path={dominantTreePath} />}
              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.5}
                scale={10}
                blur={1.5}
                far={10}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              target={[0, -1.2, 0]}
            />
          </Canvas>
        </div>
      </div>

      <div className="mental-health-journal-section">
        <p>
          Start writing in your journal to track your emotions, reflect on your
          mental health, and receive valuable insights to improve your well-being.
        </p>

        <Link to="/journal">
          <button className="start-writing-btn">Start Writing</button>
        </Link>

        <button
          className="recap-btn"
          onClick={() => setShowRecap(true)}
          disabled={!stats}
        >
          View Last Month's Emotion Recap
        </button>
      </div>

      {showRecap && stats && (
        <WrappedModal stats={stats} onClose={() => setShowRecap(false)} />
      )}
    </div>
  );
}

export default Home;

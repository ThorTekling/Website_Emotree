import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Environment,
  SoftShadows,
} from "@react-three/drei";
import "./EmotionTree.scss";

function Model({ path, position = [0, 0, 0] }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} position={position} />;
}

function getMonthlyEmotionStats() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || {};

  const monthlyCounts = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    disgust: 0,
    surprise: 0,
  };

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() - 1;
  if (month < 0) {
    month = 11;
    year -= 1;
  }

  Object.entries(entries).forEach(([date, data]) => {
    const entryDate = new Date(date);
    if (
      entryDate.getMonth() === month &&
      entryDate.getFullYear() === year
    ) {
      const emotion = data.emotion;
      if (emotion && monthlyCounts[emotion] !== undefined) {
        monthlyCounts[emotion]++;
      }
    }
  });

  return monthlyCounts;
}

function getTreeLevel(count) {
  if (count >= 15) return 3;
  if (count >= 7) return 2;
  if (count >= 1) return 1;
  return 0;
}

function EmotionForestScene() {
  const [activeTrees, setActiveTrees] = useState([]);

  useEffect(() => {
    const counts = getMonthlyEmotionStats();

    const trees = Object.entries(counts)
      .map(([emotion, count]) => {
        const level = getTreeLevel(count);
        if (level === 0) return null;

        const emotionCapitalized = emotion.charAt(0).toUpperCase() + emotion.slice(1);
        const path = `/models/${emotionCapitalized}Lv${level}.glb`;

        return {
          key: `${emotion}-${level}`,
          emotion,
          path,
        };
      })
      .filter(Boolean);

    setActiveTrees(trees);
  }, []);

  return (
    <div className="threeD-container">
      <h1>Emotion Forest - Last Month</h1>
      <Canvas
        camera={{ position: [0, 8, 20], fov: 45 }}
        shadows
        style={{ background: "#dce7e4", height: "100vh" }}
      >
        {/* Soft Shadow Helper */}
        <SoftShadows size={25} samples={10} focus={0.5} />

        {/* Lighting */}
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

        {/* Optional HDRI Lighting */}
        <Environment preset="sunset" background={false} />

        <Suspense fallback={null}>
          {/* Ground */}
          <Model path="/models/ground.glb" position={[0, 0, 0]} />

          {/* Trees */}
          <group position={[0, 0, 0]}>
            {activeTrees.map((tree) => (
              <Model key={tree.key} path={tree.path} />
            ))}
          </group>

          {/* Contact Shadows */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.5}
            scale={50}
            blur={1.5}
            far={20}
          />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

export default EmotionForestScene;

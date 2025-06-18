import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function EmotionModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <primitive object={scene} scale={1.2} position={[0, -1, 0]} />
  );
}

function DominantEmotionTree({ emotion }) {
  const defaultEmotion = emotion || "Joy";

  const modelPaths = {
    Joy: "/models/JoyLv3.glb",
    Sadness: "/models/SadnessLv3.glb",
    Anger: "/models/AngerLv3.glb",
    Fear: "/models/FearLv3.glb",
    Disgust: "/models/DisgustLv3.glb",
    Surprise: "/models/SurpriseLv3.glb",
  };

  const modelPath = modelPaths[defaultEmotion] || modelPaths["Joy"];

  return (
    <Canvas
      style={{ width: "100%", height: "55vh" }}
      camera={{ position: [0, 1.5, 4], fov: 45 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <EmotionModel modelPath={modelPath} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false} // mencegah pergeseran
        minPolarAngle={Math.PI / 2} // hanya bisa rotasi horizontal
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]} // fokus ke tengah pohon
      />
    </Canvas>
  );
}

export default DominantEmotionTree;

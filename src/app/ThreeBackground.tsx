"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-20 pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Grid of spheres */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 4, Math.cos(i) * 2, -4 + i]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00eaff" : "#ff00cc"}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

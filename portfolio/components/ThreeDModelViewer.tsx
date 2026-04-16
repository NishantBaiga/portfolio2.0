import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, } from 'react';
import * as THREE from 'three';

interface ThreeDModelViewerProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

function MouseLight({ dark }: { dark?: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const x = (state.mouse.x * 5);
      const y = (state.mouse.y * 5);
      lightRef.current.position.set(x, y, 5);
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      intensity={dark ? 2 : 1} 
      color={dark ? "#0055BF" : "#FFD500"} 
      distance={10}
      decay={2}
    />
  );
}

export function ThreeDModelViewer({ children, className, dark }: ThreeDModelViewerProps) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={15}
          makeDefault 
        />
        
        <ambientLight intensity={dark ? 0.3 : 0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={dark ? 1 : 2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={dark ? 0.5 : 1} />
        
        <MouseLight dark={dark} />
        
        <Suspense fallback={null}>
          <group>
            {children}
          </group>
          <Environment preset={dark ? "night" : "city"} />
          <ContactShadows position={[0, -1.5, 0]} opacity={dark ? 0.2 : 0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

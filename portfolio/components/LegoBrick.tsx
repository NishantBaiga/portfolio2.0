import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LegoBrickProps {
  position?: [number, number, number];
  color?: string;
  width?: number;
  height?: number;
  depth?: number;
  rotation?: [number, number, number];
  emissive?: boolean;
}

export function LegoBrick({ 
  position = [0, 0, 0], 
  color = '#E3000B', 
  width = 1, 
  height = 1, 
  depth = 1,
  rotation = [0, 0, 0],
  emissive = false
}: LegoBrickProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Stud dimensions
  const studRadius = 0.3;
  const studHeight = 0.2;
  const studSpacing = 1;

  // Calculate studs
  const studs = [];
  for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
      studs.push(
        <mesh 
          key={`${x}-${z}`} 
          position={[
            (x - (width - 1) / 2) * studSpacing, 
            height / 2 + studHeight / 2, 
            (z - (depth - 1) / 2) * studSpacing
          ]}
        >
          <cylinderGeometry args={[studRadius, studRadius, studHeight, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={emissive ? color : undefined} 
            emissiveIntensity={emissive ? 0.5 : 0} 
          />
        </mesh>
      );
    }
  }

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main Block */}
      <mesh>
        <boxGeometry args={[width * studSpacing, height, depth * studSpacing]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emissive ? color : undefined} 
          emissiveIntensity={emissive ? 0.5 : 0} 
        />
      </mesh>
      {/* Studs */}
      {studs}
    </group>
  );
}

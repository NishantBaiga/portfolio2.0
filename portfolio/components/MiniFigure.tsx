'use client';
import { useRef, useState } from 'react';
import { LegoBrick } from './LegoBrick';
import { motion } from 'motion/react';

interface MiniFigureProps {
  outfit?: 'wizard' | 'engineer' | 'default';
  emissive?: boolean;
}

export function MiniFigure({ outfit = 'default', emissive = false }: MiniFigureProps) {
  const [rotation, setRotation] = useState(0);

  return (
    <group 
      rotation={[0, rotation, 0]} 
      onClick={() => setRotation(prev => prev + Math.PI / 2)}
      scale={0.8}
    >
      {/* Legs */}
      <LegoBrick position={[-0.4, -1.8, 0]} width={0.8} height={1.2} depth={0.8} color="#0055BF" emissive={emissive} />
      <LegoBrick position={[0.4, -1.8, 0]} width={0.8} height={1.2} depth={0.8} color="#0055BF" emissive={emissive} />
      
      {/* Hips */}
      <LegoBrick position={[0, -1.1, 0]} width={1.8} height={0.4} depth={0.8} color="#0055BF" emissive={emissive} />
      
      {/* Torso */}
      <LegoBrick position={[0, -0.2, 0]} width={1.8} height={1.4} depth={0.8} color={outfit === 'wizard' ? '#4B0082' : outfit === 'engineer' ? '#FF8200' : '#E3000B'} emissive={emissive} />
      
      {/* Arms */}
      <LegoBrick position={[-1.1, -0.2, 0]} width={0.4} height={1.2} depth={0.4} color={outfit === 'wizard' ? '#4B0082' : outfit === 'engineer' ? '#FF8200' : '#E3000B'} emissive={emissive} />
      <LegoBrick position={[1.1, -0.2, 0]} width={0.4} height={1.2} depth={0.4} color={outfit === 'wizard' ? '#4B0082' : outfit === 'engineer' ? '#FF8200' : '#E3000B'} emissive={emissive} />
      
      {/* Hands */}
      <LegoBrick position={[-1.1, -0.9, 0]} width={0.3} height={0.3} depth={0.3} color="#FFD500" emissive={emissive} />
      <LegoBrick position={[1.1, -0.9, 0]} width={0.3} height={0.3} depth={0.3} color="#FFD500" emissive={emissive} />
      
      {/* Neck */}
      <LegoBrick position={[0, 0.6, 0]} width={0.4} height={0.2} depth={0.4} color="#FFD500" emissive={emissive} />
      
      {/* Head */}
      <LegoBrick position={[0, 1.1, 0]} width={1} height={0.8} depth={1} color="#FFD500" emissive={emissive} />
      
      {/* Hat/Hair */}
      {outfit === 'wizard' && (
        <LegoBrick position={[0, 1.8, 0]} width={1.2} height={0.6} depth={1.2} color="#4B0082" emissive={emissive} />
      )}
      {outfit === 'engineer' && (
        <LegoBrick position={[0, 1.6, 0]} width={1.2} height={0.4} depth={1.2} color="#FFD500" emissive={emissive} />
      )}
    </group>
  );
}

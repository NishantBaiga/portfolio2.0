import { LegoBrick } from './LegoBrick';

interface ProjectModelProps {
  type: 'web' | 'mobile' | 'data' | 'game';
  emissive?: boolean;
}

export function ProjectModel({ type, emissive = false }: ProjectModelProps) {
  if (type === 'web') {
    return (
      <group>
        {/* Base */}
        <LegoBrick position={[0, -0.5, 0]} width={4} depth={1} height={0.5} color="#0055BF" emissive={emissive} />
        {/* Screen Frame */}
        <LegoBrick position={[0, 1, 0]} width={4} depth={0.5} height={3} color="#FFFFFF" emissive={emissive} />
        {/* Screen Content */}
        <LegoBrick position={[0, 1, 0.1]} width={3} depth={0.1} height={2} color="#009639" emissive={emissive} />
        {/* Stand */}
        <LegoBrick position={[0, -1, 0]} width={1} depth={1} height={1} color="#A0A0A0" emissive={emissive} />
      </group>
    );
  }

  if (type === 'mobile') {
    return (
      <group>
        {/* Phone Body */}
        <LegoBrick position={[0, 0, 0]} width={2} depth={0.5} height={4} color="#000000" emissive={emissive} />
        {/* Screen */}
        <LegoBrick position={[0, 0, 0.1]} width={1.8} depth={0.1} height={3.5} color="#0055BF" emissive={emissive} />
        {/* Button */}
        <LegoBrick position={[0, -1.8, 0.1]} width={0.4} depth={0.1} height={0.2} color="#FFFFFF" emissive={emissive} />
      </group>
    );
  }

  if (type === 'data') {
    return (
      <group>
        {/* Database Stack */}
        <LegoBrick position={[0, -1, 0]} width={2} depth={2} height={1} color="#A0A0A0" emissive={emissive} />
        <LegoBrick position={[0, 0, 0]} width={2} depth={2} height={1} color="#FFD500" emissive={emissive} />
        <LegoBrick position={[0, 1, 0]} width={2} depth={2} height={1} color="#E3000B" emissive={emissive} />
      </group>
    );
  }

  if (type === 'game') {
    return (
      <group>
        {/* Controller Body */}
        <LegoBrick position={[0, 0, 0]} width={3} depth={0.5} height={1.5} color="#E3000B" emissive={emissive} />
        {/* Buttons */}
        <LegoBrick position={[-1, 0, 0.3]} width={0.5} depth={0.2} height={0.5} color="#FFD500" emissive={emissive} />
        <LegoBrick position={[1, 0, 0.3]} width={0.5} depth={0.2} height={0.5} color="#0055BF" emissive={emissive} />
      </group>
    );
  }

  return null;
}

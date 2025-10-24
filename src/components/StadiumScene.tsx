import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function StadiumPitch() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 40, 1, 1]} />
        <meshStandardMaterial color="#1f513f" />
      </mesh>
      <PitchLines />
    </group>
  );
}

function PitchLines() {
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: "#e7fdf5", linewidth: 1 }), []);
  const group = useRef<THREE.Group>(null);

  useMemo(() => {
    const lines: { points: [number, number, number][] }[] = [];
    const width = 60;
    const height = 40;
    const halfW = width / 2;
    const halfH = height / 2;

    const rect = [
      [-halfW, 0, -halfH],
      [halfW, 0, -halfH],
      [halfW, 0, halfH],
      [-halfW, 0, halfH],
      [-halfW, 0, -halfH]
    ] as [number, number, number][];
    lines.push({ points: rect });

    // Halfway line
    lines.push({ points: [[0, 0, -halfH], [0, 0, halfH]] });

    // Boxes
    const boxW = 36;
    const boxH = 18;
    const smallBoxW = 18;
    const smallBoxH = 6;

    lines.push({
      points: [
        [-boxW / 2, 0, -halfH],
        [boxW / 2, 0, -halfH],
        [boxW / 2, 0, -halfH + boxH],
        [-boxW / 2, 0, -halfH + boxH],
        [-boxW / 2, 0, -halfH]
      ]
    });

    lines.push({
      points: [
        [-boxW / 2, 0, halfH],
        [boxW / 2, 0, halfH],
        [boxW / 2, 0, halfH - boxH],
        [-boxW / 2, 0, halfH - boxH],
        [-boxW / 2, 0, halfH]
      ]
    });

    lines.push({
      points: [
        [-smallBoxW / 2, 0, -halfH],
        [smallBoxW / 2, 0, -halfH],
        [smallBoxW / 2, 0, -halfH + smallBoxH],
        [-smallBoxW / 2, 0, -halfH + smallBoxH],
        [-smallBoxW / 2, 0, -halfH]
      ]
    });

    lines.push({
      points: [
        [-smallBoxW / 2, 0, halfH],
        [smallBoxW / 2, 0, halfH],
        [smallBoxW / 2, 0, halfH - smallBoxH],
        [-smallBoxW / 2, 0, halfH - smallBoxH],
        [-smallBoxW / 2, 0, halfH]
      ]
    });

    // Center circle
    const circlePoints: [number, number, number][] = [];
    const radius = 9;
    const segments = 64;
    for (let i = 0; i <= segments; i += 1) {
      const theta = (i / segments) * Math.PI * 2;
      circlePoints.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius]);
    }
    lines.push({ points: circlePoints });

    const penaltyRadius = 9;
    const penaltySegments = 48;
    const arcs: { centerZ: number; direction: 1 | -1 }[] = [
      { centerZ: -halfH + 12, direction: 1 },
      { centerZ: halfH - 12, direction: -1 }
    ];

    arcs.forEach(({ centerZ, direction }) => {
      const arcPoints: [number, number, number][] = [];
      for (let i = 0; i <= penaltySegments; i += 1) {
        const theta = Math.PI - (i / penaltySegments) * Math.PI;
        const x = Math.cos(theta) * penaltyRadius;
        const z = centerZ + Math.sin(theta) * penaltyRadius * direction;
        arcPoints.push([x, 0, z]);
      }
      lines.push({ points: arcPoints });
    });

    if (group.current) {
      group.current.clear();
      lines.forEach(({ points }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points.map(([x, y, z]) => new THREE.Vector3(x, y + 0.02, z)));
        const line = new THREE.Line(geometry, material);
        group.current!.add(line);
      });
    }
  }, [material]);

  return <group ref={group} />;
}

function StadiumBowl() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absellipse(0, 0, 34, 22, 0, Math.PI * 2, false, 0);

    const hole = new THREE.Path();
    hole.absellipse(0, 0, 28, 17, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 12,
      bevelEnabled: false,
      curveSegments: 64,
      steps: 2
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]} position={[0, -6, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#1A1F2C" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function SeatingBands() {
  const bands = new Array(6).fill(0);
  return (
    <group>
      {bands.map((_, idx) => {
        const height = idx * 2.1 + 0.5;
        const radiusX = 28 + idx * 2.2;
        const radiusZ = 18 + idx * 1.7;
        return (
          <mesh key={idx} rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
            <ringGeometry args={[radiusX, radiusX + 1, 96]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#223348" : "#16202e"}
              emissive={idx === bands.length - 1 ? "#1c83f7" : "#111a27"}
              emissiveIntensity={idx === bands.length - 1 ? 0.6 : 0.1}
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function FloodLight({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.intensity = 2.5 + Math.sin(t * 1.5 + position[0]) * 0.5;
  });

  return (
    <SpotLight
      ref={ref}
      position={position}
      angle={0.7}
      penumbra={0.7}
      distance={120}
      color={color}
      castShadow
      attenuation={0.9}
      intensity={2.5}
      target-position={[0, 0, 0]}
    />
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.z = t * 0.35;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, 16, 0]}>
      <ringGeometry args={[36, 38, 128]} />
      <meshBasicMaterial color="#2ef3a0" transparent opacity={0.28} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function StadiumScene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 32, 58], fov: 45 }}>
      <color attach="background" args={["#030912"]} />
      <fog attach="fog" args={["#030b16", 120, 220]} />
      <ambientLight intensity={0.7} color="#6bd2ff" />
      <directionalLight
        position={[20, 40, 15]}
        intensity={1.1}
        castShadow
        color="#7fffd4"
        shadow-mapSize={1024}
        shadow-camera-far={160}
      />
      <FloodLight position={[50, 45, 0]} color="#2ef3a0" />
      <FloodLight position={[-50, 45, 0]} color="#54a7ff" />
      <FloodLight position={[0, 45, 50]} color="#3af5d0" />
      <FloodLight position={[0, 45, -50]} color="#52a2ff" />
      <group>
        <StadiumPitch />
        <StadiumBowl />
        <SeatingBands />
        <Halo />
      </group>
      <PerspectiveCamera makeDefault position={[0, 34, 68]} fov={50} />
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2.3}
        minPolarAngle={Math.PI / 4}
        minDistance={50}
        maxDistance={80}
        dampingFactor={0.05}
      />
      <Environment preset="night" />
    </Canvas>
  );
}

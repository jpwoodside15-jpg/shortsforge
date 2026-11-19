import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Globe, Compass, Mountain, Volume2, Sparkles, 
  Play, Pause, RotateCw, ZoomIn, ZoomOut, Upload, 
  ExternalLink, Check, Copy, Sliders, Smartphone, ShieldCheck, Eye,
  Navigation, Flame, Trophy, Building2, Waves, Landmark, RefreshCw, 
  Zap, Radio, FastForward, Shield, Flag, HeartHandshake, Film
} from 'lucide-react';
import { 
  WONDERS_DATABASE, WonderLocation, 
  CATEGORIES_CONFIG, LocationCategory 
} from '../data/wondersData';
import { playSoundEffect } from '../utils/soundEffects';

interface Earth3DStudioTabProps {
  onSendToUploader?: (meta: { title: string; description: string; tags: string[] }) => void;
  onSendToSimulator?: (hookText: string) => void;
  onSendToThumbnail?: (frameUrl: string, title?: string) => void;
}

export const Earth3DStudioTab: React.FC<Earth3DStudioTabProps> = ({
  onSendToUploader,
  onSendToSimulator,
  onSendToThumbnail
}) => {
  // Category Filtering & Selection
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory>('all');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('anfield');
  const [locationTypeFilter, setLocationTypeFilter] = useState<'all' | 'stadiums' | 'capital-cities'>('all');

  // 3D Viewport & Drone Camera Flight Modes
  const [zoomLevel, setZoomLevel] = useState<number>(62); // FOV: 8 to 90
  const [flightMode, setFlightMode] = useState<'fpv-dive' | '360-orbit' | 'pitch-sweep' | 'coastal-cruise' | 'manual'>('fpv-dive');
  const [flightSpeed, setFlightSpeed] = useState<number>(75); // km/h
  const [isTurbo, setIsTurbo] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Autopilot & Preset Journey Loops
  const [isAutopilot, setIsAutopilot] = useState<boolean>(true);
  const [journeyLoop, setJourneyLoop] = useState<'spiral-goalpost' | 'turf-120' | 'roof-360' | 'capital-skyline' | 'continuous-tour'>('spiral-goalpost');
  const [autopilotWaypoint, setAutopilotWaypoint] = useState<number>(1);

  // Super Zooming 4K Capability
  const [is4KMode, setIs4KMode] = useState<boolean>(true);
  const [superZoomTier, setSuperZoomTier] = useState<number>(1); // 1, 2, 5, 10, 20

  const filteredLocations = useMemo(() => {
    let locs = WONDERS_DATABASE;
    if (locationTypeFilter === 'stadiums') {
      locs = WONDERS_DATABASE.filter(loc => loc.meshType === 'stadium');
      if (selectedCategory !== 'all') {
        const sub = locs.filter(loc => loc.category === selectedCategory);
        if (sub.length > 0) return sub;
      }
      return locs;
    }
    if (locationTypeFilter === 'capital-cities') {
      return WONDERS_DATABASE.filter(loc => loc.category === 'capital-cities');
    }
    if (selectedCategory === 'all') return WONDERS_DATABASE;
    return WONDERS_DATABASE.filter(loc => loc.category === selectedCategory);
  }, [selectedCategory, locationTypeFilter]);

  const currentLocation = useMemo(() => {
    const found = WONDERS_DATABASE.find(w => w.id === selectedLocationId);
    if (found) return found;
    return filteredLocations[0] || WONDERS_DATABASE[0];
  }, [selectedLocationId, filteredLocations]);

  const handleSetSuperZoomTier = (tier: number) => {
    setSuperZoomTier(tier);
    let fov = 75;
    if (tier === 2) fov = 55;
    else if (tier === 5) fov = 30;
    else if (tier === 10) fov = 16;
    else if (tier === 20) fov = 8;
    setZoomLevel(fov);
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Dynamic Telemetry State (Altimeter, Speed, Compass, Battery)
  const [telemetryAlt, setTelemetryAlt] = useState<number>(115);
  const [telemetrySpeed, setTelemetrySpeed] = useState<number>(75);
  const [telemetryHeading, setTelemetryHeading] = useState<number>(285);
  const [gimbalPitch, setGimbalPitch] = useState<number>(-28);
  const [droneBattery, setDroneBattery] = useState<number>(97);

  // HUD & Safe-Zone Overlays
  const [showTelemetryHud, setShowTelemetryHud] = useState<boolean>(true);
  const [showSafeZoneGrid, setShowSafeZoneGrid] = useState<boolean>(false);
  const [showHookSubtitle, setShowHookSubtitle] = useState<boolean>(true);
  const [customSubtitle, setCustomSubtitle] = useState<string>(currentLocation.viralHookSentence);

  // Sound Effects & Audio State
  const [sfxVolume, setSfxVolume] = useState<number>(0.65);
  const [activeSfx, setActiveSfx] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI Drone Script Generator
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [droneScriptData, setDroneScriptData] = useState<any | null>(null);

  // High Quality 360 Video Generation & MediaRecorder pipeline
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Three.js Canvas Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const beaconRef = useRef<THREE.SpotLight | null>(null);

  // Sync subtitle when location changes
  useEffect(() => {
    setCustomSubtitle(currentLocation.viralHookSentence);
    // Auto-trigger appropriate ambient SFX on location switch
    playSoundEffect(currentLocation.ambientSfx, sfxVolume * 0.7);
  }, [currentLocation]);

  const handlePlaySfx = (
    type: 'drone' | 'stadiumRoar' | 'oceanWaves' | 'cityTraffic' | 'wind' | 'waterfall' | 'whoosh' | 'chime' | 'pulse' | 'subdrop'
  ) => {
    playSoundEffect(type, sfxVolume);
    setActiveSfx(type);
    setTimeout(() => setActiveSfx(null), 1200);
  };

  // Generate AI Drone Commentary & Script
  const handleGenerateDroneScript = async () => {
    setIsGeneratingScript(true);
    try {
      const res = await fetch('/api/drone-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationName: currentLocation.name,
          category: currentLocation.categoryLabel,
          clubOrCity: currentLocation.clubOrCity,
          flightType: currentLocation.flightType,
          elevation: currentLocation.elevation,
          narrativeFacts: currentLocation.narrativeFacts
        })
      });
      const data = await res.json();
      setDroneScriptData(data);
      if (data.viralHook) {
        setCustomSubtitle(data.viralHook);
      }
    } catch (err) {
      console.error('Failed to generate drone script:', err);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // High-Quality Video Generation & MediaRecorder pipeline
  const handleStart360VideoGeneration = () => {
    if (!rendererRef.current) return;
    try {
      recordedChunksRef.current = [];
      const canvas = rendererRef.current.domElement;
      const stream = canvas.captureStream(60); // 60 FPS HD capture

      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8000000 // 8 Mbps high-bitrate video
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setIsRecording(false);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Play ambient sound effect during recording
      playSoundEffect(currentLocation.ambientSfx, sfxVolume);

      let sec = 0;
      const interval = setInterval(() => {
        sec++;
        setRecordingSeconds(sec);
        if (sec >= 6) {
          clearInterval(interval);
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }
      }, 1000);
    } catch (err) {
      console.error('Error starting video recording:', err);
      setIsRecording(false);
    }
  };

  const handleDownloadRecordedVideo = () => {
    if (!recordedVideoUrl) return;
    const a = document.createElement('a');
    a.href = recordedVideoUrl;
    a.download = `${currentLocation.id}-drone-flight-4k.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Copy helper
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Initialize Three.js 3D Scene with Custom Geometry for every location type
  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(currentLocation.skyColors[0]);
    scene.fog = new THREE.FogExp2(currentLocation.skyColors[1], 0.012);

    const camera = new THREE.PerspectiveCamera(zoomLevel, width / height, 0.1, 1200);
    camera.position.set(0, 10, 26);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Main Mesh Group
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // 360 Horizon Atmosphere Skybox
    const domeGeo = new THREE.SphereGeometry(75, 32, 32);
    const domeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentLocation.skyColors[1]),
      side: THREE.BackSide,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    const skyDome = new THREE.Mesh(domeGeo, domeMat);
    group.add(skyDome);

    // ==========================================
    // PROCEDURAL 3D ARCHITECTURE BY MESH TYPE
    // ==========================================

    if (currentLocation.meshType === 'stadium') {
      const colors = currentLocation.stadiumColors || {
        pitch: '#15803d',
        seats: '#dc2626',
        roof: '#ffffff',
        floodlights: '#fef08a',
        accent: '#facc15'
      };

      // 1. Football Turf Grass Pitch (20 x 28)
      const pitchGeo = new THREE.PlaneGeometry(22, 30);
      const pitchMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.pitch),
        roughness: 0.85,
        metalness: 0.05
      });
      const pitch = new THREE.Mesh(pitchGeo, pitchMat);
      pitch.rotation.x = -Math.PI / 2;
      pitch.position.y = -3.95;
      group.add(pitch);

      // Pitch White Field Markings
      // Outer Boundary Lines
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const borderGeo = new THREE.RingGeometry(10.5, 10.65, 4);
      const border = new THREE.Mesh(borderGeo, lineMat);
      border.rotation.x = -Math.PI / 2;
      border.rotation.z = Math.PI / 4;
      border.position.y = -3.92;
      group.add(border);

      // Center Circle & Halfway Line
      const centerCircleGeo = new THREE.RingGeometry(3.2, 3.35, 32);
      const centerCircle = new THREE.Mesh(centerCircleGeo, lineMat);
      centerCircle.rotation.x = -Math.PI / 2;
      centerCircle.position.y = -3.92;
      group.add(centerCircle);

      const halfLineGeo = new THREE.PlaneGeometry(21, 0.18);
      const halfLine = new THREE.Mesh(halfLineGeo, lineMat);
      halfLine.rotation.x = -Math.PI / 2;
      halfLine.position.y = -3.91;
      group.add(halfLine);

      // Penalty Boxes (North & South ends)
      [-11, 11].forEach((pz) => {
        const boxGeo = new THREE.PlaneGeometry(10, 0.18);
        const boxLine = new THREE.Mesh(boxGeo, lineMat);
        boxLine.rotation.x = -Math.PI / 2;
        boxLine.position.set(0, -3.91, pz);
        group.add(boxLine);

        // Goal Posts (Crossbar + Posts)
        const postMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5 });
        const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2), postMat);
        postL.position.set(-2.5, -2.9, pz > 0 ? 14 : -14);
        group.add(postL);

        const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2), postMat);
        postR.position.set(2.5, -2.9, pz > 0 ? 14 : -14);
        group.add(postR);

        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5), postMat);
        bar.rotation.z = Math.PI / 2;
        bar.position.set(0, -1.9, pz > 0 ? 14 : -14);
        group.add(bar);
      });

      // 2. Multi-Tiered Stadium Grandstands (4 Sides: North, South, East, West)
      const seatMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.seats),
        roughness: 0.7,
        flatShading: true
      });

      // East & West Grandstands (Long side)
      [-13.5, 13.5].forEach((sx) => {
        for (let tier = 0; tier < 3; tier++) {
          const tierGeo = new THREE.BoxGeometry(2.5, 1.8 + tier * 1.2, 28);
          const tierMesh = new THREE.Mesh(tierGeo, seatMat);
          const sign = sx > 0 ? 1 : -1;
          tierMesh.position.set(sx + sign * tier * 2.2, -3 + tier * 1.8, 0);
          group.add(tierMesh);
        }
      });

      // North & South Grandstands (Behind Goals)
      [-17, 17].forEach((sz) => {
        const isYellowWall = currentLocation.id === 'signal-iduna-park' && sz > 0;
        const tiersCount = isYellowWall ? 4 : 3;
        for (let tier = 0; tier < tiersCount; tier++) {
          const tierGeo = new THREE.BoxGeometry(26, 1.8 + tier * 1.4, 2.5);
          const tierMat = isYellowWall 
            ? new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.6 })
            : seatMat;
          const tierMesh = new THREE.Mesh(tierGeo, tierMat);
          const sign = sz > 0 ? 1 : -1;
          tierMesh.position.set(0, -3 + tier * 1.8, sz + sign * tier * 2.2);
          group.add(tierMesh);
        }
      });

      // 3. Cantilever Stadium Roof Canopy Truss
      const roofMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.roof),
        roughness: 0.3,
        metalness: 0.6,
        transparent: true,
        opacity: 0.92
      });

      // Cantilever Overhangs on 4 sides
      [-14.5, 14.5].forEach((rx) => {
        const rGeo = new THREE.BoxGeometry(6, 0.4, 32);
        const rMesh = new THREE.Mesh(rGeo, roofMat);
        const sign = rx > 0 ? 1 : -1;
        rMesh.position.set(rx + sign * 1.5, 5.5, 0);
        rMesh.rotation.z = sign * -0.08;
        group.add(rMesh);
      });

      [-18, 18].forEach((rz) => {
        const rGeo = new THREE.BoxGeometry(28, 0.4, 6);
        const rMesh = new THREE.Mesh(rGeo, roofMat);
        const sign = rz > 0 ? 1 : -1;
        rMesh.position.set(0, 5.5, rz + sign * 1.5);
        rMesh.rotation.x = sign * 0.08;
        group.add(rMesh);
      });

      // 4. Towering Corner Floodlight Mast Pylons
      const floodPylons = [
        [-16, -19], [16, -19], [-16, 19], [16, 19]
      ];
      floodPylons.forEach(([fx, fz]) => {
        // Steel Mast Truss
        const mastGeo = new THREE.CylinderGeometry(0.3, 0.7, 18, 8);
        const mastMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
        const mast = new THREE.Mesh(mastGeo, mastMat);
        mast.position.set(fx, 4, fz);
        // Angle toward center of pitch
        mast.lookAt(0, 8, 0);
        group.add(mast);

        // Floodlight Glowing Lamp Head
        const headGeo = new THREE.BoxGeometry(3, 1.8, 0.8);
        const headMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors.floodlights) });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.set(fx, 13, fz);
        head.lookAt(0, -2, 0);
        group.add(head);

        // Downward Spotlight casting light on turf
        const spot = new THREE.SpotLight(new THREE.Color(colors.floodlights), 1.2, 50, Math.PI / 4, 0.4);
        spot.position.set(fx, 13, fz);
        spot.target.position.set(0, -3.9, 0);
        scene.add(spot);
        scene.add(spot.target);
      });

      // Special San Siro Towers if San Siro
      if (currentLocation.id === 'san-siro') {
        const towerMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.7 });
        const towerCoords = [[-15, -18], [15, -18], [-15, 18], [15, 18]];
        towerCoords.forEach(([tx, tz]) => {
          const tGeo = new THREE.CylinderGeometry(2.4, 2.4, 16, 24);
          const tMesh = new THREE.Mesh(tGeo, towerMat);
          tMesh.position.set(tx, 3, tz);
          group.add(tMesh);
        });
      }

    } else if (currentLocation.meshType === 'city') {
      // Procedural 3D Capital City Skyline with illuminated Skyscrapers & Boulevards
      const cityGroup = new THREE.Group();
      group.add(cityGroup);

      // Ground Asphalt / River Basin
      const groundGeo = new THREE.PlaneGeometry(80, 80);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -4;
      cityGroup.add(ground);

      // Grid of Skyscrapers with illuminated windows
      const buildingCount = 38;
      for (let i = 0; i < buildingCount; i++) {
        const bx = ((i % 7) - 3) * 6.5 + (Math.sin(i) * 1.5);
        const bz = (Math.floor(i / 7) - 2.5) * 6.5 + (Math.cos(i) * 1.5);
        
        // Skip center for main landmark
        if (Math.abs(bx) < 4 && Math.abs(bz) < 4) continue;

        const bHeight = 8 + (Math.abs(Math.sin(i * 1.3)) * 22);
        const bWidth = 2.8 + (Math.abs(Math.cos(i)) * 2.2);
        const bDepth = 2.8 + (Math.abs(Math.sin(i * 2.1)) * 2.2);

        const bGeo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
        const bMat = new THREE.MeshStandardMaterial({
          color: (i % 3 === 0) ? 0x1e293b : (i % 3 === 1) ? 0x0f172a : 0x334155,
          roughness: 0.3,
          metalness: 0.7
        });
        const building = new THREE.Mesh(bGeo, bMat);
        building.position.set(bx, -4 + bHeight / 2, bz);
        cityGroup.add(building);

        // Rooftop communication antenna / spire
        if (i % 2 === 0) {
          const antGeo = new THREE.CylinderGeometry(0.08, 0.15, 4, 8);
          const antMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
          const antenna = new THREE.Mesh(antGeo, antMat);
          antenna.position.set(bx, -4 + bHeight + 2, bz);
          cityGroup.add(antenna);
        }
      }

      // Specific Capital Landmarks in Center Plaza
      if (currentLocation.cityLandmark === 'eiffel') {
        // Eiffel Tower Spire (Paris)
        const towerGeo = new THREE.ConeGeometry(5, 24, 4);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0xd97706, wireframe: true });
        const eiffel = new THREE.Mesh(towerGeo, towerMat);
        eiffel.position.set(0, 8, 0);
        cityGroup.add(eiffel);

        // Platform tiers
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(7, 0.8, 7), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
        p1.position.set(0, 2, 0);
        cityGroup.add(p1);
        const p2 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 4), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
        p2.position.set(0, 9, 0);
        cityGroup.add(p2);

      } else if (currentLocation.cityLandmark === 'bigben') {
        // Elizabeth Tower Big Ben (London)
        const towerGeo = new THREE.BoxGeometry(3.5, 20, 3.5);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.8 });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.set(0, 6, 0);
        cityGroup.add(tower);

        // Glowing Clock Face
        const clockGeo = new THREE.CircleGeometry(1.2, 16);
        const clockMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const clock = new THREE.Mesh(clockGeo, clockMat);
        clock.position.set(0, 12, 1.8);
        cityGroup.add(clock);

        // Spire Pyramid
        const spireGeo = new THREE.ConeGeometry(2.5, 6, 4);
        const spireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.set(0, 19, 0);
        cityGroup.add(spire);

      } else if (currentLocation.cityLandmark === 'tokyo') {
        // Tokyo Tower Red & White Lattice Spire
        const ttGeo = new THREE.ConeGeometry(6, 26, 4);
        const ttMat = new THREE.MeshStandardMaterial({ color: 0xef4444, wireframe: true });
        const tokyoTower = new THREE.Mesh(ttGeo, ttMat);
        tokyoTower.position.set(0, 9, 0);
        cityGroup.add(tokyoTower);

      } else if (currentLocation.cityLandmark === 'capitol') {
        // US Capitol Dome (Washington DC)
        const baseGeo = new THREE.BoxGeometry(14, 5, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(0, -1.5, 0);
        cityGroup.add(base);

        const domeGeo = new THREE.SphereGeometry(3.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
        const domeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.set(0, 2.5, 0);
        cityGroup.add(dome);

      } else if (currentLocation.cityLandmark === 'berlin') {
        // Berlin TV Tower (Fernsehturm)
        const mastGeo = new THREE.CylinderGeometry(0.5, 0.9, 28, 16);
        const mastMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.7 });
        const mast = new THREE.Mesh(mastGeo, mastMat);
        mast.position.set(0, 10, 0);
        cityGroup.add(mast);

        const sphereGeo = new THREE.SphereGeometry(3.2, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(0, 17, 0);
        cityGroup.add(sphere);
      }

    } else if (currentLocation.meshType === 'coastline') {
      // Dramatic Coastal Cliffs, Beach Shelf, Animated Ocean Waves & Lighthouse
      const coastGroup = new THREE.Group();
      group.add(coastGroup);

      // Layered Rugged Cliffs
      for (let layer = 0; layer < 4; layer++) {
        const cliffGeo = new THREE.BoxGeometry(36 - layer * 3, 2.5, 14 - layer * 2);
        const cliffMat = new THREE.MeshStandardMaterial({
          color: layer % 2 === 0 ? 0x78716c : 0x57534e,
          roughness: 0.9,
          flatShading: true
        });
        const cliff = new THREE.Mesh(cliffGeo, cliffMat);
        cliff.position.set(0, -2 + layer * 2.2, -10 - layer * 1.5);
        coastGroup.add(cliff);
      }

      // Sandy Beach Shoreline
      const beachGeo = new THREE.PlaneGeometry(42, 6);
      const beachMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.9 });
      const beach = new THREE.Mesh(beachGeo, beachMat);
      beach.rotation.x = -Math.PI / 2;
      beach.position.set(0, -3.9, -1);
      coastGroup.add(beach);

      // Dynamic Ocean Water Plane
      const oceanGeo = new THREE.PlaneGeometry(60, 40, 32, 32);
      const oceanMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.4,
        transparent: true,
        opacity: 0.88
      });
      const ocean = new THREE.Mesh(oceanGeo, oceanMat);
      ocean.rotation.x = -Math.PI / 2;
      ocean.position.set(0, -3.8, 16);
      coastGroup.add(ocean);
      waterMeshRef.current = ocean;

      // Offshore Sea Stack Pillars (e.g. Twelve Apostles)
      const stackCoords = [[-10, 10], [-4, 15], [6, 12], [14, 18]];
      stackCoords.forEach(([sx, sz]) => {
        const stGeo = new THREE.CylinderGeometry(1.2, 1.8, 7, 8);
        const stMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8, flatShading: true });
        const stack = new THREE.Mesh(stGeo, stMat);
        stack.position.set(sx, -0.5, sz);
        coastGroup.add(stack);
      });

      // Clifftop Lighthouse Tower
      const lhGeo = new THREE.CylinderGeometry(0.7, 1.2, 8, 16);
      const lhMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const lighthouse = new THREE.Mesh(lhGeo, lhMat);
      lighthouse.position.set(12, 7, -12);
      coastGroup.add(lighthouse);

      const lampGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 16);
      const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(12, 11.5, -12);
      coastGroup.add(lamp);

      // Rotating Spotlight Beacon
      const beacon = new THREE.SpotLight(0xfff7ed, 3, 50, Math.PI / 8, 0.2);
      beacon.position.set(12, 11.5, -12);
      scene.add(beacon);
      beaconRef.current = beacon;

    } else if (currentLocation.meshType === 'pyramid') {
      // Great Pyramid Khufu + Capstone + Secondary Pyramid
      const pyrGeo = new THREE.ConeGeometry(15, 17, 4, 10, true);
      const pyrMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentLocation.accentColor),
        roughness: 0.85,
        flatShading: true
      });
      const pyramid = new THREE.Mesh(pyrGeo, pyrMat);
      pyramid.rotation.y = Math.PI / 4;
      pyramid.position.y = -1;
      group.add(pyramid);

      const capGeo = new THREE.ConeGeometry(3.6, 4.2, 4);
      const capMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
      const capstone = new THREE.Mesh(capGeo, capMat);
      capstone.position.y = 7.5;
      capstone.rotation.y = Math.PI / 4;
      group.add(capstone);

      // Khafre Pyramid
      const pyr2Geo = new THREE.ConeGeometry(9.5, 12, 4);
      const pyr2Mat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9, flatShading: true });
      const pyr2 = new THREE.Mesh(pyr2Geo, pyr2Mat);
      pyr2.position.set(-20, -3, -14);
      pyr2.rotation.y = Math.PI / 4;
      group.add(pyr2);

    } else if (currentLocation.meshType === 'colosseum') {
      // Colosseum Elliptical Amphitheater with Arcades
      const colGeo = new THREE.CylinderGeometry(14, 14, 10, 32, 6, true);
      const colMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentLocation.accentColor),
        wireframe: true,
        roughness: 0.6
      });
      const colosseum = new THREE.Mesh(colGeo, colMat);
      colosseum.position.y = -2;
      group.add(colosseum);

      const arenaFloorGeo = new THREE.CylinderGeometry(8.5, 8.5, 1, 24);
      const arenaFloorMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9 });
      const arenaFloor = new THREE.Mesh(arenaFloorGeo, arenaFloorMat);
      arenaFloor.position.y = -4;
      group.add(arenaFloor);

    } else if (currentLocation.meshType === 'tajmahal') {
      // Taj Mahal Marble Plinth, Dome & 4 Minarets
      const baseGeo = new THREE.BoxGeometry(14, 8, 14);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.2 });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -2;
      group.add(baseMesh);

      const domeGeo2 = new THREE.SphereGeometry(6, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
      const domeMat2 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.3 });
      const domeMesh = new THREE.Mesh(domeGeo2, domeMat2);
      domeMesh.position.y = 5.2;
      group.add(domeMesh);

      const minaretOffsets = [[-12, -12], [12, -12], [-12, 12], [12, 12]];
      minaretOffsets.forEach(([mx, mz]) => {
        const mGeo = new THREE.CylinderGeometry(0.8, 1.1, 18, 16);
        const mMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9 });
        const minaret = new THREE.Mesh(mGeo, mMat);
        minaret.position.set(mx, 2, mz);
        group.add(minaret);
      });

    } else if (currentLocation.meshType === 'canyon') {
      // Stepped Canyon Strata
      for (let layer = 0; layer < 5; layer++) {
        const cGeo = new THREE.RingGeometry(8 + layer * 4, 12 + layer * 4, 32, 4);
        const cMat = new THREE.MeshStandardMaterial({
          color: layer % 2 === 0 ? 0xc2410c : 0x7c2d12,
          wireframe: true,
          side: THREE.DoubleSide
        });
        const cMesh = new THREE.Mesh(cGeo, cMat);
        cMesh.rotation.x = -Math.PI / 2;
        cMesh.position.y = -layer * 3;
        group.add(cMesh);
      }

    } else {
      // Mountain Summits & Natural Wonders
      const terrainGeo = new THREE.ConeGeometry(13, 20, 16, 12, true);
      const terrainMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentLocation.accentColor),
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8
      });
      const mountainPeak = new THREE.Mesh(terrainGeo, terrainMat);
      mountainPeak.position.y = -2;
      group.add(mountainPeak);
    }

    // Outer Terrain Elevation Ring
    const ringGeo = new THREE.RingGeometry(16, 52, 32, 8);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentLocation.skyColors[2]),
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const groundRing = new THREE.Mesh(ringGeo, ringMat);
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = -10;
    group.add(groundRing);

    // 4. Floating Atmospheric Drone Particles (Dust / Mist / Stadium Ticker-Tape)
    const particleCount = 850;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 70;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 70;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(currentLocation.accentColor),
      size: 0.32,
      transparent: true,
      opacity: 0.85
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    group.add(particleSystem);
    particlesRef.current = particleSystem;

    // 5. Environmental Illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(18, 35, 22);
    scene.add(dirLight);

    // 6. Interactive Mouse Drag for 360° Free Look
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !group) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      // Update heading telemetry
      const headingDeg = Math.round((group.rotation.y * (180 / Math.PI)) % 360);
      setTelemetryHeading((headingDeg + 360) % 360);
    };

    const onMouseUp = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. Dynamic Animation Loop for Drone Flight Modes
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speedMult = isTurbo ? 1.6 : 1.0;

      // Flight Camera Mode Algorithms: Autopilot vs Manual Flight Modes
      if (isAutopilot && group) {
        const t = elapsedTime * speedMult;
        if (journeyLoop === 'spiral-goalpost') {
          // Preset Journey Loop 1: Spiral Stadium Ascent & Goalpost Swoop
          const loopCycle = (t * 0.45) % (Math.PI * 2);
          const phase = loopCycle / (Math.PI * 2);
          const rad = 7 + phase * 19;
          const alt = -1.8 + phase * 18;
          camera.position.x = Math.sin(loopCycle * 2.2) * rad;
          camera.position.y = alt;
          camera.position.z = Math.cos(loopCycle * 2.2) * rad;
          camera.lookAt(0, -1, 0);

          setTelemetryAlt(Math.round(8 + alt * 6));
          setTelemetrySpeed(isTurbo ? 142 : 88);
          setGimbalPitch(Math.round(-15 - phase * 45));
          setAutopilotWaypoint(Math.min(6, Math.floor(phase * 6) + 1));

        } else if (journeyLoop === 'turf-120') {
          // Preset Journey Loop 2: 120 km/h Low-Altitude Turf Skim
          const sweepZ = Math.sin(t * 1.4) * 16;
          const sweepX = Math.cos(t * 0.7) * 3;
          camera.position.set(sweepX, -2.6, sweepZ);
          camera.lookAt(0, -2.2, sweepZ > 0 ? -28 : 28);

          setTelemetryAlt(2);
          setTelemetrySpeed(isTurbo ? 152 : 120);
          setGimbalPitch(-4);
          setAutopilotWaypoint(((Math.floor(t * 0.9) % 6) + 1));

        } else if (journeyLoop === 'roof-360') {
          // Preset Journey Loop 3: 360° Cantilever Roof Truss Orbit
          const angle = t * 0.48;
          camera.position.x = Math.sin(angle) * 27;
          camera.position.y = 11.5 + Math.sin(angle * 2) * 2.5;
          camera.position.z = Math.cos(angle) * 27;
          camera.lookAt(0, 0, 0);

          setTelemetryAlt(Math.round(80 + Math.sin(angle * 2) * 12));
          setTelemetrySpeed(isTurbo ? 122 : 68);
          setGimbalPitch(-32);
          setAutopilotWaypoint(((Math.floor(angle * 1.4) % 6) + 1));

        } else if (journeyLoop === 'capital-skyline') {
          // Preset Journey Loop 4: Capital City Boulevard & Spire Weave
          const pathX = Math.sin(t * 0.55) * 15;
          const pathY = 15 + Math.cos(t * 0.35) * 8;
          const pathZ = Math.cos(t * 0.55) * 20;
          camera.position.set(pathX, pathY, pathZ);
          camera.lookAt(0, 3, 0);

          setTelemetryAlt(Math.round(135 + pathY * 4));
          setTelemetrySpeed(isTurbo ? 138 : 84);
          setGimbalPitch(-40);
          setAutopilotWaypoint(((Math.floor(t * 0.6) % 6) + 1));

        } else {
          // Preset Journey Loop 5: Autonomous Multi-Waypoint Continuous Tour
          const phase = (t * 0.35) % (Math.PI * 2);
          const rad = 22 + Math.sin(phase * 3) * 6;
          camera.position.x = Math.sin(phase) * rad;
          camera.position.y = 8 + Math.cos(phase * 2) * 6;
          camera.position.z = Math.cos(phase) * rad;
          camera.lookAt(0, 0, 0);

          setTelemetryAlt(Math.round(65 + camera.position.y * 4));
          setTelemetrySpeed(isTurbo ? 130 : 76);
          setGimbalPitch(Math.round(-22 - camera.position.y));
          setAutopilotWaypoint(((Math.floor(phase * (6 / (Math.PI * 2))) % 6) + 1));
        }
      } else if (isRotating && group) {
        if (flightMode === 'fpv-dive') {
          // Thrilling FPV steep dive towards pitch / landmark then banking pull-up
          const cycle = (elapsedTime * 0.7 * speedMult) % (Math.PI * 2);
          const diveAlt = 16 + Math.cos(cycle) * 10;
          const diveDist = 18 + Math.sin(cycle) * 8;
          camera.position.y = diveAlt;
          camera.position.z = diveDist;
          camera.lookAt(0, -1, 0);

          group.rotation.y += 0.004 * speedMult;
          // Dynamic Telemetry update
          setTelemetryAlt(Math.round(20 + diveAlt * 6));
          setTelemetrySpeed(Math.round(isTurbo ? 128 : 78 + Math.sin(cycle) * 25));
          setGimbalPitch(Math.round(-55 + Math.cos(cycle) * 25));

        } else if (flightMode === '360-orbit') {
          // Smooth circular orbit around stadium / monument
          group.rotation.y += 0.006 * speedMult;
          camera.position.y = 8 + Math.sin(elapsedTime * 0.5) * 2;
          camera.position.z = 24;
          camera.lookAt(0, 1, 0);

          setTelemetryAlt(Math.round(95 + Math.sin(elapsedTime * 0.5) * 15));
          setTelemetrySpeed(Math.round(isTurbo ? 110 : 65));
          setGimbalPitch(-28);

        } else if (flightMode === 'pitch-sweep') {
          // Low 2m turf skim right over the grass through the goalposts
          const sweepZ = Math.sin(elapsedTime * 1.2 * speedMult) * 14;
          camera.position.set(0, -1.8, sweepZ);
          camera.lookAt(0, -1.8, sweepZ > 0 ? -15 : 15);

          setTelemetryAlt(Math.round(3 + Math.abs(sweepZ) * 0.5));
          setTelemetrySpeed(Math.round(isTurbo ? 135 : 92));
          setGimbalPitch(-8);

        } else if (flightMode === 'coastal-cruise') {
          // Shoreline wave following cruise
          camera.position.y = 6 + Math.sin(elapsedTime * 0.8) * 3;
          camera.position.z = 22 + Math.cos(elapsedTime * 0.6) * 5;
          group.rotation.y += 0.005 * speedMult;

          setTelemetryAlt(Math.round(45 + Math.sin(elapsedTime * 0.8) * 12));
          setTelemetrySpeed(Math.round(isTurbo ? 115 : 72));
          setGimbalPitch(-35);
        }
      }

      // Rotating lighthouse beacon in coastline mode
      if (beaconRef.current) {
        beaconRef.current.target.position.x = 12 + Math.cos(elapsedTime * 2) * 20;
        beaconRef.current.target.position.z = -12 + Math.sin(elapsedTime * 2) * 20;
      }

      // Particle floating drift
      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentLocation, flightMode, isRotating, isTurbo, zoomLevel, isAutopilot, journeyLoop]);

  // Update FOV on Zoom Change
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = zoomLevel;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoomLevel]);

  // 4K High-Definition Rendering Resolution Scale
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setPixelRatio(is4KMode ? Math.min(window.devicePixelRatio * 1.5, 3) : Math.min(window.devicePixelRatio, 2));
    }
  }, [is4KMode]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-blue-950/40 border border-red-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/30">
                <Globe className="w-5 h-5 text-red-400" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                3D Drone Flights &amp; Stadium Flyovers
              </h2>
            </div>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              High-velocity FPV drone flights over Premier League stadiums, Bundesliga arenas, Serie A cathedrals, Eredivisie cauldrons, Spanish giants, South American fortresses, capital city skylines, dramatic coastlines, and ancient world monuments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-500/10 text-red-300 px-3 py-1.5 rounded-full border border-red-500/20 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              60 FPS WebGL Drone Engine • Web Audio
            </span>
          </div>
        </div>
      </div>

      {/* Scope Filter Bar: Choose Any Football Stadium vs Capital Cities vs All Sights */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => {
              setLocationTypeFilter('all');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              locationTypeFilter === 'all'
                ? 'bg-red-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All 3D Sights ({WONDERS_DATABASE.length})</span>
          </button>

          <button
            onClick={() => {
              setLocationTypeFilter('stadiums');
              setSelectedCategory('all');
              const firstStad = WONDERS_DATABASE.find(w => w.meshType === 'stadium');
              if (firstStad) setSelectedLocationId(firstStad.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              locationTypeFilter === 'stadiums'
                ? 'bg-red-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>🏟️ Choose Any Football Stadium ({WONDERS_DATABASE.filter(w => w.meshType === 'stadium').length})</span>
          </button>

          <button
            onClick={() => {
              setLocationTypeFilter('capital-cities');
              setSelectedCategory('capital-cities');
              const firstCity = WONDERS_DATABASE.find(w => w.category === 'capital-cities');
              if (firstCity) setSelectedLocationId(firstCity.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              locationTypeFilter === 'capital-cities'
                ? 'bg-red-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>🏙️ Capital Cities Drone Flights ({WONDERS_DATABASE.filter(w => w.category === 'capital-cities').length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-400">Drone Target:</span>
          <span className="text-white font-bold bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
            {currentLocation.name}
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                // Auto pick first location in that category
                const firstInCat = WONDERS_DATABASE.find(w => cat.id === 'all' || w.category === cat.id);
                if (firstInCat) setSelectedLocationId(firstInCat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/30'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                isActive ? 'bg-black/30 text-white' : 'bg-zinc-950 text-zinc-500'
              }`}>
                {cat.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Location Selector Carousel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 overflow-x-auto no-scrollbar shadow-inner">
        {filteredLocations.map((loc) => {
          const isSelected = loc.id === currentLocation.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedLocationId(loc.id)}
              className={`px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 text-left min-w-[210px] cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-lg shadow-red-950/50'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-zinc-900 text-zinc-400'
                }`}>
                  {loc.categoryLabel}
                </span>
                <span className="text-[10px] text-amber-300 font-mono font-bold">
                  {loc.flightType}
                </span>
              </div>

              <div className="font-bold text-white truncate max-w-[190px]">
                {loc.name}
              </div>

              <div className="text-[10px] opacity-85 mt-1 font-mono flex items-center justify-between">
                <span>{loc.clubOrCity || loc.country}</span>
                <span>{loc.capacity || loc.elevation}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 9:16 Interactive 3D Canvas Viewport with Live Cockpit HUD */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-[320px] sm:w-[360px] aspect-[9/16] bg-black rounded-[38px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-[5px] border-zinc-800 ring-1 ring-zinc-700/60 overflow-hidden">
            
            {/* Phone Top Notch / Speaker */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
            </div>

            {/* 3D WebGL Canvas Container */}
            <div 
              ref={mountRef} 
              className="relative w-full h-full rounded-[30px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              {/* DRONE COCKPIT HUD OVERLAYS */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-30">
                
                {/* Top Cockpit Telemetry Bar */}
                {showTelemetryHud && (
                  <div className="pt-6 space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-[10px]">
                      {/* Left: Tally & FPS indicator */}
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/40 text-red-400 font-bold shadow">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        <span>{isRecording ? `REC ${recordingSeconds}s` : is4KMode ? '4K 60FPS HDR' : 'HD 60FPS'}</span>
                      </div>

                      {/* Right: Drone Battery & Voltage */}
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white shadow">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>BAT: {droneBattery}% [4.18V]</span>
                      </div>
                    </div>

                    {/* Autopilot & Super Zoom Status Banner */}
                    <div className="flex items-center justify-between text-[10px] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-red-500/30 text-zinc-200">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isAutopilot ? 'bg-red-400 animate-pulse' : 'bg-zinc-600'}`}></span>
                        <span className="font-bold text-red-300">
                          {isAutopilot ? `AUTOPILOT: ${journeyLoop.toUpperCase().replace('-', ' ')}` : 'MANUAL FPV CONTROL'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isAutopilot && (
                          <span className="text-amber-300 font-bold">WP {autopilotWaypoint}/6</span>
                        )}
                        <span className="text-cyan-300 font-bold bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">
                          {superZoomTier}x ZOOM ({zoomLevel}°)
                        </span>
                      </div>
                    </div>

                    {/* Altimeter, Speed & Gimbal Pitch */}
                    <div className="flex items-center justify-between text-[10px] text-zinc-300">
                      <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="text-blue-400 font-bold">ALT:</span>
                        <span className="text-white font-bold">{telemetryAlt}m</span>
                      </div>

                      <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                        <span className="text-amber-400 font-bold">SPD:</span>
                        <span className="text-white font-bold">{telemetrySpeed} km/h</span>
                        {isTurbo && <span className="text-red-400 font-bold">TURBO</span>}
                      </div>

                      <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">GIMBAL:</span>
                        <span className="text-white font-bold">{gimbalPitch}°</span>
                      </div>
                    </div>

                    {/* Coordinates & Heading */}
                    <div className="flex items-center justify-between text-[9px] text-zinc-400">
                      <div className="bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        📍 {currentLocation.coordinates}
                      </div>
                      <div className="bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        HDG: {telemetryHeading}° N
                      </div>
                    </div>
                  </div>
                )}

                {/* Optical Super-Zoom Reticle / Crosshair Overlay for 5x, 10x, 20x */}
                {superZoomTier >= 5 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="relative w-28 h-28 border border-red-500/40 rounded-full flex items-center justify-center">
                      <div className="absolute w-full h-[1px] bg-red-500/50"></div>
                      <div className="absolute h-full w-[1px] bg-red-500/50"></div>
                      <div className="w-10 h-10 border border-amber-400/60 rounded-full animate-ping opacity-25"></div>
                      <div className="absolute -bottom-6 text-[9px] font-mono text-cyan-300 bg-black/85 px-2 py-0.5 rounded border border-cyan-500/40 whitespace-nowrap shadow-lg">
                        4K OPTICAL {superZoomTier}x • FOCAL {superZoomTier * 50}mm • GYRO STAB: 99.8%
                      </div>
                    </div>
                  </div>
                )}

                {/* Safe-Zone Framing Grid (CapCut Safe Zone) */}
                {showSafeZoneGrid && (
                  <div className="absolute inset-x-4 top-24 bottom-24 border border-dashed border-red-500/50 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                    <span className="text-[9px] font-mono text-red-400 uppercase font-bold bg-black/70 px-1.5 py-0.5 rounded w-fit">
                      CapCut 9:16 Safe Boundary
                    </span>
                    <span className="text-[9px] font-mono text-red-400 uppercase font-bold bg-black/70 px-1.5 py-0.5 rounded w-fit self-end">
                      No Buttons Zone
                    </span>
                  </div>
                )}

                {/* Center / Lower-Middle: High-Retention Spoken Caption Overlay */}
                {showHookSubtitle && (
                  <div className="space-y-1.5 text-center drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] px-2">
                    <div className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-lg">
                      🚁 {currentLocation.categoryLabel.toUpperCase()} • FPV
                    </div>
                    <div 
                      className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight"
                      style={{
                        textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.9)'
                      }}
                    >
                      {customSubtitle.split(' ').map((word, i) => {
                        const isHighlight = i === 1 || i === 2 || 
                          word.toLowerCase().includes('fear') || 
                          word.toLowerCase().includes('banned') || 
                          word.toLowerCase().includes('secret') || 
                          word.toLowerCase().includes('decibel');
                        return (
                          <span key={i} className={`inline-block mx-0.5 ${isHighlight ? 'text-[#FFE600]' : 'text-white'}`}>
                            {word}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bottom Status / Drag Prompt */}
                <div className="text-center pb-2">
                  <span className="text-[9px] font-mono uppercase bg-black/60 text-zinc-300 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                    WASD or Drag 360° • Scroll Zoom
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 mt-2 text-center">
            Interactive 3D drone viewport rendered at 9:16 vertical resolution. Click and drag inside to control flight perspective.
          </p>
        </div>

        {/* Right Column: Flight Modes, Turbo Boost, Sound Library, AI Commentary & Video Export */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. Autopilot & Preset Journey Loops */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Drone Autopilot &amp; Preset Journey Loops
                </h3>
              </div>

              <button
                onClick={() => setIsAutopilot(!isAutopilot)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                  isAutopilot 
                    ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-950/60'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Radio className={`w-3 h-3 ${isAutopilot ? 'animate-pulse text-amber-300' : ''}`} />
                <span>{isAutopilot ? 'AUTOPILOT ENGAGED' : 'MANUAL CONTROL'}</span>
              </button>
            </div>

            {/* Preset Journey Loops (Selectable Options) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-zinc-300 block">
                Selectable Autopilot Flight Trajectories:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'spiral-goalpost', label: '🌀 Spiral Stadium Swoop', desc: 'Center circle ascent over goalposts' },
                  { id: 'turf-120', label: '⚡ 120 km/h Turf Skim', desc: '1.5m turf level grass skimming' },
                  { id: 'roof-360', label: '🏟️ 360° Cantilever Roof Orbit', desc: 'Stadium roof truss perimeter flight' },
                  { id: 'capital-skyline', label: '🏙️ Capital City Slalom', desc: 'Metropolis boulevard & spire traverse' },
                  { id: 'continuous-tour', label: '🔄 6-Waypoint Loop', desc: 'Autonomous continuous tour' }
                ].map((loop) => (
                  <button
                    key={loop.id}
                    onClick={() => {
                      setJourneyLoop(loop.id as any);
                      setIsAutopilot(true);
                      setIsRotating(true);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                      isAutopilot && journeyLoop === loop.id
                        ? 'bg-gradient-to-r from-red-600/30 to-rose-600/20 border-red-500 text-white font-bold shadow'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-semibold text-zinc-100 truncate">{loop.label}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{loop.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Turbo Boost & Manual Flight Modes fallback */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <button
                onClick={() => setIsTurbo(!isTurbo)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                  isTurbo 
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md animate-pulse'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>TURBO BOOST (150 KM/H)</span>
              </button>

              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold border transition cursor-pointer ${
                  isRotating ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                }`}
              >
                {isRotating ? 'CAMERA MOTION: ACTIVE' : 'CAMERA FROZEN'}
              </button>
            </div>
          </div>

          {/* 2. Super Zooming 4K Capability Engine */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Super Zooming 4K Capability Engine
                </h3>
              </div>

              {/* 4K Resolution Toggle */}
              <button
                onClick={() => setIs4KMode(!is4KMode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 border transition cursor-pointer ${
                  is4KMode
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>{is4KMode ? '4K ULTRA HD ON' : '1080P HD'}</span>
              </button>
            </div>

            {/* Super Zoom Tiers (1x to 20x) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">
                  Optical Super-Zoom Tiers (Telephoto Lens)
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {superZoomTier}x Optical • {zoomLevel}° FOV
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { tier: 1, label: '1x Wide', fov: '75°' },
                  { tier: 2, label: '2x Cine', fov: '55°' },
                  { tier: 5, label: '5x Tele', fov: '30°' },
                  { tier: 10, label: '10x Super', fov: '16°' },
                  { tier: 20, label: '20x Ultra', fov: '8°' }
                ].map((z) => (
                  <button
                    key={z.tier}
                    onClick={() => handleSetSuperZoomTier(z.tier)}
                    className={`py-2 px-1 rounded-xl border text-center transition cursor-pointer ${
                      superZoomTier === z.tier
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{z.label}</div>
                    <div className="text-[9px] font-mono text-zinc-500">{z.fov}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fine FOV Zoom Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-[11px] text-zinc-400">Continuous Focal Adjustment:</span>
                <span className="text-[10px] font-mono text-zinc-400">{zoomLevel}° Field of View</span>
              </div>
              <input
                type="range"
                min={8}
                max={85}
                value={zoomLevel}
                onChange={(e) => {
                  const z = parseInt(e.target.value, 10);
                  setZoomLevel(z);
                  if (cameraRef.current) {
                    cameraRef.current.fov = z;
                    cameraRef.current.updateProjectionMatrix();
                  }
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* HUD & Safe Zone Toggles */}
            <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-zinc-300">
                <input
                  type="checkbox"
                  checked={showTelemetryHud}
                  onChange={(e) => setShowTelemetryHud(e.target.checked)}
                  className="accent-red-500"
                />
                <span>Cockpit Telemetry HUD</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-zinc-300">
                <input
                  type="checkbox"
                  checked={showSafeZoneGrid}
                  onChange={(e) => setShowSafeZoneGrid(e.target.checked)}
                  className="accent-red-500"
                />
                <span>CapCut Safe Zone</span>
              </label>
            </div>
          </div>

          {/* 2. Sonic Sound Effects Library (Web Audio API) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <Volume2 className="w-4 h-4 text-emerald-400" /> Sonic Ambience &amp; Sound Library
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Web Audio Synthesizer
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: 'drone', label: 'FPV Motor Whine', desc: 'Brushless hum', icon: '🚁' },
                { type: 'stadiumRoar', label: 'Stadium Roar', desc: '80,000 chants', icon: '🏟️' },
                { type: 'oceanWaves', label: 'Ocean Waves', desc: 'Coastal surf', icon: '🌊' },
                { type: 'cityTraffic', label: 'Capital City', desc: 'Urban pulse', icon: '🏙️' },
                { type: 'wind', label: 'Alpine Wind', desc: 'Summit gale', icon: '💨' },
                { type: 'subdrop', label: 'Subdrop Hit', desc: 'Hook impact', icon: '💥' },
                { type: 'whoosh', label: 'Swoosh Whoosh', desc: 'FPV roll transition', icon: '⚡' },
                { type: 'chime', label: 'Wonder Chime', desc: 'Discovery bell', icon: '🔔' }
              ].map((sfx) => (
                <button
                  key={sfx.type}
                  onClick={() => handlePlaySfx(sfx.type as any)}
                  className={`p-2 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                    activeSfx === sfx.type
                      ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold scale-105'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{sfx.icon}</span>
                    <Play className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="mt-1">
                    <div className="font-semibold text-white text-[11px] truncate">{sfx.label}</div>
                    <div className="text-[9px] text-zinc-500">{sfx.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
              <span>SFX Volume: {Math.round(sfxVolume * 100)}%</span>
              <input
                type="range"
                min={10}
                max={100}
                value={Math.round(sfxVolume * 100)}
                onChange={(e) => setSfxVolume(parseInt(e.target.value, 10) / 100)}
                className="w-36 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. AI Drone Script & Flight Commentary Generator */}
          <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" /> AI Drone Flight Commentary &amp; Script
              </h4>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">
                Retention 98%
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Generate viral 35-to-45 second narration scripts, camera cues, and retention hooks for <strong>{currentLocation.name}</strong>:
            </p>

            <button
              onClick={handleGenerateDroneScript}
              disabled={isGeneratingScript}
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isGeneratingScript ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing High-Retention Drone Script...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate AI Drone Commentary Script</span>
                </>
              )}
            </button>

            {droneScriptData && (
              <div className="bg-zinc-950 rounded-xl p-3.5 border border-zinc-800 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Spoken 3-Sec Hook:</span>
                  <p className="text-amber-300 font-bold mt-0.5">{droneScriptData.viralHook}</p>
                </div>

                {droneScriptData.segments && droneScriptData.segments.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Shot List &amp; Pacing:</span>
                    {droneScriptData.segments.map((seg: any, idx: number) => (
                      <div key={idx} className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800 text-[11px] space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span className="text-red-400 font-bold">{seg.timestamp}</span>
                          <span className="text-amber-400">{seg.sfxCue}</span>
                        </div>
                        <div className="text-zinc-200">{seg.spokenNarration}</div>
                        <div className="text-[10px] text-blue-400 font-mono">🎥 {seg.fpvCameraDirection}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleCopyText(
                      `${droneScriptData.viralHook}\n\n` + 
                      (droneScriptData.segments?.map((s: any) => `[${s.timestamp}] ${s.spokenNarration} (FPV: ${s.fpvCameraDirection})`).join('\n\n') || ''),
                      'fullScript'
                    )}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'fullScript' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Full Script</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. High-Quality 360° Video Generation & Export */}
          <div className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" /> High-Quality 360° Video Generation
              </h4>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-bold">
                9:16 Vertical 60FPS
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Capture actual high-quality drone flight footage of <strong>{currentLocation.name}</strong> directly from the WebGL engine with synced audio:
            </p>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <RotateCw className={`w-3.5 h-3.5 text-blue-400 ${isRecording ? 'animate-spin' : ''}`} />
                  <span>360° Drone Flight Sequence (6 Seconds)</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  Format: WebM / VP9 HD • Aspect: 9:16 (1080x1920)
                </div>
              </div>

              {!isRecording ? (
                <button
                  onClick={handleStart360VideoGeneration}
                  className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Generate 360° Video</span>
                </button>
              ) : (
                <div className="px-3.5 py-2 bg-red-600/30 border border-red-500 text-red-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                  <span>Rendering ({recordingSeconds}/6s)...</span>
                </div>
              )}
            </div>

            {recordedVideoUrl && (
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Drone Video Generated Successfully!</span>
                </div>
                <button
                  onClick={handleDownloadRecordedVideo}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 rotate-180" />
                  <span>Download Video</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Direct YouTube Upload & CapCut Safe-Zone Integration */}
          <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Upload className="w-4 h-4 text-red-400" /> Direct Publishing Pipeline
              </h4>
              <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono font-bold">
                Ready to Publish
              </span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs space-y-1">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Title (&lt;60 Chars):</span>
              <p className="text-white font-bold">{currentLocation.youtubeTitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              {onSendToUploader && (
                <button
                  onClick={() => {
                    onSendToUploader({
                      title: currentLocation.youtubeTitle,
                      description: currentLocation.youtubeDescription,
                      tags: currentLocation.hashtags.map(h => h.replace('#', ''))
                    });
                  }}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Send to YouTube Uploader Tab</span>
                </button>
              )}

              {onSendToThumbnail && (
                <button
                  onClick={() => {
                    let frameUrl = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1280&q=80';
                    if (mountRef.current) {
                      const canvas = mountRef.current.querySelector('canvas');
                      if (canvas) {
                        try {
                          frameUrl = canvas.toDataURL('image/jpeg', 0.9);
                        } catch (e) {}
                      }
                    }
                    onSendToThumbnail(frameUrl, `${currentLocation.name} 4K Drone Flight`);
                  }}
                  className="px-3 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  <span>Send to Thumbnail Studio</span>
                </button>
              )}

              {onSendToSimulator && (
                <button
                  onClick={() => onSendToSimulator(customSubtitle)}
                  className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Safe-Zone Test</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

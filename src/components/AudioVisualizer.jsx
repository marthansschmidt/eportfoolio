import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import './AudioVisualizer.css';

export default function AudioVisualizer({ className = '', defaultAudio = '/muusika.mp3', onPlayStateChange }) {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const contextRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize with default audio
  useEffect(() => {
    if (defaultAudio && audioRef.current === null) {
      const audio = new Audio(defaultAudio);
      audio.volume = volume;
      audioRef.current = audio;

      // Setup audio context and analyser
      if (!contextRef.current) {
        contextRef.current = new AudioContext();
      }

      const src = contextRef.current.createMediaElementSource(audio);
      const analyser = contextRef.current.createAnalyser();
      src.connect(analyser);
      analyser.connect(contextRef.current.destination);
      analyser.fftSize = 512;
      analyserRef.current = analyser;
    }
  }, [defaultAudio]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const noise3D = createNoise3D();

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 100;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create icosahedron sphere
    const geometry = new THREE.IcosahedronGeometry(20, 4);
    const material = new THREE.MeshLambertMaterial({
      color: '#8b5cf6',
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const light = new THREE.DirectionalLight('#ffffff', 0.8);
    light.position.set(0, 50, 100);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight('#404040', 0.5);
    scene.add(ambientLight);

    // Store original vertices
    const positionAttribute = geometry.getAttribute('position');
    const originalPositions = new Float32Array(positionAttribute.array);

    // Animation data
    let dataArray = new Uint8Array(256);

    // Helper functions
    const modulate = (val, minVal, maxVal, outMin, outMax) => {
      const fr = (val - minVal) / (maxVal - minVal);
      const delta = outMax - outMin;
      return outMin + (fr * delta);
    };

    const avg = (arr) => arr.reduce((sum, b) => sum + b, 0) / arr.length;
    const max = (arr) => arr.reduce((a, b) => Math.max(a, b), 0);

    // Warp sphere based on audio
    const warpSphere = (bassFr, treFr) => {
      const positions = geometry.getAttribute('position');
      const time = performance.now();
      const rf = 0.00001;
      const amp = 5;
      const offset = 20;

      for (let i = 0; i < positions.count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const ox = originalPositions[ix];
        const oy = originalPositions[iy];
        const oz = originalPositions[iz];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;

        const noiseVal = noise3D(
          nx + time * rf * 4,
          ny + time * rf * 6,
          nz + time * rf * 7
        );
        const distance = (offset + bassFr) + noiseVal * amp * treFr * 2;

        positions.array[ix] = nx * distance;
        positions.array[iy] = ny * distance;
        positions.array[iz] = nz * distance;
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    };

    // Render loop
    const render = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      const lowerHalf = dataArray.slice(0, dataArray.length / 2);
      const upperHalf = dataArray.slice(dataArray.length / 2);

      const lowerMax = max(lowerHalf);
      const upperAvg = avg(upperHalf);

      const lowerMaxFr = lowerMax / lowerHalf.length;
      const upperAvgFr = upperAvg / upperHalf.length;

      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.003;
      sphere.rotation.z += 0.005;

      warpSphere(
        modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
        modulate(upperAvgFr, 0, 1, 0, 4)
      );

      const hue = (lowerMaxFr * 0.5 + 0.7) % 1;
      material.color.setHSL(hue, 0.8, 0.5);

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    // Resume audio context if suspended (required by modern browsers)
    if (contextRef.current && contextRef.current.state === 'suspended') {
      contextRef.current.resume();
    }

    if (audioRef.current.paused) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    }
  };

  return (
    <div className={`audio-visualizer ${className}`}>
      <div
        ref={containerRef}
        className="audio-visualizer-canvas"
        onClick={togglePlay}
      />
      <div className="audio-visualizer-controls">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="audio-volume-slider"
          title="Volume"
        />
        <span className="audio-volume-label">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}

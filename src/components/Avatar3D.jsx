import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

function Model() {
  const { scene } = useGLTF('/img/avatar character 3d model.glb');
  
  return <primitive object={scene} scale={4.5} position={[0, -1, 0]} />;
}

export default function Avatar3D() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section"
      style={{ 
        minHeight: '550px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px' 
        }}>
          <h2 style={{ marginBottom: '16px' }}>Meet Our Avatar</h2>
          <p style={{ 
            color: 'var(--text-muted)', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Explore our interactive 3D character. Drag horizontally to rotate, scroll to zoom.
          </p>
        </div>
        
        <div style={{
          width: '100%',
          maxWidth: '400px',
          height: '500px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Model />
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={3.5}
                maxDistance={6}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={1}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </motion.section>
  );
}


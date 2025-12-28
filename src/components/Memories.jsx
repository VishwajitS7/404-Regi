import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Memories() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="section" style={{ perspective: "1500px", overflow: 'hidden' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Chapter 4: The Legacy</h2>
                    <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>
                        Every year, we write a new story. Flip through the pages of our past events and see where it all began.
                    </p>
                </motion.div>

                {/* 3D Book Container */}
                <div
                    style={{
                        width: 380, // Aspect ratio of cover approx
                        height: 520,
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* Back Cover (Static) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: '#fef3c7', // Matching the inside page color
                        borderRadius: '8px 16px 16px 8px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        transform: 'translateZ(-1px)' // Slightly behind
                    }} />

                    {/* Inside Right Page (Static Base) */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        borderRadius: '8px 16px 16px 8px',
                        overflow: 'hidden',
                        background: '#fef3c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* We only show the RIGHT half of the inside image here */}
                        <img
                            src="/assets/memories-inside.png"
                            alt="Memories Inside"
                            style={{
                                width: '200%', // Double width 
                                maxWidth: 'none',
                                height: '100%',
                                objectFit: 'cover',
                                transform: 'translateX(-25%)' // Shift to show right half better
                            }}
                        />
                    </div>

                    {/* Front Cover (Flippable) */}
                    <motion.div
                        animate={{ rotateY: isOpen ? -160 : 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '101%', // Slight overlap
                            height: '100%',
                            transformOrigin: 'left center',
                            transformStyle: 'preserve-3d',
                            zIndex: 10,
                            backfaceVisibility: 'hidden', // Hide when flipped to reveal "inside left"
                        }}
                    >
                        <img
                            src="/assets/memories-cover.png"
                            alt="Memories Cover"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px 16px 16px 8px',
                                boxShadow: '-5px 0 15px rgba(0,0,0,0.2)'
                            }}
                        />
                    </motion.div>

                    {/* Inside Left Page (Back of Front Cover) */}
                    <motion.div
                        animate={{ rotateY: isOpen ? -160 : 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transformOrigin: 'left center',
                            transformStyle: 'preserve-3d',
                            zIndex: 10, // Same logic group as front cover
                            background: '#fef3c7',
                            borderRadius: '8px 16px 16px 8px',
                            backfaceVisibility: 'visible', // Visible when rotated
                        }}
                    >
                        {/* This content shows when flipped (rotateY is -160deg) */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            transform: 'rotateY(180deg)', // Pre-flip the content so it's right way up when book is open
                            overflow: 'hidden',
                            borderRadius: '16px 8px 8px 16px'
                        }}>
                            <img
                                src="/assets/memories-inside.png"
                                alt="Memories Inside Left"
                                style={{
                                    width: '200%',
                                    maxWidth: 'none',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: 'translateX(-50%)' // Show LEFT half
                                }}
                            />
                        </div>
                    </motion.div>

                </div>

                <p style={{ marginTop: 40, fontFamily: 'monospace', opacity: 0.6 }}>
                    &lt; Hover to unlock memories /&gt;
                </p>

            </div>
        </section>
    );
}

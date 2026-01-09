import React, { Suspense, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const Flipbook = () => {
    const [dimensions, setDimensions] = useState(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                return { width: 250, height: 340 };
            } else if (window.innerWidth < 1024) {
                return { width: 300, height: 410 };
            }
        }
        return { width: 350, height: 480 };
    });
    const [isClosed, setIsClosed] = useState(true);
    
    // Using images from the img folder
    const images = [
        "/img/4.jpeg",
        "/img/49192829_10101658517075357_4372534237862035456_o.jpg",
        "/img/Avatar_The_Way_of_Water_ScreenX_Poster.webp",
        "/img/Avatar-poster.jpg",
        "/img/d596631742582.5600fed0901f2.webp",
        "/img/images (1).jpg",
        "/img/images (2).jpg",
        "/img/images (3).jpg",
        "/img/images.jpg",
        "/img/img_2101.jpg",
        "/img/MV5BNTQ4Y2NiZDUtOGUzNC00ZjQ4LWFmNTQtYThmYWYxYzZiNDk2XkEyXkFqcGc@._V1_.jpg",
        "/img/s-l500.jpg",
    ];

    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

    useEffect(() => {
        setIsClosed(true);
        
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            if (window.innerWidth < 768) {
                setDimensions({ width: 250, height: 340 });
            } else if (window.innerWidth < 1024) {
                setDimensions({ width: 300, height: 410 });
            } else {
                setDimensions({ width: 350, height: 480 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <section className="section" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%',
            padding: '3rem 0'
        }}>
            <div className="container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    margin: '0 auto',
                    marginLeft: !isMobile ? (isClosed ? '-15%' : '5%') : '0',
                    transition: 'margin-left 0.5s ease-in-out',
                    animation: 'floatBook 3s ease-in-out infinite',
                    position: 'relative'
                }}>
                    {/* Floating Glow Effects */}
                    <div style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                        borderRadius: '50%',
                        top: '-50px',
                        left: '-50px',
                        zIndex: -1,
                        pointerEvents: 'none',
                        animation: 'floatGlow1 6s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(80, 200, 120, 0.25) 0%, transparent 70%)',
                        filter: 'blur(25px)',
                        borderRadius: '50%',
                        bottom: '-30px',
                        right: '-30px',
                        zIndex: -1,
                        pointerEvents: 'none',
                        animation: 'floatGlow2 8s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '180px',
                        height: '180px',
                        background: 'radial-gradient(circle, rgba(157, 0, 255, 0.2) 0%, transparent 70%)',
                        filter: 'blur(35px)',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -1,
                        pointerEvents: 'none',
                        animation: 'floatGlow3 7s ease-in-out infinite'
                    }}></div>
                    {/* Main Glow Background */}
                    <div style={{
                        position: 'absolute',
                        width: '140%',
                        height: '140%',
                        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(80, 200, 120, 0.08) 40%, rgba(157, 0, 255, 0.06) 70%, transparent 100%)',
                        filter: 'blur(50px)',
                        zIndex: -2,
                        pointerEvents: 'none'
                    }}></div>
                    <HTMLFlipBook
                    width={dimensions.width}
                    height={dimensions.height}
                    size="fixed"
                    minWidth={dimensions.width}
                    maxWidth={dimensions.width}
                    minHeight={dimensions.height}
                    maxHeight={dimensions.height}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={(e) => {
                        if (e.data === 0) {
                            setIsClosed(true);
                        } else {
                            setIsClosed(false);
                        }
                    }}
                    startPage={0}
                    id="flipbook"
                    className="transition-all"
                >
                {/* Cover Page */}
                <div className="w-full h-full" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                        src="/img/Cover.jpg"
                        alt="cover"
                        className="w-full h-full object-cover"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            display: 'block',
                            filter: 'brightness(0.9) contrast(1.1)',
                            borderRadius: '12px'
                        }}
                    ></img>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(157, 0, 255, 0.05) 100%)',
                        pointerEvents: 'none'
                    }}></div>
                </div>
                {/* Inner Pages */}
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className="h-full w-full"
                        style={{
                            backgroundColor: 'var(--bg-glass)',
                            background: 'var(--bg-glass)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="w-full h-full flex flex-col justify-center items-center z-10 p-2" style={{ height: '100%', width: '100%' }}>
                            <Suspense
                                fallback={
                                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-glass)' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Loading...</span>
                                    </div>
                                }
                            >
                                <img
                                    src={images[index]}
                                    alt={`page ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        borderRadius: '12px'
                                    }}
                                    onError={(e) => {
                                        e.target.src = `https://picsum.photos/800/1000?random=${index + 20}`;
                                    }}
                                />
                            </Suspense>
                        </div>
                    </div>
                ))}
                    </HTMLFlipBook>
                </div>
            </div>
        </section>
    );
};

export default Flipbook;

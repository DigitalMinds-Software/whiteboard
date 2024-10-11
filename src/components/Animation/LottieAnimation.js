import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ animationData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg', // You can choose 'svg', 'canvas', or 'html' depending on your preference
      loop: true,
      autoplay: true,
      animationData: animationData, 
    });

    return () => {
      // Cleanup animation when the component unmounts
      anim.destroy();
    };
  }, [animationData]);

  return <div ref={containerRef} />;
};

export default LottieAnimation;



// import LottieAnimation from 'src/components/lottieAnimation';
// import animationData from 'src/animations/w4.json';

// <LottieAnimation animationData={animationData} />
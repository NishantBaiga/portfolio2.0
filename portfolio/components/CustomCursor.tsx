"use client";
import { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/soundManager';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cursorColor, setCursorColor] = useState('#E3000B');

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, [role="button"]');
      const shouldHide = target.closest('[data-cursor="default"]');
      
      setIsVisible(!shouldHide);
      
      if (!!isClickable && !isHovering) {
        soundManager.play('click');
      }
      
      setIsHovering(!!isClickable);

      if (isClickable) {
        const style = window.getComputedStyle(target as Element);
        const bg = style.backgroundColor;
        const border = style.borderColor;
        
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          setCursorColor(bg);
        } else if (border && border !== 'rgba(0, 0, 0, 0)' && border !== 'transparent') {
          setCursorColor(border);
        } else {
          setCursorColor('#FFD500');
        }
      } else {
        setCursorColor('#E3000B');
      }
    };

    const handleMouseDown = () => {
      soundManager.play('snap');
      soundManager.vibrate(30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cursorX, cursorY, isHovering]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          {/* LEGO 2x2 Brick Cursor */}
          <div 
            className="w-full h-full lego-border lego-shadow-sm transition-colors duration-200 relative dark:border-white"
            style={{ 
              backgroundColor: cursorColor,
              boxShadow: isHovering ? `0 0 20px ${cursorColor}` : undefined 
            }}
          >
            {/* Studs */}
            <div className="absolute -top-1 left-1 w-2 h-1 bg-black/20 rounded-full" />
            <div className="absolute -top-1 right-1 w-2 h-1 bg-black/20 rounded-full" />
            
            {isHovering && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                className="absolute inset-0 border-2 border-white opacity-50"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

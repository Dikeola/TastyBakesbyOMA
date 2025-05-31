import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  blinkCount?: number; // Number of cursor blinks at the end
  blinkSpeed?: number; // Speed of cursor blink
}

export default function TypingText({ 
  texts, 
  typingSpeed = 100, 
  pauseDuration = 2000,
  className = "",
  blinkCount = 5,
  blinkSpeed = 400
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<'typing' | 'blinking'>('typing');
  const [blink, setBlink] = useState(true);
  const [blinkTimes, setBlinkTimes] = useState(0);

  useEffect(() => {
    if (phase === 'typing') {
      const fullText = texts[currentTextIndex];
      if (currentText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, start blinking after pause
        const timeout = setTimeout(() => {
          setPhase('blinking');
          setBlinkTimes(0);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else if (phase === 'blinking') {
      // Blinking phase
      if (blinkTimes < blinkCount * 2) { // *2 because blink toggles
        const timeout = setTimeout(() => {
          setBlink((b) => !b);
          setBlinkTimes((t) => t + 1);
        }, blinkSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Restart typing
        setCurrentText("");
        setPhase('typing');
        setBlink(true);
        setBlinkTimes(0);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [currentText, phase, blinkTimes, texts, currentTextIndex, typingSpeed, pauseDuration, blinkCount, blinkSpeed]);

  return (
    <span className={className}>
      {currentText}
      <span className={`inline-block ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        |
      </span>
    </span>
  );
}
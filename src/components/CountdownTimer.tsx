import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  variant?: 'large' | 'compact';
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, variant = 'large', onExpired }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        onExpired?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpired]);

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-drake-gold font-bold text-lg">Offer Expired</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-foreground/70">Ends in:</span>
        <div className="flex gap-1 font-mono font-bold text-drake-gold">
          <span>{String(timeLeft.days).padStart(2, '0')}d</span>
          <span>:</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-drake-dark/80 backdrop-blur-sm border border-drake-gold/30 rounded-lg p-3 sm:p-4 md:p-5 min-w-[60px] sm:min-w-[70px] md:min-w-[90px]">
            <motion.span
              key={unit.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-drake-gold tabular-nums"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
          </div>
          <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;

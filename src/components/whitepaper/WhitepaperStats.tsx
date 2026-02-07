import { useEffect, useRef, useState } from "react";
import type { WhitepaperStat } from "@/data/whitepaperData";

interface WhitepaperStatsProps {
  stats: WhitepaperStat[];
}

const AnimatedNumber = ({ value, suffix }: { value: string; suffix?: string }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(value, 10);
          if (isNaN(target)) {
            setDisplay(value);
            return;
          }
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            setDisplay(current.toLocaleString("fr-FR"));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold text-primary">
      {display}
      {suffix && <span>{suffix}</span>}
    </div>
  );
};

const WhitepaperStats = ({ stats }: WhitepaperStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors print:border-primary/20"
        >
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default WhitepaperStats;

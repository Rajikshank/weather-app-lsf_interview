import { Snowflake } from "lucide-react";
import React from "react";

type SnowEffectProps = {
  dropCount?: number;
};

const SnowEffect: React.FC<SnowEffectProps> = ({ dropCount = 100 }) => {
  const drops = Array.from({ length: dropCount });

  return (
    <div className="snow-container">
      {drops.map((_, i) => {
        const size = 5 + Math.random() * 10 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
    

        const style: React.CSSProperties = {
          left: `${(i / dropCount) * 100}%`,
          color: "white",
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s, ${duration * 0.5}s`,
          animationDelay: `${delay}s, ${delay}s`,
          boxShadow: "1px 10px 160px 15px rgba(15,15,15,1)",
          //   background: `hsla(0, 0%, ${lightness}%, 0.8)`,
          //   boxShadow: `0 0 15px 10px hsla(0, 0%, ${lightness}%, 0.5)`
        };

        return <Snowflake key={i} className="snowflake" style={style} />;
      })}
    </div>
  );
};

export default SnowEffect;

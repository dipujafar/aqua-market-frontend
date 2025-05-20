import {  ArrowUpRight } from "lucide-react";
import React from "react";

const AnimatedArrowUp = ({ size }: { size?: number }) => {
  return (
    <div className="relative overflow-hidden">
      <ArrowUpRight
        className="ease-in-out-circ transition-all duration-500 group-hover:-translate-y-5 group-hover:translate-x-3 "
        size={size || 24}
      />

      <ArrowUpRight
        className="ease-in-out-circ absolute top-0 translate-y-5 -translate-x-3 transition-all duration-500 group-hover:translate-0 group-hover:translate-x-0"
        size={size || 24}
      />
    </div>
  );
};

export default AnimatedArrowUp;

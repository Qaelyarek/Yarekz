import React from "react";
import { cn } from "../../utils";

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "medium" | "fast";
}

export default function StarBorder({
  children,
  className,
  speed = "medium",
  ...props
}: StarBorderProps) {
  const speedValue = {
    slow: "10s",
    medium: "5s",
    fast: "2s",
  }[speed];

  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#393BB2_50%,#E2E8F0_100%)]"
        style={{
          animationDuration: speedValue,
        }}
      />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-8 py-1 text-sm font-medium text-slate-50 backdrop-blur-3xl transition-all duration-300 hover:bg-slate-900">
        {children}
      </span>
    </button>
  );
}
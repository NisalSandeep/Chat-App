import React from "react";

export const BoraderAnimatedContainer = ({ children }) => {
  return (
    <div className="glass-surface flex h-full w-full overflow-hidden rounded-none border-sky-300/30 bg-gradient-to-br from-slate-900/45 via-slate-900/35 to-sky-950/25">
      {children}
    </div>
  );
};

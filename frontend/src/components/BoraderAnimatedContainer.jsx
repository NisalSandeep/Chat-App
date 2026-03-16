import React from "react";

export const BoraderAnimatedContainer = ({ children }) => {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-none border border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20">
      {children}
    </div>
  );
};

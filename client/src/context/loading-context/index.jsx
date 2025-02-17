// src/context/loading-context.jsx
import { createContext, useState } from "react";

export const LoadingContext = createContext({
  isGlobalLoading: false,
  setIsGlobalLoading: () => {},
});

export function LoadingProvider({ children }) {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isGlobalLoading, setIsGlobalLoading}}>
      {children}
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-primary font-medium">Loading...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

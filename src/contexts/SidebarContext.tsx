import { ReactNode, createContext, useEffect, useState } from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextType {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((sm) => !sm);
    } else {
      setIsLargeOpen((lg) => !lg);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

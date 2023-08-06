"use client";

/* 클라이언트 사이드 랜더링 로직을 감싸는 역할
서버사이드 랜더링일 경우, hasMounted가 false로 유지 되어 랜더링을 막음 */

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;

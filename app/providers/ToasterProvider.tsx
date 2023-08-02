"use client";
/* 알림 이쁘게 뽑아주는 라이브러리 */

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export default ToasterProvider;

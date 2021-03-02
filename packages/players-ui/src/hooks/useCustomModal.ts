import { useState, useEffect } from "react";

export default function useCustomModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.paddingRight = "15px";
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  }, [isModalOpen]);

  return {
    isModalOpen,
    setIsModalOpen,
  };
}

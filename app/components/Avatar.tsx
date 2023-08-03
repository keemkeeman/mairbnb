"use client";

import Image from "next/image";

interface AvartaProps {
  src: string | null | undefined;
}

const Avarta: React.FC<AvartaProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avarta;

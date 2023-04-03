import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <Image
        src="/assets/img/loading.svg"
        alt="Loading..."
        width="30"
        height="30"
        className="rotate"
        priority
      />
    </div>
  );
};

export default Loading;

import Loader from "@/components/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
};

export default loading;

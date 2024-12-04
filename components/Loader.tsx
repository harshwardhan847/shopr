import React from "react";

const Loader = () => {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center">
      <div className="animate-spin w-24 h-24 border-t-2 border-r-2 border-blue-500 rounded-full" />
    </div>
  );
};

export default Loader;

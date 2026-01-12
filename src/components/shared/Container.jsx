import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

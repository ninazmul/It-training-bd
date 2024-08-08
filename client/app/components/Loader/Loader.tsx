import React from "react";
import "./Loader.css";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

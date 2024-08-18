import React from "react";
import "./Loader.css";
import { Watch } from "react-loader-spinner";


type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <div className="loader"></div> */}
      {/* <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#19cec6"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
      <div className="loader">
        <span>ITTrainingBD</span>
        <span>ITTrainingBD</span>
      </div>
    </div>
  );
};

export default Loader;

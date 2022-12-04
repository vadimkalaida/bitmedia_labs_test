import React from 'react';
import './SuspenseFallBack.scss'
import MoonLoader from "react-spinners/MoonLoader";

interface ISuspenseFallBack {
  minHeight: string,
  CustomHTML: () => React.ReactElement | null
}

const SuspenseFallBack : React.FC<ISuspenseFallBack> = ({ minHeight, CustomHTML }) => {
  return(
    <div className="suspense" style={{ minHeight }}>
      <MoonLoader color={"#3A80BA"} loading={ true } size={70} />
      <CustomHTML />
    </div>
  );
};

export default SuspenseFallBack;
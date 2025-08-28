import { useEffect, useState } from "react";

const OpenSidebarButton = ({customStyle, onClick} : {customStyle?: string, onClick?: () => void}) => {
  return (
    <button
      onClick={() => {if(onClick) onClick();}}
      className={`rounded-lg bg-blue-900 hovver:bg-blue-700 text-white shadow-md transition ${customStyle}`}
    >
      ☰
    </button>
  );
};

export default OpenSidebarButton;

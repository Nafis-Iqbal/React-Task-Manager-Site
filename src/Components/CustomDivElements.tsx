import React from 'react';

interface BasicTextDivProps{
  displayText: string;
  customStyle: string;
}

const BasicTextDiv = ({displayText, customStyle}: BasicTextDivProps) => {
  return (
    <div className={customStyle}>
      {displayText}
    </div>
  );
};

export default BasicTextDiv;

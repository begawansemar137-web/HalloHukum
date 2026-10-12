
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  // FIX: Made children optional to support React.createElement in .ts files
  // where children are passed as varargs, which TypeScript doesn't automatically
  // map to the 'children' prop if it's required.
  children?: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ children, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
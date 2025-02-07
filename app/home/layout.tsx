import React from "react";

interface IProps {
    children: React.ReactNode    
}
export default function Layout({ children }: IProps) {
  return (
    <div>
      <div>navbar</div>
      {children}
      <div>footer</div>
    </div>
  );
}

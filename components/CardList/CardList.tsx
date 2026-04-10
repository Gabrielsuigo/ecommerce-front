import React from "react";

interface CardListProps {
  children: React.ReactNode;
}

export default function CardList({ children }: CardListProps)  {
  return (
<div className="
  flex gap-4 overflow-x-auto pb-4
  md:grid md:grid-cols-2 lg:grid-cols-3
  md:overflow-visible
">      {children}
    </div>
  );
};

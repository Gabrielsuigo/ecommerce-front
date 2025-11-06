import React from "react";

interface CardListProps {
  children: React.ReactNode;
}

export default function CardList({ children }: CardListProps)  {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      {children}
    </div>
  );
};

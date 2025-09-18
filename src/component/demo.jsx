import React, { useState } from "react";
import Card from "./card";


export default function VerticalCardStack() {
  const [active, setActive] = useState(1);

  const cards = [
    { id: 1, color: "#3498db", label: "Card One" },
    { id: 2, color: "#e74c3c", label: "Card Two" },
  ];

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          isActive={active === card.id}
          onClick={() => setActive(card.id)}
          color={card.color}
        >
          {card.label}
        </Card>
      ))}
    </div>
  );
}

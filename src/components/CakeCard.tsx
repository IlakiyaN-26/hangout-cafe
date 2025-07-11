import React from "react";

interface Props {
  name: string;
  image: string;
  onOrder: (cakeName: string) => void;
}

const CakeCard: React.FC<Props> = ({ name, image, onOrder }) => {
  return (
    <div className="cake-card" style={{ margin: "10px", padding: "10px", background: "#fff", borderRadius: "8px", textAlign: "center", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
      <img src={image} alt={name} style={{ width: "200px", height: "150px", objectFit: "cover" }} />
      <p>{name}</p>
      <button onClick={() => onOrder(name)} style={{ padding: "5px 10px", marginTop: "10px", cursor: "pointer" }}>
        Order this Cake
      </button>
    </div>
  );
};

export default CakeCard;

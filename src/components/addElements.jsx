import { useState } from "react";

export default function AddElement({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle(""); // Reset du titre après ajout
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

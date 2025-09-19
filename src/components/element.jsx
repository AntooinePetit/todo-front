import { useState } from "react";

export default function Element({
  id,
  title,
  isCompleted,
  creationDate,
  onDelete,
  completedDate = null,
}) {
  const [showIsCompleted, setShowIsCompleted] = useState(isCompleted);
  const [error, setError] = useState(null);
  const [showCompletedDate, setShowCompletedDate] = useState(completedDate);

  const ToggleTodo = async (id) => {
    try {
      const req = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
        method: "PATCH",
      });
      if (!req.ok) throw new Error("Impossible de mettre à jour la tâche");
      setShowIsCompleted(!showIsCompleted);

      const res = await req.json();
      console.log(res);
      setShowCompletedDate(res.todo.completedDate);
    } catch (error) {
      setError(error.message);
    }
  };

  

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <li>
      <span style={{ color: "red" }} onClick={onDelete}>
        X
      </span>
      <input
        type="checkbox"
        checked={showIsCompleted}
        onChange={() => ToggleTodo(id)}
      />
      - {title} - {new Date(creationDate).toLocaleString()}
      {showIsCompleted && ` - ${new Date(showCompletedDate).toLocaleString()}`}
    </li>
  );
}

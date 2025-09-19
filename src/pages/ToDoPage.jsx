import { useEffect, useState } from "react";
import AddElement from "../components/addElements";
import Element from "../components/element";

export default function ToDoPage() {
  // Récupérer tous les éléments de liste
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger tous les éléments de liste
  const fetchTodos = async () => {
    try {
      // Mettre le loeadin à true
      setLoading(true);

      // Récupérer les données du back
      const req = await fetch("http://localhost:3000/api/v1/todos");
      if (!req.ok) throw new Error("Erreur lors du chargement des tâches");

      const datas = await req.json();
      setTodos(datas);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteElement = async (id) => {
    try {
      const req = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      if (!req.ok) throw new Error("Impossible de supprimer la tâche");
      setTodos((prev) => prev.filter((todo) => todo._id !== id));

      // Chercher dans le state todos l'élément qui a été supprimé du state
      // Ca aura pour conséquence de déclencher un rendu du composant sans avoir à faire un autre appel au back
    } catch (error) {
      setError(error.message);
    }
  };

  const addTodo = async (title) => {
    try {
      const req = await fetch("http://localhost:3000/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!req.ok) throw new Error("Impossible d'ajouter la tâche");

      const res = await req.json();

      // On ajoute directement au state (plus besoin de refetch)
      setTodos((prev) => [...prev, res.todo]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Chargement des données en cours</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h1>Ajouter une tâche</h1>
      <AddElement onAdd={addTodo} />

      <ul>
        {todos.map((todo) => (
          <Element
            key={todo._id}
            id={todo._id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            creationDate={todo.creationDate}
            completedDate={todo.completedDate}
            onDelete={() => deleteElement(todo._id)}
          />
        ))}
      </ul>
    </>
  );

  // Afficher les éléments de liste en deux parties : à compléter et complétée
}

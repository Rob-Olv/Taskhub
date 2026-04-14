import { useState } from "react";
import { Task } from "../models/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(task: Task) {
    setTasks(prev => [...prev, task]);
  }

  function toggleTask(id: string) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  return {
    tasks,
    addTask,
    toggleTask
  };
}
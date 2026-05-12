import { useEffect, useState } from "react";
import { Task } from "../models/task";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();

    setTasks(data);
  }

  async function addTask(task: Task) {
    await createTask(task);

    await loadTasks();
  }

  async function toggleTask(task: Task) {
    const updatedTask = {
      ...task,
      done: !task.done
    };

    await updateTask(updatedTask);

    await loadTasks();
  }

  async function removeTask(id: string) {
    await deleteTask(id);

    await loadTasks();
  }

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    loadTasks
  };
}
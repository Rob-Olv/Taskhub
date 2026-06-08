import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { Task } from "../models/task";
import { createTask, deleteTask, getTasksByUser, updateTask } from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    if (!user) return;

    const data = await getTasksByUser(user.id);

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
import { Task } from "../models/task";

const API_URL = "http://10.0.2.2:3000/tasks";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTask(task: Task) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function updateTask(task: Task) {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id: string) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function getTaskById(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}
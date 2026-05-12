import { Task } from "../models/task";

export function getTaskStatus(task: Task) {
  if (task.done) {
    return "Concluída";
  }

  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const currentTime =
    currentHour * 60 + currentMinute;

  const [startHour, startMinute] =
    task.startTime.split(":").map(Number);

  const [endHour, endMinute] =
    task.endTime.split(":").map(Number);

  const start =
    startHour * 60 + startMinute;

  const end =
    endHour * 60 + endMinute;

  if (currentTime < start) {
    return "Pendente";
  }

  if (currentTime >= start && currentTime <= end) {
    return "Em andamento";
  }

  return "Atrasada";
}
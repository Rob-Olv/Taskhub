import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Task } from "./models/task";
import {
    getTaskById,
    updateTask
} from "./services/taskService";

export default function EditTask() {
  const { id } = useLocalSearchParams();

  const [task, setTask] = useState<Task | null>(null);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadTask();
  }, []);

  async function loadTask() {
    const data = await getTaskById(id.toString());

    setTask(data);

    setTitle(data.title);
    setStartTime(data.startTime);
    setEndTime(data.endTime);
  }

  async function handleUpdate() {
    if (!task) return;

    await updateTask({
      ...task,
      title,
      startTime,
      endTime
    });

    router.back();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Hora início"
        value={startTime}
        onChangeText={setStartTime}
      />

      <TextInput
        placeholder="Hora fim"
        value={endTime}
        onChangeText={setEndTime}
      />

      <Button
        title="Salvar alterações"
        onPress={handleUpdate}
      />
    </View>
  );
}
import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { createTask } from "./services/taskService";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function handleCreate() {
    await createTask(
      {
        id: uuid.v4().toString(),
        title,
        startTime,
        endTime,
        done: false
      });

      router.back();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Hora início (ex: 14:00)"
        value={startTime}
        onChangeText={setStartTime}
      />

      <TextInput
        placeholder="Hora fim (ex: 16:00)"
        value={endTime}
        onChangeText={setEndTime}
      />

      <Button title="Salvar tarefa" onPress={handleCreate} />
    </View>
  );
}
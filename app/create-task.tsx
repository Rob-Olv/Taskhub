import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleCreate() {
    console.log({
      title,
      startTime,
      endTime
    });
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
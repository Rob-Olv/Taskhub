import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import { useAuth } from "./contexts/auth-context";
import { createTask } from "./services/taskService";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { user } = useAuth();

  async function handleCreate() {
    await createTask(
      {
        id: uuid.v4().toString(),
        userId: user!.id,
        title,
        startTime,
        endTime,
        done: false
      });

      router.back();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f3f4f6",
        padding: 20,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Nova tarefa
      </Text>

      <Text
        style={{
          color: "gray",
          marginBottom: 30,
        }}
      >
        Crie uma nova atividade
      </Text>

      {/* CARD FORM */}
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },

          shadowOpacity: 0.1,
          shadowRadius: 4,

          elevation: 3,
        }}
      >
        {/* TÍTULO */}
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Título
        </Text>

        <TextInput
          placeholder="Digite o título da tarefa"
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: 10,
            padding: 14,
            marginBottom: 20,

            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        />

        {/* HORA INÍCIO */}
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Hora início
        </Text>

        <TextInput
          placeholder="Ex: 14:00"
          value={startTime}
          onChangeText={setStartTime}
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: 10,
            padding: 14,
            marginBottom: 20,

            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        />

        {/* HORA FIM */}
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Hora fim
        </Text>

        <TextInput
          placeholder="Ex: 16:00"
          value={endTime}
          onChangeText={setEndTime}
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: 10,
            padding: 14,
            marginBottom: 30,

            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        />

        {/* BOTÃO */}
        <TouchableOpacity
          onPress={handleCreate}
          style={{
            backgroundColor: "#22c55e",

            padding: 16,

            borderRadius: 12,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Salvar tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
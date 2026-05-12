import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from "./hooks/useTasks";
import { getTaskStatus } from "./utils/taskStatus";

export default function HomeScreen() {
  const { tasks, loadTasks, toggleTask, removeTask } = useTasks();

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Criar nova tarefa"
        onPress={() => router.push("/create-task")}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const status = getTaskStatus(item);

          function getStatusColor(status: string) {
            switch (status) {
              case "Concluída":
                return "green";

              case "Em andamento":
                return "blue";

              case "Atrasada":
                return "red";

              default:
                return "orange";
            }
          }

          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderRadius: 8
              }}
            >
              <TouchableOpacity
                onPress={() => toggleTask(item)}
              >
                <Text
                  style={{
                    textDecorationLine: item.done
                      ? "line-through"
                      : "none",

                    color: item.done
                      ? "green"
                      : "black",
                  }}
                >
                  {item.title}
                </Text>

                <Text>
                  {item.startTime} até {item.endTime}
                </Text>

                <Text
                  style={{
                    color: getStatusColor(status),
                    fontWeight: "bold"
                  }}
                >
                  Status: {status}
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Button
                  title="Editar"
                  onPress={() =>
                    router.push(`/edit-task?id=${item.id}`)
                  }
                />

                <Button
                  title="Excluir"
                  onPress={() => removeTask(item.id)}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
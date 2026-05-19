import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTasks } from "./hooks/useTasks";
import { getTaskStatus } from "./utils/taskStatus";

export default function HomeScreen() {
  const {
    tasks,
    loadTasks,
    toggleTask,
    removeTask
  } = useTasks();

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  function getStatusColor(status: string) {
    switch (status) {
      case "Concluída":
        return "#22c55e";

      case "Em andamento":
        return "#3b82f6";

      case "Atrasada":
        return "#ef4444";

      default:
        return "#f59e0b";
    }
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
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        TaskHub
      </Text>

      <Text
        style={{
          color: "gray",
          marginBottom: 20,
        }}
      >
        Gerencie suas tarefas facilmente
      </Text>

      {/* BOTÃO NOVA TAREFA */}
      <TouchableOpacity
        onPress={() => router.push("/create-task")}
        style={{
          backgroundColor: "#3b82f6",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          + Nova tarefa
        </Text>
      </TouchableOpacity>

      {/* LISTA */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const status = getTaskStatus(item);

          return (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,

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
              <TouchableOpacity
                onPress={() => toggleTask(item)}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",

                    textDecorationLine:
                      item.done
                        ? "line-through"
                        : "none",

                    color:
                      item.done
                        ? "#9ca3af"
                        : "#111827",
                  }}
                >
                  {item.title}
                </Text>

                {/* HORÁRIO */}
                <Text
                  style={{
                    color: "#6b7280",
                    marginTop: 4,
                  }}
                >
                  {item.startTime} até {item.endTime}
                </Text>

                {/* STATUS */}
                <View
                  style={{
                    backgroundColor:
                      getStatusColor(status),

                    alignSelf: "flex-start",

                    paddingHorizontal: 12,
                    paddingVertical: 6,

                    borderRadius: 999,

                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {status}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* AÇÕES */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/edit-task?id=${item.id}`
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "#3b82f6",
                    padding: 12,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    removeTask(item.id)
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "#ef4444",
                    padding: 12,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Excluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
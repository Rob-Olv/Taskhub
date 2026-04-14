import { router } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import { useTasks } from "./hooks/useTasks";

export default function HomeScreen() {
  const { tasks } = useTasks();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Criar nova tarefa"
        onPress={() => router.push("/create-task")}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.title} - {item.startTime} até {item.endTime}
          </Text>
        )}
      />
    </View>
  );
}

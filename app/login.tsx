import { useState } from "react";

import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";
import { useAuth } from "./contexts/auth-context";
import { login } from "./services/userService";

export default function Login() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

    const { signIn } = useAuth();

  async function handleLogin() {
    const user = await login(username, password);

    if (!user) {
        Alert.alert(
        "Erro",
        "Usuário ou senha inválidos"
        );

        return;
    }

    signIn(user);

    router.replace("/home");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f3f4f6",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        TaskHub
      </Text>

      <Text
        style={{
          color: "gray",
          marginBottom: 30,
        }}
      >
        Faça login para acessar suas tarefas
      </Text>

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Usuário
        </Text>

        <TextInput
          placeholder="Digite seu usuário"
          value={username}
          onChangeText={setUsername}
          style={{
            backgroundColor: "#f9fafb",
            padding: 14,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Senha
        </Text>

        <TextInput
          secureTextEntry
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "#f9fafb",
            padding: 14,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#3b82f6",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
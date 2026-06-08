import { User } from "../models/user";

const API_URL =
  "http://192.168.18.18:3000/users";

export async function login(
  username: string,
  password: string
): Promise<User | null> {

  const response = await fetch(
    `${API_URL}?username=${username}&password=${password}`
  );

  const users: User[] =
    await response.json();

  if (users.length === 0) {
    return null;
  }

  return users[0];
}
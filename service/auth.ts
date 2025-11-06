import { UserData, UserLogin } from "@/app/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const register = async (data: UserData) => {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const login = async (Data: UserLogin) => {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    body: JSON.stringify(Data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

import api from "./api";

export async function register(data: any) {

  return api.post("/auth/register", data).then(res => res.data);
}

export async function login(data: any) {

  return api.post("/auth/login", data).then(res => res.data);
}

export async function logout() {

  return api.post("/auth/logout").then(res => res.data);
}

export async function getProfile(token: string) {


  return api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

export async function getTasks(token: string) {

  return api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

export async function addTask(title: string, token: string) {

  return api.post("/tasks", { title }, { headers: { Authorization: `Bearer ${token}` } }).then(res => console.log(res.data));
}

export async function deleteTask(id: number, token: string) {

  return api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

export async function toggleTask(id: number, token: string) {

  return api.patch(`/tasks/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

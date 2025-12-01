import api from "./api";

export async function register(data: any) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Register data:", data);
  return api.post("/auth/register", data).then(res => res.data);
}
export async function login(data: any) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Register data:", data);
  return api.post("/auth/register", data).then(res => res.data);
}
export async function logout() {
  console.log("localstorage temp_token:", localStorage);
  return api.post("/auth/logout").then(res => res.data);
}
export async function getProfile(token: string) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Get Profile token:", token);
  return api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}
export async function getTasks(token: string) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Get Tasks token:", token);
  return api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}
export async function addTask(title: string, token: string) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Add Task title:", title, "token:", token);
  return api.post("/tasks", { title }, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}
export async function deleteTask(id: number, token: string) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Delete Task id:", id, "token:", token);
  return api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}
export async function toggleTask(id: number, token: string) {
  console.log("localstorage temp_token:", localStorage);
  console.log("API Wrap Toggle Task id:", id, "token:", token);
  return api.patch(`/tasks/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

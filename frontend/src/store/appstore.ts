'use client';
import { create } from 'zustand';
import * as api from "../lib/api-wrap";

type User = { id: number; name: string; email: string; };

export const useAppStore = create<any>((set, get) => ({
  user: null, accessToken: null, isLoggedIn: false, authLoading: false, temptoken: null,
  tasks: [], tasksLoading: false,

  setUser: (u: User | null) => set({ user: u, isLoggedIn: !!u }),
  setAccessToken: (t: string | null) => set({ accessToken: t, isLoggedIn: !!t }),

  login: async (email: string, password: string) => {


    const res = await api.login({ email, password });
    
    const { accessToken, user } = res;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    set({ user, accessToken, isLoggedIn: true, authLoading: false });
  },

  register: async (data: any) => {


    try {
      const storedToken = get().temptoken || localStorage.getItem("temptoken");

      // Step 2: OTP verification if tempToken exists and data has otp
      if (storedToken && data.otp) {
        // append tempToken automatically
        const res = await api.register({
          otp: data.otp,
          temptoken: storedToken
        });

        localStorage.removeItem("temptoken");

        return { success: true, res:res};
      }

      // Step 1: normal registration form submission
      const res = await api.register(data);

      const tempToken = res.tempToken;

      if (!tempToken) {
        // backend didn't return tempToken, return raw response
        return res.data;
      }

     
      set({ temptoken: tempToken });
      localStorage.setItem("temptoken", tempToken);

      return { success: true}; // go to OTP screen
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    } finally {
      set({ authLoading: false });
    }
  }
  ,


  logout: async () => {
    await api.logout();
    localStorage.removeItem('accessToken'); localStorage.removeItem('user');
    set({ user: null, accessToken: null, isLoggedIn: false });
  },

  loadProfile: async () => {
  
    const token = localStorage.getItem('accessToken');
    if (!token) { set({ authLoading: false }); return; }
    set({ accessToken: token });
    try {
      const res = await api.getProfile(token);
      // console.log('loadProfile response:', res.user);
      set({ user: res.user, isLoggedIn: true });
    } catch (e) { localStorage.removeItem('accessToken'); set({ user: null, accessToken: null, isLoggedIn: false }); }
    set({ authLoading: false });
  },

  loadTasks: async ()=> {
    const token = get().accessToken;
    console.log("Loading tasks with token:", token);
    if(!token) return;
    // set({ tasksLoading:true });
    const res = await api.getTasks(token);
    console.log('loadTasks response:', res);
    set({ tasks: res.data, tasksLoading:false });
  },

  addTask: async (title:string)=> {
    const token = get().accessToken;
    const res = await api.addTask(title, token);
    set({ tasks: [...get().tasks, res] });
  },

  deleteTask: async (id:number)=> {
    const token = get().accessToken;
    await api.deleteTask(id, token);
    set({ tasks: get().tasks.filter((t:any)=> t.id !== id) });
  },

  toggleTask: async (id:number)=> {
    const token = get().accessToken;
    const res = await api.toggleTask(id, token);                        
    set({ tasks: get().tasks.map((t:any)=> t.id===id? res.data : t) });
  },

}));

export const Email = (v: string) => v.trim().toLowerCase();
export const Password = (v: string) => v.trim();
export const Text = (v: string) => (v || "").toString().trim();

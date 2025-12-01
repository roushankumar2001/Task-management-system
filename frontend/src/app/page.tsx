import Register from "./(auth)/register/page";
export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
      <p className="mb-4">Open /login to sign in.</p>
      <Register></Register>
    </div>
  );
}

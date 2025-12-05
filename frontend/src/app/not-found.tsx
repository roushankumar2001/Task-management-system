import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-[80vh] justify-center bg-gray-900 p-6">
      <h1 className="text-8xl font-extrabold text-red-800 animate-bounce">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        You lost in space
      </p>

      <Link
        href="/"
        className="mt-8 hover:bg-gray-100 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}



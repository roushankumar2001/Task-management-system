import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-gray-50 min-h-[80vh]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
        <h1 className="text-2xl font-bold">TaskFlow</h1>

        <div className="space-x-6 hidden md:block">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </div>

        <a
          href="/auth/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-8 py-20">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Manage Your Tasks <br /> Like a Pro 🚀
          </h1>

          <p className="text-gray-600 text-lg md:w-3/4">
            Stay organized, boost productivity, and complete your tasks with ease.
            TaskFlow helps you manage everything in one place.
          </p>

          <div className="space-x-4 mt-4">
            <a
              href="/auth/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="px-6 py-3 border border-gray-400 rounded-lg text-lg hover:bg-gray-100"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068692.png"
            alt="Task Management Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Amazing Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            title="Organize Tasks"
            description="Sort tasks into categories and track progress easily."
          />
          <FeatureCard
            title="Collaborate Easily"
            description="Share tasks and collaborate with your team in real-time."
          />
          <FeatureCard
            title="Stay Productive"
            description="Get reminders and insights to stay on top of your goals."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">
          Ready to Boost Your Productivity?
        </h2>
        <p className="mt-3 text-lg">
          Join thousands of users getting more done every day.
        </p>

        <Link
          href="/register"
          className="mt-6 inline-block px-8 py-3 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100"
        >
          Get Started for Free
        </Link>
      </section>

    

    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-100 shadow rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

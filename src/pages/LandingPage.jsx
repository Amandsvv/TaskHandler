import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">TaskHandler</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Manage Your Daily Tasks Easily
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          TaskHandler helps you organize, track, and complete your daily tasks
          efficiently with a clean and simple interface.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-6">
        <Feature title="Task Management" text="Create, update, and delete tasks easily." />
        <Feature title="Fast & Simple" text="Built using modern full-stack technologies." />
        <Feature title="Secure" text="Your data is protected and safe." />
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6">
        © {new Date().getFullYear()} TaskHandler
      </footer>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 text-center shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

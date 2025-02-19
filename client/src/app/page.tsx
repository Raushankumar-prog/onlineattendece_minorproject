export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="flex justify-between items-center p-6 bg-black/50 backdrop-blur-md">
        <div className="text-lg font-semibold">AttendancePro</div>
        <nav className="flex gap-6">
          <button className="text-gray-300 hover:text-white transition">Features</button>
          <button className="text-gray-300 hover:text-white transition">Pricing</button>
          <button className="text-gray-300 hover:text-white transition">Docs</button>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Login
          </button>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center py-20 px-6">
        <p className="text-sm text-gray-400">Track attendance effortlessly</p>
        <h1 className="text-5xl font-bold mt-2">Smart Attendance Management</h1>
        <p className="text-lg text-gray-300 max-w-2xl mt-4">
          AttendancePro is a cloud-based system designed to automate and simplify attendance tracking for institutions and businesses.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg rounded-lg transition">
            Get Started
          </button>
          <button className="border border-gray-500 text-gray-300 px-6 py-3 text-lg rounded-lg hover:bg-gray-700 transition">
            GitHub
          </button>
        </div>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-16">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border border-gray-700 rounded-lg bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="text-center py-6 text-gray-500">
        &copy; {new Date().getFullYear()} AttendancePro. All rights reserved.
      </footer>
    </div>
  );
}

const features = [
  { title: "Automated Tracking", description: "Capture attendance seamlessly with AI-powered automation." },
  { title: "Multi-Device Access", description: "Manage attendance from any device, anywhere." },
  { title: "Detailed Reports", description: "Generate comprehensive attendance reports instantly." },
  { title: "Secure & Encrypted", description: "Your data is protected with top-notch encryption." },
  { title: "Customizable Alerts", description: "Get real-time notifications for attendance updates." },
  { title: "Seamless Integration", description: "Easily integrate with existing HR and ERP systems." }
];

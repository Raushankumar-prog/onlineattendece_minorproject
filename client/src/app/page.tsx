import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="flex flex-col items-center justify-center text-center py-20 px-6">
        <p className="text-sm text-gray-400">Track attendance effortlessly</p>
        <h1 className="text-5xl font-bold mt-2">Smart Attendance Management</h1>
        <p className="text-lg text-gray-300 max-w-2xl mt-4">
          AttendancePro is a cloud-based system designed to automate and simplify attendance tracking for institutions and businesses.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/sign_up">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg rounded-lg transition">
              Get Started
            </button>
          </Link>
          <Link href="https://github.com/Raushankumar-prog/onlineattendece_minorproject" target="_blank">
            <button className="border border-gray-500 text-gray-300 px-6 py-3 text-lg rounded-lg hover:bg-gray-700 transition">
              GitHub
            </button>
          </Link>
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
  { 
    title: "Biometric Authentication", 
    description: "Integrate with biometric devices (fingerprint, facial recognition) for seamless and secure attendance tracking."
  },
  { 
    title: "QR Code Check-In", 
    description: "Enable quick attendance marking using QR codes scanned via mobile or webcam." 
  },
  { 
    title: "Google & Microsoft Calendar Sync", 
    description: "Automatically sync attendance with Google Calendar and Microsoft Outlook for scheduling and reminders." 
  },
  { 
    title: "Real-Time GPS Tracking", 
    description: "Ensure accurate location-based attendance logging with GPS verification for remote employees or students." 
  },
  { 
    title: "Webhook & API Support", 
    description: "Easily integrate with third-party apps using RESTful APIs and webhooks for automated data exchange." 
  },
  { 
    title: "Slack & Email Notifications", 
    description: "Send real-time alerts and summaries to Slack, Teams, or email to keep admins and employees updated." 
  }
];


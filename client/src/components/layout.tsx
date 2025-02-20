import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="flex justify-between items-center p-6 bg-black/50 backdrop-blur-md">
        <div className="text-lg font-semibold">AttendancePro</div>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
           <Link href="/subject" className="text-gray-300 hover:text-white transition">
            Subject
          </Link>
          <Link href="/attendance" className="text-gray-300 hover:text-white transition">
            Take Attendance
          </Link>
          
        </nav>
      </header>
      <main className="py-10 px-6">{children}</main>
    </div>
  );
}

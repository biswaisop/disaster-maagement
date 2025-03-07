import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/report">Report</Link>
      <Link href="/alerts">Alerts</Link>
      <button className="bg-red-600 rounded-2xl w-20 h-full"><Link href="/rescue">Rescue</Link></button>
    </nav>
  );
}

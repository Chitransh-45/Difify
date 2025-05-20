import Link from "next/link";

const Navbar = () => (
  <nav className="flex justify-between items-center bg-white/80 shadow-md p-4 rounded-xl mb-8 border border-indigo-100">
    <div className="text-2xl font-bold text-blue-600">DIFIFY</div>
    <div className="space-x-4">
      <Link href="/" className="hover:text-blue-500">Home</Link>
      <Link href="/about" className="hover:text-blue-500">About</Link>
      <Link href="/login" className="hover:text-blue-500">Login</Link>
      <Link href="/signup" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;
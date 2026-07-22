import { Link } from "@tanstack/react-router";

export default function Navbar() {
    return (
        <header className="w-full border-b bg-white">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    ProjectHub
                </Link>

                {/* Dashboard knop */}
                <Link
                    to="/dashboard"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Dashboard
                </Link>
            </nav>
        </header>
    );
}
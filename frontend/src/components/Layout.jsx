import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-stone-900 text-stone-400 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} Journey Joy/Saroj Parajuli. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

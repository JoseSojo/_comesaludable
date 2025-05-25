import React from 'react';
import { Bell, Settings, Menu, X, Moon, Sun, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/domain/context/AuthContext';
import { redirect } from 'next/navigation';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {

    const { logout } = useAuth();

    const LogOutFn = () => {
        logout();
        redirect(`/`);
    }

    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="px-4 md:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="hidden md:flex items-center ml-4 w-64"></div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        <button onClick={LogOutFn} className="ml-2 font-medium text-sm hidden md:block"><LogOut className='text-red-400' /></button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
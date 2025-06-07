import React from 'react';
import { Home, ChefHat, MenuSquare, Users, X, BarChart2, Box, IterationCcw, Braces, File, Apple, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/domain/context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {

    const { restaurant, admin } = useAuth();

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0
                    
                    isOpen ? "translate-x-0" : "-translate-x-full"
                `}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar header */}
                    <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
                        <div className="flex items-center">
                            <ChefHat className="h-7 w-7 text-primary-600" />
                            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                                ComSaludable
                            </h1>
                        </div>
                        <button
                            onClick={closeSidebar}
                            className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation links */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/"
                                    className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                >
                                    <Home className="h-5 w-5" />
                                    <span>Inicio</span>
                                </Link>
                            </li>
                            {restaurant &&
                                <>
                                    <li>
                                        <Link
                                            href="/restaurant"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <Apple className="h-5 w-5" />
                                            <span>Mi Restaurant</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/restaurant/menus"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <MenuSquare className="h-5 w-5" />
                                            <span>Mis Menus</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/restaurant/coment"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <MessageCircle className="h-5 w-5" />
                                            <span>Comentarios</span>
                                        </Link>
                                    </li>
                                </>
                            }
                            {admin &&
                                <>
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <BarChart2 className="h-5 w-5" />
                                            <span>Panel de control</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/restaurants"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <ChefHat className="h-5 w-5" />
                                            <span>Restaurants</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/menus"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <MenuSquare className="h-5 w-5" />
                                            <span>Menus</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/users"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <Users className="h-5 w-5" />
                                            <span>Usuarios</span>
                                        </Link>
                                    </li>
                                </>
                            }
                            {/* <li>
                                <Link
                                    href="/dashboard/analytics"
                                    className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                >
                                    <PieChart className="h-5 w-5" />
                                    <span>Análisis</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/report"
                                    className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                >
                                    <File className="h-5 w-5" />
                                    <span>Reporte</span>
                                </Link>
                            </li> */}
                        </ul>

                        {
                            admin &&
                            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                                <ul className="space-y-1">
                                    <li>
                                        <Link
                                            href="/dashboard/core/type"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <IterationCcw className="h-5 w-5" />
                                            <span>Tipos</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/core/category"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <Box className="h-5 w-5" />
                                            <span>Categoría</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/core/environment"
                                            className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                        >
                                            <Braces className="h-5 w-5" />
                                            <span>Ambiente</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        }

                        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                            <ul className="space-y-1">
                                {/* <li>
                                    <Link
                                        href="/dashboard/settings"
                                        className={"flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"}
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://docs.example.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                        <span>Documentation</span>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </nav>

                    {/* Profile section */}
                    {/* <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center text-primary-700 dark:text-primary-400 font-medium">
                                JD
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
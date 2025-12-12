'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User as UserIcon, LogOut, Moon, Sun, Zap, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function Header({ onThemeToggle, isDarkMode }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Research Assistant
            </h1>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">

            <Link
              href="/deep-research"
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Deep Research</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

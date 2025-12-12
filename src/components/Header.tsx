'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '../i18n/routing';
import { Search, User as UserIcon, LogOut, Moon, Sun, Zap, Home, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function Header({ onThemeToggle, isDarkMode }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
          </Link>

          {/*/!* Navigation *!/*/}
          {/*<div className="hidden md:flex items-center space-x-6">*/}

          {/*  <Link*/}
          {/*    href="/deep-research"*/}
          {/*    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"*/}
          {/*  >*/}
          {/*    <Zap className="w-4 h-4" />*/}
          {/*    <span>Deep Research</span>*/}
          {/*  </Link>*/}
          {/*</div>*/}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => changeLocale('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg ${locale === 'en' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLocale('ru')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${locale === 'ru' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  Русский
                </button>
                <button
                  onClick={() => changeLocale('kk')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg ${locale === 'kk' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  Қазақша
                </button>
              </div>
            </div>
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

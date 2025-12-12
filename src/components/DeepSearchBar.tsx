'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Loader, Zap } from 'lucide-react';

interface DeepSearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
  placeholder?: string;
  buttonText?: string;
}

export default function DeepSearchBar({
  onSearch,
  loading,
  placeholder,
  buttonText
}: DeepSearchBarProps) {
  const t = useTranslations();
  const [query, setQuery] = useState('');

  const defaultPlaceholder = placeholder || t('deepResearch.placeholder');
  const defaultButtonText = buttonText || t('deepResearch.button');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={defaultPlaceholder}
          className="flex-1 px-6 py-4 pl-14 pr-4 text-lg border-2 border-white/20 rounded-l-xl bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          disabled={loading}
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-300" />

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-r-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 border-2 border-l-0 border-white/20"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>{t('deepResearch.researching')}</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>{defaultButtonText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

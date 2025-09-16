'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ArticleCard from '../../components/ArticleCard';
import SummaryModal from '../../components/SummaryModal';
import { searchApi, summarizeApi } from '../../lib/api';
import { SearchResultItem, SummaryResponse } from '../../types';
import toast from 'react-hot-toast';

export default function SearchPage() {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [articles, setArticles] = useState<SearchResultItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [summaryModal, setSummaryModal] = useState<{
    open: boolean;
    article?: SearchResultItem;
    summary?: SummaryResponse;
    loading: boolean;
  }>({
    open: false,
    loading: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSearch = async (query: string, provider?: string, limit?: number) => {
    setSearchLoading(true);
    setHasSearched(true);
    try {
      // Приводим provider к ожидаемому union-типу, если задан
      type ProviderUnion = 'semantic_scholar' | 'arxiv' | 'pubmed' | undefined;
      const prov = provider as ProviderUnion;
      const response = await searchApi.search({
        q: query,
        provider: prov,
        limit,
      });
      setArticles(response.data.items);
      if (response.data.items.length === 0) {
        toast('Статьи не найдены. Попробуйте изменить запрос.', { icon: '🔍' });
      }
    } catch (err) {
      console.error('Search error:', err);
      toast.error('Ошибка при поиске. Попробуйте еще раз.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSummarize = async (article: SearchResultItem) => {
    setSummaryModal({
      open: true,
      article,
      loading: true,
    });

    try {
      const response = await summarizeApi.summarize({
        paperId: article.id,
        provider: article.source as 'semantic_scholar' | 'arxiv' | 'pubmed' | undefined,
      });
      setSummaryModal(prev => ({
        ...prev,
        summary: response.data,
        loading: false,
      }));
    } catch (err) {
      console.error('Summarize error:', err);
      toast.error('Ошибка при создании краткого содержания');
      setSummaryModal(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const handleViewDetails = (article: SearchResultItem) => {
    router.push(`/article/${article.id}?source=${article.source}`);
  };

  const closeSummaryModal = () => {
    setSummaryModal({
      open: false,
      loading: false,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Поиск научных публикаций
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Найдите релевантные статьи и получите краткие рефераты с помощью ИИ
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} loading={searchLoading} />
          </div>

          {/* Results */}
          <div className="space-y-6">
            {searchLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Поиск статей...
                  </span>
                </div>
              </div>
            )}

            {!searchLoading && hasSearched && articles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Статьи не найдены
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Попробуйте изменить поисковый запрос или выберите другой источник
                </p>
              </div>
            )}

            {!searchLoading && !hasSearched && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Добро пожаловать в AI Research Assistant!
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Введите поисковый запрос выше, чтобы найти научные публикации
                </p>
              </div>
            )}

            {articles.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Найдено статей: {articles.length}
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSummarize={handleSummarize}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Summary Modal */}
      <SummaryModal
        isOpen={summaryModal.open}
        onClose={closeSummaryModal}
        summary={summaryModal.summary!}
        loading={summaryModal.loading}
        articleTitle={summaryModal.article?.title}
      />
    </div>
  );
}

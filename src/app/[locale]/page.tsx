'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import { Search, Zap, Database, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from '../../i18n/routing';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const t = useTranslations();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/deep-research"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              {t('home.deepResearch')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <Database className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">{t('home.features.multipleSources.title')}</h3>
            <p className="text-gray-300">
              {t('home.features.multipleSources.description')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">{t('home.features.deepResearch.title')}</h3>
            <p className="text-gray-300">
              {t('home.features.deepResearch.description')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">{t('home.features.aiSummaries.title')}</h3>
            <p className="text-gray-300">
              {t('home.features.aiSummaries.description')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-8 text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
              <div className="text-gray-300">{t('home.stats.academicSources')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
              <div className="text-gray-300">{t('home.stats.researchPapers')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-gray-300">{t('home.stats.poweredAnalysis')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">Fast</div>
              <div className="text-gray-300">{t('home.stats.realTimeSearch')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Search, Zap, Database, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();

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
            AI Research Assistant
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Powerful academic research tool powered by AI. Search across multiple scientific databases,
            get comprehensive insights, and accelerate your research process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Searching
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/deep-research"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Deep Research
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <Database className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Multiple Sources</h3>
            <p className="text-gray-300">
              Search across arXiv, PubMed, Semantic Scholar, and CrossRef simultaneously
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Deep Research</h3>
            <p className="text-gray-300">
              Comprehensive research mode with intelligent analysis and deduplication
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">AI Summaries</h3>
            <p className="text-gray-300">
              Get AI-powered summaries and insights from research papers
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-8 text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
              <div className="text-gray-300">Academic Sources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
              <div className="text-gray-300">Research Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-gray-300">Powered Analysis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">Fast</div>
              <div className="text-gray-300">Real-time Search</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!isAuthenticated && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Ready to start researching?
            </h2>
            <p className="text-gray-300 mb-6">
              Create an account to save your research and get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

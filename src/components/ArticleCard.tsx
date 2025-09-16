import React from 'react';
import { ExternalLink, FileText, Users, Calendar, Sparkles } from 'lucide-react';
import { SearchResultItem } from '../types';

interface ArticleCardProps {
  article: SearchResultItem;
  onSummarize: (article: SearchResultItem) => void;
  onViewDetails: (article: SearchResultItem) => void;
}

export default function ArticleCard({ article, onSummarize, onViewDetails }: ArticleCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatAuthors = (authors: string[]) => {
    if (!authors.length) return 'Неизвестные авторы';
    if (authors.length <= 3) return authors.join(', ');
    return `${authors.slice(0, 3).join(', ')} и еще ${authors.length - 3}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {article.title}
          </h3>
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {article.authors.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{formatAuthors(article.authors)}</span>
            </div>
          )}

          {article.year && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{article.year}</span>
            </div>
          )}

          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span className="capitalize">{article.source.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Abstract */}
        {article.abstract && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {truncateText(article.abstract, 300)}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onViewDetails(article)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Подробнее
          </button>

          <button
            onClick={() => onSummarize(article)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Summarize</span>
          </button>
        </div>
      </div>
    </div>
  );
}

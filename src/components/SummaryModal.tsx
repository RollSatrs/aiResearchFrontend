'use client';

import React, { useEffect } from 'react';
import { X, Lightbulb, ExternalLink, Copy } from 'lucide-react';
import { SummaryResponse } from '../types';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: SummaryResponse;
  loading: boolean;
  articleTitle?: string;
}

export default function SummaryModal({
  isOpen,
  onClose,
  summary,
  loading,
  articleTitle
}: SummaryModalProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Краткое содержание
              </h3>
              {articleTitle && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {articleTitle}
                </p>
              )}
            </div>
            <button
              type="button"
              className="ml-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Генерация краткого содержания...
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Краткое описание
                    </h4>
                    <button
                      onClick={() => copyToClipboard(summary.summary)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {summary.summary}
                    </p>
                  </div>
                </div>

                {/* Key Ideas */}
                {summary.keyIdeas && summary.keyIdeas.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        Ключевые идеи
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {summary.keyIdeas.map((idea, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {idea}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Papers */}
                {summary.relatedPapers && summary.relatedPapers.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Рекомендуемая литература
                    </h4>
                    <div className="space-y-2">
                      {summary.relatedPapers.map((paper, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {paper.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Источник: {paper.source.replace('_', ' ')}
                            </p>
                          </div>
                          {paper.url && (
                            <a
                              href={paper.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

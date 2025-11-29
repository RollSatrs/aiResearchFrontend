'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import DeepSearchBar from '@/components/DeepSearchBar';
import { Sparkles } from 'lucide-react';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from "file-saver";
import { CustomSpinner, MiniCustomSpinner } from '@/components/ui/CustomSpinner';

interface Paper {
  id: string;
  source: string;
  title: string;
  authors: string[];
  abstract?: string;
  url?: string;
  year?: number;
  summary?: string;
  keyWords?: string[];
  topic?: string[]
}

interface DeepResearchResult {
  topic: string;
  researchDepth: string;
  totalSources: number;
  totalResults: number;
  sources: string[];
  papers: Paper[];
  searchTime: number;
}

export default function DeepResearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyitcLoding, setIsAnalyitcLoding] = useState(false);
  const [isDocLoading, setDocLoading] = useState(false)
  const [result, setResult] = useState<DeepResearchResult | null>(null);
  const [analyticsResult, setIsAnalyitcResult] = useState<Paper | null>(null);
  const [modalPaper, setModalPaper] = useState<Paper | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const generateSimpleWord = (paper: Paper) => {
    if (!paper) return;

    setDocLoading(true);
    setError("");

    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              ...(paper.title ? [new Paragraph({ text: paper.title })] : []),
              ...(paper.authors?.length ? [new Paragraph({ text: `Авторы: ${paper.authors.join(", ")}` })] : []),
              ...(paper.year ? [new Paragraph({ text: `Дата публикации: ${paper.year}` })] : []),
              ...(paper.summary ? [new Paragraph({ text: `Резюме:\n${paper.summary}` })] : []),
              ...(paper.abstract ? [new Paragraph({ text: `Аннотация:\n${paper.abstract}` })] : []),
              ...(Array.isArray(paper.keyWords) && paper.keyWords.length
                ? [new Paragraph({ text: `Ключевые слова: ${paper.keyWords.join(", ")}` })]
                : []),
              ...(Array.isArray(paper.topic) && paper.topic.length
                ? [new Paragraph({ text: `Тема статьи: ${paper.topic.join(", ")}` })]
                : []),
            ]
          }
        ]
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${paper.title || "document"}.docx`);
      });
    } catch (err) {
      console.error(err);
      setError("Ошибка при генерации документа");
    } finally {
      setDocLoading(false);
    }
  };



  const handlerAnalytics = async (paper: Paper | null) => {
    if (!paper) return;

    setIsAnalyitcLoding(true);
    setError(null);
    setModalPaper(paper); // открываем модалку сразу

    try {
      const response = await fetch(`${API_URL}/analytics/article`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paper)
      });

      if (!response.ok) throw new Error(`Ошибка HTTP! статус: ${response.status}`);

      const result = await response.json();
      console.log("Результ и дата", result.data)
      console.log("Результат", result)
      // обновляем модалку данными анализа
      setModalPaper(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsAnalyitcLoding(false);
    }
  };

  const handleDeepResearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/search/deep-research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: query,
          researchDepth: 'standard',
          maxSources: 25,
          language: 'any',
        }),
      });

      if (!response.ok) throw new Error(`Ошибка HTTP! статус: ${response.status}`);

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔬 Глубокое Исследование</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Комплексные академические исследования по множеству научных баз данных.
          </p>
        </div>

        {/* Поисковая строка */}
        <div className="max-w-4xl mx-auto mb-8">
          <DeepSearchBar
            onSearch={handleDeepResearch}
            placeholder="Введите тему исследования"
            buttonText="🚀 Начать Глубокое Исследование"
            loading={isLoading}
          />
        </div>

        {/* Ошибка */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">Ошибка</h3>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Лоадер */}
        {isLoading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <div>
                  <h3 className="text-blue-400 font-semibold">
                    Идет глубокое исследование...
                  </h3>
                  <p className="text-blue-300 text-sm">
                    Поиск по академическим базам данных
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* РЕЗУЛЬТАТ */}
        {result && (
          <div className="max-w-6xl mx-auto">
            {/* Сводка */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Сводка исследования</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{result.totalResults}</div>
                  <div className="text-sm text-blue-300">Найдено статей</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{result.totalSources}</div>
                  <div className="text-sm text-green-300">Источники</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">
                    {(result.searchTime / 1000).toFixed(1)}с
                  </div>
                  <div className="text-sm text-purple-300">Время поиска</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{result.researchDepth}</div>
                  <div className="text-sm text-yellow-300">Глубина</div>
                </div>
              </div>
            </div>

            {/* Источники */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">🔍 Источники</h3>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((source) => (
                  <span
                    key={source}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30"
                  >
                    {source.replace('_', ' ').toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* СТАТЬИ */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">📑 Научные статьи</h3>

              <div className="space-y-4">
                {result.papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white flex-1 pr-4">
                        {paper.title}
                      </h4>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {paper.source.replace('_', ' ')}
                        </span>
                        {paper.year && (
                          <span className="text-gray-400 text-sm">{paper.year}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">
                      <strong>Авторы:</strong> {paper.authors.join(', ') || 'Неизвестно'}
                    </p>

                    {paper.abstract && (
                      <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                        {paper.abstract}
                      </p>
                    )}

                    <div className="flex justify-between">
                      {paper.url && (
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Просмотреть статью
                        </a>
                      )}

                      <button
                        onClick={() => handlerAnalytics(paper)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Анализ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* МОДАЛКА АНАЛИЗА */}
        {modalPaper && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setModalPaper(null)}
          >
            <div
              className="bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900 text-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Заголовок */}
              <div className="sticky top-0 px-6 py-4 bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900 border-b border-white/10 z-10">
                <button
                  onClick={() => setModalPaper(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold break-words pr-10">
                  ✨ Анализ: {modalPaper.title}
                </h2>
              </div>

              {/* Контент */}
              <div
                className="overflow-y-auto p-6 space-y-4 break-words flex-1"
                style={{ maxHeight: "calc(85vh - 70px)" }}
              >
                {isAnalyitcLoding ? (
                  <div className="flex items-center justify-center py-10">
                    <CustomSpinner/>
                  </div>
                ) : (
                  <>
                    {/* Авторы */}
                    <p className="text-gray-300 text-sm">
                      <strong>Авторы:</strong> {modalPaper.authors.join(', ')}
                    </p>

                    {/* Резюме */}
                    {modalPaper.summary && (
                      <p className="text-gray-200 text-sm">
                        <strong>Резюме:</strong> {modalPaper.summary}
                      </p>
                    )}

                    {/* Тема */}
                    {modalPaper.topic && (
                      <p className="text-gray-300 text-sm">
                        <strong>Тема статьи:</strong> {modalPaper.topic}
                      </p>
                    )}

                    {/* Ключевые слова */}
                    {modalPaper.keyWords && modalPaper.keyWords.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-lg mb-2">🔑 Ключевые слова</h4>
                        <div className="flex flex-wrap gap-2">
                          {modalPaper.keyWords.map((k, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      className="flex gap-2 text-sm md:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => generateSimpleWord(modalPaper)}
                    >
                      {isDocLoading ? "Загрузка...": "📥 Скачать DOCX"}
                      {isDocLoading ? <MiniCustomSpinner/>: null}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

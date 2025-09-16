'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import DeepSearchBar from '@/components/DeepSearchBar';

interface DeepResearchResult {
    topic: string;
    researchDepth: string;
    totalSources: number;
    totalResults: number;
    sources: string[];
    papers: Array<{
        id: string;
        source: string;
        title: string;
        authors: string[];
        abstract?: string;
        url?: string;
        year?: number;
    }>;
    searchTime: number;
}

export default function DeepResearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DeepResearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeepResearch = async (query: string) => {
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:3001/search/deep-research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: query,
                    researchDepth: 'standard',
                    maxSources: 25,
                    language: 'any'
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🔬 Deep Research
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Comprehensive academic research across multiple scientific databases.
                        Get insights from arXiv, PubMed, Semantic Scholar, and CrossRef in one search.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-8">
                    <DeepSearchBar
                        onSearch={handleDeepResearch}
                        placeholder="Enter research topic (e.g., 'machine learning in healthcare', 'quantum computing applications')"
                        buttonText="🚀 Start Deep Research"
                        loading={isLoading}
                    />
                </div>

                {error && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <h3 className="text-red-400 font-semibold mb-2">Error</h3>
                            <p className="text-red-300">{error}</p>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                            <div className="flex items-center justify-center space-x-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                                <div>
                                    <h3 className="text-blue-400 font-semibold">Deep Research in Progress...</h3>
                                    <p className="text-blue-300 text-sm">
                                        Searching across multiple academic databases
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="max-w-6xl mx-auto">
                        {/* Research Summary */}
                        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                📊 Research Summary
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-400">{result.totalResults}</div>
                                    <div className="text-sm text-blue-300">Papers Found</div>
                                </div>
                                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-green-400">{result.totalSources}</div>
                                    <div className="text-sm text-green-300">Sources</div>
                                </div>
                                <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-400">{(result.searchTime / 1000).toFixed(1)}s</div>
                                    <div className="text-sm text-purple-300">Search Time</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-400">{result.researchDepth}</div>
                                    <div className="text-sm text-yellow-300">Depth</div>
                                </div>
                            </div>
                        </div>

                        {/* Sources Used */}
                        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">🔍 Sources Used</h3>
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

                        {/* Research Results */}
                        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6">
                            <h3 className="text-xl font-semibold text-white mb-6">📑 Research Papers</h3>
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
                                            <div className="flex items-center space-x-2 flex-shrink-0">
                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                                                    {paper.source.replace('_', ' ')}
                                                </span>
                                                {paper.year && (
                                                    <span className="text-gray-400 text-sm">{paper.year}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-gray-300 text-sm">
                                                <span className="font-medium">Authors:</span> {paper.authors.join(', ') || 'Unknown'}
                                            </p>
                                        </div>

                                        {paper.abstract && (
                                            <div className="mb-3">
                                                <p className="text-gray-300 text-sm line-clamp-3">
                                                    {paper.abstract}
                                                </p>
                                            </div>
                                        )}

                                        {paper.url && (
                                            <div>
                                                <a
                                                    href={paper.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                                                >
                                                    View Paper
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!result && !isLoading && !error && (
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-12">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Ready to Start Deep Research?
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Enter a research topic above to begin comprehensive academic search across multiple databases.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <h4 className="text-blue-400 font-semibold mb-2">What We Search:</h4>
                                    <ul className="text-blue-300 text-sm space-y-1">
                                        <li>• arXiv (Physics, Math, CS)</li>
                                        <li>• PubMed (Life Sciences)</li>
                                        <li>• Semantic Scholar (All Fields)</li>
                                        <li>• CrossRef (Academic Publishers)</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <h4 className="text-green-400 font-semibold mb-2">What You Get:</h4>
                                    <ul className="text-green-300 text-sm space-y-1">
                                        <li>• Comprehensive paper collection</li>
                                        <li>• Deduplicated results</li>
                                        <li>• Relevance-based ranking</li>
                                        <li>• Multiple format options</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

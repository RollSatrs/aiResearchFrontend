export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface SearchResultItem {
    id: string;
    source: string;
    title: string;
    authors: string[];
    abstract?: string;
    url?: string;
    year?: number;
}

export interface SearchResponse {
    items: SearchResultItem[];
}

export interface SearchRequest {
    q: string;
    provider?: 'semantic_scholar' | 'arxiv' | 'pubmed';
    limit?: number;
}

export interface SummarizeRequest {
    paperId?: string;
    provider?: 'semantic_scholar' | 'arxiv' | 'pubmed';
    text?: string;
    url?: string;
}

export interface RelatedPaper {
    id: string;
    title: string;
    url?: string;
    source: string;
}

export interface SummaryResponse {
    summary: string;
    keyIdeas: string[];
    relatedPapers?: RelatedPaper[];
}

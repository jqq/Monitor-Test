export enum ContentType {
    RECRUITMENT = 'Recruitment',
    NOTICE = 'Notice',
    NEWS = 'News',
    TENDER = 'Tender'
}

export enum ContentStatus {
    PUBLISHED = 'Published',
    DRAFT = 'Draft',
    ARCHIVED = 'Archived'
}

export interface ContentItem {
    id: string;
    title: string;
    source: string;
    sourceUrl: string;
    publishDate: string;
    type: ContentType;
    region: string;
    status: ContentStatus;
    body: string;
    examType?: string;
}

export enum CrawlerStatus {
    NORMAL = 'Normal',
    FAILED = 'Failed',
    PENDING = 'Pending'
}

export interface CrawlerJob {
    id: string;
    name: string;
    entryUrl: string;
    frequency: string; // e.g., "1h", "24h"
    lastRun: string;
    status: CrawlerStatus;
    failReason?: string;
    rules?: {
        listSelector: string;
        detailSelector: string;
    };
}

export interface User {
    id: string;
    username: string;
    phone: string;
    role: string;
    addedAt: string;
}

export type ViewState = 'dashboard' | 'content' | 'crawlers' | 'users';
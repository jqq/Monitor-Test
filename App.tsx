
import React, { useState } from 'react';
import { LayoutDashboard, FileText, Globe, Users, Menu, Bell, User as UserIcon, Languages } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ContentManager } from './components/ContentManager';
import { CrawlerManager } from './components/CrawlerManager';
import { UserManager } from './components/UserManager';
import { ViewState, ContentItem, CrawlerJob, User, ContentType, ContentStatus, CrawlerStatus } from './types';
import { translations, Language } from './locales';

// --- Initial Mock Data ---
const MOCK_CONTENTS: ContentItem[] = [
    { id: '1', title: 'Senior React Developer Recruitment', source: 'Tech Daily', sourceUrl: 'https://techdaily.com/job/1', publishDate: '2024-05-20', type: ContentType.RECRUITMENT, region: 'New York', status: ContentStatus.PUBLISHED, body: 'Job description placeholder...' },
    { id: '2', title: 'Public Tender for City Park Renovation', source: 'Gov Portal', sourceUrl: 'https://gov.city/tender/99', publishDate: '2024-05-19', type: ContentType.TENDER, region: 'London', status: ContentStatus.DRAFT, body: 'Details here...' },
    { id: '3', title: 'Notice of Road Maintenance - Main St', source: 'City Works', sourceUrl: 'https://cityworks.org/notice/2', publishDate: '2024-05-18', type: ContentType.NOTICE, region: 'California', status: ContentStatus.PUBLISHED, body: 'Closed for 2 days.' },
    { id: '4', title: 'Q2 Financial Results Announced', source: 'Finance Weekly', sourceUrl: 'https://finweek.com/news/q2', publishDate: '2024-05-20', type: ContentType.NEWS, region: 'Texas', status: ContentStatus.PUBLISHED, body: 'Profits are up...' },
    { id: '5', title: 'Junior Designer Opening', source: 'Creative Hub', sourceUrl: 'https://chub.io/job/des', publishDate: '2024-05-15', type: ContentType.RECRUITMENT, region: 'Remote', status: ContentStatus.ARCHIVED, body: 'Apply now.' },
];

const MOCK_CRAWLERS: CrawlerJob[] = [
    { id: 'c1', name: 'City Govt Portal', entryUrl: 'https://city.gov/news', frequency: '1h', lastRun: '10 mins ago', status: CrawlerStatus.NORMAL },
    { id: 'c2', name: 'Tech Crunch Feed', entryUrl: 'https://tc.com/feed', frequency: '24h', lastRun: '1 day ago', status: CrawlerStatus.FAILED, failReason: 'Timeout 504' },
    { id: 'c3', name: 'University Notices', entryUrl: 'https://uni.edu/notices', frequency: '6h', lastRun: '2 hours ago', status: CrawlerStatus.NORMAL },
];

const MOCK_USERS: User[] = [
    { id: 'u1', username: 'Admin User', phone: '13812345678', role: 'Administrator', addedAt: '2023-01-15' },
    { id: 'u2', username: 'Editor One', phone: '13987654321', role: 'Editor', addedAt: '2023-03-20' },
];

const App = () => {
    // Global State
    const [view, setView] = useState<ViewState>('dashboard');
    const [contents, setContents] = useState<ContentItem[]>(MOCK_CONTENTS);
    const [crawlers, setCrawlers] = useState<CrawlerJob[]>(MOCK_CRAWLERS);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Language State
    const [lang, setLang] = useState<Language>('zh');
    const t = translations[lang];

    // Logic Handlers
    const handleContentUpdate = (updatedItem: ContentItem) => {
        setContents(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const handleAddCrawler = (newCrawler: CrawlerJob) => {
        setCrawlers(prev => [newCrawler, ...prev]);
    };

    const handleImportCrawlers = () => {
        // Mock Import
        const imported: CrawlerJob = {
            id: `imp-${Date.now()}`,
            name: `Imported Site ${Math.floor(Math.random() * 100)}`,
            entryUrl: 'https://imported-site.com',
            frequency: '24h',
            lastRun: 'Never',
            status: CrawlerStatus.PENDING
        };
        setCrawlers(prev => [imported, ...prev]);
    };

    const handleAddUser = (newUser: User) => {
        setUsers(prev => [newUser, ...prev]);
    };

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'zh' : 'en');
    };

    // --- Layout Components ---
    
    const SidebarItem = ({ id, label, icon: Icon }: { id: ViewState, label: string, icon: any }) => (
        <button
            onClick={() => {
                setView(id);
                setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                view === id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">C</div>
                        <span>Monitor<span className="text-blue-500">Pro</span></span>
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    <SidebarItem id="dashboard" label={t.nav.dashboard} icon={LayoutDashboard} />
                    <SidebarItem id="content" label={t.nav.content} icon={FileText} />
                    <SidebarItem id="crawlers" label={t.nav.crawlers} icon={Globe} />
                    <SidebarItem id="users" label={t.nav.users} icon={Users} />
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        {t.nav.systemOp}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <button 
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span className="hidden md:inline">{t.header.org}:</span>
                        <span className="font-semibold text-slate-800">{t.header.orgName}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleLanguage}
                            className="p-2 text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                            <Languages className="w-5 h-5" />
                            <span>{lang === 'en' ? 'EN' : '中文'}</span>
                        </button>

                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-slate-800">{t.header.admin}</p>
                                <p className="text-xs text-slate-500">{t.header.role}</p>
                            </div>
                            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
                                <UserIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Module View Area */}
                <main className="flex-1 overflow-auto p-6 relative">
                    {view === 'dashboard' && (
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-slate-900">{t.dashboard.title}</h1>
                                <p className="text-slate-500">{t.dashboard.subtitle}</p>
                            </div>
                            <Dashboard contents={contents} crawlers={crawlers} t={t} />
                        </div>
                    )}

                    {view === 'content' && (
                         <div className="h-full flex flex-col">
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold text-slate-900">{t.content.title}</h1>
                                <p className="text-slate-500">{t.content.subtitle}</p>
                            </div>
                            <div className="flex-1 min-h-0">
                                <ContentManager data={contents} onUpdate={handleContentUpdate} t={t} />
                            </div>
                        </div>
                    )}

                    {view === 'crawlers' && (
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-slate-900">{t.crawlers.title}</h1>
                                <p className="text-slate-500">{t.crawlers.subtitle}</p>
                            </div>
                            <CrawlerManager 
                                crawlers={crawlers} 
                                onAdd={handleAddCrawler} 
                                onImport={handleImportCrawlers}
                                t={t}
                            />
                        </div>
                    )}

                    {view === 'users' && (
                         <div className="max-w-5xl mx-auto">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-slate-900">{t.users.title}</h1>
                                <p className="text-slate-500">{t.users.subtitle}</p>
                            </div>
                            <UserManager users={users} onAdd={handleAddUser} t={t} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;

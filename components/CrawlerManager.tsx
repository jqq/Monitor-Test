
import React, { useState } from 'react';
import { Play, Pause, AlertCircle, Plus, Upload, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Card, Modal, Input } from './ui/Shared';
import { CrawlerJob, CrawlerStatus } from '../types';
import { Translation } from '../locales';

interface CrawlerManagerProps {
    crawlers: CrawlerJob[];
    onAdd: (crawler: CrawlerJob) => void;
    onImport: () => void;
    t: Translation;
}

export const CrawlerManager: React.FC<CrawlerManagerProps> = ({ crawlers, onAdd, onImport, t }) => {
    const [filter, setFilter] = useState<'All' | 'Normal' | 'Failed' | 'Pending'>('All');
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    
    // Wizard State
    const [wizardStep, setWizardStep] = useState(1);
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null);
    const [previewData, setPreviewData] = useState<any>(null);
    
    const [newCrawler, setNewCrawler] = useState<Partial<CrawlerJob>>({
        frequency: '24h',
        status: CrawlerStatus.PENDING,
        rules: { listSelector: '', detailSelector: '' }
    });

    const failedCount = crawlers.filter(c => c.status === CrawlerStatus.FAILED).length;

    const filteredList = crawlers.filter(c => {
        if (filter === 'All') return true;
        return c.status === filter;
    });

    // Map filters to translation keys
    const tabs = [
        { key: 'All', label: t.crawlers.tabs.all },
        { key: 'Normal', label: t.crawlers.tabs.normal },
        { key: 'Failed', label: t.crawlers.tabs.failed },
        { key: 'Pending', label: t.crawlers.tabs.pending },
    ];

    // Wizard Logic
    const handleTestConnection = async () => {
        setIsTesting(true);
        setTestResult(null);
        // Mock Async Request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const success = Math.random() > 0.2; // 80% chance success
        setIsTesting(false);
        setTestResult(success ? 'success' : 'fail');
    };

    const handleTestRules = async () => {
        setIsTesting(true);
        setPreviewData(null);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPreviewData({
            title: t.crawlers.wizard.previewTitle,
            date: "2024-05-20",
            preview: t.crawlers.wizard.previewText
        });
        setIsTesting(false);
    };

    const handleFinishWizard = () => {
        onAdd({
            id: `job-${Date.now()}`,
            name: newCrawler.name || 'New Monitor',
            entryUrl: newCrawler.entryUrl || '',
            frequency: newCrawler.frequency || '24h',
            lastRun: 'Never',
            status: CrawlerStatus.NORMAL,
            rules: newCrawler.rules,
            ...newCrawler
        } as CrawlerJob);
        setIsWizardOpen(false);
        setWizardStep(1);
        setNewCrawler({});
        setTestResult(null);
        setPreviewData(null);
    };

    return (
        <div className="space-y-6">
            {/* Header / Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                                filter === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {tab.label}
                            {tab.key === 'Failed' && failedCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                    {failedCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onImport}>
                        <Upload className="w-4 h-4 mr-2" /> {t.crawlers.import}
                    </Button>
                    <Button onClick={() => setIsWizardOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> {t.crawlers.add}
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredList.map(crawler => (
                    <Card key={crawler.id} className="hover:border-blue-300 transition-colors group">
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-slate-900 truncate pr-2">{crawler.name}</h3>
                                    <p className="text-xs text-slate-500 truncate mt-1 w-48">{crawler.entryUrl}</p>
                                </div>
                                <Badge variant={
                                    crawler.status === CrawlerStatus.NORMAL ? 'success' :
                                    crawler.status === CrawlerStatus.FAILED ? 'error' : 'default'
                                }>
                                    {t.enums.crawlerStatus[crawler.status as keyof typeof t.enums.crawlerStatus]}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100">
                                <span>{t.crawlers.freq}: {crawler.frequency}</span>
                                <span>{t.crawlers.last}: {crawler.lastRun}</span>
                            </div>
                            
                            {crawler.status === CrawlerStatus.FAILED && (
                                <div className="text-xs text-red-600 bg-red-50 p-2 rounded flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {t.crawlers.failReason}
                                </div>
                            )}

                            <div className="pt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost">{t.common.edit}</Button>
                                <Button size="sm" variant="ghost" className="text-blue-600">{t.crawlers.runNow}</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Wizard Modal */}
            <Modal
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                title={t.crawlers.wizard.title}
                maxWidth="max-w-2xl"
                footer={
                    <>
                        {wizardStep === 2 && (
                             <Button variant="outline" onClick={() => setWizardStep(1)}>{t.common.back}</Button>
                        )}
                        {wizardStep === 1 ? (
                            <Button 
                                onClick={() => setWizardStep(2)} 
                                disabled={testResult !== 'success'}
                            >
                                {t.common.next}
                            </Button>
                        ) : (
                            <Button onClick={handleFinishWizard}>{t.crawlers.wizard.confirmCreate}</Button>
                        )}
                    </>
                }
            >
                {/* Stepper Visual */}
                <div className="flex items-center justify-center mb-8">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${wizardStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
                    <div className="w-16 h-1 bg-slate-200 mx-2 relative">
                        <div className={`absolute top-0 left-0 h-full bg-blue-600 transition-all ${wizardStep === 2 ? 'w-full' : 'w-0'}`}></div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${wizardStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
                </div>

                <div className="space-y-6">
                    {wizardStep === 1 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="font-medium text-slate-900">{t.crawlers.wizard.step1}</h4>
                            <Input 
                                label={t.crawlers.wizard.siteName}
                                placeholder={t.crawlers.wizard.siteNamePlaceholder}
                                value={newCrawler.name || ''}
                                onChange={e => setNewCrawler(p => ({...p, name: e.target.value}))}
                            />
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <Input 
                                        label={t.crawlers.wizard.entryUrl}
                                        placeholder="https://example.com/news"
                                        value={newCrawler.entryUrl || ''}
                                        onChange={e => setNewCrawler(p => ({...p, entryUrl: e.target.value}))}
                                    />
                                </div>
                                <Button 
                                    variant="secondary" 
                                    onClick={handleTestConnection}
                                    isLoading={isTesting}
                                >
                                    {t.crawlers.wizard.testConn}
                                </Button>
                            </div>
                            
                            {testResult === 'success' && (
                                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded">
                                    <CheckCircle2 className="w-4 h-4" /> {t.crawlers.wizard.connSuccess}
                                </div>
                            )}
                             {testResult === 'fail' && (
                                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
                                    <AlertCircle className="w-4 h-4" /> {t.crawlers.wizard.connFail}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t.crawlers.wizard.frequency}</label>
                                <select 
                                    className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm"
                                    value={newCrawler.frequency}
                                    onChange={e => setNewCrawler(p => ({...p, frequency: e.target.value}))}
                                >
                                    <option value="1h">{t.crawlers.wizard.freqOptions['1h']}</option>
                                    <option value="6h">{t.crawlers.wizard.freqOptions['6h']}</option>
                                    <option value="24h">{t.crawlers.wizard.freqOptions['24h']}</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {wizardStep === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                             <h4 className="font-medium text-slate-900">{t.crawlers.wizard.step2}</h4>
                             <Input 
                                label={t.crawlers.wizard.listSelector}
                                placeholder=".news-list li a"
                                value={newCrawler.rules?.listSelector || ''}
                                onChange={e => setNewCrawler(p => ({...p, rules: {...p.rules!, listSelector: e.target.value}}))}
                            />
                             <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <Input 
                                        label={t.crawlers.wizard.bodySelector}
                                        placeholder=".article-content"
                                        value={newCrawler.rules?.detailSelector || ''}
                                        onChange={e => setNewCrawler(p => ({...p, rules: {...p.rules!, detailSelector: e.target.value}}))}
                                    />
                                </div>
                                <Button 
                                    variant="secondary" 
                                    onClick={handleTestRules}
                                    isLoading={isTesting}
                                >
                                    {t.crawlers.wizard.testRules}
                                </Button>
                            </div>

                            {previewData && (
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm space-y-2">
                                    <p className="font-bold text-slate-800">{previewData.title}</p>
                                    <p className="text-slate-400 text-xs">{previewData.date}</p>
                                    <p className="text-slate-600 italic border-l-2 border-blue-400 pl-2">{previewData.preview}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, Save, ExternalLink } from 'lucide-react';
import { Button, Badge, Input, Card } from './ui/Shared';
import { ContentItem, ContentStatus, ContentType } from '../types';
import { Translation } from '../locales';

interface ContentManagerProps {
    data: ContentItem[];
    onUpdate: (updated: ContentItem) => void;
    t: Translation;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ data, onUpdate, t }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
    const [editForm, setEditForm] = useState<Partial<ContentItem>>({});

    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDetail = (item: ContentItem) => {
        setSelectedItem(item);
        setEditForm({ ...item });
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const handleCloseDetail = () => {
        setSelectedItem(null);
        setEditForm({});
        document.body.style.overflow = 'auto';
    };

    const handleSave = () => {
        if (selectedItem && editForm.id) {
            onUpdate(editForm as ContentItem);
        }
    };

    const navigateItem = (direction: 'prev' | 'next') => {
        if (!selectedItem) return;
        const currentIndex = filteredData.findIndex(i => i.id === selectedItem.id);
        
        // Save current before moving
        handleSave();

        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < filteredData.length) {
            const nextItem = filteredData[nextIndex];
            setSelectedItem(nextItem);
            setEditForm({ ...nextItem });
        }
    };

    return (
        <div className="space-y-4 h-full">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Input 
                        placeholder={t.content.searchPlaceholder}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <select className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">{t.content.allTypes}</option>
                        {Object.values(ContentType).map(typeKey => (
                            <option key={typeKey} value={typeKey}>
                                {t.enums.contentType[typeKey as keyof typeof t.enums.contentType]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-sm text-slate-500">
                    {t.content.showing} {filteredData.length} {t.content.records}
                </div>
            </div>

            {/* List View */}
            <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                            <tr>
                                <th className="px-4 py-3">{t.content.cols.title}</th>
                                <th className="px-4 py-3">{t.content.cols.source}</th>
                                <th className="px-4 py-3">{t.content.cols.type}</th>
                                <th className="px-4 py-3">{t.content.cols.date}</th>
                                <th className="px-4 py-3">{t.content.cols.status}</th>
                                <th className="px-4 py-3 text-right">{t.content.cols.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 font-medium max-w-xs truncate" title={item.title}>
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-3">{item.source}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant="outline">
                                            {t.enums.contentType[item.type as keyof typeof t.enums.contentType]}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">{item.publishDate}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={item.status === ContentStatus.PUBLISHED ? 'success' : 'warning'}>
                                             {t.enums.contentStatus[item.status as keyof typeof t.enums.contentStatus]}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenDetail(item)}>
                                            <Eye className="w-4 h-4 mr-1" /> {t.content.details}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Split Screen Modal (Full Screen Overlay) */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-10 duration-200">
                    {/* Header */}
                    <div className="h-14 border-b flex items-center justify-between px-6 bg-slate-50">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={handleCloseDetail}>
                                <ChevronLeft className="w-4 h-4 mr-1" /> {t.content.backToList}
                            </Button>
                            <h2 className="font-semibold text-slate-800">{t.content.reviewing}: {selectedItem.id}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="sm" onClick={() => navigateItem('prev')}>
                                {t.content.prev}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateItem('next')}>
                                {t.content.next}
                            </Button>
                            <div className="h-4 w-px bg-slate-300 mx-2"></div>
                            <Button variant="primary" size="sm" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" /> {t.content.saveChanges}
                            </Button>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left: Source Preview (Iframe Placeholder) */}
                        <div className="w-1/2 bg-slate-100 border-r border-slate-200 relative">
                             <div className="absolute top-4 left-4 right-4 bottom-4 bg-white shadow-sm border border-slate-300 rounded-lg flex flex-col">
                                <div className="bg-slate-50 border-b p-2 text-xs text-slate-500 flex items-center gap-2">
                                    <ExternalLink className="w-3 h-3" />
                                    <span className="truncate">{selectedItem.sourceUrl}</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center bg-slate-50">
                                    <div className="text-center p-8">
                                        <p className="text-slate-400 font-medium text-lg mb-2">{t.content.originalSnapshot}</p>
                                        <p className="text-slate-400 text-sm">{t.content.previewNote}</p>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Right: Structured Data Form */}
                        <div className="w-1/2 overflow-y-auto p-8 bg-white">
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="space-y-4">
                                    <Input 
                                        label={t.content.form.title}
                                        value={editForm.title || ''}
                                        onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                                    />
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input 
                                            label={t.content.form.publishDate}
                                            type="date"
                                            value={editForm.publishDate || ''}
                                            onChange={e => setEditForm(p => ({ ...p, publishDate: e.target.value }))}
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.content.form.status}</label>
                                            <select 
                                                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editForm.status}
                                                onChange={e => setEditForm(p => ({ ...p, status: e.target.value as ContentStatus }))}
                                            >
                                                {Object.values(ContentStatus).map(s => (
                                                    <option key={s} value={s}>
                                                        {t.enums.contentStatus[s as keyof typeof t.enums.contentStatus]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.content.form.category}</label>
                                            <select 
                                                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editForm.type}
                                                onChange={e => setEditForm(p => ({ ...p, type: e.target.value as ContentType }))}
                                            >
                                                {Object.values(ContentType).map(typeKey => (
                                                    <option key={typeKey} value={typeKey}>
                                                        {t.enums.contentType[typeKey as keyof typeof t.enums.contentType]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.content.form.region}</label>
                                             {/* Simulated Cascader */}
                                             <select 
                                                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editForm.region}
                                                onChange={e => setEditForm(p => ({ ...p, region: e.target.value }))}
                                            >
                                                <option value="New York">New York</option>
                                                <option value="California">California</option>
                                                <option value="Texas">Texas</option>
                                                <option value="London">London</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">{t.content.form.body}</label>
                                        <textarea 
                                            className="w-full min-h-[300px] rounded-md border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                            value={editForm.body || ''}
                                            onChange={e => setEditForm(p => ({ ...p, body: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

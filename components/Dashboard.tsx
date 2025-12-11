
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ArrowUpRight, AlertTriangle, FileText, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Shared';
import { ContentItem, ContentType, CrawlerJob, CrawlerStatus } from '../types';
import { Translation } from '../locales';

interface DashboardProps {
    contents: ContentItem[];
    crawlers: CrawlerJob[];
    t: Translation;
}

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

export const Dashboard: React.FC<DashboardProps> = ({ contents, crawlers, t }) => {
    // Analytics Logic
    const today = new Date().toISOString().split('T')[0];
    const newToday = contents.filter(c => c.publishDate.startsWith(today)).length;
    const totalCount = contents.length;
    const abnormalCrawlers = crawlers.filter(c => c.status === CrawlerStatus.FAILED).length;

    // Pie Chart Data
    const typeCount = contents.reduce((acc, curr) => {
        // Use localized enum if possible, or fallback
        const typeKey = curr.type.toString(); 
        acc[typeKey] = (acc[typeKey] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.keys(typeCount).map(key => ({
        name: t.enums.contentType[key as keyof typeof t.enums.contentType] || key,
        value: typeCount[key]
    }));

    // Top Sources
    const sourceCount = contents.reduce((acc, curr) => {
        acc[curr.source] = (acc[curr.source] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const topSources = Object.entries(sourceCount)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>{t.dashboard.newToday}</CardTitle>
                        <FileText className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newToday}</div>
                        <p className="text-xs text-slate-500">{t.dashboard.fromYesterday}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>{t.dashboard.totalContent}</CardTitle>
                        <Database className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCount.toLocaleString()}</div>
                        <p className="text-xs text-slate-500">{t.dashboard.historical}</p>
                    </CardContent>
                </Card>
                <Card className={abnormalCrawlers > 0 ? "border-red-200 bg-red-50" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className={abnormalCrawlers > 0 ? "text-red-700" : ""}>{t.dashboard.monitorAbnormal}</CardTitle>
                        <AlertTriangle className={`h-4 w-4 ${abnormalCrawlers > 0 ? "text-red-600" : "text-slate-600"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${abnormalCrawlers > 0 ? "text-red-700" : ""}`}>{abnormalCrawlers}</div>
                        <p className={`text-xs ${abnormalCrawlers > 0 ? "text-red-600" : "text-slate-500"}`}>
                            {abnormalCrawlers > 0 ? t.dashboard.actionRequired : t.dashboard.allNormal}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>{t.dashboard.catChart}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>{t.dashboard.sourceChart}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topSources.map((source, index) => (
                                <div key={index} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-slate-900">{source.name}</p>
                                            <a href="#" className="text-xs text-slate-400 hover:text-blue-500 hover:underline flex items-center gap-1">
                                                {t.dashboard.viewSource} <ArrowUpRight className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600">{source.count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

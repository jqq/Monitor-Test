
import React, { useState } from 'react';
import { UserPlus, Shield, Smartphone } from 'lucide-react';
import { Button, Input, Modal, Badge } from './ui/Shared';
import { User } from '../types';
import { Translation } from '../locales';

interface UserManagerProps {
    users: User[];
    onAdd: (user: User) => void;
    t: Translation;
}

export const UserManager: React.FC<UserManagerProps> = ({ users, onAdd, t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        phone: ''
    });

    const handleSave = async () => {
        setIsLoading(true);
        setFormError('');

        // Mock EHR System Check
        await new Promise(r => setTimeout(r, 1000));

        // Logic: Phone numbers ending in '00' fail check
        if (formData.phone.endsWith('00')) {
            setFormError(t.users.modal.error);
            setIsLoading(false);
            return;
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            username: formData.username,
            phone: formData.phone,
            role: 'Operator',
            addedAt: new Date().toISOString().split('T')[0]
        };

        onAdd(newUser);
        setIsLoading(false);
        setIsModalOpen(false);
        setFormData({ username: '', phone: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">{t.users.systemUsers}</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <UserPlus className="w-4 h-4 mr-2" /> {t.users.add}
                </Button>
            </div>

            <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                        <tr>
                            <th className="px-6 py-4">{t.users.cols.name}</th>
                            <th className="px-6 py-4">{t.users.cols.phone}</th>
                            <th className="px-6 py-4">{t.users.cols.role}</th>
                            <th className="px-6 py-4">{t.users.cols.joined}</th>
                            <th className="px-6 py-4 text-right">{t.users.cols.status}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{user.username}</td>
                                <td className="px-6 py-4 text-slate-500 font-mono">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-3 h-3 text-blue-500" />
                                        {user.role}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{user.addedAt}</td>
                                <td className="px-6 py-4 text-right">
                                    <Badge variant="success">{t.users.active}</Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t.users.modal.title}
                footer={
                    <Button onClick={handleSave} isLoading={isLoading}>{t.users.modal.verifyBtn}</Button>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-500 bg-blue-50 p-3 rounded border border-blue-100 mb-4">
                        {t.users.modal.note}
                    </p>
                    
                    <Input 
                        label={t.users.modal.fullName}
                        value={formData.username}
                        onChange={e => setFormData(p => ({...p, username: e.target.value}))}
                        placeholder="John Doe"
                    />
                    
                    <div className="relative">
                        <Input 
                            label={t.users.modal.phone}
                            value={formData.phone}
                            onChange={e => setFormData(p => ({...p, phone: e.target.value}))}
                            placeholder="13800000000"
                            type="tel"
                        />
                        <Smartphone className="absolute right-3 top-8 text-slate-400 w-4 h-4" />
                    </div>

                    {formError && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            {formError}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

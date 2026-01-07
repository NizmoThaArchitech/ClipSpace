
import React, { useEffect } from 'react';
import type { ProjectTask } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface TaskDetailModalProps {
  task: ProjectTask;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const priorityStyles = {
        'High': 'bg-red-500/20 text-red-300',
        'Medium': 'bg-yellow-500/20 text-yellow-300',
        'Low': 'bg-sky-500/20 text-sky-300',
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">{task.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6" /></button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
                        <p className="text-gray-300">{task.description || 'No description provided.'}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Priority</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityStyles[task.priority || 'Low']}`}>{task.priority}</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Due Date</h3>
                            <div className="flex items-center gap-2 text-gray-300">
                                <CalendarIcon className="w-5 h-5" />
                                <span>{task.dueDate || 'Not set'}</span>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Status</h3>
                            <span className="text-gray-300 font-medium">{task.status}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Assignees</h3>
                        <div className="flex -space-x-2">
                            {task.assignees?.map(user => (
                                <img key={user.id} src={user.avatarUrl} alt={user.name} title={user.name} className="w-10 h-10 rounded-full ring-2 ring-gray-800" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;

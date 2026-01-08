
import React, { useState, useEffect } from 'react';
import type { Theme } from '../App';
import { MOCK_PROJECT_TASKS } from '../constants';
import type { ProjectTask } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FlagIcon } from './icons/FlagIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

const ClockWidget: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [theme, setTheme] = useState<'minimal' | 'elegant' | 'neon'>('elegant');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const themeStyles = {
        minimal: "bg-transparent text-white font-light text-5xl",
        elegant: "bg-gradient-to-br from-indigo-900 to-black text-white font-black text-6xl italic",
        neon: "bg-black text-teal-400 font-mono text-5xl border-2 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]"
    };

    return (
        <div className={`p-8 rounded-3xl transition-all duration-500 flex flex-col items-center justify-center relative overflow-hidden group border border-gray-800 ${themeStyles[theme]}`}>
            <div className="absolute top-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {(['minimal', 'elegant', 'neon'] as const).map(t => (
                    <button key={t} onClick={() => setTheme(t)} className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors"></button>
                ))}
            </div>
            <p className="tracking-tighter">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-50">Local Production Time</p>
        </div>
    );
};

const ProjectTaskCard: React.FC<{ task: ProjectTask, onDelete: (id: string) => void }> = ({ task, onDelete }) => {
    const [daysLeft, setDaysLeft] = useState(0);
    
    useEffect(() => {
        const diff = new Date(task.dueDate).getTime() - new Date().getTime();
        setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, [task.dueDate]);

    const getAlertClass = () => {
        if (daysLeft <= 0) return "animate-deadline-fast bg-red-600 text-white";
        if (daysLeft <= 3) return "animate-deadline-mod bg-orange-600 text-white";
        if (daysLeft <= 7) return "animate-deadline-slow bg-yellow-400 text-black";
        return "bg-gray-800 text-gray-400";
    };

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-5 rounded-2xl group transition-all hover:border-indigo-500 shadow-xl relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getAlertClass()}`}>
                    {daysLeft <= 0 ? "DUE TODAY" : daysLeft === 1 ? "DUE TOMORROW" : `${daysLeft} DAYS LEFT`}
                </div>
                <button onClick={() => onDelete(task.id)} className="text-gray-600 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5"/></button>
            </div>
            <h4 className="text-white font-black text-lg leading-tight group-hover:text-indigo-400 transition-colors">{task.title}</h4>
            <p className="text-gray-500 text-xs mt-2 line-clamp-2">{task.description}</p>
            
            <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                <div className="flex -space-x-2">
                    {task.assignees?.map(a => <img key={a.id} src={a.avatarUrl} alt={`${a.name} avatar`} className="w-8 h-8 rounded-full border-2 border-gray-900" title={a.name}/>)}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase">
                    <FlagIcon className={`w-3 h-3 ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-orange-500' : 'text-gray-600'}`} />
                    {task.priority}
                </div>
            </div>

            <style>{`
                @keyframes deadline-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes deadline-mod { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
                @keyframes deadline-fast { 0%, 100% { transform: scale(1); background: #dc2626; } 50% { transform: scale(1.1); background: #7f1d1d; } }
                .animate-deadline-slow { animation: deadline-slow 3s infinite ease-in-out; }
                .animate-deadline-mod { animation: deadline-mod 1.5s infinite ease-in-out; }
                .animate-deadline-fast { animation: deadline-fast 0.6s infinite ease-in-out; }
            `}</style>
        </div>
    );
}

const MyProjects: React.FC<{ theme: Theme }> = ({ theme: _theme }) => {
    const allInitialTasks = [...MOCK_PROJECT_TASKS['To-Do'], ...MOCK_PROJECT_TASKS['In Progress'], ...MOCK_PROJECT_TASKS['Done']];
    const [tasks, setTasks] = useState<ProjectTask[]>(allInitialTasks);
    const [notes, setNotes] = useState("• Remind AeroVisions about the drone licensing fee\n• Finalize color grade for Japan vlog\n• Review CSpace Video Suite export bitrates");

    const autoPrioritize = () => {
        const sorted = [...tasks].sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return dateA - dateB;
        });
        setTasks(sorted);
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full bg-gray-700 gap-8">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">PROJECT <span className="text-indigo-500">OPERATIONS</span></h1>
            <p className="text-gray-300 text-sm font-bold mt-1 uppercase tracking-widest">Master Queue & Intelligence Hub</p>
        </div>
        <div className="flex gap-3">
             <button onClick={autoPrioritize} className="bg-indigo-900/30 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 font-black py-3 px-6 rounded-2xl transition-all flex items-center gap-2 text-xs">
                 AUTO-PRIORITIZE QUEUE
             </button>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-8 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center gap-2 text-xs">
                 <PlusIcon className="w-5 h-5"/> NEW PRODUCTION
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_24rem] gap-8 min-h-0">
          {/* Main Task Queue */}
          <div className="space-y-6 overflow-y-auto no-scrollbar pr-2 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tasks.map(task => <ProjectTaskCard key={task.id} task={task} onDelete={deleteTask} />)}
              </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="space-y-8 h-full">
              <ClockWidget />

              {/* Notepad Widget - Background set to bg-gray-700 as requested */}
              <div className="bg-gray-700 p-6 rounded-3xl border border-gray-600 shadow-2xl flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2"><DocumentTextIcon className="w-4 h-4"/> Production Notes</h3>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <textarea 
                    value={notes} 
                    onChange={e => setNotes(e.target.value)}
                    className="w-full h-40 bg-black/20 text-gray-200 font-medium p-4 rounded-2xl border border-gray-600 focus:border-indigo-500 focus:outline-none text-sm resize-none"
                    placeholder="Capture quick ideas here..."
                  />
              </div>

              {/* Calendar Widget */}
              <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-2xl flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Schedule</h3>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-gray-600 uppercase mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                      {Array.from({length: 31}).map((_, i) => (
                          <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${i + 1 === 22 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-400'}`}>
                              {i + 1}
                              {i + 1 === 25 && <div className="absolute w-1 h-1 bg-red-500 rounded-full mt-5"></div>}
                              {i + 1 === 28 && <div className="absolute w-1 h-1 bg-yellow-500 rounded-full mt-5"></div>}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MyProjects;

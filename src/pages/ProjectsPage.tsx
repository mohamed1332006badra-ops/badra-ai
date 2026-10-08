import React, { useState } from 'react';
import { Plus, CheckSquare, Calendar, X } from 'lucide-react';
import { mockProjects, mockTasks } from '@/lib/mockData';
import type { Project, Task } from '@/types';
import { statusColor, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

type KanbanStatus = Task['status'];
const kanbanCols: { id: KanbanStatus; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: '#6b7280' },
  { id: 'in-progress', label: 'In Progress', color: '#3b82f6' },
  { id: 'review', label: 'Review', color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#22c55e' },
];

const priorityColors: Record<string, string> = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444',
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const statusMap: Record<string, string> = {
    planning: '#3b82f6',
    active: '#22c55e',
    'on-hold': '#f59e0b',
    completed: '#8b5cf6',
  };

  return (
    <div className="glass-card-hover p-5 rounded-2xl cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-medium text-foreground text-sm leading-tight flex-1">{project.name}</h3>
        <span className={`status-badge ${statusColor(project.status)} flex-shrink-0`}>{project.status}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${project.progress}%`, background: `linear-gradient(90deg, ${statusMap[project.status] || '#3b82f6'}, #8b5cf6)` }} />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <CheckSquare className="w-3 h-3" />
          <span>{project.tasksCompleted}/{project.tasksTotal} tasks</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(project.dueDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: priorityColors[project.priority] || '#6b7280' }} />
        <span className="text-[10px] text-muted-foreground capitalize">{project.priority} priority</span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const tasks = mockTasks.filter(t => t.projectId === project.id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl p-6 z-10 max-h-[85vh] overflow-y-auto"
        style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-display font-bold text-foreground text-xl">{project.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Status', value: project.status, isStatus: true },
            { label: 'Priority', value: project.priority, isStatus: true },
            { label: 'Due Date', value: formatDate(project.dueDate) },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              {item.isStatus ? (
                <span className={`status-badge ${statusColor(item.value)}`}>{item.value}</span>
              ) : (
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Progress</p>
            <span className="text-sm font-bold text-white">{project.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/8">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{project.tasksCompleted} of {project.tasksTotal} tasks completed</p>
        </div>

        {tasks.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Tasks ({tasks.length})</p>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: task.status === 'done' ? '#22c55e' : task.status === 'in-progress' ? '#3b82f6' : '#6b7280' }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                  </div>
                  <span className={`status-badge ${statusColor(task.priority)} text-[10px]`}>{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'kanban'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockProjects.filter(p => statusFilter === 'all' || p.status === statusFilter);

  const tasksByStatus = kanbanCols.reduce<Record<KanbanStatus, Task[]>>((acc, col) => {
    acc[col.id] = mockTasks.filter(t => t.status === col.id);
    return acc;
  }, {} as Record<KanbanStatus, Task[]>);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(['grid', 'kanban'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${view === v ? 'text-blue-300' : 'text-muted-foreground'}`}
                style={view === v ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {v}
              </button>
            ))}
          </div>
          <button className="btn-brand" onClick={() => toast.success('New project created')}>
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'planning', 'active', 'on-hold', 'completed'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? 'text-blue-300' : 'text-muted-foreground hover:text-foreground'}`}
            style={statusFilter === s ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {s}
          </button>
        ))}
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {kanbanCols.map(col => {
              const tasks = tasksByStatus[col.id];
              return (
                <div key={col.id} className="kanban-column">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                      <span className="text-xs font-semibold text-foreground">{col.label}</span>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${col.color}20`, color: col.color }}>
                      {tasks.length}
                    </span>
                  </div>
                  {tasks.length === 0 ? (
                    <div className="h-20 flex items-center justify-center rounded-xl text-xs text-muted-foreground/40"
                      style={{ border: '1px dashed rgba(255,255,255,0.07)' }}>
                      No tasks
                    </div>
                  ) : tasks.map(task => (
                    <div key={task.id} className="kanban-card mb-2">
                      <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
                      <div className="flex items-center justify-between">
                        <span className={`status-badge ${statusColor(task.priority)} text-[10px]`}>{task.priority}</span>
                        <span className="text-[10px] text-muted-foreground">{task.assignedTo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

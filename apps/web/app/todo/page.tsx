'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, X } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showForm, setShowForm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
  });

  const STORAGE_KEY = 'ai-career-todos';

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Calculate stats
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  // Add new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    setShowForm(false);
  };

  // Toggle todo completion
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear completed todos
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    setShowClearConfirm(false);
  };

  // Priority color mapping
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertCircle className="w-4 h-4" />;
    }
    return null;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading your todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            📝 Todo List
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your tasks with local storage persistence
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-cyan-400 text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Active</p>
            <p className="text-green-400 text-3xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Completed</p>
            <p className="text-blue-400 text-3xl font-bold">{stats.completed}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-cyan-500/50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Add Todo Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold py-3 rounded-lg mb-8 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" /> Add New Todo
          </button>
        )}

        {/* Add Todo Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New Todo</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddTodo} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter todo title"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter todo description"
                  rows={3}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {/* Priority and Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as 'low' | 'medium' | 'high',
                      })
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold py-2 rounded-lg transition-all duration-300"
              >
                Create Todo
              </button>
            </form>
          </div>
        )}

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              {filter === 'all' && todos.length === 0
                ? '📭 No todos yet. Create one to get started!'
                : `📭 No ${filter} todos`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/20 rounded-lg p-4 transition-all duration-300 hover:shadow-lg ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleTodo(todo.id)}
                    className="mt-1 text-gray-400 hover:text-cyan-400 transition-colors flex-shrink-0"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3
                        className={`text-lg font-semibold ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-white'
                        }`}
                      >
                        {todo.title}
                      </h3>

                      {/* Priority Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(
                          todo.priority
                        )}`}
                      >
                        {getPriorityIcon(todo.priority)}
                        {todo.priority.charAt(0).toUpperCase() +
                          todo.priority.slice(1)}
                      </span>
                    </div>

                    {/* Description */}
                    {todo.description && (
                      <p className="text-gray-400 text-sm mb-2">
                        {todo.description}
                      </p>
                    )}

                    {/* Due Date */}
                    {todo.dueDate && (
                      <p className="text-gray-500 text-xs">
                        📅 Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
            >
              Clear Completed ({stats.completed})
            </button>
          </div>
        )}

        {/* Clear Confirmation Dialog */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-cyan-500/30 rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">
                Clear Completed Todos?
              </h3>
              <p className="text-gray-400 mb-6">
                This action cannot be undone. {stats.completed} completed todos
                will be deleted.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCompleted}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs mt-12">
          <p>💾 Your todos are automatically saved to local storage</p>
          <p className="mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

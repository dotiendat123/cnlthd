import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';

const TodoPage = () => {
    const {
        tasks,
        addOrEditTask,
        handleEdit,
        handleDelete,
        toggleComplete,
        completedCount,
        editIndex,
    } = useTasks();

    const [newTask, setNewTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = () => {
        const trimmed = newTask.trim();
        if (!trimmed) return;

        addOrEditTask({ text: trimmed, date, time, completed: false });
        setNewTask('');
        setDate('');
        setTime('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleEditWithPrefill = (index) => {
        handleEdit(index);
        const task = tasks[index];
        setNewTask(task.text);
        setDate(task.date || '');
        setTime(task.time || '');
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <ChecklistIcon />
                Danh sách công việc
            </h1>
            <p className="text-blue-600 mb-2">
                Đã hoàn thành: {completedCount} / {tasks.length}
            </p>

            {editIndex !== null && (
                <p className="text-yellow-600 italic mb-4"> Đang chỉnh sửa công việc...</p>
            )}

            <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập công việc..."
                        className="p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex gap-4">
                        <input
                            type="date"
                            className="flex-1 p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <input
                            type="time"
                            className="flex-1 p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg font-medium"
                        onClick={handleSubmit}
                    >
                        {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                    </button>
                </div>
                <TaskList
                    tasks={tasks}
                    onEdit={handleEditWithPrefill}
                    onDelete={handleDelete}
                    onToggle={toggleComplete}
                />
            </div>
        </div>
    );
};

const ChecklistIcon = () => (
    <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path d="M9 5H21M9 12H21M9 19H21M4 5h.01M4 12h.01M4 19h.01" />
    </svg>
);

export default TodoPage;

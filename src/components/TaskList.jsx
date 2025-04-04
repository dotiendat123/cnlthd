import React from 'react';

const TaskList = React.memo(({ tasks, onEdit, onDelete, onToggle }) => {
    return (
        <ul className="space-y-4">
            {tasks.length === 0 ? (
                <p className="text-gray-400 italic">Chưa có công việc nào...</p>
            ) : (
                tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-4 rounded-lg border hover:shadow ${task.completed ? 'bg-green-100 border-green-300' : 'bg-blue-50 border-blue-200'
                            }`}
                    >
                        <div>
                            <p
                                className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-blue-800'
                                    }`}
                            >
                                {task.text}
                            </p>

                            {(task.date || task.time) && (
                                <p className="text-sm text-blue-600 italic flex items-center gap-2">
                                    <CalendarIcon />
                                    {task.date || 'Chưa chọn ngày'}
                                    <ClockIcon />
                                    {task.time || 'Chưa chọn giờ'}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onToggle(index)}
                                className="w-5 h-5 accent-green-500"
                                title="Đánh dấu hoàn thành"
                            />
                            <button
                                className="text-yellow-500 hover:text-yellow-600"
                                onClick={() => onEdit(index)}
                                title="Chỉnh sửa"
                            >
                                <EditIcon />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600"
                                onClick={() => onDelete(index)}
                                title="Xóa"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
});

// SVG icons ⬇
const EditIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path d="M16.862 3.487a2.25 2.25 0 113.181 3.182l-10.3 10.3a1.5 1.5 0 01-.53.352l-4.031 1.51 1.51-4.03a1.5 1.5 0 01.351-.531l10.319-10.3z" />
    </svg>
);

const TrashIcon = () => (
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path d="M6 7h12M9 7v10m6-10v10M4 7h16l-1.5 13.5H5.5L4 7zm3-2h10v2H7V5z" />
    </svg>
);

const CalendarIcon = () => (
    <svg
        className="w-4 h-4 inline text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path d="M8 7V3m8 4V3M4 11h16M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg
        className="w-4 h-4 inline text-blue-600 ml-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <path d="M12 6v6l4 2m-4 8a10 10 0 100-20 10 10 0 000 20z" />
    </svg>
);

export default TaskList;

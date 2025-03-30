import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) return;

    const taskData = { text: trimmedTask, date, time };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskData;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, taskData]);
    }

    setNewTask('');
    setDate('');
    setTime('');
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setNewTask(task.text);
    setDate(task.date);
    setTime(task.time);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">📝 Danh sách công việc</h1>

      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Nhập công việc..."
            className="p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="date"
              className="flex-1 p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="flex-1 p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg font-medium"
            onClick={handleAddTask}
          >
            {editIndex !== null ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>

        <ul className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-400 italic">Chưa có công việc nào...</p>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow"
              >
                <div>
                  <p className="text-blue-800 font-semibold text-lg">{task.text}</p>
                  {(task.date || task.time) && (
                    <p className="text-sm text-blue-600 italic">
                      📅 {task.date || 'Chưa chọn ngày'} ⏰ {task.time || 'Chưa chọn giờ'}
                    </p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    className="text-yellow-500 hover:text-yellow-600 text-xl"
                    onClick={() => handleEditTask(index)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 text-xl"
                    onClick={() => handleDeleteTask(index)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;

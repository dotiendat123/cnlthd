import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
//Hiển thị danh sách việc làm (component tasklist)
//Định nghĩa function component 
// sử dụng react.momo  để ghi nhớ component và nó chỉ render lại nếu props thay đổi => để tôi ưu hiệu suất.
//tasks: mảng các công việc
//onEdit: hàm xử lý khi nhấn nút chỉnh sửa
//onDelete: hàm xứ lý khi nhấn nút xóa
//onToggle: đánh dấu khi hoàn thành
const TaskList = React.memo(({ tasks, onEdit, onDelete, onToggle }) => {
  return (
    // tạo khoảng cách dọc giữa các thẻ li
    // sử dụng toán tử 3 ngôi để kiển tra nếu tasks không có thì hiển thị dòng chưa có công việc nào
    // nếu tasks có thì sử dụng .map để lặp qua mảng, render từng công việc thành thẻ li

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
                <p className="text-sm text-blue-600 italic">
                  📅 {task.date || 'Chưa chọn ngày'} ⏰ {task.time || 'Chưa chọn giờ'}
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
                className="text-yellow-500 hover:text-yellow-600 text-xl"
                onClick={() => onEdit(index)}
              >
                ✏️
              </button>
              <button
                className="text-red-500 hover:text-red-600 text-xl"
                onClick={() => onDelete(index)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
});

function App() {
  const [tasks, setTasks] = useState([]);// danh sách công việc, tasks là biến chứa danh sách các task dưới dạng mảng, setTask là hàm để cập nhật tasks mỗi khi có thay đổi
  const [newTask, setNewTask] = useState('');// nội dung công việc
  const [date, setDate] = useState('');// ngày thực hiện
  const [time, setTime] = useState('');// giờ thực hiện 
  const [editIndex, setEditIndex] = useState(null);// khác null thì đang ở chế độ chỉnh sửa 

  useEffect(() => {
    const saved = localStorage.getItem('tasks');// Lấy dữ liệu từ localStorage
    if (saved) setTasks(JSON.parse(saved));// Nếu có, thì parse ra và gán vào state
  }, []);//[] chỉ chạy một lần duy nhất khi component được render lần đầu tiên

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);// cập nhật lại localstorage khi task thay đổi

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();//lấy giá trị ban đầu đã nhập ở ô input và xóa khoảng trắng đầu cuối
    if (!trimmedTask) return;// nếu người dùng nhập khoảng trắng thôi thì không làm gì hết.

    const taskData = { text: trimmedTask, date, time, completed: false };// tạo ra một obj đại diện cho 1 task

    if (editIndex !== null) {// kiếm tra có đang chỉnh sửa task nào không
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], ...taskData };// tìm task trong mảng và chỉnh sửa (giữ lại thông tin cũ nếu nó không có thay đổi)
      setTasks(updatedTasks);//cập nhật lại task với bản đã chỉnh sửa
      setEditIndex(null);//cập nhật lại trạng thái thoát khỏi chế độ chỉnh sửa
    } else {
      setTasks([...tasks, taskData]);// nếu không phải chỉnh sửa thì thêm task mới vô
    }
    // reset lại các ô nhập liệu.
    setNewTask('');
    setDate('');
    setTime('');
  };



  const handleEditTask = useCallback((index) => {// xử lý khi người dùng ấn nút sửa trên 1 task
    const task = tasks[index];//lấy task tại vị trí index
    setNewTask(task.text);//ô nhập nội dung
    setDate(task.date);//ô nhập ngày
    setTime(task.time);//ô nhập giờ 
    setEditIndex(index);//lưu lại vị trí của task đang được chỉnh sửa
  }, [tasks]);//[] chỉ tạo lại hàm kho giá trị của tasks thay đổi, nếu không đổi thì vẫn sử dụng bản cũ, react dùng lại bản cũ để tối ưu hóa hiệu suất

  const handleDeleteTask = useCallback((index) => {// xóa task tại vị trí index, có sử dụng useCallback để tôi ưu hóa
    // setTasks(tasks.filter((_, i) => i !== index));
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);// sử dụng filter để duyệt từng task trong tasks, giữ lại những task không trùng với index cần xóa
    setTasks(updatedTasks);// cập nhật state
  }, [tasks]);

  // const toggleCompleteTask = useCallback((index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].completed = !updatedTasks[index].completed;
  //   setTasks(updatedTasks);
  // }, [tasks]);

  const toggleCompleteTask = useCallback((index) => {// khi tích vào checkbox, hàm này sẽ  thay đổi trang thái completed
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };// nếu đang false thì chuyển thành true( hoàn thành v) và ngược lại
      }
      return task;
    });
    setTasks(updatedTasks); // cập nhật lại task đã được chỉnh sửa
  }, [tasks]);

  //  lọc và đếm số lượng công việc đã hoàn thành, tong đó có sử dụng useMemo đẻ  tránh tính toán lại mỗi lần render component
  const completedCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">📝 Danh sách công việc</h1>
      <p className="text-blue-600 mb-6">Đã hoàn thành: {completedCount} / {tasks.length}</p>

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
        {/* hiển thị danh sách công việc với tasklist */}
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={toggleCompleteTask}
        />
      </div>
    </div>
  );
}

export default App;
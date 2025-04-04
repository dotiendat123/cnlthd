import { useState, useEffect, useCallback, useMemo } from 'react';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addOrEditTask = (taskData) => {
        if (editIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = { ...updatedTasks[editIndex], ...taskData };
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, taskData]);
        }
    };

    const handleEdit = useCallback(
        (index) => {
            setEditIndex(index);
        },
        []
    );

    const handleDelete = useCallback(
        (index) => {
            setTasks(tasks.filter((_, i) => i !== index));
        },
        [tasks]
    );

    const toggleComplete = useCallback(
        (index) => {
            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks);
        },
        [tasks]
    );

    const completedCount = useMemo(
        () => tasks.filter((task) => task.completed).length,
        [tasks]
    );

    return {
        tasks,
        setTasks,
        addOrEditTask,
        handleEdit,
        handleDelete,
        toggleComplete,
        completedCount,
        editIndex,
        setEditIndex,
    };
};

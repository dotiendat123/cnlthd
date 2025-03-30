# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
#   a p p t o d o l i s t 
 
 #   c n l t h d 
 
 



🔹 Bài tập 2: Component và Props
Tạo component TaskList riêng, nhận tasks, onEdit, onDelete, onToggle qua props.

🔹 Bài tập 3: React Hooks & State
Sử dụng useState để quản lý:

Dữ liệu task, ngày, giờ, trạng thái chỉnh sửa.

Sử dụng useEffect:

Lưu và khôi phục task từ localStorage.

🔹 Bài tập 4: Tối ưu hóa hiệu suất
React.memo cho TaskList: tránh re-render khi tasks không thay đổi.

useCallback cho handleEditTask, handleDeleteTask, toggleCompleteTask.

useMemo để tính số công việc đã hoàn thành completedCount.
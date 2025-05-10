import { FormEvent, useState, useMemo, JSX, useCallback } from "react";
import { Container, Typography } from "@mui/material";
import TaskElement from "./components/TaskElement";
import { AlertSeverity, Task } from "./utils/types";
import TaskForm from "./components/TaskForm";
import TaskLists from "./components/TaskLists";
import AlertSnackBar from "./components/AlertSnackBar";
import { motion } from "framer-motion";
import useTasks from "./hooks/useTasks";
import ThemeSwitch from "./components/ThemeToggle";

function App() {
    const {
        tasks,
        alert,
        setAlert,
        handleTaskDelete,
        handleTaskDoneToggle,
        addTask,
        updateTask,
        taskContent,
        setTaskContent,
        validateTask,
        EMPTY_TASK,
    } = useTasks();
    const [task, setTask] = useState<Task>(EMPTY_TASK);
    const isEditing = !!task.id;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log("task", task);
        if (!validateTask()) return;
        if (isEditing) {
            updateTask({ ...task, content: taskContent });
            setAlert({
                alert: "Task updated",
                severity: AlertSeverity.Success,
            });
        } else {
            addTask(taskContent);
            setAlert({ alert: "Task added", severity: AlertSeverity.Success });
        }

        setTaskContent("");
        setTask(EMPTY_TASK);
    };

    const handleTaskEdit = useCallback(
        (id: string) => {
            // console.log("edit task", id);
            const t = tasks.find((t) => t.id === id);
            if (!t) return;
            setTaskContent(t.content);
            setTask(t);
        },
        [tasks, setTaskContent]
    );

    // const doneTasks: JSX.Element[] = [];
    // const pendingTasks: JSX.Element[] = [];

    // const renderTasks = tasks.map((task) => {
    //     return (
    //         <TaskElement
    //             task={task}
    //             taskDelete={handleTaskDelete}
    //             taskEdit={handleTaskEdit}
    //             taskToggle={handleTaskDoneToggle}
    //         />
    //     );
    // });

    // const doneTasks = useMemo(() => {
    //     return renderTasks.filter((element) => element.props.task.done);
    // }, [renderTasks]);
    // const pendingTasks = useMemo(() => {
    //     return renderTasks.filter((element) => !element.props.task.done);
    // }, [renderTasks]);

    const [pendingTasks, doneTasks] = useMemo(() => {
        const pending: JSX.Element[] = [];
        const done: JSX.Element[] = [];
        tasks.forEach((task) => {
            const taskEl = (
                <TaskElement
                    key={task.id}
                    task={task}
                    taskDelete={handleTaskDelete}
                    taskEdit={handleTaskEdit}
                    taskToggle={handleTaskDoneToggle}
                />
            );
            task.done ? done.push(taskEl) : pending.push(taskEl);
        });
        return [pending, done];
    }, [tasks, handleTaskDelete, handleTaskDoneToggle, handleTaskEdit]);

    return (
        <Container
            maxWidth="lg"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "monospace",
                fontWeight: "bold",
                paddingY: "2rem",
            }}
        >
            {alert.alert && (
                <AlertSnackBar
                    key={alert.alert}
                    alert={alert}
                    setAlert={setAlert}
                />
            )}
            <Typography
                variant="h4"
                sx={{
                    marginBottom: "1rem",
                    userSelect: "none",
                }}
            >
                Taskify
            </Typography>
            <ThemeSwitch />
            {/* form for task */}

            <TaskForm
                taskContent={taskContent}
                setTaskContent={setTaskContent}
                handleSubmit={handleSubmit}
            />

            {/* two lists, one for pending, one for done */}

            {tasks.length > 0 ? (
                <TaskLists pendingTasks={pendingTasks} doneTasks={doneTasks} />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    // style={{ width: "100%" }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: "1rem",
                            userSelect: "none",
                        }}
                    >
                        No tasks yet
                    </Typography>
                </motion.div>
            )}
        </Container>
    );
}

export default App;

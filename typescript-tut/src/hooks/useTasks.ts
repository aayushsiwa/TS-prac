import { useCallback, useState } from "react";
import { Task, AlertSB, AlertSeverity } from "../utils/types";
import useLocalStorage from "./useLocalStorage";

export default function useTasks() {
    const EMPTY_TASK: Task = {
        id: "",
        content: "",
        done: false,
    };
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
    const [alert, setAlert] = useState<AlertSB>({
        alert: "",
    });
    const [taskContent, setTaskContent] = useState<string>("");

    const handleTaskDoneToggle = useCallback(
        (task: Task) => {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id
                        ? {
                              ...t,
                              done: !t.done,
                          }
                        : t
                )
            );
        },
        [setTasks]
    );

    const handleTaskDelete = useCallback(
        (id: string) => {
            // console.log("delete task", id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            if (setAlert) {
                setAlert({
                    alert: "Task deleted",
                    severity: AlertSeverity?.Info,
                });
            }
        },
        [setTasks]
    );

    const addTask = useCallback(
        (taskContent: string) => {
            setTasks((prev) => {
                return [
                    ...prev,
                    {
                        // id: `${new Date().getTime().toString()} + "userid"`,
                        id: `userid${Date.now()}`,
                        content: taskContent,
                        done: false,
                    },
                ];
            });
        },
        [setTasks]
    );

    const updateTask = useCallback(
        (updatedTask: Task) => {
            setTasks((prev) =>
                prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
        },
        [setTasks]
    );

    const validateTask = (): boolean => {
        if (taskContent.trim() === "") {
            setAlert({
                alert: "Please enter a task",
                severity: AlertSeverity.Error,
            });
            return false;
            // console.warn(alert);
        }
        return true;
    };

    return {
        tasks,
        alert,
        setAlert,
        setTasks,
        taskContent,
        setTaskContent,
        handleTaskDoneToggle,
        handleTaskDelete,
        addTask,
        updateTask,
        validateTask,
        EMPTY_TASK
    };
}

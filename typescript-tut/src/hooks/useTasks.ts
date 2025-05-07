import { useCallback } from "react";
import { Task } from "../types";
import useLocalStorage from "./useLocalStorage";

export default function useTasks() {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

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
            // setAlert({ alert: "Task deleted", severity: AlertSeverity.Info });
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

    // const handleTaskEdit = useCallback(
    //     (
    //         id: string,
    //         setTaskContent: React.Dispatch<React.SetStateAction<string>>,
    //         setTask: React.Dispatch<React.SetStateAction<Task>>
    //     ) => {
    //         // console.log("edit task", id);
    //         const t = tasks.find((t) => t.id === id)!;
    //         setTaskContent(t.content);
    //         setTask(t);
    //     },
    //     [tasks]
    // );

    return { tasks, setTasks, handleTaskDoneToggle, handleTaskDelete, addTask };
}

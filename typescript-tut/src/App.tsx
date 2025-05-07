import { FormEvent, JSX, useState } from "react";
// import { Delete, Done, Edit, Restore } from "@mui/icons-material";
import {
    // Button,
    // ButtonGroup,
    Container,
    // Snackbar,
    // TextField,
    // List,
    // ListItem,
    Typography,
    // Box,
    // Alert,
} from "@mui/material";
import TaskElement from "./components/TaskElement";
import { AlertSB, AlertSeverity, Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskLists from "./components/TaskLists";
import AlertSnackBar from "./components/AlertSnackBar";
import { motion } from "framer-motion";
// import useLocalStorage from "./useLocalStorage";
import useTasks from "./hooks/useTasks";

// type Task = {
//     id: string;
//     content: string;
//     done: boolean;
// };

function App() {
    const { tasks, setTasks, handleTaskDelete, handleTaskDoneToggle, addTask } =
        useTasks();
    // const [tasks, setTasks] = useState<Task[]>(() => {
    //     const storedTasks = localStorage.getItem("tasks");
    //     return storedTasks ? JSON.parse(storedTasks) : [];
    // });
    const [taskContent, setTaskContent] = useState<string>("");
    const [task, setTask] = useState<Task>({} as Task);
    const [alert, setAlert] = useState<AlertSB>({
        alert: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log("task", task);
        if (taskContent.trim() === "") {
            setAlert({
                alert: "Please enter a task",
                severity: AlertSeverity.Error,
            });
            // console.warn(alert);
            return;
        }
        if (task.id) {
            // setTaskContent(task.content);
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === task.id
                        ? {
                              ...t,
                              content: taskContent,
                          }
                        : t
                )
            );
            setAlert({
                alert: "Task updated",
                severity: AlertSeverity.Success,
            });
        } else {
            addTask(taskContent);
            setAlert({ alert: "Task added", severity: AlertSeverity.Success });
        }

        setTaskContent("");
        setTask({} as Task);
    };

    const handleTaskEdit = (id: string) => {
        // console.log("edit task", id);
        const t = tasks.find((t) => t.id === id)!;
        setTaskContent(t.content);
        setTask(t);
    };

    const doneTasks: JSX.Element[] = [];
    const pendingTasks: JSX.Element[] = [];

    tasks.forEach((task) => {
        // <TaskElement
        //     task={task}
        //     taskDelete={handleTaskDelete}
        //     taskEdit={handleTaskEdit}
        //     taskToggle={handleTaskDoneToggle}
        // />

        task.done
            ? doneTasks.push(
                  <TaskElement
                      key={task.id}
                      task={task}
                      taskDelete={handleTaskDelete}
                      taskEdit={handleTaskEdit}
                      taskToggle={handleTaskDoneToggle}
                  />
              )
            : pendingTasks.push(
                  <TaskElement
                      key={task.id}
                      task={task}
                      taskDelete={handleTaskDelete}
                      taskEdit={handleTaskEdit}
                      taskToggle={handleTaskDoneToggle}
                  />
              );
    });

    return (
        <Container
            maxWidth="lg"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: `"Consolas","Courier New","monospace"`,
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
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    userSelect: "none",
                }}
            >
                Taskify
            </Typography>
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
                            fontFamily: "monospace",
                            fontWeight: "bold",
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

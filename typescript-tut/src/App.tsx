import React, { FormEvent, JSX, useEffect, useState } from "react";
import { Delete, Done, Edit } from "@mui/icons-material";
import {
    Button,
    ButtonGroup,
    Container,
    Paper,
    Snackbar,
    TextField,
    List,
    ListItem,
} from "@mui/material";

type Task = {
    id: string;
    content: string;
    done: boolean;
};

function App() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [taskContent, setTaskContent] = useState<string>("");
    const [task, setTask] = useState<Task>({} as Task);
    const [err, setErr] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log("task", task);
        if (taskContent.trim() === "") {
            setErr("Please enter a task");
            console.warn(err);
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
        } else {
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
        }

        setTaskContent("");
        setTask({} as Task);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleTaskDone = (task: Task) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id
                    ? {
                          ...t,
                          done: true,
                      }
                    : t
            )
        );
    };

    const handleTaskDelete = (id: string) => {
        console.log("delete task", id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const handleTaskEdit = (id: string) => {
        console.log("edit task", id);
        const t = tasks.find((t) => t.id === id)!;
        setTaskContent(t.content);
        setTask(t);
    };

    useEffect(() => {
        setTimeout(() => {
            if (err) {
                setErr("");
            }
        }, 5000);
    }, [err]);

    const doneTasks: JSX.Element[] = [];
    const pendingTasks: JSX.Element[] = [];

    tasks.forEach((task) => {
        const taskElement = (
            <ListItem
                key={task.id}
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                {task.content}
                <ButtonGroup variant="text">
                    {!task.done && (
                        <Button
                            className="taskDoneButton"
                            onClick={() => {
                                handleTaskDone(task);
                            }}
                        >
                            <Done />
                        </Button>
                    )}
                    <Button
                        className="taskEditButton"
                        onClick={() => handleTaskEdit(task.id)}
                    >
                        <Edit />
                    </Button>
                    <Button
                        className="taskDeleteButton"
                        onClick={() => handleTaskDelete(task.id)}
                    >
                        <Delete />
                    </Button>
                </ButtonGroup>
            </ListItem>
        );

        task.done
            ? doneTasks.push(taskElement)
            : pendingTasks.push(taskElement);
    });

    return (
        <Container>
            {err && (
                <Snackbar message={err} open={!!err} autoHideDuration={6000} />
            )}
            <div className="heading">Taskify</div>
            {/* form for task */}

            <form id="taskForm" onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    name="taskContent"
                    id="taskContent"
                    placeholder="enter task here"
                    onChange={(e) => {
                        setTaskContent(e.target.value);
                    }}
                    value={taskContent}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    value="go"
                    id="taskSubmit"
                    name="taskSubmit"
                >
                    submit
                </Button>
            </form>

            {/* two lists, one for pending, one for done */}

            {tasks.length > 0 && (
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <List sx={{ width: "50%", backgroundColor: "green" }}>
                        {pendingTasks}
                    </List>
                    <List sx={{ width: "50%", backgroundColor: "red", color: "white" }}>
                        {doneTasks}
                    </List>
                </Container>
            )}
        </Container>
    );
}

export default App;

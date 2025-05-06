import React, { FormEvent, JSX, useEffect, useState } from "react";
import { Delete, Done, Edit, Restore } from "@mui/icons-material";
import {
    Button,
    ButtonGroup,
    Container,
    Snackbar,
    TextField,
    List,
    ListItem,
    Typography,
    Box,
    Alert,
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

    const handleTaskDoneToggle = (task: Task) => {
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

    const doneTasks: JSX.Element[] = [];
    const pendingTasks: JSX.Element[] = [];

    tasks.forEach((task) => {
        const taskElement = (
            <ListItem
                key={task.id}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "2px solid black",
                    borderRadius: "5rem",
                    marginBottom: "1rem",
                    backgroundColor: "white",
                    userSelect: "none",
                    cursor: "pointer",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                    }}
                >
                    {task.content}
                </Typography>
                <ButtonGroup variant="outlined">
                    {/* {!task.done && ( */}
                    <Button
                        className="taskDoneButton"
                        onClick={() => {
                            handleTaskDoneToggle(task);
                        }}
                        color="primary"
                    >
                        {task.done ? <Restore /> : <Done />}
                    </Button>
                    {/* )} */}
                    <Button
                        className="taskEditButton"
                        onClick={() => handleTaskEdit(task.id)}
                        color="warning"
                    >
                        <Edit />
                    </Button>
                    <Button
                        className="taskDeleteButton"
                        onClick={() => handleTaskDelete(task.id)}
                        color="error"
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
            {err && (
                <Snackbar
                    message={err}
                    open={!!err}
                    autoHideDuration={6000}
                    onClose={() => setErr("")}
                >
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{
                            backgroundColor: "#ff000090",
                            fontWeight: "bold",
                            backdropFilter: "blur(1px)",
                            border: "2px solid #f00",
                        }}
                    >
                        {err}
                    </Alert>
                </Snackbar>
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

            <Box
                width="100%"
                component={"form"}
                onSubmit={handleSubmit}
                position={"relative"}
                marginBottom={2}
            >
                <TextField
                    type="text"
                    name="taskContent"
                    id="taskContent"
                    placeholder="enter task here"
                    onChange={(e) => {
                        setTaskContent(e.target.value);
                    }}
                    fullWidth
                    sx={{
                        // paddingRight: "10%",
                        borderRadius: "1rem",
                        border: "2px solid #000",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        input: {
                            fontWeight: "bold",
                            fontSize: "1rem",
                        },
                        "&:focus": {
                            outline: "none",
                        },
                    }}
                    value={taskContent}
                />
                <Button
                    variant="contained"
                    type="submit"
                    value="go"
                    id="taskSubmit"
                    name="taskSubmit"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        height: "80%",
                        marginRight: "4px",
                        width: "10%",
                        fontWeight: "bold",
                        borderRadius: "0px 1rem 1rem 0px",
                        border: "2px solid #145efb",
                        backgroundColor: taskContent ? "primary" : "grey",
                        color: "black",
                        transition: "background-color 0.3s",
                        zIndex: 2,
                    }}
                >
                    submit
                </Button>
            </Box>

            {/* two lists, one for pending, one for done */}

            {tasks.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        width: "100%",
                        paddingBottom: "2rem",
                    }}
                >
                    <Box
                        flex={1}
                        sx={{
                            backgroundColor: "#ff000095",
                            backdropFilter: "blur(1px)",
                            borderRadius: 2,
                            padding: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                color: "white",
                                mb: 1,
                            }}
                        >
                            Pending
                        </Typography>
                        <List>{pendingTasks}</List>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            backgroundColor: "#00800095",
                            backdropFilter: "blur(1px)",
                            borderRadius: 2,
                            padding: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                color: "white",
                                mb: 1,
                            }}
                        >
                            Done
                        </Typography>
                        <List>{doneTasks}</List>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default App;

import { ListItem, Typography, ButtonGroup, Button } from "@mui/material";
import { Delete, Done, Edit, Restore } from "@mui/icons-material";
import { TaskElementProps } from "../types";
import { motion } from "framer-motion";

const TaskElement = (props: TaskElementProps) => {
    return (
        <ListItem
            key={props.task.id}
            sx={{
            }}
        >
            <Typography
                sx={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                }}
            >
                {props.task.content}
            </Typography>
            <ButtonGroup variant="outlined">
                {/* {!task.done && ( */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button
                        className="taskDoneButton"
                        onClick={() => {
                            props.taskToggle(props.task);
                        }}
                        color="primary"
                    >
                        {props.task.done ? <Restore /> : <Done />}
                    </Button>
                </motion.div>
                {/* )} */}
                <Button
                    className="taskEditButton"
                    onClick={() => props.taskEdit(props.task.id)}
                    color="warning"
                >
                    <Edit />
                </Button>
                <Button
                    className="taskDeleteButton"
                    onClick={() => props.taskDelete(props.task.id)}
                    color="error"
                >
                    <Delete />
                </Button>
            </ButtonGroup>
        </ListItem>
    );
};

export default TaskElement;

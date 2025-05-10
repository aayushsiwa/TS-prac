import { Box, TextField, Button } from "@mui/material";
import { TaskFormProps } from "../utils/types";
import { motion } from "framer-motion";

const TaskForm: React.FC<TaskFormProps> = ({
    taskContent,
    setTaskContent,
    handleSubmit,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: "100%" }}
        >
            <Box
                width="100%"
                component={"form"}
                onSubmit={handleSubmit}
                position={"relative"}
                marginBottom={2}
                color={"black"}
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
                    }}
                    value={taskContent}
                />
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        height: "80%",
                        marginRight: "4px",
                        zIndex: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        value="go"
                        id="taskSubmit"
                        name="taskSubmit"
                        sx={{
                            height: "100%",
                            width: "100%",
                            transform: "translateY(-50%)",
                            fontWeight: "bold",
                            borderRadius: "0px 1rem 1rem 0px",
                            border: "2px solid #145efb",
                            backgroundColor: taskContent
                                ? "primary.main"
                                : "grey.400",
                            color: "black",
                            transition: "background-color 0.3s",
                        }}
                    >
                        submit
                    </Button>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default TaskForm;

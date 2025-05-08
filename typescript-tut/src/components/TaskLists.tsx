import { Box, Typography, List } from "@mui/material";
import { TaskListsProps } from "../types";
import { motion } from "framer-motion";

const TaskLists = (props: TaskListsProps) => {
    const { pendingTasks, doneTasks } = props;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{ width: "100%" }}
        >
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
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
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ff0000",
                                backgroundColor: "text.secondary",
                                borderRadius: 100,
                                padding: "0rem 1rem",
                                userSelect: "none",
                            }}
                        >
                            {pendingTasks?.length > 0
                                ? `${pendingTasks?.length}`
                                : 0}
                        </Typography>
                    </Box>
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
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
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#008000",
                                backgroundColor: "text.secondary",
                                borderRadius: 100,
                                padding: "0rem 1rem",
                                userSelect: "none",
                            }}
                        >
                            {doneTasks?.length > 0 ? `${doneTasks?.length}` : 0}
                        </Typography>
                    </Box>
                    <List>{doneTasks}</List>
                </Box>
            </Box>
        </motion.div>
    );
};

export default TaskLists;

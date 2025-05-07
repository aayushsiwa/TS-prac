import React from "react";

type Task = {
    id: string;
    content: string;
    done: boolean;
};

export enum AlertSeverity {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

export type AlertSB = {
  alert: string;
  autoHideDuration?: number;
  onClose?: () => void;
  severity?: AlertSeverity;
  backgroundColor?: string;
  fontWeight?: string;
};

type TaskElementProps = {
    task: Task;
    taskToggle: (task: Task) => void;
    taskEdit: (id: string) => void;
    taskDelete: (id: string) => void;
};

export type TaskFormProps = {
    taskContent: string;
    setTaskContent: (content: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TaskListsProps = {
    pendingTasks: React.ReactNode[];
    doneTasks: React.ReactNode[];
};

export type AlertSnackBarProps = {
    alert: AlertSB;
    setAlert: React.Dispatch<React.SetStateAction<AlertSB>>;
};

export type { Task, TaskElementProps };

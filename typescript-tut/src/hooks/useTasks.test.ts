import { renderHook, act } from '@testing-library/react';
import useTasks from '../hooks/useTasks';
import { AlertSeverity } from '../utils/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useTasks', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with empty tasks', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('New Task');
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].content).toBe('New Task');
    expect(result.current.tasks[0].done).toBe(false);
  });

  it('should delete a task and show alert', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task to delete');
    });

    const id = result.current.tasks[0].id;

    act(() => {
      result.current.handleTaskDelete(id);
    });

    expect(result.current.tasks).toHaveLength(0);
    expect(result.current.alert.alert).toBe('Task deleted');
    expect(result.current.alert.severity).toBe(AlertSeverity.Info);
  });

  it('should toggle task done state', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Toggle Task');
    });

    const task = result.current.tasks[0];

    act(() => {
      result.current.handleTaskDoneToggle(task);
    });

    expect(result.current.tasks[0].done).toBe(true);

    act(() => {
      result.current.handleTaskDoneToggle(task);
    });

    expect(result.current.tasks[0].done).toBe(false);
  });

  it('should update a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Old Task');
    });

    const oldTask = result.current.tasks[0];
    const updatedTask = { ...oldTask, content: 'Updated Task' };

    act(() => {
      result.current.updateTask(updatedTask);
    });

    expect(result.current.tasks[0].content).toBe('Updated Task');
  });

  it('should validate empty taskContent as invalid', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTaskContent('');
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateTask();
    });

    expect(isValid).toBe(false);
    expect(result.current.alert.alert).toBe('Please enter a task');
    expect(result.current.alert.severity).toBe(AlertSeverity.Error);
  });

  it('should validate non-empty taskContent as valid', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setTaskContent('Valid task');
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateTask();
    });

    expect(isValid).toBe(true);
  });
});

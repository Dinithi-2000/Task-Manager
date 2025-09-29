// app/tasks/page.tsx
'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Task {
  id: string;
  name: string;
  status: 'Pending' | 'Done';
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Complete the report', status: 'Pending' },
    { id: '2', name: 'Update website', status: 'Pending' },
    { id: '3', name: 'Email client', status: 'Done' },
    { id: '4', name: 'Make a call', status: 'Done' },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'Pending' | 'Done'>('Pending');

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id 
        ? { ...task, status: task.status === 'Pending' ? 'Done' : 'Pending' }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setEditedTaskName(task.name);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingTask(null);
    setEditedTaskName('');
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
    setNewTaskName('');
    setNewTaskStatus('Pending');
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setNewTaskName('');
    setNewTaskStatus('Pending');
  };

  const saveEditedTask = () => {
    if (editingTask && editedTaskName.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id 
          ? { ...task, name: editedTaskName }
          : task
      ));
      closeEditDialog();
    }
  };

  const addNewTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: newTaskName,
        status: newTaskStatus,
      };
      setTasks([...tasks, newTask]);
      closeAddDialog();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Task List
      </Typography>

      <TableContainer 
        component={Paper}
        sx={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#2c3e50' }}>
                Task Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#2c3e50' }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#2c3e50' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow 
                key={task.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f8f9fa' }
                }}
              >
                {/* Task Name Column - NO STRIKETHROUGH */}
                <TableCell 
                  component="th" 
                  scope="row"
                  sx={{ 
                    fontSize: '1rem',
                    color: task.status === 'Done' ? '#7f8c8d' : '#2c3e50'
                  }}
                >
                  {task.name}
                </TableCell>

                {/* Status Column */}
                <TableCell>
                  <Chip
                    label={task.status}
                    color={task.status === 'Done' ? 'success' : 'warning'}
                    variant={task.status === 'Done' ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>

                {/* Action Column */}
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {/* Toggle Status Button */}
                    <IconButton
                      onClick={() => toggleTaskStatus(task.id)}
                      color={task.status === 'Done' ? 'success' : 'default'}
                      sx={{
                        '&:hover': {
                          backgroundColor: task.status === 'Done' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      {task.status === 'Done' ? (
                        <CheckCircleIcon sx={{ color: '#4caf50' }} />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton
                      onClick={() => openEditDialog(task)}
                      color="primary"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete Button */}
                    <IconButton
                      onClick={() => deleteTask(task.id)}
                      color="error"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {tasks.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No tasks available. Add some tasks to get started!
          </Typography>
        </Box>
      )}

      {/* Floating Add Button (+) */}
      <Fab
        color="primary"
        aria-label="add task"
        onClick={openAddDialog}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <AddIcon />
      </Fab>

      {/* Edit Task Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button 
            onClick={saveEditedTask} 
            variant="contained"
            disabled={!editedTaskName.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={closeAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            sx={{ mb: 3, mt: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newTaskStatus}
              label="Status"
              onChange={(e) => setNewTaskStatus(e.target.value as 'Pending' | 'Done')}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button 
            onClick={addNewTask} 
            variant="contained"
            disabled={!newTaskName.trim()}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
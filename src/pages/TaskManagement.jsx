import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useTasks, useAddTask, useUpdateTask, useDeleteTask, useGroups } from '../integrations/supabase/index.js';

const TaskManagement = () => {
  const { session, loading } = useSupabaseAuth();
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { mutate: addTask } = useAddTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  const onSubmit = data => {
    if (data.id) {
      updateTask(data);
    } else {
      addTask(data);
    }
  };

  const handleEdit = task => {
    setValue('id', task.id);
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('category', task.category);
    setValue('priority', task.priority);
    setValue('status', task.status);
    setValue('group_id', task.group_id);
  };

  const handleDelete = id => {
    deleteTask(id);
  };

  if (loading || tasksLoading || groupsLoading) return <Text>Loading...</Text>;
  if (tasksError) return <Text>Error: {tasksError.message}</Text>;
  if (groupsError) return <Text>Error: {groupsError.message}</Text>;

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Task Management</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="hidden" {...register('id')} />
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" {...register('title')} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input type="text" {...register('description')} />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input type="text" {...register('category')} />
          </FormControl>
          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select {...register('status')}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Group</FormLabel>
            <Select {...register('group_id')}>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Save Task</Button>
        </form>
        <Heading as="h2" size="md" textAlign="center" mt={8}>Existing Tasks</Heading>
        {tasks.map(task => (
          <Box key={task.id} p={4} borderWidth={1} borderRadius="md">
            <Text><strong>Title:</strong> {task.title}</Text>
            <Text><strong>Description:</strong> {task.description}</Text>
            <Text><strong>Category:</strong> {task.category}</Text>
            <Text><strong>Priority:</strong> {task.priority}</Text>
            <Text><strong>Status:</strong> {task.status}</Text>
            <Text><strong>Group:</strong> {groups.find(group => group.id === task.group_id)?.name}</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleEdit(task)}>Edit</Button>
            <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(task.id)}>Delete</Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default TaskManagement;
import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useGroups, useAddGroup, useUpdateGroup, useDeleteGroup } from '../integrations/supabase/index.js';

const GroupManagement = () => {
  const { session, loading } = useSupabaseAuth();
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { mutate: addGroup } = useAddGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  const onSubmit = data => {
    if (data.id) {
      updateGroup(data);
    } else {
      addGroup(data);
    }
  };

  const handleEdit = group => {
    setValue('id', group.id);
    setValue('name', group.name);
  };

  const handleDelete = id => {
    deleteGroup(id);
  };

  if (loading || groupsLoading) return <Text>Loading...</Text>;
  if (groupsError) return <Text>Error: {groupsError.message}</Text>;

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Group Management</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="hidden" {...register('id')} />
          <FormControl>
            <FormLabel>Group Name</FormLabel>
            <Input type="text" {...register('name')} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Save Group</Button>
        </form>
        <Heading as="h2" size="md" textAlign="center" mt={8}>Existing Groups</Heading>
        {groups.map(group => (
          <Box key={group.id} p={4} borderWidth={1} borderRadius="md">
            <Text>{group.name}</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleEdit(group)}>Edit</Button>
            <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(group.id)}>Delete</Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default GroupManagement;
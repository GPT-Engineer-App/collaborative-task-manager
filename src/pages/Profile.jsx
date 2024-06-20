import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useUpdateUser, useUsers } from '../integrations/supabase/index.js';

const Profile = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { mutate: updateUser } = useUpdateUser();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      const user = users?.find(user => user.id === session.user.id);
      if (user) {
        setValue('email', user.email);
        setValue('username', user.username);
      }
    }
  }, [session, users, navigate, setValue]);

  const onSubmit = data => {
    updateUser({ id: session.user.id, ...data });
  };

  if (loading || usersLoading) return <Text>Loading...</Text>;
  if (usersError) return <Text>Error: {usersError.message}</Text>;

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Profile</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register('email')} />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" {...register('username')} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Update Profile</Button>
        </form>
        <Button mt={4} colorScheme="red" onClick={logout}>Logout</Button>
      </VStack>
    </Container>
  );
};

export default Profile;
import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Login</Heading>
        {loading && <Text>Loading...</Text>}
        {!loading && !session && <SupabaseAuthUI />}
        {!loading && session && (
          <Alert status="success">
            <AlertIcon />
            You are already logged in.
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default Login;
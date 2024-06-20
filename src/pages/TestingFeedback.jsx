import { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { supabase } from '../integrations/supabase/index.js';

const TestingFeedback = () => {
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [log, setLog] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  const addLogEntry = async (entry) => {
    try {
      const { data, error } = await supabase
        .from('testing_feedback_log')
        .insert([{ entry }]);
      if (error) throw error;
      setLog([...log, entry]);
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { feedback, error } = await supabase
        .from('user_feedback')
        .insert([{ feedback: data.feedback }]);
      if (error) throw error;
      setFeedback([...feedback, data.feedback]);
      addLogEntry(`Feedback submitted: ${data.feedback}`);
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Testing and Feedback</Heading>
        {loading && <Text>Loading...</Text>}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Feedback</FormLabel>
            <Textarea {...register('feedback')} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Submit Feedback</Button>
        </form>
        <Heading as="h2" size="md" textAlign="center" mt={8}>Log</Heading>
        {log.map((entry, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md">
            <Text>{entry}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default TestingFeedback;
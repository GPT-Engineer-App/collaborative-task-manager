import { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { supabase } from '../integrations/supabase/index.js';

const TestingFeedback = () => {
  const { session, loading } = useSupabaseAuth();
  const { register, handleSubmit, reset } = useForm();
  const [log, setLog] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  const addLog = async (message) => {
    const newLog = `${new Date().toISOString()}: ${message}\n`;
    setLog((prevLog) => prevLog + newLog);
    await supabase.from('logs').insert([{ message: newLog }]);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await addLog('Internal testing started');
    // Simulate internal testing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Internal testing completed');

    await addLog('Beta version released to select users');
    // Simulate beta release
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Feedback gathering started');

    // Simulate feedback gathering
    setFeedback((prevFeedback) => [...prevFeedback, data.feedback]);
    await addLog('Feedback received: ' + data.feedback);

    await addLog('User interviews conducted');
    // Simulate user interviews
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Feedback analysis started');
    // Simulate feedback analysis
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Feedback analysis completed');

    await addLog('Making necessary changes based on feedback');
    // Simulate making changes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Changes made based on feedback');

    await addLog('Continuous testing started');
    // Simulate continuous testing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Continuous testing completed');

    await addLog('Updating documentation');
    // Simulate documentation update
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('Documentation updated');

    await addLog('Providing support to users');
    // Simulate user support
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addLog('User support provided');

    setIsSubmitting(false);
    reset();
  };

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Testing and Feedback Process</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Feedback</FormLabel>
            <Textarea {...register('feedback')} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit" isLoading={isSubmitting}>Submit Feedback</Button>
        </form>
        <Box mt={8} p={4} borderWidth={1} borderRadius="md" width="100%">
          <Heading as="h2" size="md">Log</Heading>
          <Text whiteSpace="pre-wrap">{log}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TestingFeedback;
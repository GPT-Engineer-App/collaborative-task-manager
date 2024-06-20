import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useFiles, useAddFile, useUpdateFile, useDeleteFile, useFileVersions, useAddFileVersion, useGroups, useFileAccessPermissions, useAddFileAccessPermission } from '../integrations/supabase/index.js';

const FileManagement = () => {
  const { session, loading } = useSupabaseAuth();
  const { data: files, isLoading: filesLoading, error: filesError } = useFiles();
  const { data: fileVersions, isLoading: fileVersionsLoading, error: fileVersionsError } = useFileVersions();
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: fileAccessPermissions, isLoading: fileAccessPermissionsLoading, error: fileAccessPermissionsError } = useFileAccessPermissions();
  const { mutate: addFile } = useAddFile();
  const { mutate: updateFile } = useUpdateFile();
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: addFileVersion } = useAddFileVersion();
  const { mutate: addFileAccessPermission } = useAddFileAccessPermission();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  const onSubmit = data => {
    if (data.id) {
      updateFile(data);
    } else {
      addFile(data);
    }
  };

  const handleEdit = file => {
    setValue('id', file.id);
    setValue('name', file.name);
    setValue('group_id', file.group_id);
  };

  const handleDelete = id => {
    deleteFile(id);
  };

  const handleAddVersion = file => {
    const versionData = {
      file_id: file.id,
      version: fileVersions.filter(v => v.file_id === file.id).length + 1,
      content: file.content // Assuming content is part of the file object
    };
    addFileVersion(versionData);
  };

  const handleSetPermission = (file, userId, permission) => {
    const permissionData = {
      file_id: file.id,
      user_id: userId,
      permission
    };
    addFileAccessPermission(permissionData);
  };

  if (loading || filesLoading || fileVersionsLoading || groupsLoading || fileAccessPermissionsLoading) return <Text>Loading...</Text>;
  if (filesError) return <Text>Error: {filesError.message}</Text>;
  if (fileVersionsError) return <Text>Error: {fileVersionsError.message}</Text>;
  if (groupsError) return <Text>Error: {groupsError.message}</Text>;
  if (fileAccessPermissionsError) return <Text>Error: {fileAccessPermissionsError.message}</Text>;

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">File Management</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="hidden" {...register('id')} />
          <FormControl>
            <FormLabel>File Name</FormLabel>
            <Input type="text" {...register('name')} />
          </FormControl>
          <FormControl>
            <FormLabel>Group</FormLabel>
            <Select {...register('group_id')}>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Save File</Button>
        </form>
        <Heading as="h2" size="md" textAlign="center" mt={8}>Existing Files</Heading>
        {files.map(file => (
          <Box key={file.id} p={4} borderWidth={1} borderRadius="md">
            <Text><strong>Name:</strong> {file.name}</Text>
            <Text><strong>Group:</strong> {groups.find(group => group.id === file.group_id)?.name}</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleEdit(file)}>Edit</Button>
            <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(file.id)}>Delete</Button>
            <Button mt={2} ml={2} colorScheme="green" onClick={() => handleAddVersion(file)}>Add Version</Button>
            <FormControl mt={2}>
              <FormLabel>Set Permission</FormLabel>
              <Select onChange={(e) => handleSetPermission(file, e.target.value, 'read')}>
                <option value="">Select User</option>
                {/* Assuming users data is available */}
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.email}</option>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default FileManagement;
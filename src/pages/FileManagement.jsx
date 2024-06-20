import { useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, Text, Alert, AlertIcon, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useFiles, useAddFile, useUpdateFile, useDeleteFile, useFileVersions, useAddFileVersion, useGroups, useFileAccessPermissions, useAddFileAccessPermission, useUsers, useContextualRelations, useAddContextualRelation, useEntanglementNodes, useAddEntanglementNode } from '../integrations/supabase/index.js';

const FileManagement = () => {
  const { session, loading } = useSupabaseAuth();
  const { data: files, isLoading: filesLoading, error: filesError } = useFiles();
  const { data: fileVersions, isLoading: fileVersionsLoading, error: fileVersionsError } = useFileVersions();
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: fileAccessPermissions, isLoading: fileAccessPermissionsLoading, error: fileAccessPermissionsError } = useFileAccessPermissions();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: contextualRelations, isLoading: contextualRelationsLoading, error: contextualRelationsError } = useContextualRelations();
  const { data: entanglementNodes, isLoading: entanglementNodesLoading, error: entanglementNodesError } = useEntanglementNodes();
  const { mutate: addFile } = useAddFile();
  const { mutate: updateFile } = useUpdateFile();
  const { mutate: deleteFile } = useDeleteFile();
  const { mutate: addFileVersion } = useAddFileVersion();
  const { mutate: addFileAccessPermission } = useAddFileAccessPermission();
  const { mutate: addContextualRelation } = useAddContextualRelation();
  const { mutate: addEntanglementNode } = useAddEntanglementNode();
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

  const handleAddContextualRelation = (file1, file2, relationType) => {
    const relationData = {
      file1_id: file1.id,
      file2_id: file2.id,
      relation_type: relationType
    };
    addContextualRelation(relationData);
  };

  const handleAddEntanglementNode = (file, nodeType) => {
    const nodeData = {
      file_id: file.id,
      node_type: nodeType
    };
    addEntanglementNode(nodeData);
  };

  if (loading || filesLoading || fileVersionsLoading || groupsLoading || fileAccessPermissionsLoading || usersLoading || contextualRelationsLoading || entanglementNodesLoading) return <Text>Loading...</Text>;
  if (filesError) return <Text>Error: {filesError.message}</Text>;
  if (fileVersionsError) return <Text>Error: {fileVersionsError.message}</Text>;
  if (groupsError) return <Text>Error: {groupsError.message}</Text>;
  if (fileAccessPermissionsError) return <Text>Error: {fileAccessPermissionsError.message}</Text>;
  if (usersError) return <Text>Error: {usersError.message}</Text>;
  if (contextualRelationsError) return <Text>Error: {contextualRelationsError.message}</Text>;
  if (entanglementNodesError) return <Text>Error: {entanglementNodesError.message}</Text>;

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
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.email}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Add Contextual Relation</FormLabel>
              <Select onChange={(e) => handleAddContextualRelation(file, files.find(f => f.id === e.target.value), 'related')}>
                <option value="">Select File</option>
                {files.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Add Entanglement Node</FormLabel>
              <Select onChange={(e) => handleAddEntanglementNode(file, e.target.value)}>
                <option value="">Select Node Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </Select>
            </FormControl>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default FileManagement;
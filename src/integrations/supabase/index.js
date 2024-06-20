import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### groups

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### file_versions

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### tasks

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### entanglement_nodes

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### file_access_permissions

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### files

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### comments

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### users

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |

### contextual_relations

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| Column Name | text        | string | false    |
| Data Type   | text        | string | false    |
| Constraints | text        | string | false    |
| Description | text        | string | false    |
*/

export const useGroups = () => useQuery({
    queryKey: ['groups'],
    queryFn: () => fromSupabase(supabase.from('groups').select('*')),
});
export const useAddGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGroup) => fromSupabase(supabase.from('groups').insert([newGroup])),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};
export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedGroup) => fromSupabase(supabase.from('groups').update(updatedGroup).eq('id', updatedGroup.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};
export const useDeleteGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('groups').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};

export const useFileVersions = () => useQuery({
    queryKey: ['file_versions'],
    queryFn: () => fromSupabase(supabase.from('file_versions').select('*')),
});
export const useAddFileVersion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFileVersion) => fromSupabase(supabase.from('file_versions').insert([newFileVersion])),
        onSuccess: () => {
            queryClient.invalidateQueries('file_versions');
        },
    });
};
export const useUpdateFileVersion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedFileVersion) => fromSupabase(supabase.from('file_versions').update(updatedFileVersion).eq('id', updatedFileVersion.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('file_versions');
        },
    });
};
export const useDeleteFileVersion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('file_versions').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('file_versions');
        },
    });
};

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});
export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask) => fromSupabase(supabase.from('tasks').update(updatedTask).eq('id', updatedTask.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useEntanglementNodes = () => useQuery({
    queryKey: ['entanglement_nodes'],
    queryFn: () => fromSupabase(supabase.from('entanglement_nodes').select('*')),
});
export const useAddEntanglementNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntanglementNode) => fromSupabase(supabase.from('entanglement_nodes').insert([newEntanglementNode])),
        onSuccess: () => {
            queryClient.invalidateQueries('entanglement_nodes');
        },
    });
};
export const useUpdateEntanglementNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntanglementNode) => fromSupabase(supabase.from('entanglement_nodes').update(updatedEntanglementNode).eq('id', updatedEntanglementNode.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('entanglement_nodes');
        },
    });
};
export const useDeleteEntanglementNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('entanglement_nodes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('entanglement_nodes');
        },
    });
};

export const useFileAccessPermissions = () => useQuery({
    queryKey: ['file_access_permissions'],
    queryFn: () => fromSupabase(supabase.from('file_access_permissions').select('*')),
});
export const useAddFileAccessPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFileAccessPermission) => fromSupabase(supabase.from('file_access_permissions').insert([newFileAccessPermission])),
        onSuccess: () => {
            queryClient.invalidateQueries('file_access_permissions');
        },
    });
};
export const useUpdateFileAccessPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedFileAccessPermission) => fromSupabase(supabase.from('file_access_permissions').update(updatedFileAccessPermission).eq('id', updatedFileAccessPermission.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('file_access_permissions');
        },
    });
};
export const useDeleteFileAccessPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('file_access_permissions').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('file_access_permissions');
        },
    });
};

export const useFiles = () => useQuery({
    queryKey: ['files'],
    queryFn: () => fromSupabase(supabase.from('files').select('*')),
});
export const useAddFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFile) => fromSupabase(supabase.from('files').insert([newFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};
export const useUpdateFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedFile) => fromSupabase(supabase.from('files').update(updatedFile).eq('id', updatedFile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};
export const useDeleteFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('files').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};

export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});
export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useContextualRelations = () => useQuery({
    queryKey: ['contextual_relations'],
    queryFn: () => fromSupabase(supabase.from('contextual_relations').select('*')),
});
export const useAddContextualRelation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newContextualRelation) => fromSupabase(supabase.from('contextual_relations').insert([newContextualRelation])),
        onSuccess: () => {
            queryClient.invalidateQueries('contextual_relations');
        },
    });
};
export const useUpdateContextualRelation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedContextualRelation) => fromSupabase(supabase.from('contextual_relations').update(updatedContextualRelation).eq('id', updatedContextualRelation.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('contextual_relations');
        },
    });
};
export const useDeleteContextualRelation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('contextual_relations').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('contextual_relations');
        },
    });
};
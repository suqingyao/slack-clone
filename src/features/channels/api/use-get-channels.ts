import { useQuery } from 'convex/react';

import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

interface UseGetChannels {
  workspaceId: Id<'workspaces'>;
}

export const useGetChannels = ({ workspaceId }: UseGetChannels) => {
  const data = useQuery(api.channels.get, { workspaceId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};

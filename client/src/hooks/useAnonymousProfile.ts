import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getStoredProfileId } from "@/lib/anonymousProfile";

export interface AnonymousProfile {
  id: string;
  nickname: string | null;
  createdAt: string | null;
}

export function useAnonymousProfile() {
  const [profileId] = useState(getStoredProfileId);
  const queryClient = useQueryClient();

  const profileQuery = useQuery<AnonymousProfile>({
    queryKey: ["/api/profile", profileId],
    queryFn: async () => {
      const res = await apiRequest("POST", "/api/profile", { id: profileId });
      return res.json();
    },
    staleTime: Infinity,
  });

  const nicknameMutation = useMutation({
    mutationFn: async (nickname: string | null) => {
      const res = await apiRequest("PATCH", `/api/profile/${profileId}`, { nickname });
      return res.json() as Promise<AnonymousProfile>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/profile", profileId], data);
    },
  });

  return {
    profileId,
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    updateNickname: nicknameMutation.mutateAsync,
    displayName: profileQuery.data?.nickname || null,
  };
}

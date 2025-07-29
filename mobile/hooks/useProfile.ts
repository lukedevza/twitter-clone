import { useState } from "react";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useCurrentUser } from "./useCurrentUser";
import { FormData } from "@/types";

export const useProfile = () => {
  const api = useApiClient();

  const queryClient = useQueryClient();
  const [isEditModalVisable, setIsEditModalVisable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
  });

  const { currentUser } = useCurrentUser();

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: any) => userApi.updateProfile(api, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditModalVisable(false);
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (error: any) => {
      Alert.alert("Error", error.response?.data.error || "Failed to update profile");
    },
  });

  const openEditModal = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
      });
    }
    setIsEditModalVisable(true);
  };

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    isEditModalVisable,
    formData,
    openEditModal,
    closeEditModal: () => setIsEditModalVisable(false),
    saveProfile: () => updateProfileMutation.mutate(formData),
    updateFormField,
    isUpdating: updateProfileMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  };
};

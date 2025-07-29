import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { Feather } from "@expo/vector-icons";
import { formatDateToMonthDay } from "@/utils/formatters";
import { usePosts } from "@/hooks/usePosts";
import PostsList from "@/components/PostsList";

const ProfileScreen = () => {
  const { currentUser, isLoading } = useCurrentUser();
  const insets = useSafeAreaInsets();

  const {
    posts: userPosts,
    refetch: refetchPosts,
    isLoading: isRefetching,
  } = usePosts(currentUser?.username);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator
          size="large"
          color="#1DA1F2"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text className="text-gray-500 text-sm">{userPosts.length} Posts</Text>
        </View>
        <SignOutButton />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{
            uri:
              currentUser.bannerImage ||
              "https://plus.unsplash.com/premium_photo-1684341008385-31d2eb4f3afe?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-48"
          resizeMode="cover"
        />

        <View className="px-4 pb-4 border-b border-gray-100">
          <View className="flex-row justify-between items-end -mt-16 mb-4">
            <Image
              source={{ uri: currentUser.profilePicture }}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <TouchableOpacity className="border border-gray-300 px-6 py-2 rounded-full">
              <Text className="font-semibold text-gray-900">Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-bold text-gray-900 mr-1">
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Feather
                name="check-circle"
                size={20}
                color="#1DA1F2"
              />
            </View>
            <Text className="text-gray-500 mb-2">@{currentUser.username}</Text>
            <Text className="text-gray-900 mb-3">
              {currentUser.bio !== "" ? currentUser.bio : "Edit profile to add your bio"}
            </Text>

            <View className="flex-row items-center mb-2">
              <Feather
                name="map-pin"
                size={16}
                color="#657786"
              />
              <Text className="text-gray-500 ml-2">
                {currentUser.location !== ""
                  ? currentUser.location
                  : "Edit profile to add your location"}
              </Text>
            </View>

            <View className="flex-row items-center mb-3">
              <Feather
                name="calendar"
                size={16}
                color="#657786"
              />
              <Text className="text-gray-500 ml-2">
                {formatDateToMonthDay(currentUser.createdAt)}
              </Text>
            </View>

            <View className="flex-row">
              <TouchableOpacity className="mr-6">
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.following?.length}</Text>
                  <Text className="text-gray-500"> Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="mr-6">
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.followers?.length}</Text>
                  <Text className="text-gray-500"> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PostsList username={currentUser?.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

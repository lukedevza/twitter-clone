import { View, TextInput, ScrollView, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const TRENDING_TOPIC = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "562K" },
  { topic: "#TechNews", tweets: "98K" },
  { topic: "#NextJS", tweets: "76K" },
  { topic: "#OpenAI", tweets: "420K" },
  { topic: "#JavaScript", tweets: "310K" },
  { topic: "#Frontend", tweets: "150K" },
  { topic: "#UXDesign", tweets: "67K" },
  { topic: "#Coding", tweets: "295K" },
  { topic: "#Startups", tweets: "105K" },
  { topic: "#DevLife", tweets: "85K" },
  { topic: "#CloudComputing", tweets: "60K" },
  { topic: "#CyberSecurity", tweets: "90K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather
            name="search"
            size={20}
            color="#657786"
          />
          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">Trending for you</Text>
          {TRENDING_TOPIC.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="py-3 border-b border-gray-100"
            >
              <Text className="text-gray-500 text-sm">Trending in Technology</Text>
              <Text className="font-bold text-gray-900 text-lg">{item.topic}</Text>
              <Text className="text-gray-500 text-sm">{item.tweets} Tweets</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

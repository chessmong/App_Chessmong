import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://chessmong.com" }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        cacheEnabled={false}
        scrollEnabled={true}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a3a47",
  },
});

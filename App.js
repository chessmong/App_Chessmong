import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.container}>
          <WebView
            source={{ uri: "https://chessmong.com" }}
            style={{ flex: 1 }}
            originWhitelist={["*"]}
            cacheEnabled={false}
            scrollEnabled={true}
          />
        </Animated.View>
      </PanGestureHandler>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a3a47",
  },
});

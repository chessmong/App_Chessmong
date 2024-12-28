import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  GestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function App() {
  const webviewRef = useRef(null);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        if (webviewRef.current) {
          webviewRef.current.reload();
        }
      }

      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <WebView
            ref={webviewRef}
            source={{ uri: "https://chessmong.com" }}
            style={{ flex: 1 }}
            originWhitelist={["*"]}
            cacheEnabled={false}
          />
        </Animated.View>
      </GestureDetector>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

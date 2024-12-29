import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native";

export default function App() {
  const webviewRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onGestureEvent = (event) => {
    setTranslateY(event.nativeEvent.translationY);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END && event.nativeEvent.translationY > 100) {
      if (webviewRef.current && !isRefreshing) {
        setIsRefreshing(true);
        webviewRef.current.reload();
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    }
    setTranslateY(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={!isRefreshing}
      >
        <Animated.View
          style={[styles.container, { transform: [{ translateY: isRefreshing ? 0 : translateY }] }]}
        >
          <WebView
            ref={webviewRef}
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

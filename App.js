import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native";

export default function App() {
  const webviewRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  const onGestureEvent = (event) => {
    setTranslateY(event.nativeEvent.translationY);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.translationY > 100) {
      if (webviewRef.current) {
        webviewRef.current.reload();
      }
    }
    setTranslateY(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={false}
      >
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
          <WebView
            ref={webviewRef}
            source={{ uri: "https://chessmong.com" }}
            style={{ flex: 1 }}
            originWhitelist={["*"]}
            cacheEnabled={false}
            onScroll={() => setTranslateY(0)}
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
    backgroundColor: "#fff",
  },
});

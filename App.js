import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native";

export default function App() {
  const webviewRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onGestureEvent = (event) => {
    const translationY = event.nativeEvent.translationY;

    if (isAtTop && translationY > 0) {
      setTranslateY(translationY);
    }
  };

  const onHandlerStateChange = (event) => {
    if (isAtTop && event.nativeEvent.translationY > 100) {
      if (webviewRef.current && !isRefreshing) {
        setIsRefreshing(true);
        webviewRef.current.reload();
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    }

    setTranslateY(0);
  };

  const handleWebViewScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y === 0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
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
            onScroll={handleWebViewScroll}
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

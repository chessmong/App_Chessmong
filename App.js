import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native";

export default function App() {
  const webviewRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onGestureEvent = (event) => {
    const translationY = event.nativeEvent.translationY;

    if (translationY > 0 && isRefreshing === false) {
      setTranslateY(translationY);
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.translationY > 100) {
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
            onScroll={(event) => {
              const { contentOffset } = event.nativeEvent;
              if (contentOffset.y === 0 && translateY === 0) {
                setIsRefreshing(false);
              }
            }}
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

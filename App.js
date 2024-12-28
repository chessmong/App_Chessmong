import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef } from "react";

export default function App() {
  const webviewRef = useRef(null);

  const reloadPage = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://chessmong.com" }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        cacheEnabled={false}
      />
      <Button title="Reload Page" onPress={reloadPage} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

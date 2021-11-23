import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";
import { AppWrapper } from "./injected/AppWrapper";
import { HtmlContent } from "./injected/HtmlContent";
import { SignaturePadSource } from "./injected/SignaturePadSource";
import { captureRef, captureScreen } from "react-native-view-shot";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const injectedJavaScript = SignaturePadSource + AppWrapper("#000", "#fff", null);
const html = HtmlContent(injectedJavaScript);

export default function App() {
  const [webViewKey, setWebViewKey] = useState(Math.random());
  const webviewRef = useRef(null);

  const handleCaptureScreen = async () => {
    const imageInBase64 = await captureRef(webviewRef, {
      result: "base64",
      height: 100,
      width: 60,
      quality: 0.1,
      format: "jpg",
    });

    console.log(imageInBase64);
  };

  return (
    <>
      <View
        collapsable={false}
        key={webViewKey}
        ref={webviewRef}
        style={{ flex: 1 }}
      >
        <WebView
          mixedContentMode="compatibility"
          originWhitelist={["*"]}
          source={{ html: html }}
          javaScriptEnabled
          scalesPageToFit
          useWebKit
          incognito
          androidLayerType="hardware"
          androidHardwareAccelerationDisabled
        />
      </View>

      <View onTouchEnd={handleCaptureScreen} style={styles.subContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setWebViewKey(Math.random())}
            style={styles.clearButton}
          >
            <Text style={styles.textButton}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.textButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 2,
    borderColor: "#fff",
  },
  textButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonsContainer: {
    transform: [{ rotate: "90deg" }],
    backgroundColor: "#2CA941",
    flexDirection: "row",
    width: screenHeight,
    height: screenWidth * 0.15,
  },
  subContainer: {
    height: "100%",
    width: Dimensions.get("screen").width * 0.15,
    backgroundColor: "#ccc",
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

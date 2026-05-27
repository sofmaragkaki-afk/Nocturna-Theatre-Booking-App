import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200",
      }}
      style={styles.background}
      blurRadius={1.1}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(34, 6, 17, 0.82)",
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <View style={styles.card}>
        <Text style={styles.empty}>No bookings yet.</Text>
        <Text style={styles.text}>Your reserved seats will appear here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090407",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "#D4AF37",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#160A10",
    borderColor: "#5A1025",
    borderWidth: 1,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },
  empty: {
    color: "#F5E8D0",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    color: "#B08A8A",
    fontSize: 14,
    textAlign: "center",
  },
});
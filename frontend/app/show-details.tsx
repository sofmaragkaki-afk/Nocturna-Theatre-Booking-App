import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BackgroundWrapper from "../components/BackgroundWrapper";
export default function ShowDetailsScreen() {
  const params = useLocalSearchParams();

  return (
    <BackgroundWrapper>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
>
  <Text style={styles.backArrow}>←</Text>
</TouchableOpacity>

      <View style={styles.posterCard}>
        <View style={styles.posterGlow} />
        <Text style={styles.posterSmall}>NOCTURNA PRESENTS</Text>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.genre}>{params.genre}</Text>
        <Text style={styles.theatre}>{params.theatre}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoChip}>
          <Text style={styles.chipLabel}>DATE</Text>
          <Text style={styles.chipValue}>{params.date}</Text>
        </View>

        <View style={styles.infoChip}>
          <Text style={styles.chipLabel}>TIME</Text>
          <Text style={styles.chipValue}>{params.time}</Text>
        </View>

        <View style={styles.infoChip}>
          <Text style={styles.chipLabel}>PRICE</Text>
          <Text style={styles.chipPrice}>{params.price}</Text>
        </View>
      </View>

      <View style={styles.locationCard}>
        <Text style={styles.sectionLabel}>LOCATION</Text>
        <Text style={styles.location}>{params.location}</Text>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>About the Performance</Text>
        <Text style={styles.description}>
          Step into an atmospheric theatre experience shaped by velvet tones,
          golden stage lights and gothic storytelling. This performance combines
          mystery, elegance and dramatic tension, creating a memorable night for
          the audience.
        </Text>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Reservation Notice</Text>
        <Text style={styles.noteText}>
          Choose your preferred seats and confirm your reservation before the
          showtime.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/seats",
            params,
          } as any)
        }
      >
        <Text style={styles.buttonText}>SELECT SEATS</Text>
      </TouchableOpacity>
    </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingBottom: 50,
  },
  backArrow: {
  color: "#F7D97A",
  fontSize: 28,
  fontWeight: "900",
},

backButton: {
  width: 40,
  height: 40,
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 12,
},
  posterCard: {
    backgroundColor: "rgba(50, 8, 23, 0.90)",
    borderRadius: 36,
    padding: 28,
    minHeight: 250,
    justifyContent: "flex-end",
    borderWidth: 1.4,
    borderColor: "#C9A24A",
    marginBottom: 18,
    overflow: "hidden",
  },
  posterGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 120,
    backgroundColor: "rgba(247, 217, 122, 0.13)",
    top: -70,
    right: -60,
  },
  posterSmall: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: "#FFF5E8",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 42,
    marginBottom: 10,
  },
  genre: {
    color: "#F7D97A",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  theatre: {
    color: "#E2B9C5",
    fontSize: 15,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  infoChip: {
    flex: 1,
    backgroundColor: "#320817",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#6F1430",
    minHeight: 86,
    justifyContent: "center",
  },
  chipLabel: {
    color: "#B78A97",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  chipValue: {
    color: "#FFF5E8",
    fontSize: 14,
    fontWeight: "800",
  },
  chipPrice: {
    color: "#F7D97A",
    fontSize: 18,
    fontWeight: "900",
  },
  locationCard: {
    backgroundColor: "rgba(50, 8, 23, 0.92)",
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "#6F1430",
    marginBottom: 16,
  },
  sectionLabel: {
    color: "#F7D97A",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.6,
    marginBottom: 8,
  },
  location: {
    color: "#FFF5E8",
    fontSize: 17,
    fontWeight: "800",
  },
  descriptionCard: {
    backgroundColor: "#320817",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#6F1430",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFF5E8",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  description: {
    color: "#E2B9C5",
    fontSize: 15,
    lineHeight: 24,
  },
  noteCard: {
    backgroundColor: "#4B0A22",
    borderRadius: 24,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: "#C9A24A",
    marginBottom: 18,
  },
  noteTitle: {
    color: "#F7D97A",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6,
  },
  noteText: {
    color: "#E2B9C5",
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.4,
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 14,
  },
});
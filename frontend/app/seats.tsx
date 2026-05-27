import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BackgroundWrapper from "../components/BackgroundWrapper";

type Seat = {
  id: number;
  row_label: string;
  seat_number: number;
  status: "available" | "reserved";
};

export default function SeatsScreen() {
  const params = useLocalSearchParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const token = params.token as string;
  const showId = params.id as string;

  const priceNumber = Number(String(params.price || "0").replace("€", "")) || 0;

  const fetchSeats = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/shows/${showId}/seats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not fetch seats.");
        return;
      }

      setSeats(data);
    } catch (error) {
      Alert.alert("Connection Error", "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "reserved") return;

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const confirmReservation = async () => {
    if (selectedSeats.length === 0) return;

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          show_id: showId,
          seat_ids: selectedSeats,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Reservation Failed", data.message);
        return;
      }

      Alert.alert("Success", "Reservation confirmed successfully!");
      setSelectedSeats([]);
      fetchSeats();
    } catch (error) {
      Alert.alert("Connection Error", "Could not create reservation.");
    }
  };

  const rows = ["A", "B", "C", "D", "E"];
  const total = selectedSeats.length * priceNumber;
const selectedSeatLabels = seats
  .filter((seat) => selectedSeats.includes(seat.id))
  .map((seat) => `${seat.row_label}${seat.seat_number}`)
  .join(", ");

  return (
    <BackgroundWrapper>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
>
  <Text style={styles.backArrow}>←</Text>
</TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.small}>Seat Selection</Text>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.subtitle}>{params.theatre}</Text>
      </View>

      <View style={styles.stageWrap}>
        <View style={styles.stageGlow} />
        <View style={styles.stage}>
          <Text style={styles.stageText}>STAGE</Text>
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.available]} />
          <Text style={styles.legendText}>Available</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.selected]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.reserved]} />
          <Text style={styles.legendText}>Reserved</Text>
        </View>
      </View>

      <View style={styles.hall}>
        {loading ? (
          <ActivityIndicator size="large" color="#F7D97A" />
        ) : (
          rows.map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>

              <View style={styles.seatsLine}>
                {seats
                  .filter((seat) => seat.row_label === row)
                  .sort((a, b) => a.seat_number - b.seat_number)
                  .map((seat) => {
                    const isSelected = selectedSeats.includes(seat.id);

                    return (
                      <TouchableOpacity
                        key={seat.id}
                        style={[
                          styles.seat,
                          seat.status === "reserved" && styles.seatReserved,
                          isSelected && styles.seatSelected,
                        ]}
                        onPress={() => toggleSeat(seat)}
                        disabled={seat.status === "reserved"}
                      >
                        <Text
                          style={[
                            styles.seatText,
                            seat.status === "reserved" &&
                              styles.seatTextReserved,
                            isSelected && styles.seatTextSelected,
                          ]}
                        >
                          {seat.seat_number}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>

              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Reservation Summary</Text>

        <Text style={styles.summaryText}>
          Selected seats:{" "}
          <Text style={styles.goldText}>
             {selectedSeatLabels || "None"}
          </Text>
        </Text>

        <Text style={styles.summaryText}>
          Total: <Text style={styles.total}>€{total.toFixed(2)}</Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            selectedSeats.length === 0 && styles.confirmDisabled,
          ]}
          disabled={selectedSeats.length === 0}
          onPress={confirmReservation}
        >
          <Text style={styles.confirmText}>CONFIRM RESERVATION</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 22, paddingBottom: 46 },
  backButton: { marginTop: 20, marginBottom: 16 },
  header: { marginBottom: 20 },
  small: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#FFF5E8",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: { color: "#E2B9C5", fontSize: 15 },
  stageWrap: { alignItems: "center", marginBottom: 18 },
  stageGlow: {
    width: "78%",
    height: 22,
    backgroundColor: "rgba(247, 217, 122, 0.18)",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  stage: {
    width: "88%",
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.3,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: "center",
  },
  stageText: {
    color: "#F7D97A",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(50, 8, 23, 0.92)",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#6F1430",
    marginBottom: 18,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 7 },
  legendBox: { width: 16, height: 16, borderRadius: 6 },
  available: { backgroundColor: "#FFF5E8" },
  selected: { backgroundColor: "#F7D97A" },
  reserved: { backgroundColor: "#6F1430" },
  legendText: { color: "#E2B9C5", fontSize: 12, fontWeight: "700" },
  hall: {
    backgroundColor: "#320817",
    borderRadius: 34,
    padding: 18,
    borderWidth: 1,
    borderColor: "#6F1430",
    marginBottom: 18,
    minHeight: 260,
    justifyContent: "center",
  },
  backArrow: {
  color: "#F7D97A",
  fontSize: 28,
  fontWeight: "900",
},
 row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  rowLabel: {
    color: "#F7D97A",
    width: 24,
    textAlign: "center",
    fontWeight: "900",
  },
  seatsLine: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    gap: 6,
  },
  seat: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#FFF5E8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C9A24A",
  },
  seatSelected: { backgroundColor: "#F7D97A", borderColor: "#F7D97A" },
  seatReserved: { backgroundColor: "#6F1430", borderColor: "#6F1430" },
  seatText: { color: "#220611", fontSize: 12, fontWeight: "900" },
  seatTextSelected: { color: "#220611" },
  seatTextReserved: { color: "#B78A97" },
  summaryCard: {
    backgroundColor: "rgba(75, 10, 34, 0.92)",
    borderRadius: 30,
    padding: 22,
    borderWidth: 1.2,
    borderColor: "#C9A24A",
  },
  summaryTitle: {
    color: "#FFF5E8",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  summaryText: { color: "#E2B9C5", fontSize: 15, marginBottom: 8 },
  goldText: { color: "#F7D97A", fontWeight: "900" },
  total: { color: "#F7D97A", fontSize: 20, fontWeight: "900" },
  confirmButton: {
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.3,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginTop: 14,
  },
  confirmDisabled: { opacity: 0.45 },
  confirmText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 1.8,
    fontSize: 13,
  },
});
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

type Booking = {
  id: number;
  status: string;
  total_price: string;
  created_at: string;
  title: string;
  show_date: string;
  show_time: string;
  theatre: string;
  seats: string;
};

export default function MyBookingsScreen() {
  const { token } = useLocalSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not fetch bookings.");
        return;
      }

      setBookings(data);
    } catch {
      Alert.alert("Connection Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Cancel Failed", data.message);
        return;
      }

      Alert.alert("Success", "Booking cancelled successfully.");
      fetchBookings();
    } catch {
      Alert.alert("Connection Error", "Could not cancel booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
     <BackgroundWrapper>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
>
  <Text style={styles.backArrow}>←</Text>
</TouchableOpacity>

      <Text style={styles.title}>My Bookings</Text>
      <Text style={styles.subtitle}>Your Nocturna reservation history</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#F7D97A" style={{ marginTop: 40 }} />
      ) : bookings.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptyText}>
            Your reserved seats will appear here after booking.
          </Text>
        </View>
      ) : (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.status}>{booking.status.toUpperCase()}</Text>
              <Text style={styles.price}>
                €{Number(booking.total_price).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.showTitle}>{booking.title}</Text>
            <Text style={styles.info}>{booking.theatre}</Text>

            <View style={styles.metaBox}>
              <Text style={styles.meta}>
                Date: {new Date(booking.show_date).toLocaleDateString()} •{" "}
                {String(booking.show_time).slice(0, 5)}
              </Text>
              <Text style={styles.meta}>Seats: {booking.seats}</Text>
            </View>

            {booking.status === "confirmed" && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelBooking(booking.id)}
              >
                <Text style={styles.cancelText}>CANCEL BOOKING</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
  content: { padding: 22, paddingBottom: 50 },
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
  title: {
    color: "#FFF5E8",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    color: "#E2B9C5",
    fontSize: 14,
    marginBottom: 24,
  },
  emptyCard: {
    backgroundColor: "rgba(50, 8, 23, 0.90)",
    borderRadius: 28,
    padding: 26,
    borderWidth: 1,
    borderColor: "#6F1430",
    alignItems: "center",
  },
  emptyTitle: {
    color: "#F7D97A",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  emptyText: { color: "#E2B9C5", textAlign: "center" },
  card: {
    backgroundColor: "rgba(50, 8, 23, 0.92)",
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#6F1430",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  status: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  price: {
    color: "#FFF5E8",
    fontSize: 16,
    fontWeight: "900",
  },
  showTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 6,
  },
  info: { color: "#E2B9C5", fontSize: 14, marginBottom: 12 },
  metaBox: {
    backgroundColor: "#260611",
    borderRadius: 18,
    padding: 12,
    marginTop: 4,
  },
  meta: { color: "#B78A97", fontSize: 13, marginBottom: 4 },
  cancelButton: {
    backgroundColor: "#5A1025",
    borderColor: "#C9A24A",
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  cancelText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 1.6,
    fontSize: 13,
  },
});
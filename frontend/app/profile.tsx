import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
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

export default function ProfileScreen() {
  const { name, email, token } = useLocalSearchParams();
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const latestBooking = confirmedBookings[0];

  return (
    <BackgroundWrapper>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/images/nocturna-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {String(name || "G").charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name || "Guest"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email || "No email available"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Confirmed Bookings</Text>
            {loading ? (
              <ActivityIndicator color="#F7D97A" />
            ) : (
              <Text style={styles.valueGold}>{confirmedBookings.length}</Text>
            )}
          </View>

          <View style={styles.latestBox}>
            <Text style={styles.latestTitle}>Latest Reservation</Text>

            {loading ? (
              <ActivityIndicator color="#F7D97A" />
            ) : latestBooking ? (
              <>
                <Text style={styles.latestShow}>{latestBooking.title}</Text>
                <Text style={styles.latestText}>{latestBooking.theatre}</Text>
                <Text style={styles.latestText}>
                  {new Date(latestBooking.show_date).toLocaleDateString()} •{" "}
                  {String(latestBooking.show_time).slice(0, 5)}
                </Text>
                <Text style={styles.latestText}>Seats: {latestBooking.seats}</Text>
              </>
            ) : (
              <Text style={styles.latestText}>
                You do not have any confirmed reservations yet.
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.bookingsButton}
            onPress={() =>
              router.push({
                pathname: "/my-bookings",
                params: {
                  token: token as string,
                },
              } as any)
            }
          >
            <Text style={styles.bookingsText}>VIEW MY BOOKINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace("/login" as any)}
          >
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
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
  paddingTop: 42,
  paddingBottom: 60,
  justifyContent: "center",
},
  backButton: {
  position: "absolute",
  top: 38,
  left: 34,
  width: 42,
  height: 42,
  justifyContent: "center",
  zIndex: 10,
  },
  backArrow: {
    color: "#F7D97A",
    fontSize: 30,
    fontWeight: "900",
  },
  logo: {
    width: 235,
    height: 105,
    alignSelf: "center",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "rgba(50, 8, 23, 0.92)",
    borderRadius: 34,
    padding: 24,
    borderWidth: 1.2,
    borderColor: "#C9A24A",
  },
  title: {
    color: "#F7D97A",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#8A0F32",
    borderWidth: 1.5,
    borderColor: "#C9A24A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },
  avatarText: {
    color: "#F7D97A",
    fontSize: 34,
    fontWeight: "900",
  },
  infoBox: {
    backgroundColor: "rgba(38, 6, 17, 0.86)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#541128",
  },
  label: {
    color: "#B78A97",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    color: "#FFF5E8",
    fontSize: 16,
    fontWeight: "800",
  },
  valueGold: {
    color: "#F7D97A",
    fontSize: 20,
    fontWeight: "900",
  },
  latestBox: {
    backgroundColor: "rgba(75, 10, 34, 0.84)",
    borderRadius: 22,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#C9A24A",
    marginBottom: 14,
  },
  latestTitle: {
    color: "#F7D97A",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 8,
  },
  latestShow: {
    color: "#FFF5E8",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  latestText: {
    color: "#E2B9C5",
    fontSize: 13,
    lineHeight: 20,
  },
  bookingsButton: {
    backgroundColor: "rgba(75, 10, 34, 0.88)",
    borderColor: "#C9A24A",
    borderWidth: 1.2,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginTop: 4,
  },
  bookingsText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 1.8,
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.3,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 2,
  },
});
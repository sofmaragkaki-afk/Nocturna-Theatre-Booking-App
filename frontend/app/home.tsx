import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BackgroundWrapper from "../components/BackgroundWrapper";

type Show = {
  id: number;
  title: string;
  description: string;
  genre: string;
  venue: string;
  show_date: string;
  show_time: string;
  price: string;
  theatre: string;
  location: string;
  available_seats: number;
};

export default function HomeScreen() {
  const { name, email, token } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShows = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/shows", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not fetch shows.");
        return;
      }

      setShows(data);
    } catch {
      Alert.alert("Connection Error", "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const filteredShows = shows.filter((show) =>
    `${show.title} ${show.theatre} ${show.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const featuredShow = filteredShows[0];

  return (
    <BackgroundWrapper>
      <View style={styles.screen}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.headerCentered}>
            <Image
              source={require("../assets/images/nocturna-logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <Text style={styles.welcome}>Welcome, {name || "Guest"}</Text>
            <Text style={styles.subtitle}>
              Choose your next theatrical experience
            </Text>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />

            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>★ FEATURED PERFORMANCE</Text>
            </View>

            <Text style={styles.heroSmall}>Nocturna Selection</Text>
            <Text style={styles.heroTitle}>
              {featuredShow ? featuredShow.title : "Luxury Theatre Nights"}
            </Text>
            <Text style={styles.heroText}>
              Discover velvet-stage performances, reserved seats and premium
              theatre nights directly from the Nocturna database.
            </Text>

            {featuredShow && (
              <TouchableOpacity
                style={styles.heroButton}
                onPress={() =>
                  router.push({
                    pathname: "/show-details",
                    params: {
                      id: featuredShow.id,
                      title: featuredShow.title,
                      theatre: featuredShow.theatre,
                      location: featuredShow.location,
                      date: new Date(featuredShow.show_date).toLocaleDateString(),
                      time: String(featuredShow.show_time).slice(0, 5),
                      genre: featuredShow.genre,
                      price: `€${Number(featuredShow.price).toFixed(2)}`,
                      token: token as string,
                    },
                  } as any)
                }
              >
                <Text style={styles.heroButtonText}>VIEW FEATURED</Text>
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.search}
            placeholder="Search by title, theatre or location..."
            placeholderTextColor="#B78A97"
            value={search}
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
          />

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Available Shows</Text>
            <Text style={styles.count}>{filteredShows.length} shows</Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#F7D97A"
              style={{ marginTop: 30 }}
            />
          ) : (
            filteredShows.map((show) => (
              <View key={show.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.genre}>{show.genre || "Theatre"}</Text>
                  <Text style={styles.price}>
                    €{Number(show.price).toFixed(2)}
                  </Text>
                </View>

                <Text style={styles.showTitle}>{show.title}</Text>
                <Text style={styles.showInfo}>{show.theatre}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.miniChip}>
                    <Text style={styles.miniLabel}>Date</Text>
                    <Text style={styles.miniValue}>
                      {new Date(show.show_date).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.miniChip}>
                    <Text style={styles.miniLabel}>Time</Text>
                    <Text style={styles.miniValue}>
                      {String(show.show_time).slice(0, 5)}
                    </Text>
                  </View>

                  <View style={styles.miniChip}>
                    <Text style={styles.miniLabel}>Seats</Text>
                    <Text style={styles.miniValue}>{show.available_seats}</Text>
                  </View>
                </View>

                <Text style={styles.location}>Location: {show.location}</Text>

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() =>
                    router.push({
                      pathname: "/show-details",
                      params: {
                        id: show.id,
                        title: show.title,
                        theatre: show.theatre,
                        location: show.location,
                        date: new Date(show.show_date).toLocaleDateString(),
                        time: String(show.show_time).slice(0, 5),
                        genre: show.genre,
                        price: `€${Number(show.price).toFixed(2)}`,
                        token: token as string,
                      },
                    } as any)
                  }
                >
                  <Text style={styles.detailsText}>VIEW DETAILS</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIconActive}>⌂</Text>
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              router.push({
                pathname: "/my-bookings",
                params: { token: token as string },
              } as any)
            }
          >
            <Text style={styles.navIcon}>◇</Text>
            <Text style={styles.navText}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              router.push({
                pathname: "/profile",
                params: {
                  name: name as string,
                  email: email as string,
                  token: token as string,
                },
              } as any)
            }
          >
            <Text style={styles.navIcon}>♙</Text>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingBottom: 110,
  },
  headerCentered: {
    marginTop: 18,
    marginBottom: 18,
    alignItems: "center",
  },
  logoImage: {
    width: 230,
    height: 105,
    marginBottom: 4,
  },
  welcome: {
    color: "#FFF5E8",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    color: "#E2B9C5",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
  heroCard: {
    backgroundColor: "rgba(75, 10, 34, 0.88)",
    borderRadius: 34,
    padding: 24,
    borderWidth: 1.2,
    borderColor: "#C9A24A",
    marginBottom: 18,
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(247, 217, 122, 0.12)",
    top: -72,
    right: -52,
  },
  featuredBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F7D97A",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
  },
  featuredBadgeText: {
    color: "#220611",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroSmall: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 9,
  },
  heroTitle: {
    color: "#FFF5E8",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
    lineHeight: 34,
  },
  heroText: {
    color: "#E2B9C5",
    fontSize: 14,
    lineHeight: 21,
  },
  heroButton: {
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    marginTop: 18,
  },
  heroButtonText: {
    color: "#F7D97A",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.8,
  },
  search: {
    backgroundColor: "rgba(50, 8, 23, 0.9)",
    borderWidth: 1,
    borderColor: "#7B1230",
    borderRadius: 22,
    padding: 16,
    color: "#FFF5E8",
    fontSize: 14,
    marginBottom: 22,
    outlineStyle: "none" as any,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#F7D97A",
    fontSize: 21,
    fontWeight: "900",
  },
  count: {
    color: "#E2B9C5",
    fontSize: 13,
    fontWeight: "800",
  },
  card: {
    backgroundColor: "rgba(50, 8, 23, 0.92)",
    borderRadius: 30,
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
  genre: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  price: {
    color: "#FFF5E8",
    fontSize: 17,
    fontWeight: "900",
  },
  showTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 6,
  },
  showInfo: {
    color: "#E2B9C5",
    fontSize: 14,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  miniChip: {
    flex: 1,
    backgroundColor: "rgba(38, 6, 17, 0.85)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#541128",
  },
  miniLabel: {
    color: "#B78A97",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  miniValue: {
    color: "#FFF5E8",
    fontSize: 12,
    fontWeight: "800",
  },
  location: {
    color: "#B78A97",
    fontSize: 13,
    marginBottom: 14,
  },
  detailsButton: {
    backgroundColor: "#8A0F32",
    borderColor: "#C9A24A",
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },
  detailsText: {
    color: "#F7D97A",
    fontWeight: "900",
    letterSpacing: 1.8,
    fontSize: 13,
  },
  bottomNav: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    flexDirection: "row",
    backgroundColor: "rgba(50, 8, 23, 0.95)",
    borderWidth: 1.2,
    borderColor: "#C9A24A",
    borderRadius: 28,
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navIcon: {
    color: "#B78A97",
    fontSize: 22,
    fontWeight: "900",
  },
  navIconActive: {
    color: "#F7D97A",
    fontSize: 22,
    fontWeight: "900",
  },
  navText: {
    color: "#B78A97",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  navTextActive: {
    color: "#F7D97A",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
  },
});
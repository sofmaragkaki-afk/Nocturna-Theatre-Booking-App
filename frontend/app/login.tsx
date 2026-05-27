import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Information", "Please enter email and password.");
      return;
    }

    fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Login Failed", data.message);
          return;
        }

        Alert.alert("Success", `Welcome ${data.user.name}!`);
        console.log("TOKEN:", data.token);
        console.log("USER:", data.user);
        router.replace({
  pathname: "/home",
  params: {
   name: data.user.name,
    email: data.user.email,
    token: data.token,
  },
} as any);
      })
      .catch(() => {
        Alert.alert("Connection Error", "Could not connect to the server.");
      });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200",
      }}
      style={styles.background}
      blurRadius={1.1}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.flex}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={require("../assets/images/nocturna-logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />

            <View style={styles.card}>
              <Text style={styles.cardTitle}>LOGIN</Text>
              <Text style={styles.welcome}>Welcome Back 👋</Text>
              <Text style={styles.cardSubtitle}>
                Enter the Nocturna theatre experience.
              </Text>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#9A766E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                selectionColor="#8B1236"
                cursorColor="#8B1236"
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#9A766E"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  underlineColorAndroid="transparent"
                  selectionColor="#8B1236"
                  cursorColor="#8B1236"
                />

                <TouchableOpacity
                  style={styles.showButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-outline"}
                    size={23}
                    color="#8B1236"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>

              <Text style={styles.registerText}>
                Don&apos;t have an account?{" "}
                <Link href={"/register" as any} style={styles.registerLink}>
                  Register
                </Link>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(75, 5, 25, 0.66)",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
  },
  logoImage: {
   width: "100%",
  height: 340,
  marginBottom: -45,
  marginTop: -25,
  },
  card: {
    backgroundColor: "rgba(50, 8, 23, 0.94)",
    borderRadius: 38,
    padding: 34,
    borderWidth: 1.2,
    borderColor: "#C9A24A",
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#3A0614",
    shadowOpacity: 0.38,
    shadowRadius: 26,
    elevation: 14,
  },
  cardTitle: {
    color: "#F7D97A",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  welcome: {
    color: "#FFF5E8",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#D8B7C3",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
    letterSpacing: 0.4,
  },
  label: {
    color: "#F7D97A",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "rgba(35, 5, 15, 0.85)",
    borderWidth: 1.2,
    borderColor: "#C9A66B",
    borderRadius: 20,
    padding: 16,
    color: "#FFF5E8",
    fontSize: 15,
    outlineStyle: "none" as any,
  },
  passwordBox: {
    backgroundColor: "rgba(35, 5, 15, 0.85)",
    borderWidth: 1.2,
    borderColor: "#C9A66B",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    color: "#e7e6b6",
    fontSize: 15,
    outlineStyle: "none" as any,
  },
  showButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#8A0F32",
    borderRadius: 22,
    padding: 17,
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1.4,
    borderColor: "#C9A24A",
  },
  buttonText: {
    color: "#F7D97A",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2.4,
  },
  registerText: {
    color: "#D8B7C3",
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },
  registerLink: {
    color: "#F7D97A",
    fontWeight: "900",
  },
});
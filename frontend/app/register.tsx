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
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords Do Not Match",
        "The passwords entered do not match. Please try again."
      );
      return;
    }

  fetch("http://192.168.2.21:4000/api/auth/register", {

  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    email,
    password,
  }),
})
  .then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Registration Failed", data.message);
      return;
    }

    Alert.alert("Success", "Account created successfully!");
    console.log("TOKEN:", data.token);
    console.log("USER:", data.user);
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
              <Text style={styles.cardTitle}>SIGN UP</Text>
              <Text style={styles.welcome}>Join Nocturna</Text>
              <Text style={styles.cardSubtitle}>
                Create your account and reserve your next performance.
              </Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#9A766E"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                selectionColor="#8B1236"
                cursorColor="#8B1236"
              />

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
                  placeholder="Create a password"
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

              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9A766E"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  underlineColorAndroid="transparent"
                  selectionColor="#8B1236"
                  cursorColor="#8B1236"
                />

                <TouchableOpacity
                  style={styles.showButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-outline"}
                    size={23}
                    color="#8B1236"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
              </TouchableOpacity>

              <Text style={styles.registerText}>
                Already have an account?{" "}
                <Link href={"/login" as any} style={styles.registerLink}>
                  Sign In
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
  flex: { flex: 1 },
  background: { flex: 1 },
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
  marginTop: -25,
  marginBottom: -45,
  },
  card: {
    backgroundColor: "rgba(50, 8, 23, 0.94)",
    borderRadius: 38,
    padding: 32,
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
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 1.2,
  },
  welcome: {
    color: "#FFF5E8",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#D8B7C3",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.3,
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
    color: "#FFF5E8",
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
    letterSpacing: 2.2,
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
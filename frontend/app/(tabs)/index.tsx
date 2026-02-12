import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { io, Socket } from "socket.io-client";

export default function App() {
  const [sensorData, setSensorData] = useState<string>("Waiting for server...");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // ⚠️ Replace with your computer's local IP address
    const newSocket: Socket = io("http://127.0.0.1:5000:5000", {
      transports: ["websocket"], // Forces websocket (good for React Native)
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
    });

    newSocket.on("sensor_update", (data) => {
      console.log("📡 Received sensor data:", data);
      setSensorData(JSON.stringify(data.distance, null, 2));
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    newSocket.on("connect_error", (err) => {
      console.log("🚨 Connection Error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Sensor Data</Text>
      <Text style={styles.data}>{sensorData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
    textAlign: "center",
  },
});

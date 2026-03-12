import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { io, Socket } from "socket.io-client";
import { styles } from "./styles";

export default function App() {
  const [sensorData, setSensorData] = useState<string>("Waiting for server...");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io("http://127.0.0.1:5000", {
      transports: ["websocket"],
    });

    newSocket.on("sensor_update", (data) => {
      console.log("📡 Received sensor data:", data);
      setSensorData(JSON.stringify(data.distance, null, 2));
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

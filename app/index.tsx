import { Stack, Link } from 'expo-router';

import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { TikTokMessages } from './TikTokMessages';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useEffect, useRef, useState } from 'react';
import { ChatItem, generateNewMessage } from './chat';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


const chatSpeed = {
  slow: [1000, 500],
  medium: [500, 500],
  fast: [250, 250],
  "insane": [50, 100],
};

export default function Home() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [speed, setSpeed] =
    useState<keyof typeof chatSpeed>("slow");



  const generateData = () => {
    clearTimeout(timeout.current);

    const selectedSpeed = chatSpeed[speed];
    const timer =
      Math.random() * selectedSpeed[0] + selectedSpeed[1];

    // console.log("Calling setData in ", timer);

    timeout.current = setTimeout(() => {
      // console.log("Called for ", timer);

      setMessages((data) => {
        return [generateNewMessage(), ...data];
      });

      generateData();
    }, timer);
  };

  useEffect(() => {
    generateData();
  },[speed]);
  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container} blurRadius={0}>
      <TikTokMessages data={messages}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                {
                  gap: 4,
                  alignItems: "flex-start",
                  padding: 4 * 2,
                  borderRadius: 12,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 16,
                    aspectRatio: 1,
                    borderRadius: 24,
                  }}
                  source={{ uri: item.user.avatar }}
                />

                <Text style={{ fontSize: 15, fontWeight: '700', color: 'white' }}>
                  {item.user.name}
                </Text>
              </View>

              <LiquidGlassView
                effect="clear"
                style={{
                  padding: 4 * 2,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>
                  {item.description}
                </Text>
              </LiquidGlassView>
            </View>
          );
        }}

      />
      <View
        style={{
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LiquidGlassView
          effect="clear"
          style={{
            borderRadius: 20,
          }}
        >
          <SegmentedControl
            values={Object.keys(chatSpeed)}
            style={{ width: 300 }}
            selectedIndex={Object.keys(chatSpeed).indexOf(speed)}
            tintColor="rgba(255,255,255,0.3)"
            fontStyle={{ color: 'white' }}
            activeFontStyle={{ color: 'white', fontWeight: '700' }}
            onChange={(event) => {
              setSpeed(
                event.nativeEvent.value as keyof typeof chatSpeed
              );
            }}
          />
        </LiquidGlassView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

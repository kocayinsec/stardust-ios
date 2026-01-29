import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Starfield from '../components/Starfield';
import { colors, spacing } from '../constants/theme';

const messages = [
  {
    id: 'm1',
    type: 'oracle',
    text: 'Welcome, star traveler. Ask and I will translate the cosmos.',
  },
  {
    id: 'm2',
    type: 'user',
    text: 'What should I focus on this week?'
  },
  {
    id: 'm3',
    type: 'oracle',
    text: 'Nurture the project that feels unfinished. Completion unlocks new energy.'
  },
];

export default function OracleChatScreen() {
  return (
    <LinearGradient
      colors={[colors.midnight, '#0C1020', '#1D1233']}
      style={styles.container}
    >
      <Starfield />
      <View style={styles.header}>
        <Text style={styles.title}>AI Oracle</Text>
        <Text style={styles.subtitle}>A private channel to the stars</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chat} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.type === 'oracle' ? styles.oracleBubble : styles.userBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.type === 'oracle' ? styles.oracleText : styles.userText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <BlurView intensity={30} tint="dark" style={styles.inputWrap}>
        <TextInput
          placeholder="Ask the Oracle..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  // starfield handled by component
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.gold,
  },
  subtitle: {
    color: colors.cyan,
    marginTop: spacing.xs,
  },
  chat: {
    paddingBottom: spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.sm,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  oracleBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(123,44,191,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(61,235,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  oracleText: {
    color: colors.white,
  },
  userText: {
    color: colors.white,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    color: colors.white,
    paddingRight: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.purple,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

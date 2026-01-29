import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Starfield from '../components/Starfield';
import { colors, spacing } from '../constants/theme';
import { useTypography } from '../constants/typography';

const dailyLimit = 3;

const mockOracleResponses = [
  'The comet you chase is already within reach. Move with devotion, not haste.',
  'A forgotten promise hums beneath your week. Honor it and the path clears.',
  'Protect your mornings. The first hour is a portal you keep leaving unguarded.',
  'Your next win is quiet. Whisper your work into the world and let it bloom.',
  'Say no to what scatters you. Your power is in the ritual of focus.',
  'The stars favor completion over perfection. Finish one sacred thing.',
];

const initialMessages = [
  {
    id: 'm1',
    type: 'oracle',
    text: 'Welcome, star traveler. Ask and I will translate the cosmos.',
  },
];

export default function OracleChatScreen() {
  const typography = useTypography();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [remainingQuestions, setRemainingQuestions] = useState(dailyLimit);
  const [lastQuestionDay, setLastQuestionDay] = useState(new Date().toDateString());
  const responseIndex = useRef(0);

  const maybeResetDailyLimit = () => {
    const today = new Date().toDateString();
    if (today !== lastQuestionDay) {
      setRemainingQuestions(dailyLimit);
      setLastQuestionDay(today);
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    maybeResetDailyLimit();

    if (remainingQuestions <= 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          type: 'oracle',
          text: 'The veil closes for today. Return at dawn or unlock endless whispers.',
        },
      ]);
      setInput('');
      return;
    }

    const nextResponse = mockOracleResponses[responseIndex.current % mockOracleResponses.length];
    responseIndex.current += 1;

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, type: 'user', text: trimmed },
      { id: `o-${Date.now() + 1}`, type: 'oracle', text: nextResponse },
    ]);
    setRemainingQuestions((prev) => Math.max(prev - 1, 0));
    setInput('');
  };

  const limitReached = remainingQuestions <= 0;

  return (
    <LinearGradient
      colors={[colors.midnight, '#0C1020', '#1D1233']}
      style={styles.container}
    >
      <Starfield />
      <View style={styles.header}>
        <Text style={styles.title}>AI Oracle</Text>
        <Text style={styles.subtitle}>A private channel to the stars</Text>
        <View style={styles.limitPill}>
          <Text style={styles.limitText}>
            {limitReached
              ? 'Daily limit reached — return at dawn'
              : `${remainingQuestions} free questions left today`}
          </Text>
        </View>
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

        {limitReached && (
          <View style={styles.gateCard}>
            <Text style={styles.gateTitle}>Starlight sealed for today</Text>
            <Text style={styles.gateBody}>
              You have used your three free questions. Unlock Stardust Gold for endless
              whispers, priority replies, and deeper rituals.
            </Text>
            <TouchableOpacity style={styles.gateButton}>
              <Text style={styles.gateButtonText}>Unlock Stardust Gold</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BlurView intensity={30} tint="dark" style={styles.inputWrap}>
        <TextInput
          placeholder="Ask the Oracle..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          editable={!limitReached}
        />
        <TouchableOpacity
          style={[styles.sendButton, limitReached && styles.sendButtonDisabled]}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>{limitReached ? 'Locked' : 'Send'}</Text>
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
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.gold,
    marginBottom: spacing.xs,
    ...typography.display,
  },
  subtitle: {
    color: colors.cyan,
    marginBottom: spacing.sm,
    ...typography.subtitle,
  },
  limitPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    marginBottom: spacing.md,
  },
  limitText: {
    color: colors.gold,
    fontSize: 12,
    ...typography.label,
  },
  chat: {
    paddingBottom: spacing.lg,
  },
  gateCard: {
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(12,16,32,0.7)',
    marginTop: spacing.sm,
  },
  gateTitle: {
    color: colors.gold,
    fontSize: 16,
    marginBottom: spacing.xs,
    ...typography.title,
  },
  gateBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  gateButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  gateButtonText: {
    color: colors.midnight,
    fontWeight: '700',
    ...typography.button,
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
    ...typography.body,
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
    ...typography.body,
  },
  sendButton: {
    backgroundColor: colors.purple,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.4,
    ...typography.button,
  },
});

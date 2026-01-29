import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Starfield from '../components/Starfield';
import { colors, spacing } from '../constants/theme';
import { useTypography } from '../constants/typography';
import { useSubscription } from '../iap/SubscriptionProvider';

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

function MessageBubble({ message }) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 420,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  return (
    <Animated.View
      style={[
        styles.messageBubble,
        message.type === 'oracle' ? styles.oracleBubble : styles.userBubble,
        {
          opacity: entrance,
          transform: [
            {
              translateY: entrance.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
            {
              scale: entrance.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
              }),
            },
          ],
        },
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
    </Animated.View>
  );
}

export default function OracleChatScreen() {
  const typography = useTypography();
  const { isSubscribed, isPurchasing, purchaseSubscription } = useSubscription();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [remainingQuestions, setRemainingQuestions] = useState(dailyLimit);
  const [lastQuestionDay, setLastQuestionDay] = useState(new Date().toDateString());
  const responseIndex = useRef(0);
  const scrollRef = useRef(null);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const inputGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(inputGlow, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(inputGlow, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    );

    glowLoop.start();

    return () => glowLoop.stop();
  }, [headerAnim, inputGlow]);

  const headerStyle = {
    opacity: headerAnim,
    transform: [
      {
        translateY: headerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  const inputGlowStyle = {
    opacity: inputGlow.interpolate({
      inputRange: [0, 1],
      outputRange: [0.15, 0.5],
    }),
    transform: [
      {
        scale: inputGlow.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1.05],
        }),
      },
    ],
  };

  const triggerSelectionHaptic = () => {
    Haptics.selectionAsync().catch(() => null);
  };

  const triggerImpactHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => null);
  };

  const triggerWarningHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => null);
  };

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

    if (!isSubscribed && remainingQuestions <= 0) {
      triggerWarningHaptic();
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

    triggerImpactHaptic();
    const nextResponse = mockOracleResponses[responseIndex.current % mockOracleResponses.length];
    responseIndex.current += 1;

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, type: 'user', text: trimmed },
      { id: `o-${Date.now() + 1}`, type: 'oracle', text: nextResponse },
    ]);
    if (!isSubscribed) {
      setRemainingQuestions((prev) => Math.max(prev - 1, 0));
    }
    setInput('');
  };

  const limitReached = !isSubscribed && remainingQuestions <= 0;

  const handleGateUnlock = () => {
    if (isPurchasing || isSubscribed) return;
    triggerImpactHaptic();
    purchaseSubscription();
  };

  return (
    <LinearGradient
      colors={[colors.midnight, '#0C1020', '#1D1233']}
      style={styles.container}
    >
      <Starfield />
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.title}>AI Oracle</Text>
        <Text style={styles.subtitle}>A private channel to the stars</Text>
        <View style={styles.limitPill}>
          <Text style={styles.limitText}>
            {isSubscribed
              ? 'Stardust Gold active — unlimited questions'
              : limitReached
              ? 'Daily limit reached — return at dawn'
              : `${remainingQuestions} free questions left today`}
          </Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.chat}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {limitReached && (
          <View style={styles.gateCard}>
            <Text style={styles.gateTitle}>Starlight sealed for today</Text>
            <Text style={styles.gateBody}>
              You have used your three free questions. Unlock Stardust Gold for endless
              whispers, priority replies, and deeper rituals.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.gateButton,
                pressed && !isPurchasing && styles.buttonPressed,
                isPurchasing && styles.gateButtonDisabled,
              ]}
              onPress={handleGateUnlock}
              onPressIn={triggerSelectionHaptic}
              disabled={isPurchasing}
            >
              <Text style={styles.gateButtonText}>
                {isPurchasing ? 'Unlocking…' : 'Unlock Stardust Gold'}
              </Text>
            </Pressable>
          </View>
        )}
      </Animated.ScrollView>

      <BlurView intensity={30} tint="dark" style={styles.inputWrap}>
        <Animated.View pointerEvents="none" style={[styles.inputGlow, inputGlowStyle]} />
        <TextInput
          placeholder="Ask the Oracle..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          editable={!limitReached}
        />
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            limitReached && styles.sendButtonDisabled,
            pressed && !limitReached && styles.sendButtonPressed,
          ]}
          onPress={handleSend}
          onPressIn={triggerSelectionHaptic}
          disabled={limitReached}
        >
          <Text style={styles.sendButtonText}>{limitReached ? 'Locked' : 'Send'}</Text>
        </Pressable>
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
    backgroundColor: 'rgba(255,215,0,0.14)',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.35)',
    marginBottom: spacing.md,
    shadowColor: 'rgba(255, 215, 140, 0.6)',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
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
  gateButtonDisabled: {
    opacity: 0.7,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
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
    shadowColor: 'rgba(20, 25, 60, 0.6)',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
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
    borderColor: 'rgba(255,255,255,0.16)',
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  inputGlow: {
    position: 'absolute',
    left: -30,
    right: -30,
    top: -20,
    bottom: -20,
    borderRadius: 30,
    backgroundColor: 'rgba(97, 143, 255, 0.22)',
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: 'rgba(110, 130, 255, 0.6)',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  sendButtonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
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

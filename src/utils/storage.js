import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  starSeedId: 'stardust:starSeedId',
  oracleDailyState: 'stardust:oracleDailyState',
};

const getTodayKey = () => new Date().toDateString();

export const getStarSeedId = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.starSeedId);
  } catch (error) {
    return null;
  }
};

export const setStarSeedId = async (value) => {
  try {
    if (!value) {
      await AsyncStorage.removeItem(STORAGE_KEYS.starSeedId);
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEYS.starSeedId, value);
  } catch (error) {
    // no-op
  }
};

export const getOracleDailyState = async (fallbackLimit) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.oracleDailyState);
    if (!stored) {
      return {
        remainingQuestions: fallbackLimit,
        lastQuestionDay: getTodayKey(),
      };
    }

    const parsed = JSON.parse(stored);
    return {
      remainingQuestions:
        typeof parsed?.remainingQuestions === 'number' ? parsed.remainingQuestions : fallbackLimit,
      lastQuestionDay:
        typeof parsed?.lastQuestionDay === 'string' ? parsed.lastQuestionDay : getTodayKey(),
    };
  } catch (error) {
    return {
      remainingQuestions: fallbackLimit,
      lastQuestionDay: getTodayKey(),
    };
  }
};

export const normalizeOracleDailyState = ({ remainingQuestions, lastQuestionDay, limit }) => {
  const today = getTodayKey();
  if (lastQuestionDay !== today) {
    return { remainingQuestions: limit, lastQuestionDay: today };
  }
  return { remainingQuestions, lastQuestionDay };
};

export const setOracleDailyState = async ({ remainingQuestions, lastQuestionDay }) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.oracleDailyState,
      JSON.stringify({ remainingQuestions, lastQuestionDay })
    );
  } catch (error) {
    // no-op
  }
};

export const preloadAppStorage = async (fallbackLimit) => {
  await Promise.all([
    getStarSeedId(),
    getOracleDailyState(fallbackLimit),
  ]);
};

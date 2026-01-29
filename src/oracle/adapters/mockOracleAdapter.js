const mockOracleResponses = [
  'The comet you chase is already within reach. Move with devotion, not haste.',
  'A forgotten promise hums beneath your week. Honor it and the path clears.',
  'Protect your mornings. The first hour is a portal you keep leaving unguarded.',
  'Your next win is quiet. Whisper your work into the world and let it bloom.',
  'Say no to what scatters you. Your power is in the ritual of focus.',
  'The stars favor completion over perfection. Finish one sacred thing.',
];

export function createMockOracleAdapter() {
  let responseIndex = 0;

  return {
    async sendMessage({ message }) {
      const nextResponse = mockOracleResponses[responseIndex % mockOracleResponses.length];
      responseIndex += 1;

      return {
        id: `mock-${Date.now()}`,
        text: nextResponse,
        input: message,
      };
    },
  };
}

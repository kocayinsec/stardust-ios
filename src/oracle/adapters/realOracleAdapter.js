import { requestOracleReply } from '../api/oracleClient';

export function createRealOracleAdapter() {
  return {
    async sendMessage({ message, history, userProfile, clientContext, signal }) {
      // TODO: Ensure history format matches backend expectations (roles, ids, timestamps).
      return requestOracleReply({
        message,
        history,
        userProfile,
        clientContext,
        signal,
      });
    },
  };
}

import { oracleConfig } from '../config';
import { buildSystemPrompt } from '../prompts/systemPrompt';

const buildHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (oracleConfig.apiKey) {
    headers.Authorization = `Bearer ${oracleConfig.apiKey}`;
  }

  return headers;
};

export async function requestOracleReply({
  message,
  history = [],
  userProfile,
  clientContext,
  signal,
} = {}) {
  if (!oracleConfig.baseUrl) {
    throw new Error('Oracle API base URL is not configured.');
  }

  const payload = {
    message,
    history,
    systemPrompt: buildSystemPrompt({ userProfile }),
    userProfile,
    clientContext,
    appId: oracleConfig.appId,
  };

  // TODO: Confirm the backend endpoint + payload schema with the Oracle service.
  // TODO: Replace `/v1/oracle/chat` once the backend publishes the canonical route.
  const response = await fetch(`${oracleConfig.baseUrl}/v1/oracle/chat`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Oracle API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  // TODO: Align response parsing with backend response contract.
  return {
    id: data.id || `oracle-${Date.now()}`,
    text: data.reply || data.message || data.output || '',
    raw: data,
  };
}

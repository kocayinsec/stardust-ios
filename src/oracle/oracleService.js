import { oracleConfig } from './config';
import { createMockOracleAdapter } from './adapters/mockOracleAdapter';
import { createRealOracleAdapter } from './adapters/realOracleAdapter';

export function createOracleService() {
  if (oracleConfig.mode === 'real') {
    return createRealOracleAdapter();
  }

  return createMockOracleAdapter();
}

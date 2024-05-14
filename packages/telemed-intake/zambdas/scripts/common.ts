import devConfig from '../.env/development.json';
// import testingConfig from '../.env/testing.json';
import { FhirClient, ZambdaClient } from '@zapehr/sdk';
import { getM2MClientToken } from '../src/shared';

export const projectApiUrlFromAuth0Audience = (auth0Audience: string): string => {
  switch (auth0Audience) {
    case 'https://dev.api.zapehr.com':
      return 'https://dev.project-api.zapehr.com/v1';
    case 'https://dev2.api.zapehr.com':
      return 'https://dev2.project-api.zapehr.com/v1';
    case 'https://testing.api.zapehr.com':
      return 'https://testing.project-api.zapehr.com/v1';
    case 'https://staging.api.zapehr.com':
      return 'https://staging.project-api.zapehr.com/v1';
    case 'https://api.zapehr.com':
      return 'https://project-api.zapehr.com/v1';
    default:
      throw `Unexpected auth0 audience value, could not map to a projectApiUrl. auth0Audience was: ${auth0Audience}`;
  }
};

export const performEffectWithEnvFile = async (callback: (config: any) => void) => {
  const env = process.argv[2];

  switch (env) {
    case 'dev':
      await callback(devConfig);
      break;
    // case 'testing':
    //   await callback(testingConfig);
    //   break;
    default:
      throw new Error('¯\\_(ツ)_/¯ environment must match a valid zapEHR environment.');
  }
};

export const createZambdaClient = async (config: any): Promise<ZambdaClient> => {
  const token = await getM2MClientToken(config);

  if (!token) {
    throw new Error('Failed to fetch auth token.');
  }

  const zambdaClient = new ZambdaClient({
    apiUrl: 'https://project-api.zapehr.com/v1',
    accessToken: token,
  });

  return zambdaClient;
};


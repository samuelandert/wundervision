import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates
} from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/'
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries],
  server,
  operations,
  codeGenerators: [
    {
      templates: [templates.typescript.client],
      path: '../../packages/generated-wundergraph'
    }
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins: process.env.NODE_ENV === 'production'
      ? [
        'https://flywunder.fly.dev',
      ]
      : [
        'http://localhost:3000',
        'http://127.0.0.1:3000/',
        'http://localhost:3003',
        'http://127.0.0.1:3003/',
      ]
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' || process.env.GITPOD_WORKSPACE_ID !== undefined
  },
  options: {
    publicNodeUrl: new EnvironmentVariable("PUBLIC_NODE_URL", 'http://localhost:9991'),
  },
});
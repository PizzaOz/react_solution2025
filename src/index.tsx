import {
  Solutions,
  RouterContextProvider,
  envClient,
  RENDER_COMPONENT,
  RENDER_SERVICE,
  ROUTER_SERVICE,
  dumpService,
  httpClient,
  i18nService,
  logService,
  modalsService,
  renderService,
  routerService,
  type Patch,
  HTTP_CLIENT,
} from 'react-solution';

import { configs } from './configs.ts';
import { App } from '@src/app';
// import { USERS_API } from './auth/users-api/token.ts';
// import { SESSION_STORE } from './auth/session-store/token.ts';
// import { SessionStore } from './auth/session-store/index.ts';
// import { UsersApi } from './auth/users-api/index.ts';
import { authFeature } from './auth/provider.ts';

export default async function prepareSolutions(envPatch: Patch<Env> = {}): Promise<Solutions> {
  return new Solutions()
    .register(envClient(envPatch))
    .register(configs)
    .register(renderService)
    .register(routerService)
    .register(modalsService)
    .register(httpClient)
    .register(i18nService)
    .register(logService)
    .register(dumpService)
    .register(authFeature)
    .register({
      token: RENDER_COMPONENT,
      depends: { router: ROUTER_SERVICE },
      factory: ({ router }) => (
        <RouterContextProvider router={router}>
          <App />
        </RouterContextProvider>
      ),
    });
}

if (!import.meta.env.SSR) {
  (async () => {
    const solutions = await prepareSolutions();
    const render = await solutions.get(RENDER_SERVICE);
    render.start();
  })();
}
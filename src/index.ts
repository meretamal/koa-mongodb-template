import { config } from '@/config';
import { app } from './app';

app.listen(config.port, () =>
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${config.port}`),
);

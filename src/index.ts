/* eslint-disable no-console */
import { environment } from '@/config/environment';
import { app } from './app';

app.listen(environment.port, async () => {
  console.log(`App listening on port ${environment.port}`);
});

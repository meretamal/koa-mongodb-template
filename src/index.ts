/* eslint-disable no-console */
import { connect } from 'mongoose';
import { environment } from '@/config/environment';
import { app } from './app';

app.listen(environment.port, async () => {
  console.log(`App listening on port ${environment.port}`);
  try {
    await connect(environment.database.url);
    console.log('Connection to database established successfully');
  } catch (error) {
    console.log('Unable to connect to database');
  }
});

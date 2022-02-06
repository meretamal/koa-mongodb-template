/* eslint-disable no-console */
import { connect } from 'mongoose';
import { config } from '@/config';
import { app } from './app';

app.listen(config.port, async () => {
  console.log(`App listening on port ${config.port}`);
  try {
    await connect(config.databaseUrl);
    console.log('Connection to database established successfully');
  } catch (error) {
    console.log('Unable to connect to database');
  }
});

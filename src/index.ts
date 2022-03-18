/* eslint-disable no-console */
import { connect } from 'mongoose';
import { config } from '@/config';
import { app } from './app';

app.listen(config.app.port, async () => {
  console.log(`App listening on port ${config.app.port}`);
  try {
    await connect(config.database.url);
    console.log('Connection to database established successfully');
  } catch (error) {
    console.log('Unable to connect to database');
  }
});

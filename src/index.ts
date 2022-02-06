import { app } from './app';

const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}`));

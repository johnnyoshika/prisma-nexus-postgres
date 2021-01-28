import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { server } from './server';

const app = express();
routes(app);

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

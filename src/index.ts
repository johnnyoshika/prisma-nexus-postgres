import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();
routes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

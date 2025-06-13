import express from 'express';

const host = process.env.HOST ?? 'localhost';
// const host = process.env.HOST || '0.0.0.0'; // Default to 0.0.0.0 for Docker
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

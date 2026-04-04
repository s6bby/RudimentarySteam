import express from 'express';
import { Data, DataSchema } from './data';
import { loadFromJsonFile } from './json-manipulation';
import { z } from "zod";


async function main() 
{
  let data: Data = new Data();

  try {
    const fileData = await loadFromJsonFile('../data/data.json');
    const rawData = fileData ?? {};

    data = DataSchema.parse(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.issues);
    } else {
      console.error("Error loading or parsing data:", error);
    }
    data = new Data();
  }

  const app = express();
  const port = 3000;

  app.get('/', (req, res) =>
  {
    res.send('Hello World!')
  });

  app.get('/applications', (req, res) =>
  {
    res.json(data.getAllApplications());
  });

  app.get('/users', (req, res) =>
  {
    res.json(data.getAllUsers());
  });

  app.get('/user/:id', (req, res) =>
  {
    const user = data.getUserById(Number(req.params.id));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  });


  app.listen(port, () =>
  {
    console.log(`Example app listening on port ${port}`)
  });
}

main().catch((err) => 
{
  console.error("Error in main:", err);
  process.exit(1);
});
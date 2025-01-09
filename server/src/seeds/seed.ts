import fs from 'fs/promises';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

async function loadJson(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  const pythonQuestions = await loadJson(new URL('./pythonQuestions.json', import.meta.url).pathname);

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});

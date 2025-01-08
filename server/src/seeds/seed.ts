const db = require("../config/connection.js");
const Question = require("../models/Question.js");
const cleanDB = require("./cleanDb.js");
const pythonQuestions = require('./pythonQuestions.json');

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});

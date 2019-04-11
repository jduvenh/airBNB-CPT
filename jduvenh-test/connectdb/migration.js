const { startDb } = require('./db');
const { Question } = require('./models/questions');
const { Fact } = require('./models/facts');
const { quizQuestions, correctAnswers, turtlesData } = require('./data');

async function migrateQuestions() {
    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      const correct = q.possibilities[correctAnswers[i]].answer;
  
      const data = {
        question_type: q.type,
        question_text: q.text,
        question_possibilities: q.possibilities,
        correct_answer: correct,
      }
  
      await Question.create(data);
    }
  }

async function migratefacts() {
    for (let i = 0; i < turtlesData.length; i++) {
        const data = turtlesData[i];

        const facts = {
            fact_type: data.type,
            fact_image_url: data.image_url,
            fact_data: {
                locations: data.locations,
                size: data.size,
                diet: data.diet,
                lifespan: data.lifespan,
            },
            fact_description: data.description,
        }
        await Fact.create(data);
    }
}

async function migrate() {
    startDb();
    await migrateQuestions();
    await migratefacts();
    process.exit();
}

migrate();
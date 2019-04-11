
const { correctAnswers, quizQuestions } = require('../data');
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question_type: String,
  question_text: String,
  question_possibilities: [{
    answer: String
  }],
  correct_answer: String,
  update_at: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = {
    Question,
    getCorrectAnswers,
    getQuizQuestions,
  }

function getCorrectAnswers() {
    return Promise.resolve(correctAnswers);
}

function getQuizQuestions() {
    return Promise.resolve(quizQuestions);
}
  
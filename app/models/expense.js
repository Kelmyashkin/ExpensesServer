import mongoose, { Schema } from 'mongoose';

const Expense = new Schema(
  {
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    collection: 'Expense',
  },
);

module.exports = mongoose.model('Expense', Expense);

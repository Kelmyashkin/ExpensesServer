import mongoose, { Schema } from 'mongoose';

const Expense = new Schema(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    collection: 'ExpenseCategory',
  },
);

module.exports = mongoose.model('ExpenseCategory', Expense);

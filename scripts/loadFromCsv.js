const fs = require('fs');
const moment = require('moment');

const mongoose = require('mongoose');

const Expense = new mongoose.Schema(
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

const ExpenseModel = mongoose.model('Expense', Expense);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/expenses').then(
  () => {
    console.log('Database is connected');

    const content = fs.readFileSync('jan2018.csv', 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const cells = lines[i].split(',');
      const line = {
        date: moment.utc(cells[0]).toDate(),
        transport: cells[1],
        supermarkets: cells[2],
        cafes: cells[3],
        cafesName: cells[4],
        other: cells[5],
        otherName: cells[6],
      };

      //   { "_id" : ObjectId("5a661807717b9346d05f601d"), "name" : "Cafes", "color" : "#ef00ff", "__v" : 0 }
      //   { "_id" : ObjectId("5a661807717b9346d05f601e"), "name" : "Other", "color" : "#e4ff00", "__v" : 0 }
      //   { "_id" : ObjectId("5a661807717b9346d05f601b"), "name" : "Transport", "color" : "#17e239", "__v" : 0 }
      //   { "_id" : ObjectId("5a661807717b9346d05f601c"), "name" : "Supermarkets", "color" : "#e21717", "__v" : 0 }
      if (!isNaN(line.date)) {
        let expense = { date: line.date };
        if (line.transport) {
          console.log({
            ...expense,
            category: 'Transport',
            amount: line.transport,
          });
          new ExpenseModel({
            ...expense,
            category: 'Transport',
            amount: line.transport,
          }).save();
        }
        if (line.supermarkets) {
          console.log({
            ...expense,
            category: 'Supermarkets',
            amount: line.supermarkets,
          });
          new ExpenseModel({
            ...expense,
            category: 'Supermarkets',
            amount: line.supermarkets,
          }).save();
        }
        if (line.cafes) {
          console.log({
            ...expense,
            category: 'Cafes',
            amount: line.cafes,
            name: line.cafesName,
          });
          new ExpenseModel({
            ...expense,
            category: 'Cafes',
            amount: line.cafes,
            name: line.cafesName,
          }).save();
        }
        if (line.other) {
          console.log({
            ...expense,
            category: 'Other',
            amount: line.other,
            name: line.otherName,
          });
          new ExpenseModel({
            ...expense,
            category: 'Other',
            amount: line.other,
            name: line.otherName,
          }).save();
        }
      }
    }
  },
  err => {
    console.log(`Can not connect to the database ${err}`);
  },
);

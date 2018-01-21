import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import moment from 'moment';

import Expense from '../models/expense';

const router = new Router();
const koaBody = convert(KoaBody());
router
  .get('/expenses/byDate/', async ctx => {
    const { date } = ctx.query;
    const start = moment(date).startOf('day');
    const end = moment(start).add(1, 'd');
    ctx.body = await Expense.find({
      date: { $gte: start, $lt: end },
    });
  })
  .get('/expenses/byRange/', async ctx => {
    ctx.body = await Expense.find({
      date: { $gte: ctx.query.startDate, $lte: ctx.query.endDate },
    });
  })
  .get('/expenses/:id', async ctx => {
    const result = await Expense.findById(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204; // No content
    }
  })
  .get('/expenses', async ctx => {
    ctx.body = await Expense.find();
  })
  .post('/expenses', koaBody, async ctx => {
    const expense = new Expense(ctx.request.body);
    expense.save();
    ctx.body = expense;
  })
  .put('/expenses/:id', koaBody, async ctx => {
    const expense = await Expense.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
    );

    if (!expense) ctx.status = 204;
    else ctx.body = expense;
  })
  .delete('/expenses/:id', async ctx => {
    const result = await Expense.findByIdAndRemove(ctx.params.id);
    ctx.body = result;
  });

export function routes() {
  return router.routes();
}
export function allowedMethods() {
  return router.allowedMethods();
}

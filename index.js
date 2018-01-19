const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World 111111';
});

app.listen(3000);

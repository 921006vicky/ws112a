import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [
  { id: 0, title: 'xxx', body: '0987654321' },
  { id: 1, title: 'yyy', body: '0987987987' }
];

const router = new Router();

router.get('/', render.list.bind(null, posts))
  .get("/search/search", render.search)
  .get('/post/new', render.newPost)
  .get('/post/:id', render.show.bind(null, posts))
  .post("/search", render.find.bind(null, posts))
  .post('/post', render.create.bind(null, posts));

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });

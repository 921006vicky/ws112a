import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

const rooms = [
  { path: "/room/e319", title: "數位系統應用實驗" },
  { path: "/room/e320", title: "多媒體實驗室" },
  { path: "/room/e321", title: "電腦網路實驗室" },
  { path: "/room/e322", title: "嵌入式實驗室" },
];

rooms.forEach((room) => {
  router.get(room.path, (ctx) => {
    ctx.response.body = `
        <html>
            <body>
            <h1>${room.title}</h1>
            </body>
        </html>
        `;
  });
});

const links = [
  { path: "/ngu", title: "金門大學", url: "https://www.nqu.edu.tw/" },
  { path: "/ngu/csie", title: "金門大學資工學系", url: "https://csie.nqu.edu.tw/" },
];

links.forEach((link) => {
  router.get(link.path, (ctx) => {
    ctx.response.body = `
        <html>
            <body>
            <h1>${link.title}</h1>
            <a href="${link.url}">${link.title}</a>
            </body>
        </html>`;
  });
});

router.get("/to/ngu", (ctx) => {
  ctx.response.redirect('https://www.nqu.edu.tw/');
});

router.get("/to/ngu/csie", (ctx) => {
  ctx.response.redirect('https://csie.nqu.edu.tw/');
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

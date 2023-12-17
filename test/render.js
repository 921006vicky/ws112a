function layout(title, content) {
    return `
      <html>
      <head>
        <title>${title}</title>
        <style>
          /* CSS 样式 */
        </style>
      </head>
      <body>
        <section id="content">
          ${content}
        </section>
      </body>
      </html>
      `;
  }
  
  function list(posts) {
    const listItems = posts.map(post => `
      <li>
        <h2>${post.title}</h2>
        <p><a href="/post/${post.id}">查看電話</a></p>
      </li>
    `).join('\n');
  
    const content = `
      <h1>聯絡人</h1>
      <p>你有 <strong>${posts.length}</strong> 通訊聯絡人!</p>
      <p><a href="/post/new">創建聯絡人</a></p>
      <p><a href="/search/search">查找聯絡人</a></p>
      <ul id="posts">
        ${listItems}
      </ul>
    `;
  
    return layout("Posts", content);
  }
  
  function newPost() {
    return layout(
      "New Post",
      `
      <h1>新聯絡人</h1>
      <p>創建新聯絡人</p>
      <form action="/post" method="post">
        <p><input type="text" placeholder="姓名" name="title"></p>
        <p><textarea placeholder="電話" name="body"></textarea></p>
        <p><input type="submit" value="新增"></p>
      </form>
      `,
    );
  }
  
  function search() {
    return layout(
      "New Post",
      `
      <h1>查找聯絡人</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="要查找的姓名" name="name"></p>
        <p><input type="submit" value="查詢"></p>
      </form>
      `,
    );
  }
  
  function found(name, number) {
    return layout(
      "New Post",
      `
      <h1>查找聯絡人</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="要查找的姓名" name="name"></p>
        <p><input type="submit" value="查詢"></p>
      </form>
      <h1>名字：${name}</h1>
      <p>電話：${number}</p>
      `,
    );
  }
  
  function not_found() {
    return layout(
      "New Post",
      `
      <h1>查找聯絡人</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="要查找的姓名" name="name"></p>
        <p><input type="submit" value="查詢"></p>
      </form>
      <h1>未找到</h1>
      `,
    );
  }
  
  export { list, newPost, search, found, not_found };
  
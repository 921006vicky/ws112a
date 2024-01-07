var R = {};

var socket = new WebSocket("ws://" + window.location.hostname + ":8080");

socket.onopen = function (event) {
  console.log('socket:onopen()...');
}

function send(o) {
  if (socket.readyState == 1) {
    socket.send(JSON.stringify(o));
  } else {
    setTimeout(function () {
      send(o);
    }, 1000);
  }
}

window.onhashchange = async function () {
  var tokens = window.location.hash.split('/');
  console.log('tokens=', tokens);
  switch (tokens[0]) {
    case '#show':
      send({ type: 'show', post: { id: parseInt(tokens[1]) } });
      break;
    case '#new':
      R.newPost();
      break;
    default:
      send({ type: 'list' });
      break;
  }
}

socket.onmessage = function (event) {
  var msg = JSON.parse(event.data);
  console.log('onmessage: msg=', msg);
  switch (msg.type) {
    case 'show':
      R.showPost(msg.post);
      break;
    case 'list':
      R.listPosts(msg.posts);
      break;
  }
}

window.onload = function () {
  console.log('onload');
  window.location.href = "#list";
  window.onhashchange();
}

R.layout = function (title, content) {
  document.querySelector('title').innerText = title;
  document.querySelector('#content').innerHTML = content;
}

R.listPosts = function (posts) {
  let list = [];
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a id="show${post.id}" href="#show/${post.id}">閱讀文章</a></p>
    </li>
    `);
  }
  let content = `
  <h1>文章列表</h1>
  <p>您有 <strong>${posts.length}</strong> 篇文章！</p>
  <p><a id="createPost" href="#new">創建文章</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `;
  return R.layout('文章列表', content);
}

R.newPost = function () {
  return R.layout('新增文章', `
  <h1>新增文章</h1>
  <p>創建一篇新文章。</p>
  <form>
    <p><input id="title" type="text" placeholder="標題" name="title"></p>
    <p><textarea id="body" placeholder="內容" name="body"></textarea></p>
    <p><input id="savePost" type="button" onclick="R.savePost()" value="創建"></p>
  </form>
  `);
}

R.showPost = function (post) {
  return R.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `);
}

R.savePost = function () {
  let title = document.querySelector('#title').value;
  let body = document.querySelector('#body').value;
  send({ type: 'create', post: { title: title, body: body } });
  window.location.hash = '#list';
}

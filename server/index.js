const assert = require('assert');
const fastify = require('fastify').default;
const fastify_session = require('@fastify/session');
const fastify_cookie = require('fastify-cookie');
const fastify_cors = require('fastify-cors');
const fastify_static = require('fastify-static');
const path = require('path');
const sql = require('./db.js');

const app = fastify({ logger: true });

const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/dist/esbuild/esbuild.css" rel="stylesheet">
      <link href="/dist/postcss/postcss.css" rel="stylesheet">
  </head>
  <body>
      <div id="root"></div>
      <script src="/dist/esbuild/esbuild.js"></script>
  </body>  
  </html>
`;
// @ts-ignore
app.register(fastify_static, {
  root: path.join(process.cwd(), './client/dist'),
  prefix: '/dist/',
});
// @ts-ignore
app.get('/', async (request, reply) => {
  return reply
    .status(200)
    .header('Content-Type', 'text/html')
    .send(html);
});



// @ts-ignore
app.register(fastify_cookie);

// @ts-ignore
app.register(fastify_session, {
  secret: 'a secret with minimum length of 32 characters',
  cookie: { secure: false },
});

// @ts-ignore
app.register(fastify_cors, {
  origin: 'http://localhost:3000',
  credentials: true,
});


app.post('/sign-up', async (request, reply) => {
  /**
   * @type {string}
   */
  // @ts-ignore
  const username = request.body.username;
  assert(typeof username === 'string');

  const [existing_user] = await sql`
    SELECT "username" FROM "users"
    WHERE "username" = ${username};
  `;

  /**
   * @type {string}
   */
  // @ts-ignore
  const email = request.body.email;
  assert(typeof username === 'string');

  const [existing_email] = await sql`
    SELECT "email" FROM "users"
    WHERE "email" = ${email};
  `;

  if (existing_user instanceof Object) {
    return reply.status(400).send({
      message: 'Username already exists.',
      statusCode: 400,
    });
  } else if (existing_email instanceof Object) {
    return reply.status(400).send({
      message: 'Email already exists.',
      statusCode: 400,
    });
  } else {
    /**
   * @type {string}
   */
    // @ts-ignore
    const name = request.body.name;
    assert(typeof name === 'string');
    /**
   * @type {string}
   */
    // @ts-ignore
    const user_email = request.body.email;
    assert(typeof user_email === 'string');
    /**
   * @type {string}
   */
    // @ts-ignore
    const user_name = request.body.username;
    assert(typeof user_name === 'string');
    /**
   * @type {string}
   */
    // @ts-ignore
    const password = request.body.password;
    assert(typeof password === 'string');
    /**
   * @type {string}
   */
    // @ts-ignore
    const user_type = request.body.type;
    assert(typeof user_type === 'string');


    await sql `INSERT INTO "users" (name, email, username, password)
    VALUES (${name}, ${user_email}, ${user_name}, ${password}); `;

    await sql ` INSERT INTO "roles" (code, name)
    VALUES (${user_type}, ${name}); `;

    return reply.status(200).send({ message: 'You have created your account.', statusCode: 200 });
  }


});


app.post('/sign-in', async (request, reply) => {

  const response = { user: null, message: null, statusCode: null };
  /**
   * @type {string}
   */
  // @ts-ignore
  if (typeof request.session.user_id === 'number') {
    response.message = 'Already logged-in.';
    response.statusCode = 400;
    return reply.status(400).send(response);
  }

  /**
   * @type {string}
   */
  // @ts-ignore
  const username = request.body.username;
  assert(typeof username === 'string');

  /**
   * @type {string}
   */
  // @ts-ignore
  const password = request.body.password;
  assert(typeof password === 'string');

  const [user] = await sql`
    SELECT * FROM "users"
    WHERE "username" = ${username}
    AND "password" = ${password};
  `;


  if (user instanceof Object) {
    /**
   * @type {string}
   */
    // @ts-ignore
    request.session.user_id = user.id;
    response.user = user;
    response.message = 'Authentication success.';
    response.statusCode = 200;
    console.log(response);
    return reply.status(200).send(response);
  }

  response.message = 'Authentication failed.';
  response.statusCode = 400;
  return reply.status(400).send(response);
});


app.get('/logout', async (request, reply) => {
  assert(request.session instanceof Object);
  /**
   * @type {string}
   */
  // @ts-ignore
  if (typeof request.session.user_id === 'number') {
    /**
   * @type {null}
   */
    // @ts-ignore
    request.session.user_id = null;
    return reply.status(200).send(request.session);
  }
  return reply.status(400).send(request.session);
});



process.nextTick(async () => {
  try {
    await app.listen(3001);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
});
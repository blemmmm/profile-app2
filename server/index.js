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
      <script src="https://code.iconify.design/2/2.1.0/iconify.min.js"></script>
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
app.get('/*', async (request, reply) => {
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

// @ts-ignore
app.get('/session', async (request, reply) => {

  if (typeof request.session.user_id === 'number') {
    /**
   * @type {number}
   */
    // @ts-ignore
    const id = request.session.user_id;

    const [user] = await sql`
    SELECT * FROM "users", "profile"
    WHERE users.id = ${id};


  `;

    if (user instanceof Object) {
    /**
   * @type {string}
   */
      // @ts-ignore
      return reply.status(200).send(user);
    }
  }

  return reply.status(200).send(null);
});


app.post('/sign-up', async (request, reply) => {
  /**
   * @type {string}
   */
  // @ts-ignore
  const username = request.body.username;
  assert(typeof username === 'string');

  const [existing_user_from_username] = await sql`
    SELECT "username" FROM "users"
    WHERE "username" = ${username};
  `;

  /**
   * @type {string}
   */
  // @ts-ignore
  const email = request.body.email;
  assert(typeof username === 'string');

  const [existing_user_from_email] = await sql`
    SELECT "email" FROM "users"
    WHERE "email" = ${email};
  `;

  if (existing_user_from_username instanceof Object) {
    return reply.status(400).send({
      message: 'Username already exists.',
    });
  } else if (existing_user_from_email instanceof Object) {
    return reply.status(400).send({
      message: 'Email already exists.',
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


    await sql `INSERT INTO "users" (name, email, username, password, user_role, user_created)
    VALUES (${name}, ${user_email}, ${user_name}, ${password}, ${user_type}, ${Date.now()}); `;


    return reply.status(200).send({ message: 'You have created your account.' });
  }


});


app.post('/sign-in', async (request, reply) => {

  const response = { user: null, message: null };
  /**
   * @type {string}
   */
  // @ts-ignore
  if (typeof request.session.user_id === 'number') {
    response.message = 'Already logged-in.';
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
    console.log(response);
    return reply.status(200).send(response);
  }

  response.message = 'Authentication failed.';
  return reply.status(400).send(response);
});

app.post('/edit', async (request, reply) => {
  /**
   * @type {string}
   */
  // @ts-ignore
  const username = request.body.username;
  const name = request.body.name;
  const bio = request.body.bio;
  const about_me = request.body.about_me;
  const favorites = request.body.favorites;


  if (typeof request.session.user_id === 'number') {
    /**
   * @type {number}
   */
    // @ts-ignore
    const user_id = request.session.user_id;

    console.log('BIO', bio);

    await sql `UPDATE "profile" 
    SET time_updated = ${Date.now()}, 
    bio = ${bio}, 
    about_me = ${about_me}, 
    favorites = ${favorites} 
    WHERE user_id = ${user_id}`;

    return reply.status(200).send({ message: 'Profile Updated.' });
  }





  return reply.status(200).send({ message: 'Profile Updated.' });

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
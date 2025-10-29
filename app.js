import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminJSExpress from '@adminjs/express';
import { connectDatabase } from './src/config/database.js';
import { createAdminJS, Components } from './src/admin/adminjs.config.js';
import { authenticate } from './src/middleware/auth.middleware.js';
import { config } from './src/config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  await connectDatabase();

  const adminJs = createAdminJS();

  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24
    }
  }));

  const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookiePassword: config.cookieSecret,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
    },
    {
      loginPath: '/admin/login',
      logoutPath: '/admin/logout',
      rootPath: '/admin',
    },
    Components.CustomLogin  
  );

  app.get('/admin', (req, res) => {
    if (req.session.adminUser) {
      res.redirect('/admin/resources/User');
    } else {
      res.redirect('/admin/login');
    }
  });

  app.use(adminJs.options.rootPath, router);

  app.listen(config.port, () => {
    console.log(`Admin Dashboard: http://localhost:${config.port}/admin`);
    console.log(`Email: ${config.adminEmail}`);
  });
};

startServer().catch(console.error);
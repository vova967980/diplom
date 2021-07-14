const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 3001;
const router = require('./server/router');
const bodyParser = require('body-parser');
const db = require('./server/models');
const AdminBro = require('admin-bro');
const AdminBroSequelize = require('@admin-bro/sequelize');
const AdminBroExpress = require('@admin-bro/express');
const cors = require('cors');
const morgan = require('morgan');

AdminBro.registerAdapter(AdminBroSequelize);
const adminConfig = new AdminBro({
    databases: [db],
    rootPath: '/admin',
    resources:[
        {
            resource: db.Firms,
            options: {
                properties: {
                    firmName: {
                        isTitle: true,
                    }
                }
            }
        },
        {
            resource: db.Categories,
            options: {
                properties: {
                    categoryName: {
                        isTitle: true,
                    }
                }
            }
        },
        {
            resource: db.Characteristics,
            options: {
                properties: {
                    characteristicName: {
                        isTitle: true,
                    }
                }
            }
        },
        {
            resource: db.Products,
            options: {
                properties: {
                    productName: {
                        isTitle: true,
                    }
                }
            }
        },
    ],
    branding: {
        logo: '',
        companyName: 'Sirenko admin panel'
    }
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.ADMIN_EMAIL || 'adminadmin',
};

const routerAB = AdminBroExpress.buildAuthenticatedRouter(adminConfig, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'what',
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'sdfwrsjh73y91491428798174ibiBFEBSFJHBWEjebGRBJRESB',
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    }
});

app.use(cors());
app.use(adminConfig.options.rootPath, routerAB);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(router);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

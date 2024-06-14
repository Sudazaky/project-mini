const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

const database = require('./config/database.js');

const route = require('./routes/client/index.route');
const routeAmin = require('./routes/admin/index.route');

const systemConfig = require('./config/system.js');

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Flash
app.use(cookieParser('qsfsbatnsifkapx'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug'); 

app.locals.prefixAdmin = systemConfig.prefixAdmin; 

app.use(express.static(`${__dirname}/public`));

route(app);
routeAmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
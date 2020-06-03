import express from 'express'; //when have triple dot, that is, because don't have type for this import;
import routes from './routes';
import path from 'path';

const app = express();
app.use(express.json());
app.use(routes);

app.use( '/uploads', express.static( path.resolve( __dirname, '..', 'uploads') ) );

app.listen(3333);
import express, {Request, Response} from 'express';
import categoriesRouter from './routes/v1/categories.route';
import brandsRouter from './routes/v1/brands.route';
import staffsRouter from './routes/v1/staffs.route';
import customersRouter from './routes/v1/customers.route';
import productsRouter from './routes/v1/products.route'
import ordersRouter from './routes/v1/orders.route'
import queriesRouter from './routes/v1/queries.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** -----------------|| BEGIN REGISTER ROUTES || --------------* */

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!ENV');
});
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', categoriesRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', brandsRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', staffsRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', customersRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', productsRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', ordersRouter);
//Đăng ký 1 route từ file bên ngoài
app.use('/api/v1', queriesRouter);

/** -----------------|| END REGISTER ROUTES || --------------* */

/** -----------------|| BEGIN HANDLE ERRORS || --------------* */
// catch 404 and forward to error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message
  });
});

/** -----------------|| END HANDLE ERRORS || --------------* */


export default app;
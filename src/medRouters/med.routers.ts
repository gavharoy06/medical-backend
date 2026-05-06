import { Router } from 'express';
import { docRouter } from '../modules/doctors/doctors.router';
import { cashierRouter } from '../modules/cashier/cashier.router';
import { authRouter } from '../modules/auth/auth.router';


const medRouter = Router();

medRouter.use(authRouter);
medRouter.use(docRouter);
medRouter.use(cashierRouter);

export default medRouter;

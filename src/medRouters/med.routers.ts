import { Router } from 'express';
import { docRouter } from '../modules/doctors/doctors.router';
import { cashierRouter } from '../modules/cashier/cashier.router';
import { authRouter } from '../modules/auth/auth.router';
import { patientsRouter } from '../modules/patients/patients.router';
import { usersRouter } from '../modules/users/users.router';


const medRouter = Router();

medRouter.use(authRouter);
medRouter.use(docRouter);
medRouter.use(cashierRouter);
medRouter.use('/users',usersRouter);
medRouter.use('/patient',patientsRouter);

export default medRouter;
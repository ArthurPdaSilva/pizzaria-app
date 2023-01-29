import { Router } from 'express';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { AuthUserController } from './controllers/user/AuthUserController';

import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuth } from './middlewares/isAuth';

const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuth, new DetailUserController().handle)

//-- ROTAS CATEGORY --
router.post('/category', isAuth, new CreateCategoryController().handle)
router.get('/categories', isAuth, new ListCategoryController().handle)

//-- ROTAS PRODUCT --
router.post('/product', isAuth, new CreateProductController().handle)

export { router }; 
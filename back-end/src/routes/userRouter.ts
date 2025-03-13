import {Router} from "express";
import {UserController} from "../controller/userController";
import { ApiPath } from "../const/ApiPath";

const router = Router();

router.post(ApiPath.CREATE_USER, UserController.createUser);
router.post(ApiPath.UPDATE_USER, UserController.updateUser);
router.post(ApiPath.GET_ALL_USERS, UserController.getAllUsers);
router.post(ApiPath.DELETE_USER, UserController.deleteUser);
router.post(ApiPath.GET_USER_BY_ID, UserController.getUserById);


export default router;
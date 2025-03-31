import { Request, Response } from "express";
import { User } from "../entity/User";
import { UserService } from "../services/userService";
import { AppDataSource } from "../config/database";
import { UserDTO } from "../dto/UserDTO";

export class UserController {
    private userService: UserService;

    constructor() {
        AppDataSource.then(dataSource => {
            this.userService = new UserService(User, dataSource);
        });
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userDTO: UserDTO = req.body;
            const user = await this.userService.createUser(userDTO);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.findById(parseInt(req.params.id));
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userDTO: UserDTO = req.body;
            const updatedUser = await this.userService.update(parseInt(req.params.id), userDTO);
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const isDeleted = await this.userService.delete(parseInt(req.params.id));
            if (!isDeleted) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
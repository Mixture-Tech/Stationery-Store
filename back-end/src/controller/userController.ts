import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserDTO } from "../dto/UserDTO";

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try{
            const userDTO: UserDTO = req.body;
            const user = await new UserService().createUser(userDTO);
            res.status(201).json(user);
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        try{
            const user = await new UserService().getAllUsers();
            res.status(200).json(user);
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    
    static async getUserById(req: Request, res: Response) : Promise<void> {
        try{
            const user = await new UserService().getUserById(parseInt(req.params.id));
            if(!user){
                res.status(404).json({messsage: "User not found"});
                return;
            }
            res.status(200).json(user)
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    
    static async updateUser(req: Request, res: Response) : Promise<void> {
        try{
    
            const userDTO: UserDTO = req.body;
            const updateUser = await new UserService().update(parseInt(req.params.id), userDTO);
            if(!updateUser){
                res.status(404).json({messsage: "User not found"});
                return;
            }
            res.status(200).json(updateUser);
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    
    static async deleteUser(req: Request, res: Response) : Promise<void> {
        try{
            const isDeleted = await new UserService().delete(parseInt(req.params.id));
            if(!isDeleted){
                res.status(404).json({messsage: "User not found"});
                return
            }
            res.status(200).json(isDeleted);
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    
    
    
    
}
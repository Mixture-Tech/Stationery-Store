import { User } from "../entity/User";
import { UserDTO } from "../dto/userDTO";
import { BaseService } from "./BaseService";
import { AppDataSource } from "../config/database";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { EmailService } from "./EmailService";
import { OTP } from "../entity/OTP";
import { MoreThan } from "typeorm";
import axios from "axios";

const JWT_SECRET = "Mixture-Tech";
const JWT_EXPIRES_IN = "24h";
const GOOGLE_CLIENT_ID = '818468765767-sseug680gf9t0nfn67rq5hgfd6t0trlj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/api/v1/auth/google/callback';

export class AuthService extends BaseService<User, UserDTO> {
    private static instance: AuthService;
    private otpRepository: any;
    private emailService: EmailService;

    private constructor(dataSource: any) {
        super(User, dataSource);
        this.otpRepository = dataSource.getRepository(OTP);
        this.emailService = EmailService.getInstance();
    }

    public static async getInstance(): Promise<AuthService> {
        if (!AuthService.instance) {
            const dataSource = await AppDataSource;
            AuthService.instance = new AuthService(dataSource);
        }
        return AuthService.instance;
    }

    private generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    public async login(email: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const user = await this.repository.findOne({
                where: { email },
                relations: ["role"]
            });

            if (!user) {
                throw new Error("Email hoặc mật khẩu không chính xác");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Email hoặc mật khẩu không chính xác");
            }

            if (!user.is_email_verified) {
                throw new Error("Vui lòng xác thực email trước khi đăng nhập");
            }

            // Tạo token khi đăng nhập thành công
            const token = jwt.sign(
                { 
                    id_user: user.id_user,
                    email: user.email,
                    role: user.role.name
                },
                JWT_SECRET,
                { expiresIn: "1d" }
            );

            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    public async register(userDTO: UserDTO): Promise<{ user: User }> {
        try {
            if (!userDTO.email || !userDTO.password) {
                throw new Error("Email và mật khẩu là bắt buộc");
            }

            // Kiểm tra email đã tồn tại chưa
            const existingUser = await this.repository.findOne({
                where: { email: userDTO.email }
            });

            if (existingUser) {
                throw new Error("Email đã được sử dụng");
            }

            // Tạo mã OTP
            const otp = this.generateOTP();
            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP hết hạn sau 5 phút

            // Lấy id_user lớn nhất hiện tại
            const maxId = await this.repository
                .createQueryBuilder("user")
                .select("MAX(user.id_user)", "maxId")
                .getRawOne();

            const nextId = (maxId?.maxId || 0) + 1;

            // Tạo user mới và lưu vào database
            const user = new User();
            user.id_user = nextId;
            user.email = userDTO.email;
            user.password = await bcrypt.hash(userDTO.password, 10);
            user.id_role = 1; // Mặc định là customer
            user.hide = false;
            user.user_name = userDTO.email.split("@")[0];
            user.otp = otp;
            user.otp_expiry = otpExpiry;
            user.is_email_verified = false;

            // Lưu user vào database
            await this.repository.save(user);

            // Gửi email xác thực
            await this.emailService.sendVerificationEmail(user.email, otp);

            return { user };
        } catch (error) {
            throw error;
        }
    }

    public async verifyOTP(email: string, otp: string): Promise<void> {
        try {
            // Tìm user theo email
            const user = await this.repository.findOne({
                where: { email }
            });

            if (!user) {
                throw new Error("Không tìm thấy người dùng");
            }

            // Kiểm tra OTP
            if (user.otp !== otp) {
                throw new Error("Mã OTP không chính xác");
            }

            // Kiểm tra thời gian hết hạn của OTP
            if (user.otp_expiry && user.otp_expiry < new Date()) {
                throw new Error("Mã OTP đã hết hạn");
            }

            // Cập nhật trạng thái xác thực và lưu user vào database
            user.is_email_verified = true;
            user.otp = ""; // Thay vì null, sử dụng chuỗi rỗng
            user.otp_expiry = new Date(); // Thay vì null, sử dụng ngày hiện tại
            await this.repository.save(user);
        } catch (error) {
            throw error;
        }
    }

    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.repository.findOne({ where: { id_user: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid old password");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.repository.save(user);
    }

    async resetPassword(email: string): Promise<void> {
        const user = await this.repository.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.repository.save(user);

        // TODO: Send email with new password
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
            const user = await this.repository.findOne({ where: { id_user: decoded.id } });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    async logout(token: string): Promise<void> {
        try {
            // Verify token trước khi logout
            await this.verifyToken(token);
            // Trong trường hợp này, chúng ta chỉ cần verify token
            // Vì JWT không cần phải invalidate token ở phía server
            // Token sẽ tự động hết hạn sau thời gian JWT_EXPIRES_IN
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    // Hàm tạo URL để redirect người dùng đến Google Login
    public getGoogleAuthURL(): string {
        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const options = {
            redirect_uri: GOOGLE_REDIRECT_URI as string,
            client_id: GOOGLE_CLIENT_ID as string,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ].join(" "),
        };

        const qs = new URLSearchParams(options);
        return `${rootUrl}?${qs.toString()}`;
    }


    public async googleLogin(code: string): Promise<{ user: User; token: string }> {
        try {
            // Lấy access token từ Google
            const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            });
    
            const { access_token } = tokenResponse.data;
    
            // Lấy thông tin user từ Google
            const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
    
            const googleUser = userResponse.data;
            const email = googleUser.email;
            const userName = email.split("@")[0]; // Bạn đã sửa đúng ở đây
    
            // Kiểm tra user đã tồn tại chưa
            let user = await this.repository.findOne({
                where: { email },
                relations: ["role"], // Load quan hệ role để đảm bảo user.role không undefined
            });
    
            if (!user) {
                // Tạo user mới nếu chưa tồn tại
                const maxId = await this.repository
                    .createQueryBuilder("user")
                    .select("MAX(user.id_user)", "maxId")
                    .getRawOne();
    
                const nextId = (maxId?.maxId || 0) + 1;
    
                user = new User();
                user.id_user = nextId;
                user.email = email;
                user.user_name = userName;
                user.id_role = 1; // Mặc định role là customer
                user.is_email_verified = true; // Google đã xác thực email
                user.hide = false;
    
                // Lưu user vào database
                await this.repository.save(user);
    
                // Load lại user với quan hệ role sau khi lưu
                user = await this.repository.findOne({
                    where: { id_user: user.id_user },
                    relations: ["role"],
                });
            }
    
            // Kiểm tra user.role trước khi tạo token
            if (!user || !user.role) {
                throw new Error("Không tìm thấy role cho user");
            }
    
            // Tạo JWT token
            const token = jwt.sign(
                {
                    id_user: user.id_user,
                    email: user.email,
                    role: user.role.name, // Đảm bảo user.role.name tồn tại
                },
                JWT_SECRET,
                { expiresIn: "1d" }
            );
    
            return { user, token };
        } catch (error) {
            if (error) {
                if (error && (error as any).response && (error as any).response.data) {
                    console.error("Google API Error Response:", (error as any).response.data);
                }
                if (error && (error as any).response && (error as any).response.data) {
                    throw new Error(`Google API Error: ${(error as any).response.data.error_description || "Unknown error"}`);
                } else {
                    throw new Error("Google API Error: Unknown error");
                }
            } else {
                console.error("Google login error:", error);
                throw new Error("Đăng nhập bằng Google thất bại: " + error);
            }
        }
    }
} 
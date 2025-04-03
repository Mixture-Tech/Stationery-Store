import { sendEmail } from '../config/Email';

export class EmailService {
    private static instance: EmailService;

    private constructor() {}

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    async sendVerificationEmail(email: string, otp: string): Promise<void> {
        const subject = 'Xác thực tài khoản của bạn';
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Xác thực tài khoản</h2>
                <p>Xin chào,</p>
                <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng sử dụng mã OTP sau để xác thực tài khoản của bạn:</p>
                <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
                    ${otp}
                </div>
                <p>Mã OTP này sẽ hết hạn sau 5 phút.</p>
                <p>Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email này.</p>
            </div>
        `;

        await sendEmail(email, subject, html);
    }

    async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
        const subject = 'Đặt lại mật khẩu';
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Đặt lại mật khẩu</h2>
                <p>Xin chào,</p>
                <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu của bạn:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Đặt lại mật khẩu
                    </a>
                </div>
                <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
                <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
        `;

        await sendEmail(email, subject, html);
    }
} 
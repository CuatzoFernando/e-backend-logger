import { JsonWebTokenError, NotBeforeError, TokenExpiredError, sign, verify } from "jsonwebtoken"
import { getAuthorizationByToken } from "../services/authorization.service"
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101"

const generateToken = async (text: string) => {
	return sign({ text }, JWT_SECRET, {
		expiresIn: "2h",
	})
}

const verifyToken = async (jwtToken: string): Promise<boolean> => {
    try {
        const decoded = await new Promise<any>((resolve, reject) => {
            verify(jwtToken, JWT_SECRET, (err, decode) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decode);
                }
            });
        });

        return true;
    } catch (error) {
        return false;
    }
};

export { generateToken, verifyToken }

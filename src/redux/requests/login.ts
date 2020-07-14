import axios from "axios";

interface loginResponse {
    data: object;
}
export interface requstData {
    verificationCode: number,
    login: string
}

export const loginRequest = async ({ verificationCode, login }: requstData): Promise<loginResponse> =>
    await axios.post(`http://localhost:8081/api/checkVerificationCode`, { verificationCode, login });
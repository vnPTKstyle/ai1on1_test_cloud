import { Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
export type JwtPayload = {
    sub: number;
    email: string;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload): Promise<import("../../user/user.entity").User>;
}
export {};

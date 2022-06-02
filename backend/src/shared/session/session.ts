import { verify } from "jsonwebtoken";
import { validate } from "uuid";

import authConfig from "@config/auth";

const getUserIdFromToken = (token: string): string => {
    let user_id;
    verify(token, authConfig.secret, (err, decoded) => {
        if (err || !decoded) {
            return;
        }
        user_id = decoded.sub;
    });

    if (!user_id || !validate(user_id)) {
        return "";
    }
    return user_id;
};

export default getUserIdFromToken;

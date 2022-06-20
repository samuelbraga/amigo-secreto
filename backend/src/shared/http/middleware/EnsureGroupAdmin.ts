import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import * as messages from "@constants/messages";
import IsGroupUserAdmin from "@domain/group/services/IsGroupUserAdmin";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

export default async (
    request: Request,
    _response: Response,
    next: NextFunction
): Promise<void> => {
    const isGroupUserAdmin = container.resolve(IsGroupUserAdmin);

    const userId = request.user.id;
    const groupId = request.params.id;

    const isAdmin = await isGroupUserAdmin.execute(userId, groupId);

    if (!isAdmin) {
        throw new ExceptionBase(
            messages.USER_UNAUTHORIZED_TYPE,
            messages.USER_UNAUTHORIZED_TITLE,
            HttpStatus.UNAUTHORIZED,
            messages.USER_UNAUTHORIZED_DETAIL,
            messages.USER_UNAUTHORIZED_INSTANCE
        );
    } else {
        next()
    }
};

import { sign } from 'jsonwebtoken';

import ExceptionBase from "@shared/exceptions/ExceptionBase";
import { inject, injectable } from "tsyringe";
import HttpStatus from 'http-status-codes';
import ICreateSessionRequest from "../http/dtos/ICreateSessionRequest";
import ISessionResponse from "../http/dtos/ISessionResponse";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import IUserRepository from "../repositories/IUserRepository";
import { User } from "@prisma/client";

import authConfig from '@config/auth';
import { fromUser } from '../mapper/MappingUser';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: ICreateSessionRequest): Promise<ISessionResponse> {
    const user = await this.verifyEmailExist(email);

    await this.verifyPasswordIsCorrect(password, user.password);

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userResponse = fromUser(user);

    return { user: userResponse, token };
  }

  private async verifyEmailExist(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ExceptionBase(
        HttpStatus.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    return user;
  }

  private async verifyPasswordIsCorrect(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userPassword,
    );

    if (!passwordMatched) {
      throw new ExceptionBase(
        HttpStatus.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    return passwordMatched;
  }
}

export default CreateSessionService;

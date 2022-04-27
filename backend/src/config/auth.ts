interface IAuthConfig {
    secret: string;
    expiresIn: string;
  }
  
  export default {
    secret: `${process.env.JWT_SECRET}`,
    expiresIn: '1d',
  } as IAuthConfig;
import ISendMail from '@shared/container/providers/mailProvider/dtos/ISendMail';

export default interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
import IParseMailTemplate from '@shared/container/providers/mailTemplateProvider/dtos/IParseMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
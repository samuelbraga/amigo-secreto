
  
import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/mailProvider/implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider)
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
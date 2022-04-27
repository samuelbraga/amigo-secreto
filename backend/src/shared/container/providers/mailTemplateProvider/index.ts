import { container } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
  handleBars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handleBars,
);
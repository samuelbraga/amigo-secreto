import { MAIL_TEMPLATE_PROVIDER } from "constants/application";
import { container } from "tsyringe";

import HandlebarsMailTemplateProvider from "@shared/container/providers/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider";

const providers = {
    handleBars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    MAIL_TEMPLATE_PROVIDER,
    providers.handleBars
);

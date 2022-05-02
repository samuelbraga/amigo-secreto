import { container } from "tsyringe";

import HandlebarsMailTemplateProvider from "@shared/container/providers/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider";

const providers = {
    handleBars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    "MailTemplateProvider",
    providers.handleBars
);

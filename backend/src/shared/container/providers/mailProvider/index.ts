import { container } from "tsyringe";

import mailConfig from "@config/mail";
import { MAIL_PROVIDER } from "@constants/application";
import EtherealMailProvider from "@shared/container/providers/mailProvider/implementations/EtherealMailProvider";
import IMailProvider from "@shared/container/providers/mailProvider/models/IMailProvider";

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
    MAIL_PROVIDER,
    providers[mailConfig.driver]
);

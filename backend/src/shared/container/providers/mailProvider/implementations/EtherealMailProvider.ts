import nodemailer, { Transporter } from "nodemailer";
import { injectable, inject } from "tsyringe";

import ISendMail from "@shared/container/providers/mailProvider/dtos/ISendMail";
import IMailProvider from "@shared/container/providers/mailProvider/models/IMailProvider";
import IMailTemplateProvider from "@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || "Equipe Amigo Oculto",
                address: from?.email || "equipe@amigooculto.com.br",
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        // eslint-disable-next-line no-console
        console.log("Message sent: %s", message.messageId);
        // eslint-disable-next-line no-console
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;

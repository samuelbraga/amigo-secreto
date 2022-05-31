import IParseMailTemplate from "@shared/container/providers/mailTemplateProvider/dtos/IParseMailTemplate";

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplate): Promise<string>;
}

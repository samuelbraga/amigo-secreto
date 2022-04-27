import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplate from '@shared/container/providers/mailTemplateProvider/dtos/IParseMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
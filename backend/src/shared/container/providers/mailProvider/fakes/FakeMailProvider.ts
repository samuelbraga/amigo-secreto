import ISendMail from "../dtos/ISendMail";
import IMailProvider from "../models/IMailProvider";

class FakeMailProvider implements IMailProvider {
    private messages: ISendMail[] = [];

    public async sendMail(data: ISendMail): Promise<void> {
        this.messages.push(data);
    }
}

export default FakeMailProvider;

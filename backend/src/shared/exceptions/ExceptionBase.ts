class ExceptionBase extends Error {
    public type: string;
    public title: string;
    public statusCode: number;
    public detail: string;
    public instance: string;

    constructor(
        type: string,
        title: string,
        status: number,
        detail: string,
        instance: string
    ) {
        super();
        this.type = type;
        this.title = title;
        this.statusCode = status;
        this.detail = detail;
        this.instance = instance;
    }
}

export default ExceptionBase;

class ExceptionBase extends Error {
    public statusCode: number;
  
    constructor(status: number, message: string) {
      super();
      this.statusCode = status;
      this.message = message;
    }
  }
  
  export default ExceptionBase;
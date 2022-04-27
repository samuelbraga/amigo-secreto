interface IMailConfig {
    driver: 'ethereal';
    defaults: {
      from: {
        email: string;
        name: string;
      };
    };
  }
  
  export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
      from: {
        email: 'equipe@amigooculto.com.br',
        name: 'Equipe Amigo Oculto',
      },
    },
  } as IMailConfig;
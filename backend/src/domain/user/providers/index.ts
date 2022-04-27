import { container } from 'tsyringe';

import IHashProvider from '@domain/user/providers/hashProvider/models/IHashProvider';
import BCryptHashProvider from '@domain/user/providers/hashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
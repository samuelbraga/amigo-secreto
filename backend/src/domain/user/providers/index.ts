import { container } from "tsyringe";

import { HASH_PROVIDER } from "@constants/application";
import BCryptHashProvider from "@domain/user/providers/hashProvider/implementations/BCryptHashProvider";
import IHashProvider from "@domain/user/providers/hashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>(HASH_PROVIDER, BCryptHashProvider);

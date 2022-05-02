import { container } from "tsyringe";

import BCryptHashProvider from "@domain/user/providers/hashProvider/implementations/BCryptHashProvider";
import IHashProvider from "@domain/user/providers/hashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);

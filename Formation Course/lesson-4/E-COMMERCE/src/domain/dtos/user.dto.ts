import { AdressDto } from "./address.dto";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  adresses: AdressDto[];
}

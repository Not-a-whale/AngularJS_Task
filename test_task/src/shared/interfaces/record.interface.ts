import {UserTypeEnum} from "../enums/user-type.enum";

export interface IRecord {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: UserTypeEnum;
}

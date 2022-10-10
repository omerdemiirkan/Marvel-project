import {ResultModel} from "./resultModel";

export interface UserLoginResponse extends ResultModel {
  access_token: string;
}

import {Role} from "./role";

export interface RolePrivileges{
  id: {
    roleId: Role,
    rightsId: string
  },
}

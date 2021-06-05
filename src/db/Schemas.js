export const permissionSchema = {
  name: 'Permission',
  properties: {
    value:'string',
  }
};
export const UserSchema = {
  name: "User",
  properties: {
    id: "int",
    first_name: "string",
    last_name: "string",
    username: "string",
    email: "string?",
    is_active: "bool?",
    date_joined: "date",
    avatar: "string?",
    access_to_all_farms: "bool?",
    role: "string?",
    permissions: "string[]"
  },
};



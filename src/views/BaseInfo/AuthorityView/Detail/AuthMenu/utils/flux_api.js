// 该代码用于向flux层请求数据，这个层可能位于parent也可能位于本层。此处flux位于本层
export function getRoleId(that_vue) {
   // debugger;
   let role_entity= that_vue.$store.getters.USER_ROLE;
   return role_entity.role
}

<template>
  <el-dialog :fullscreen="true" :title="this.title" :visible.sync="dialogVisi" @closed="hDialogClosed">
    <avue-crud :data="roleinUserList" :option="option"></avue-crud>
  </el-dialog>
</template>
<script>
;
  export default {
     name: "user-role-dialog",
     
     props: {
        title: {
           type: String,
           default: "用户角色绑定"
        }
     },

     components: {
        
     },
     data: function() {
       
        return {
           dialogVisi: false,
           userData: {},
           roleList: [],
           roleinUserList: {},
           option: {
              title: "",
              page: false,
              align: "center",
              viewBtn: false,
              menu:false,
              addBtn: false,
              delBtn: false,
              refreshBtn:false,
              columnBtn:false,
              editBtn: false,
              menuAlign: "center",
              column: [{ type: "text", prop: "roleId", label: "角色id" }, { type: "text", prop: "roleName", label: "角色名称" }]
           }
        };
     },
     created: function() {},
     computed: {},
     methods: {
        //   打开对话框操作
        hOpenDialog(userData, roleList) {
           //   当打开此dialog的时候初始化一些数据
           this.dialogVisi = true;
           //   this.dialogUserData=data;
           this.roleList=roleList
        },
        /**
         * 关闭对话框操作
         */
        hCloseDialog() {
           this.dialogVisi = false;
        },

        hDialogClosed() {
           this.$emit("on-closed");
        }
     },

     watch: {
        initData: {
           deep: true,
           hr: function(newval, oldval) {
              this.dialogUserData = newval;
           }
        }
     }
  };
</script>

<style scoped>
</style>
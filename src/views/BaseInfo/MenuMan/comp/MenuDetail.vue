<template>
  <el-dialog :title="this.title" :visible.sync="dialogVisi" @closed="handleDialogClosed">
    <!--  :before-close="handleDialogClosed" 这是关闭操作前的函数，这个函数会替代关闭操作。如果在这个操作中不关闭dialog，则这个dialog无法被关闭 -->
    <!-- @closed="handleDialogClosed" 这是关闭执行完后的操作，这个操作不会替换关闭函数，不需要在操作中关闭dialog -->
    <build-form
      init-size="small"
      :grow="1"
      :form_array="menuDetailSet"
      :sync_data.sync="dialogMenuData"
    >
      <template slot="parent-id-append">
        <menu-select-pop v-if="calcShowParentSelect" @btn-select-confirm="handleParentConfirm"/>
      </template>
    </build-form>
    <div class="button-group flex-md">
      <template v-for="item in actArr">
        <button
          :key="item.code"
          v-if="calcShowBtn(item.code)"
          @click="handleConfirmAction(item.code)"
          :class="item.btn_class"
        >{{item.title}}</button>
      </template>
    </div>
  </el-dialog>
</template>
<script>
  import BuildForm from "@/components/BuildForm/main";
  import { list_to_tree } from "@/utils/tree_convert";
  import MenuSelectPop from "./MenuSelectPop";
    import menuEntity from "../utils/menu_entity";
  import actDef from "../utils/menuActionDefine";
  import { DelMenu, EditMenu, AddMenu, MenuListTree, MenuList } from "../utils/CRUD";
  export default {
     name: "menu-detail",
     components: { BuildForm, MenuSelectPop },
     props: {
        title: {
           type: String,
           default: "详情"
        }
     },
     data: function() {
        let actArr = [actDef.Add, actDef.AddChild, actDef.Edit, actDef.Del];
        actArr.push({ code: "cancel", title: "取消", btn_class: "button button-small " });
        return {
           dialogVisi: false,
           menuDetailSet: [],
           dialogMenuData: {},
           detailType: "",
           actArr
        };
     },
     created: function() {
        let that_vue = this;
     },
     mounted: function() {},
     computed: {
        // 当打开dialog时，要根据props重新刷新表单的参数。因为props的改变不会

        //是否显示父项选择按钮
        calcShowParentSelect() {
           return this.detailType != actDef.Del.code;
        }
     },
     methods: {
        clacMenuDetailSet() {
           let tmp_arr = JSON.parse(JSON.stringify(menuEntity)).select(x => {
              x.readonly = false;
              return x;
           });
           if (this.detailType == actDef.Del.code) {
              tmp_arr = tmp_arr.select(x => {
                 x.readonly = true;
                 return x;
              });
           }
           return tmp_arr;
        },
        calcInitMenuData(code, data) {
           let tmp_menu_data = JSON.parse(JSON.stringify(data));
           if (code == actDef.AddChild.code) {
              tmp_menu_data.parentCode = data.menuCode;
              tmp_menu_data.parent_name = data.name;
              tmp_menu_data.menuCode = null;
              tmp_menu_data.name = "";
              tmp_menu_data.url = "";
              tmp_menu_data.icon = "";
           }
           //当添加同级时列表初始化情况
           if (code == actDef.Add.code) {
              tmp_menu_data = tmp_menu_data;
              tmp_menu_data.menuCode = null;
              tmp_menu_data.name = "";
              tmp_menu_data.url = "";
              tmp_menu_data.icon = "";
           }
           // 当删除元素时列表初始化情况
           if (code == actDef.Del.code) {
           }
           // 当修改元素时列表初始化情况
           if (code == actDef.Edit.code) {
           }
           return tmp_menu_data;
        },
        // 提供是否显示按钮的返回结果
        calcShowBtn(act) {
           return act == "cancel" || act == this.detailType;
        },
        //   打开对话框操作
        handleOpenDialog(code, data) {
           //   当打开此dialog的时候初始化一些数据
           this.dialogVisi = true;
           this.detailType = code;
           //   注意，这里设定了打开dialog的时候强制刷新data，防止data加载时
           this.menuDetailSet = this.clacMenuDetailSet(code);
           this.dialogMenuData = this.calcInitMenuData(code, data);
        },
        handleCloseDialog() {
           this.dialogVisi = false;
        },
        handleDialogClosed() {
           this.dialogMenuData = {};
           this.$emit("on-closed");
           //   this.dialogVisi = false;
        },

        handleParentConfirm(data) {
           //   debugger;
           let that_vue = this;
           that_vue.dialogMenuData.parent_name = data.name;
           that_vue.dialogMenuData.parentCode = data.id;
        },
        // 多个action处理办法
        handleConfirmAction(act) {
           let that_vue = this;
           switch (act) {
              case actDef.Add.code:
                 this.handleConfirmAddMenu();
                 break;
              case actDef.AddChild.code:
                 this.handleConfirmAddMenu();
                 break;
              case actDef.Edit.code:
                 this.handleConfirmEditMenu();
                 break;
              case actDef.Del.code:
                 this.handleConfirmDelMenu();
                 break;
              case "cancel":
                 this.handleCancel();
                 break;
              default:
                 this.handleCancel();
                 break;
           }
        },
        handleConfirmAddMenu() {
           AddMenu(this, this.dialogMenuData);
        },
        handleConfirmEditMenu() {
           EditMenu(this, this.dialogMenuData);
        },
        handleConfirmDelMenu() {
           DelMenu(this, this.dialogMenuData);
        },
        handleCancel() {
           this.handleCloseDialog();
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>
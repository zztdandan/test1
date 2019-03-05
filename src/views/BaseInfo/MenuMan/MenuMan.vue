<template>
  <lg-dashboard>
    <h2 class="dash-title-center">菜单管理</h2>
    <hr style="margin-top:0.5rem">
    <div class="flex-column">
      <div class="pd-3 flex-item-8 main-height">
        <lg-dashboard class="hg-100">
          <!-- 加载菜单树 -->
          <el-tree
            ref="menu-tree"
            :default-expand-all="true"
            :data="menuTree"
            @node-click="handleNodeClick"
          ></el-tree>
        </lg-dashboard>
      </div>
      <div class="pd-3 flex-item-16 main-height">
        <lg-dashboard class="hg-100">
          <template slot="title">
            <div class="dash-title-center">菜单项详情</div>
          </template>
          <lg-build-form
            init-size="small"
            :grow="1"
            :form_array="menuNodeArray"
            :sync_data.sync="menuNodeData"
          ></lg-build-form>
          <div class="button-group flex-md" v-if="calcShowBtnGroup">
            <button
              v-for="item in actArr"
              :key="item.code"
              
              @click="handleNodeAction(item.code)"
              :class="item.btn_class"
            >{{item.title}}</button>
          </div>
        </lg-dashboard>
      </div>
      <menu-detail
        ref="menu-detail"
        :detail-type="menuDetailType"
        :init-menu-data="menuNodeData"
        :title="menuDetailTitle"
        @on-closed="handleDialogClosed"
      ></menu-detail>
    </div>
  </lg-dashboard>
</template>
<script>
  import global_config from "@/global_config";
  import LgDashboard from "@/components/LgDashboard/main";
  import MenuDetail from "./comp/MenuDetail";
//   import BuildForm from "@/components/BuildForm/main";
  import { list_to_tree } from "@/utils/tree_convert";
  import menuEntity from "./utils/menu_entity";
  import actDef from "./utils/menuActionDefine";
  import { DelMenu, EditMenu, AddMenu, MenuListTree, MenuList } from "./utils/CRUD";
  export default {
     name: "menuman",
     components: {
        LgDashboard,
        MenuDetail,
      //   BuildForm
     },
     data: function() {
        //  将actDef转化为数组

        return {
           hasChangedFlag: false,
           menuTree: [],
           menuNodeData: {},
           menuNodeArray: menuEntity,
           // 设定此处的操作为全部操作
           actArr: [actDef.Add, actDef.AddChild, actDef.Edit, actDef.Del],
           menuDetailType: "",
           menuDetailTitle: ""
        };
     },
     computed: {
        calcShowBtnGroup() {
           if (typeof this.menuNodeData.name != "undefined") {
              return true;
           } else {
              return false;
           }
        }
     },
     created: function() {
        //  debugger;
        let that_vue = this;

        MenuListTree(that_vue)
           .then(result => {
              that_vue.menuTree = result;
              that_vue.backTree = JSON.parse(JSON.stringify(result));
           })
           .catch(err => {
              console.log(err);
           });
     },
     methods: {
        handleNodeClick(data) {
           this.menuNodeData = data;
        },
        handleNodeAction(key) {
           //  this.menuDetailType = key;
           this.$refs["menu-detail"].handleOpenDialog(key, this.menuNodeData);
        },
        // 当对话框关闭时重新向后台请求一次menu列表
        handleDialogClosed() {
           let that_vue = this;
           this.$log("成功回调修改，加载菜单列表");
           this.hasChangedFlag = true;
           // 重新加载菜单列表
           MenuListTree(that_vue)
              .then(result => {
                 // debugger;
                 that_vue.menuTree = result;
                 that_vue.backTree = JSON.parse(JSON.stringify(result));
              })
              .catch(err => {
                 console.log(err);
              });
        }
     }
  };
</script>
<style scoped>
</style>
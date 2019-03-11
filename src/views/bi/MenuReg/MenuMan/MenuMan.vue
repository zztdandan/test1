<template>
  <lg-dashboard>
    <template slot="title">菜单管理</template>

    <div class="flex-column">
      <div class="pd-3 flex-item-8 main-height">
        <!-- 加载菜单树 -->
        <el-tree
          ref="menu-tree"
          :default-expand-all="true"
          :data="menuTree"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="pd3 flex-item-16 main-height">
        
      </div>
    </div>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import { list_to_tree } from "@/util/tree_convert";
  import menuEntity from "./utils/menuEntity";
  import * as CRUD from "./utils/CRUD";
  export default {
    name: "menu-man",
    components: {
      LgDashboard,
      MenuDetail
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
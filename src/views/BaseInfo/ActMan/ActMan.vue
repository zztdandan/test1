<template>
  <div>
    <div class="flex-column">
      <h2>功能管理</h2>
    </div>

    <hr />
    <div class="pd-3">
      <lg-build-form
        init-size="small"
        :form_array="menuHead"
        :sync_data.sync="searchData"
        @btn-search-click="handleSearch"
        @btn-add-click="handlemenuAdd"
        @btn-del-click="handlemenuDel"
      ></lg-build-form>
    </div>
    <div class="pd-3">
      <simple-table
        :init-column="menuTableColumnSet"
        :init-data="menuTableList"
        :init-page-size="0"
        @update:multi-selection="handleMultiSelection"
      >
        <template
          slot="addon"
          slot-scope="scope"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="查看"
            placement="top"
          >
            <a
              class="button button-primary button-box button-small button-inline"
              @click="handleClickmenuDetail(scope.data)"
            >
              <i class="moon-zoom-in"></i>
            </a>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
          >
            <a
              class="button button-primary button-box button-small"
              @click="handleClickmenuEdit(scope.data)"
            >
              <i class="moon-pencil"></i>
            </a>
          </el-tooltip>
        </template>

      </simple-table>

    </div>
    <div class="pd-3">
      <el-dialog
        title="用户详情查看"
        :visible.sync="menuDetailDialogVisible"
      >
        <menu-detail-view
          edit-type="view"
          :init-data="menuDetailData"
          @detail-cancel="handleCancelDialog"
        ></menu-detail-view>
      </el-dialog>
    </div>
    <el-dialog
      title="用户信息编辑"
      :visible.sync="menuEditDialogVisible"
    >
      <menu-detail-view
        edit-type="edit"
        :init-data="menuDetailData"
        @detail-cancel="handleCancelDialog"
      ></menu-detail-view>
    </el-dialog>
    <el-dialog
      title="用户信息删除"
      :visible.sync="menuDelDialogVisible"
    >
      <menu-del-view
        :init-data="menuSelection"
        @detail-cancel="handleCancelDialog"
      ></menu-del-view>
    </el-dialog>
    <el-dialog
      title="用户信息添加"
      :visible.sync="menuAddDialogVisible"
    >
      <menu-detail-view
        edit-type="add"
        :init-data="menuDetailData"
        @detail-cancel="handleCancelDialog"
      ></menu-detail-view>
    </el-dialog>
  </div>
</template>

<script>
  export default {
     name: "menu-act-man-view"
  };
</script>

<style scoped>
</style>
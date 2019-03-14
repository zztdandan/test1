export const topCrud = {
  data: function() {
    return {
      dataTList: [],
      dataSelection: [],
      crudData: {},
      crudOption: {
        size: "mini",
        refreshBtn: false,
        columnBtn: false,
        selection: true,
        actBtn: false,
        editBtn: false,
        delBtn: false,
        menu: false,
        menuAlign: "center",
        column: []
      },
      searchParams: {}
    };
  },
  created: async function() {
    const set = await this.getEntity();
    this.$set(this.crudOption, "column", set);
  },
  methods: {
    hSelectionChange(list) {
      this.dataSelection = [].concat(list);
    },
    hCloseDialog() {
      const that_vue = this;
      this.crudData = {};
    },
    hOpenUpdate() {
      if (this.dataSelection && this.dataSelection.length > 0) {
        this.$refs[this.crudCompName].rowEdit(this.dataSelection[0]);
      } else {
        this.$message("没有选择列");
      }
    },
    hOpenCpCreate() {
      if (this.dataSelection && this.dataSelection.length > 0) {
        this.$refs[this.crudCompName].rowAdd();
        this.crudData = this.dataSelection[0];
      } else {
        this.$message("没有选择列");
      }
    },
    hSave: async function(data, index, done, loading) {
      try {
        await this.createData(data);
        done();
        this.doQuery();
      } catch (error) {
        done();
        console.log(error);
      }
    },
    hUpdate: async function(data, index, done, loading) {
      try {
        await this.updateData(data);
        done();
        this.doQuery();
      } catch (error) {
        done();
        console.log(error);
      }
    },
    hDelList: async function() {
      try {
        const a = await this.$confirm("确认删除", "提示", {
          type: "warning"
        });
        await this.deleteData(this.dataSelection);
        this.hCloseDialog();
        this.doQuery();
      } catch (err) {
        this.$message({ type: "info", message: "已取消删除" });
      }
    },
    skipPage() {
      this.tablePage.total=this.totalData.length;
      this.dataTList = this.calcShownData;
    }
  }
};

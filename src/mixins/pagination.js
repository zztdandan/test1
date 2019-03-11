// 懒加载分页混入
export const pagiLazyMixin = {
   data: function() {
      return {
         tablePage: {
            pageSize: 20,
            total: 0,
            currentPage: 1
         }
      };
   },
   methods: {
      paginationSet(page_size, total, curr_page) {
         this.tablePage.pageSize = page_size || 20;
         this.tablePage.currentPage = curr_page || 1;
         this.tablePage.total = total || 0;
      },
      hSizeChange(size) {
         this.paginationSet(size, this.tablePage.total, this.tablePage.currentPage);
         this.doQuery(this.tablePage.currentPage, this.tablePage.pageSize);
      },
      hCurrentChange(curr) {
         this.paginationSet(this.tablePage.pageSize, this.tablePage.total, curr);
         this.doQuery(this.tablePage.currentPage, this.tablePage.pageSize);
      },
      hRefresh() {
         this.doQuery(this.tablePage.currentPage, this.tablePage.pageSize);
      }
   }
};

// 非懒加载页面分页混入
export const pagiMixin = {
   data: function() {
      return {
         tablePage: {
            pageSize: 20,
            total: 0,
            currentPage: 1
         },
         totalData: []
      };
   },
   computed: {
      calcShownData() {
         const that_vue = this;
         let showtable = [];
         showtable = that_vue.totalData.skip(that_vue.tablePage.pageSize * (that_vue.tablePage.currentPage - 1)).take(that_vue.tablePage.pageSize);
         return showtable;
      }
   },
   methods: {
      paginationSet(page_size, total, curr_page) {
         this.tablePage.pageSize = page_size || 20;
         this.tablePage.currentPage = curr_page || 1;
         this.tablePage.total = total || 0;
      },
      hSizeChange(size) {
         this.paginationSet(size, this.tablePage.total, this.tablePage.currentPage);
         const a = this.skipPage() || null;
         return a;
      },
      hCurrentChange(curr) {
         this.paginationSet(this.tablePage.pageSize, this.tablePage.total, curr);
         const a = this.skipPage() || null;
         return a;
      },
      hRefresh() {
         // 重新读取,页面回到1
         this.paginationSet(this.tablePage.pageSize, this.tablePage.total, 1);
         this.doQuery();
      }
   }
};

// 以pageUtils为根据的class
export const pagiClass = function(pagination_return) {
   // debugger;
   const tmp_res = {
      pageNumber: pagination_return.currPage,
      totalPage: pagination_return.totalPage,
      pageSize: pagination_return.pageSize,
      totalRow: pagination_return.totalCount,
      list: pagination_return.list,
      firstPage: pagination_return.firstPage,
      lastPage: pagination_return.lastPage,
      orderBy: pagination_return.orderBy
   };
   return tmp_res;
};

// 以pageQuery为根据的class
export const pagiClass1 = function(pagination_return) {
   const tmp_res = {
      pageNumber: pagination_return.pageNumber,
      totalPage: pagination_return.totalPage,
      pageSize: pagination_return.pageSize,
      totalRow: pagination_return.totalRow,
      list: pagination_return.list,
      firstPage: pagination_return.firstPage,
      lastPage: pagination_return.lastPage,
      orderBy: pagination_return.orderBy
   };
   return tmp_res;
};

// 传入两个分页参数的初始化类型

export const pagiPara = function(curr, size, orderby, desc) {
   let tmp_orderby = "";
   if (orderby) {
      orderby.forEach(element => {
         tmp_orderby = tmp_orderby + element + ",";
      });
   }
   tmp_orderby = tmp_orderby.substr(0, tmp_orderby.length - 1);
   if (desc) {
      tmp_orderby = tmp_orderby + " desc";
   }
   const tmp = {
      page: curr,
      limit: size,
      orderby: tmp_orderby
   };
   return tmp;
};



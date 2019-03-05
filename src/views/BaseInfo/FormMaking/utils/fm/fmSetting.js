const fmSetting = function() {
   this.textInput = function(textInputEntity) {
      if (textInputEntity) {
         return textInputEntity;
      } else {
         const tmp = {
            type: "", // 表示输入类型
            name: "单行文本", // 表示表单解释
            icon: "icon-input", // 无用字段
            options: {
               width: 12, // 宽度，在avue里面可以设置，数字是1~24中的一个
               defaultValue: "dsgfgd", // 默认值
               required: true, // 是否必须
               dataType: "url", // 检测方式
               pattern: "", // 使用正则表达式方式监测时的正则式
               placeholder: "fdsf", // 在不填写任何字段时显示的灰字
               remoteFunc: "func_1551257357000_59980" // 在input里面没有用到
            },
            key: "1551257357000_59980", // 没有作用，自动生成
            model: "input_1551257357000_59980", // 字段名称(表格字段名称，驼峰命名法)
            rules: [
               // 显示fliter报错的语句
               {
                  type: "url",
                  message: "单行文本格式不正确"
               },
               {
                  required: true,
                  message: "单行文本必须填写"
               }
            ]
         };
         return tmp;
      }
   };
};

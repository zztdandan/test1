const avueSetting = function() {
   this.textInput = function(textInputEntity) {
      if (textInputEntity) {
         return textInputEntity;
      } else {
         const tmp = {
            type: "input", // 类型为input
            readonly: false, // 只读属性，默认为false
            label: "字段值", // 表示表单解释
            prop: "input_1551257357000_59980", // 字段名称(表格字段名称，驼峰命名法)
            placeholder: "fdsf", // 在不填写任何字段时显示的灰字
            span: 12 // 宽度，在avue里面不能设置
         };
         return tmp;
      }
   };
};

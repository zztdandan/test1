<template>
  <!-- 创造表单的基控件，输入array后返回一个表单 -->
  <el-form class="build-form" :id="this.FormId" label-width="5rem" :size="calcSize">
    <div v-for="one_line of lineArray" :key="one_line.key" class="flex-row">
      <div v-for="one_item of one_line.item" :class="flexGrowClass" :key="one_item.id">
        <!-- <div>{{one_item.label}}</div>         -->
        <div
          v-if="no_special(one_item.type)"
          :ref="one_item.id"
          :size="calcSize"
          :is="calc_input(one_item.type)"
          :value="formData[one_item.id]"
          @update:value="change"
          :Info="one_item"
        ></div>
        <div
          v-else-if="one_item.type=='button'"
          is="button-input"
          :ref="one_item.id"
          :Info="one_item"
          @btnClick="handlebtnClick"
        ></div>
        <div
          v-else-if="one_item.type=='append-text'"
          is="append-text-input"
          :ref="one_item.id"
          :size="calcSize"
          :Info="one_item"
          @update:value="change"
          :value="formData[one_item.id]"
        >
          <template :slot="one_item.append">
            <slot :name="one_item.append"></slot>
          </template>
        </div>
      </div>
    </div>
    <!-- <slot name="add-on"></slot> -->
  </el-form>
</template>

<script>
  // line 类输入格式
  //  { type: "visi", id: "case_id", value: "",label:"标题",readonly:false,line:1}
  //
  // 支持的type:picture-modal,text,submit,visi,number DateInput
  import TextInput from "./comp/TextInput";
  import AutoComInput from "./comp/AutoComInput";
  import AutoCompInput from "./comp/AutoCompInput.vue";
  import CheckInput from "./comp/CheckInput";
  import ButtonInput from "./comp/ButtonInput";
  import SelectInput from "./comp/SelectInput";
  import DateInput from "./comp/DateInput";
  import AppendTextInput from "./comp/AppendTextInput";
  import "linqjs";
import { debug } from 'util';

  export default {
    name: "lg-build-form",
    components: {
      TextInput,
      CheckInput,
      AutoComInput,
      AutoCompInput,
      ButtonInput,
      SelectInput,
      DateInput,
      "append-text-input": AppendTextInput
    },
    props: {
      //所有form的表单列表
      formArray: {
        type: Array,
        default: function() {
          return [];
        }
      },
      grow: {
        type: Number,
        default: 0
      },
      //表单的唯一id标识
      FormId: { type: String, default: "SubForm" },
      syncData: {
        type: Object,
        default: function() {
          return {};
        }
      },
      initSize: { type: String, default: "medium" }
    },
    data: function() {
      return {
        formData: {},
        size: "medium"
      };
    },
    created: function() {
      // console.log("初始化created");
      // 初始化一次formData的数据,获得按照formArray插入的原始数据。
      // 注意，如果syncData和formData同时有同一项的数字的话，以syncData的数字为初始化的标准
      for (let one_item of this.formArray) {
        // console.log("one_item=",one_item);
        // console.log(this.syncData[one_item.id]);
        if (typeof this.syncData[one_item.id] != "undefined") {
          this.formData[one_item.id] = this.syncData[one_item.id];
        } else if (typeof one_item.value != "undefined") {
          this.formData[one_item.id] = one_item.value;
        } else {
          this.formData[one_item.id] = "";
        }
      }
    },

    computed: {
      calcSize: function() {
        return this.initSize ? this.initSize : "medium";
      },
      flexGrowClass: function() {
        return this.grow == 1 ? "flex-item-1 el-input-1" : "flex-item";
      },
      //将传入的数据按列归类
      lineArray: function() {
        let c = new Array();

        //先遍历一次输入的formArray，如果这个array存在line就插入c，如果不存在就默认为line1
        for (let one_item of this.formArray) {
          one_item.line = one_item.line ? one_item.line : 1;
          c.push(one_item);
        }
        //将c按列数归类
        let d = c.groupBy(x => x.line);
        //用特殊的格式格式化d，每列多个key，列中的表单值在item里面
        // console.log("linearray制作d",d);
        let e = d.select(x => {
          // console.log("x=", x[0]);
          return { key: x[0].line, item: x };
        });
        return e;
      },
      formData_Section: function() {
        let tmp = new FormData();
        for (let key in this.formData) {
          tmp.set(key, this.formData[key]);
        }
        return tmp;
      }
    },
    mounted: function() {},
    methods: {
      change(a) {
        let _id = a.id;
        let _value = a.value;
        // console.log("进入函数change_build_form", _id, _value);
        if (this.formData[_id]) {
          this.formData[_id] = _value;
        } else {
          this.$set(this.formData, _id, _value);
        }
        this.$emit("update:syncData", this.formData);

        // console.log(this.formData);
      },
      calc_input(type) {
        // console.log("打印type", type + "-input")
        return type + "-input";
      },
      no_special(type) {
        // 规定一些特殊的列组件，这些组件将不走通用is渲染，做定制化开发

        const special_form_list = ["button", "append-text"];
        // 若该type在特殊列表里面，则返回false（确实特殊），否则就是非特殊input，返回true
        if (special_form_list.indexOf(type) >= 0) {
          return false;
        } else {
          return true;
        }
      },
      handlebtnClick(info) {
        // console.log(info);
        this.$emit(info);
      },
      setData(data){
        this.formData=data;
      }
    },

    watch: {
      formData: {
        deep: true,
        handler: function(newval, oldval) {
          this.formData = newval;

          for (let item in newval) {

            // console.log(item, this.$refs[item][0].input_value, newval[item]);
            if (this.$refs[item]) {
              this.$refs[item][0].$set(
                this.$refs[item][0],
                "input_value",
                newval[item]
              );
            }
          }
          // this.formData = newval;
          // this.emit("update:syncData",newval);
        }
      }
      // formData: {
      //   // immediate: true,
      //   handler: function(n, o) {
      //     console.log("检测到formData的改动");
      //     this.$emit("update:syncData", n);

      //   },
      //   deep: true
      // }
    }
  };
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  padding: 0 0.25rem;
}
.flex-item-1 {
  margin: 0 0.25rem;
  flex-grow: 1;
}
.flex-item {
  margin: 0 0.25rem;
  flex-grow: 0;
}
.no-visi {
  display: none;
}
.is-visi {
  display: block;
}
</style>
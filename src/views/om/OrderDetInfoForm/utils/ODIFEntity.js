import getCodeByClass from "@/business_utils/getCodeByClass";

const validatePass = function(rule, value, callback) {
    debugger;
    if (typeof value !== "string") {
        callback(new Error("请输入订单号"));
    }
    if (value === "") {
        callback(new Error("请输入订单号"));
    } else {
        callback();
    }
};

async function getODEntity() {
    const prodClassDic = await getCodeByClass("ORDC3");
    const exportFlagDic = await getCodeByClass("ORDC4");
    const pscDic = await getCodeByClass("ORDC5");
    const entity = [
        {
            type: "text",
            prop: "orderNo",
            label: "订单号",
            span: 8,
            rules: [
                {
                    validator: function(rule, value, callback) {
                        debugger;
                        if (typeof value !== "string") {
                            callback(new Error("请输入订单号"));
                        }
                        if (value === "") {
                            callback(new Error("请输入订单号"));
                        } else {
                            callback();
                        }
                    },
                    trigger: "blur"
                }
            ]
        },
        {
            type: "select",
            prop: "prodClass",
            label: "产品大类",
            dicData: prodClassDic,
            span: 8
        },
        {
            type: "select",
            prop: "exportFlag",
            label: "出口标记",
            dicData: exportFlagDic,
            span: 8
        },
        {
            type: "date",
            prop: "prodReadyDate",
            labelWidth:"100",
            label: "生产备妥日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd",
            span: 8
        },
        {
            type: "date",
            prop: "delivyDateTrnp",
            label: "船期交货日期",
            labelWidth:"100",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd",
            span: 8
        },
        {
            type: "date",
            prop: "delivyDateUser",
            labelWidth:"120",
            label: "期望交货日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd",
            span: 8,
            rules: [
                {
                    required: true,
                    message: "请输入期望交货日期",
                    trigger: "blur"
                }
            ]
        },
        {
            type: "date",
            prop: "delivyDate",
            label: "交货日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd",
            span: 8
        },
        {
            type: "select",
            prop: "psc",
            label: "产品规范",
            dicData: pscDic,
            span: 8
        }
    ];

    return entity;
}
export default getODEntity;

import { Notification as Noti, Message, MessageBox } from "element-ui";

export function SimpleAlert(msg) {
   MessageBox(msg, "信息", {
      confirmButtonText: "确定",
      callback: action => {}
   });
}

export function SimpleMessage(msg) {
   Message(msg);
}

export function ErrConsole(err) {
   Message("出现错误" + err);
}
export function SimpleNotify(msg, title, type) {
   title = title || "通知";
   type = type || "info";
   Noti({ title: title, message: msg, type: type });
}

export function ErrNotify(err) {
   Noti({ title: "出现错误", message: err, type: "error`" });
}

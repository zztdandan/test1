import userMan from "./UserMan/UserMan";
// const AuthorityView = () => import("./AuthorityView/AuthorityView");
// const ConstantCodeView = () => import("./ConstantCodeView");
// const DeptInfoView = () => import("./DeptInfoView");
// const ActManView = () => import("./ActManView");
const menuMan = () => import("./MenuMan/MenuMan");
// const RoleInfoTreeView = () => import("./RoleInfoTreeView");
const tableMan = () => import("./TableMan/TableMan");
const formMaking = () => import("./FormMaking/FormMaking");
const roleMan = () => import("./RoleMan/RoleMan");
import constantCodeMan from "./ConstantCodeMan/ConstantCodeMan";
// import deptSelect from "./DeptMan/DeptSelect";
// import AuthorityView from "./AuthorityView/AuthorityView";
// import ConstantCodeView from "./ConstantCodeView";
// import DeptInfoView from "./DeptInfoView";
// import ActManView from "./ActManView";
// import MenuMan from "./MenuMan/MenuMan";
// import RoleInfoTreeView from "./RoleInfoTreeView";
// import TableColManView from "./TableColManView";

export default {
   userMan,
   tableMan,
   menuMan,
   roleMan,
   constantCodeMan,
   formMaking,

};

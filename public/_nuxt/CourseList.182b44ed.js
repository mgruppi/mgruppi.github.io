import{_ as l}from"./_plugin-vue_export-helper.c27b6911.js";import{C as i,o,a,b as t,W as _,X as c,V as u,w as d,f as m,Y as s,Z as f}from"./entry.aa775ad5.js";const p={props:{courses:{required:!0},limit:{default:100}}},x={class:"d-flex"},g={class:"list-group"},h={class:"list-group-item"};function b(v,C,n,k,y,V){const r=i("router-link");return o(),a("main",null,[t("div",x,[t("ul",g,[(o(!0),a(_,null,c(n.courses.slice(0,n.limit),e=>(o(),a("li",h,[u(r,{to:`/teaching/${e.id}`,info:e},{default:d(()=>[t("i",{class:m(["px-1 fas",{"fa-seedling":e.term==="Spring","fa-leaf":e.term==="Fall"}])},null,2),t("b",null,s(e.term)+" "+s(e.year),1),f(": "+s(e.number)+" - "+s(e.name),1)]),_:2},1032,["to","info"])]))),256))])])])}const $=l(p,[["render",b],["__scopeId","data-v-6077bfc6"]]);export{$ as _};

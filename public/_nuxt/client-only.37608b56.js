import{h as o,F as u,P as d,a as k}from"./entry.aa775ad5.js";const i=o({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(b,{slots:a,attrs:c}){const l=u(!1);return d(()=>{l.value=!0}),e=>{var t;if(l.value)return(t=a.default)==null?void 0:t.call(a);const n=a.fallback||a.placeholder;if(n)return n();const r=e.fallback||e.placeholder||"",f=e.fallbackTag||e.placeholderTag||"span";return k(f,c,r)}}});export{i as _};

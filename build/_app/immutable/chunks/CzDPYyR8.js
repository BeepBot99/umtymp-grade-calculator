import{a1 as m,a2 as A,S as D,P as I,a3 as g,v as c,q as R,k as L,w as u,x as O,a4 as V,a5 as C,K as H,B as P,a6 as Y,a7 as j,z as k,j as w,p as M,a8 as $,C as q,b as z}from"./DJ6LGtHQ.js";import{a as B,r as N,h}from"./BeGAVm68.js";import{b as K}from"./DTHAtLQd.js";const W=["touchstart","touchmove"];function F(t){return W.includes(t)}function X(t,e){var r=e==null?"":typeof e=="object"?e+"":e;r!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=r,t.nodeValue=r+"")}function G(t,e){return S(t,e)}function Z(t,e){m(),e.intro=e.intro??!1;const r=e.target,_=w,l=u;try{for(var a=A(r);a&&(a.nodeType!==8||a.data!==D);)a=I(a);if(!a)throw g;c(!0),R(a),L();const d=S(t,{...e,anchor:a});if(u===null||u.nodeType!==8||u.data!==O)throw V(),g;return c(!1),d}catch(d){if(d===g)return e.recover===!1&&C(),m(),H(r),c(!1),G(t,e);throw d}finally{c(_),R(l)}}const i=new Map;function S(t,{target:e,anchor:r,props:_={},events:l,context:a,intro:d=!0}){m();var v=new Set,y=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!v.has(n)){v.add(n);var f=F(n);e.addEventListener(n,h,{passive:f});var T=i.get(n);T===void 0?(document.addEventListener(n,h,{passive:f}),i.set(n,1)):i.set(n,T+1)}}};y(P(B)),N.add(y);var p=void 0,b=Y(()=>{var o=r??e.appendChild(j());return k(()=>{if(a){M({});var s=$;s.c=a}l&&(_.$$events=l),w&&K(o,null),p=t(o,_)||{},w&&(q.nodes_end=u),a&&z()}),()=>{var f;for(var s of v){e.removeEventListener(s,h);var n=i.get(s);--n===0?(document.removeEventListener(s,h),i.delete(s)):i.set(s,n)}N.delete(y),o!==r&&((f=o.parentNode)==null||f.removeChild(o))}});return E.set(p,b),p}let E=new WeakMap;function x(t,e){const r=E.get(t);return r?(E.delete(t),r(e)):Promise.resolve()}export{Z as h,G as m,X as s,x as u};

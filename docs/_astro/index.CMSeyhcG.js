var f={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function R(){if(x)return s;x=1;var o=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function n(r,t,l){var e=null;if(l!==void 0&&(e=""+l),t.key!==void 0&&(e=""+t.key),"key"in t){l={};for(var i in t)i!=="key"&&(l[i]=t[i])}else l=t;return t=l.ref,{$$typeof:o,type:r,key:e,ref:t!==void 0?t:null,props:l}}return s.Fragment=a,s.jsx=n,s.jsxs=n,s}var p;function d(){return p||(p=1,f.exports=R()),f.exports}var h=d();let u=[],c=(o,a)=>{let n=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},l:0,lc:0,listen(t,l){return r.lc=n.push(t,l||r.l)/2,()=>{let e=n.indexOf(t);~e&&(n.splice(e,2),--r.lc||r.off())}},notify(t){let l=!u.length;for(let e=0;e<n.length;e+=2)u.push(n[e],n[e+1],r.value,t);if(l){for(let e=0;e<u.length;e+=4){let i;for(let v=e+1;!i&&(v+=4)<u.length;)u[v]<u[e+1]&&(i=u.push(u[e],u[e+1],u[e+2],u[e+3]));i||u[e](u[e+2],u[e+3])}u.length=0}},off(){},set(t){r.value!==t&&(r.value=t,r.notify())},subscribe(t,l){let e=r.listen(t,l);return t(r.value),e},value:o};return r};export{c as a,h as j};

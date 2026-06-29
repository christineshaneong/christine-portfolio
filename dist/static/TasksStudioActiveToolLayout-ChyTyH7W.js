import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-BrRRJ8T6.js";import{t as n}from"./compiler-runtime-BwZ1Hg30.js";import{F as r,S as i,ht as a,k as o,ni as s,ti as c,wt as l}from"./dist-BNyfs7dV.js";import{Ci as u,Jr as d,Qi as f,Si as p,Vt as m,_i as h,bi as g,di as _,fi as v,gi as y,lo as b,pi as x,qr as S,ui as C,vi as w,xi as T}from"./sanity-OM_u42cL.js";var E=e(),D=n();t(),b(),T(),g(),y(),w(),x(),p(),u(),h(),f(),v(),_(),C();var O=1,k=3,A=s(o).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>c`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[k]}px) {
      position: relative;
    }
  `),j=s(r).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return c`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[k]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[O]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function M(e){let t=(0,D.c)(12),n=a(),{state:r}=d(),{isOpen:o}=r,s=n<=O&&o?`hidden`:`auto`,c;t[0]===e?c=t[1]:(c=e.renderDefault(e),t[0]=e,t[1]=c);let u;t[2]!==s||t[3]!==c?(u=(0,E.jsx)(i,{flex:1,height:`fill`,overflow:s,children:c}),t[2]=s,t[3]=c,t[4]=u):u=t[4];let f;t[5]===o?f=t[6]:(f=o&&(0,E.jsx)(j,{zOffset:100,height:`fill`,children:(0,E.jsx)(m,{})}),t[5]=o,t[6]=f);let p;t[7]===f?p=t[8]:(p=(0,E.jsx)(l,{initial:!1,children:f}),t[7]=f,t[8]=p);let h;return t[9]!==u||t[10]!==p?(h=(0,E.jsxs)(A,{sizing:`border`,height:`fill`,children:[u,p]}),t[9]=u,t[10]=p,t[11]=h):h=t[11],h}function N(e){let t=(0,D.c)(4),{enabled:n}=S();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,E.jsx)(M,{...e}),t[2]=e,t[3]=r),r}export{N as TasksStudioActiveToolLayout};
import{r as o,P as m,j as c}from"./index-c25f80cf.js";var f=typeof window<"u",l=function(e,t){return t!==void 0?t:f?window.matchMedia(e).matches:!1},p=function(e,t){var n=o.useState(l(e,t)),d=n[0],s=n[1];return o.useEffect(function(){var a=!0,i=window.matchMedia(e),r=function(){a&&s(!!i.matches)};return i.addListener(r),s(i.matches),function(){a=!1,i.removeListener(r)}},[e]),d};const w=p,g=["High","Low","Medium"],_=["Art","Business","Music","Conference","Workshop","Party","Sport"],b=["by name","by name","by data","by data","by priority","by priority"],h="_mainTitleContainer_1og8e_1",y="_title_1og8e_5",u={mainTitleContainer:h,title:y},v=({children:e})=>c.jsx("div",{className:u.mainTitleContainer,children:c.jsx("h2",{className:u.mainTitle,children:e})});v.propTypes={children:m.node.isRequired};export{v as T,_ as c,g as p,b as s,w as u};
import{u as m,r as o,j as t,Q as c}from"./index-c43dac8a.js";import{C as E}from"./Container-85df2dc1.js";import{f as d}from"./fetchEventById-72bd908f.js";import{F as p}from"./FormEvent-d9db3eee.js";import{B as f}from"./BackButton-8da6d0f8.js";const u=()=>{const{id:e}=m(),[r,a]=o.useState(null),n=async i=>{try{const s=await d(i);a(s)}catch{c.error("Oops, something went wrong! Please try again later",{position:"top-right",autoClose:2e3})}};return o.useEffect(()=>{n(e)},[e]),t.jsx(t.Fragment,{children:t.jsxs(E,{children:[t.jsx(f,{}),r&&t.jsx(p,{isEdit:!0,event:r})]})})};u.displayName="EditEventPage";export{u as default};
import{u as m,r as o,j as t,Q as c}from"./index-c25f80cf.js";import{C as d}from"./Container-2afa22b8.js";import{f as E}from"./fetchEventById-290bf355.js";import{T as p}from"./Title-ece6476e.js";import{F as f}from"./FormEvent-ebe564e6.js";import{B as l}from"./BackButton-689ab5ca.js";const u=()=>{const{id:e}=m(),[r,n]=o.useState(null),a=async i=>{try{const s=await E(i);n(s)}catch{c.error("Oops, something went wrong! Please try again later",{position:"top-right",autoClose:2e3})}};return o.useEffect(()=>{a(e)},[e]),t.jsx(t.Fragment,{children:t.jsxs(d,{children:[t.jsx(l,{}),t.jsx(p,{children:"Edit event"}),r&&t.jsx(f,{isEdit:!0,event:r})]})})};u.displayName="EditEventPage";export{u as default};
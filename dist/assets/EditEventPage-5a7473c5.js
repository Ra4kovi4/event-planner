import{r as a,i as d,e as E,j as t,Q as p}from"./index-cd85426c.js";import{f}from"./fetchEventById-61c1baca.js";import{T as l}from"./Title-6bfb39b0.js";import{F as v}from"./FormEvent-7a23eb81.js";import{B as u}from"./BackButton-f2bba784.js";import{C as g}from"./Container-42003893.js";const x=()=>{const[e,n]=a.useState(null),{id:s}=d(),o=E(),i=async m=>{try{const r=await f(m);n(r)}catch{p.error("Oops, something went wrong! Please try again later",{position:"top-right",autoClose:2e3})}};a.useEffect(()=>{i(s)},[s]);const c=()=>{o(-1)};return t.jsx(t.Fragment,{children:t.jsxs(g,{children:[t.jsx(u,{onBack:c}),t.jsx(l,{children:"Edit event"}),e&&t.jsx(v,{isEdit:!0,event:e})]})})};x.displayName="EditEventPage";export{x as default};

import{a as e}from"./Container-2afa22b8.js";const r=async a=>{try{const{data:t}=await e.get(`/events/${a}`);return t.data.result}catch(t){console.log(t)}};export{r as f};

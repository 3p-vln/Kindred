import{a as D,c as T,d as l,b as m,e as _,g as n,f as x,s as y,p as L}from"./preloader-DTihPpnU.js";const M=new URLSearchParams(window.location.search),w=M.get("id")||void 0;async function b(){if(!w)return;const o=[];try{const t=await D(T(l,"prods"));for(const e of t.docs){const s=e.data();if(!s.status){let a={name:"Unknown",surname:"",score:0};if(s.userId){const c=m(l,"users",s.userId),i=await _(c);if(i.exists()){const d=i.data(),f=d.myProds||[];let u=0;for(const v of f){const P=m(l,"prods",v),g=await _(P);g.exists()&&g.data().status===!0&&u++}const p=f.length,h=p>0?u/p:0,I=Math.min(Math.ceil(h*5),5);a={name:d.name||"—",surname:d.surname||"",score:I}}}o.push({id:e.id,img:s.img,title:s.title,goal:s.goal,collected:s.collected,userInfo:a,discription:s.discription,link:s.link})}}const r=o.find(e=>e.id===w);if(!r)throw new Error;C(r)}catch(t){console.error("Ошибка при получении документов:",t)}}function C(o){const t=n(".prod-info__img"),r=n(".info__title"),e=n(".info__owner"),s=n(".info__about"),a=n(".info__goal span"),c=n(".info__collected span"),i=n(".progress-bar__progress");!t||!r||!e||!s||!a||!c||!i||(t.innerHTML=`
    <img src="${o.img}" alt="${o.title}"></img>
  `,r.innerText=o.title,e.innerHTML=`
  <div>
    <span>Збір від </span>
    ${o.userInfo.name} ${o.userInfo.surname}
  </div>
   
  <div class="score">
    ${o.userInfo.score} 
    <svg>
      <use href="#star"></use>
    </svg>
  </div>
  `,s.innerText=o.discription,a.innerText=o.goal+"грн.",c.innerText=o.collected+"грн.",i.style.width=o.collected*100/o.goal+"%")}document.addEventListener("DOMContentLoaded",async()=>{x(),await b(),y()});document.addEventListener("loadingIsFinished",()=>{L()});

import{g as e,b as f,d as l,u as k,a as D,c as M,e as h,f as T,s as U,p as x}from"./preloader-BHEiGmpD.js";import{J as C}from"./just-validate.es-C73wyOde.js";const $=e(".info__btn"),d=e(".popup"),p=e(".popup__link"),E=e(".popup__close"),F=new URLSearchParams(window.location.search),I=F.get("id")||void 0;function R(o,s){$?.addEventListener("click",()=>{d?.classList.add("popup_active"),m(),p&&(p.href=o,p.innerText=o)}),A(),m(),H(s)}function A(){E?.addEventListener("click",()=>{d?.classList.contains("popup_active")&&d?.classList.remove("popup_active"),m()})}function m(){const o=e("body");if(o){if(d?.classList.contains("popup_active")){o.style.overflow="hidden";return}o.style.overflow="auto"}}function H(o){const s=e("#sup-popup");if(!s)return;const t=new C(s,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});t.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте файл"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),t.onSuccess(async()=>{const a=e("#summ");a&&await J(Number(a.value),o),window.location.reload()})}async function J(o,s){if(!I)return;const t=f(l,"prods",I);await k(t,{collected:Number(s+o)})}const N=new URLSearchParams(window.location.search),L=N.get("id")||void 0;async function O(){if(!L)return;const o=[];try{const s=await D(M(l,"prods"));for(const a of s.docs){const n=a.data();if(!n.status){let r={name:"Unknown",surname:"",score:0};if(n.userId){const c=f(l,"users",n.userId),i=await h(c);if(i.exists()){const u=i.data(),g=u.myProds||[];let v=0;for(const P of g){const S=f(l,"prods",P),w=await h(S);w.exists()&&w.data().status===!0&&v++}const _=g.length,b=_>0?v/_:0,y=Math.min(Math.ceil(b*5),5);r={name:u.name||"—",surname:u.surname||"",score:y}}}o.push({id:a.id,img:n.img,title:n.title,goal:n.goal,collected:n.collected,userInfo:r,discription:n.discription,link:n.link})}}const t=o.find(a=>a.id===L);if(!t)throw new Error;q(t),R(t.link,t.collected)}catch(s){console.error("Ошибка при получении документов:",s)}}function q(o){const s=e(".prod-info__img"),t=e(".info__title"),a=e(".info__owner"),n=e(".info__about"),r=e(".info__goal span"),c=e(".info__collected span"),i=e(".progress-bar__progress");!s||!t||!a||!n||!r||!c||!i||(s.innerHTML=`
    <img src="${o.img}" alt="${o.title}"></img>
  `,t.innerText=o.title,a.innerHTML=`
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
  `,n.innerText=o.discription,r.innerText=o.goal+"грн.",c.innerText=o.collected+"грн.",i.style.width=o.collected*100/o.goal+"%")}document.addEventListener("DOMContentLoaded",async()=>{T(),await O(),U()});document.addEventListener("loadingIsFinished",()=>{x()});

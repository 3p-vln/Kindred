import{g as o,c as v,d as D,e as E,f as _,h as I,i as $,u as U,j as M,r as P,k as S,l as T,m as x,b as C,s as q,p as B}from"./firebace-Cb3kG9CG.js";import{J as F}from"./just-validate.es-C73wyOde.js";import{b as N,c as H}from"./requests-8AYIeyfP.js";const w=o(".info__btn"),f=o(".popup"),m=o(".popup__link"),J=o(".popup__close"),O=new URLSearchParams(window.location.search),K=O.get("id")||void 0,R=JSON.parse(localStorage.getItem("user")||"[]"),j=v.get("UID");function A(e,t){if(R&&j){w?.addEventListener("click",()=>{f?.classList.add("popup_active"),g(),m&&(m.href=e,m.innerText=e)}),G(),g(),V(t);return}w?.addEventListener("click",()=>{window.location.href="/Kindred/log-in.html"})}function G(){J?.addEventListener("click",()=>{f?.classList.contains("popup_active")&&f?.classList.remove("popup_active"),g()})}function g(){const e=o("body");if(e){if(f?.classList.contains("popup_active")){e.style.overflow="hidden";return}e.style.overflow="auto"}}function V(e){const t=o("#sup-popup");if(!t)return;const a=new F(t,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});a.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте зображення"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),a.onSuccess(async()=>{const n=o("#summ"),r=o("#file");n&&r&&await z(n,r,e),f?.classList.remove("popup_active")})}async function z(e,t,a){const n=t?.files?.[0];if(!n)return;const r=await Q(n);await D(E(_,"payments"),{sum:e.value,img:r,date:new Date().toLocaleDateString("ru-RU"),userId:R.id,prodId:K,prodUserId:a,status:"waiting"})}async function Q(e){if(!e)throw new Error("Нет файла");const t=I($,`payments/${e.name}`);return await U(t,e),await M(t)}const W=new URLSearchParams(window.location.search),X=W.get("id")||void 0,Y=JSON.parse(localStorage.getItem("user")||"[]"),Z=v.get("Role"),ee=v.get("UID");async function te(e,t){X&&(oe(e,t),A(e.link,t.id))}function oe(e,t){const a=o(".prod-info__img"),n=o(".info__title"),r=o(".info__owner"),i=o(".info__about"),s=o(".info__goal span"),c=o(".info__collected span"),d=o(".progress-bar__progress");!a||!n||!r||!i||!s||!c||!d||(a.innerHTML=`
    <img src="${e.img}" alt="${e.title}"></img>
  `,ee&&(Y.id===t.id||Z==="admin")?n.innerHTML=`
    ${e.title} 
    <span>
      <svg>
        <use href="#pencil"></use>
      </svg>
    </span>
  `:n.innerText=e.title,r.innerHTML=`
  <div>
    <span>Збір від </span>
    <a href="user.html?id=${t.id}">${t.name} ${t.surname}</a>
  </div>
   
  <div class="score">
    ${Math.round(t.score.reduce((u,l)=>u+Number(l),0)/t.score.length)} 
    <svg>
      <use href="#star"></use>
    </svg>
  </div>
  `,i.innerText=e.discription,s.innerText=e.goal+"грн.",c.innerText=e.collected+"грн.",d.style.width=e.collected*100/e.goal+"%")}const h=o(".info__title"),b=o(".prod-info"),L=o(".page"),ne=new URLSearchParams(window.location.search),p=ne.get("id");async function ae(e){if(!b||!h)return;const t=o("span",h);t&&t.addEventListener("click",async()=>{b.style.display="none",re(e)})}function re(e){if(!L)return;const t=P("div","change-info");t.innerHTML=`
    <div class="container">
      <div class="change-info__content">
        <form id="change-info">
          <div class="change-info__form form">
            <div class="form__item">
              <label class="form__label" for="title">Назва збору</label>
              <input class="form__input" type="text" id="title">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="goal">Мета (грн)</label>
              <input class="form__input" type="number" id="goal">
            </div>
            
            <div class="form__item">
              <label class="form__label" for="collected">Зібрано (грн)</label>
              <input class="form__input" type="number" id="collected" name="collected">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="discription">Розгорнута інформація про збір</label>
              <textarea class="form__textarea" id="discription"></textarea>
            </div>
      
            <div class="form__item">
              <label class="form__label" for="img">Зображення для збору</label>
              <input class="form__input" type="file" id="img" accept="image/*">
            </div>
      
            <button class="form__btn btn btn_orange" type="submit">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  `,L.appendChild(t);const a=o("#title"),n=o("#goal"),r=o("#collected"),i=o("#discription"),s=o("#img");!a||!n||!r||!i||!s||(a.value=e.title,n.value=e.goal.toString(),r.value=e.collected.toString(),i.value=e.discription,setTimeout(()=>{ie(e,a,n,r,i,s)},100))}function ie(e,t,a,n,r,i){const s=o("#change-info");if(!s)return;const c=new F(s,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});c.addField("#title",[{rule:"required",errorMessage:"Введіть назву збору"},{rule:"minLength",value:2,errorMessage:"Довжина назви повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина назви повинна бути менше"}]).addField("#goal",[{rule:"required",errorMessage:"Це обов'язкове поле"}]).addField("#collected",[{rule:"required",errorMessage:"Це поле обовʼязкове"},{validator:()=>{const d=o("#collected");if(!d)return!1;const u=d.value.trim().replace(",","."),l=parseFloat(u);return isNaN(l)?!1:l>=e.collected},errorMessage:`Значення має бути більше або рівна ${e.collected}`}]).addField("#discription",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:20,errorMessage:"Напишіть трохи більше інформації"}]),c.onSuccess(async()=>{await se(t,a,n,r,i),window.location.href=`/Kindred/prod.html?id=${p}`})}async function se(e,t,a,n,r){const i=e.value,s=t.value,c=a.value,d=n.value,u=r?.files?.[0];try{if(!p)return;const l=await le(u),k=S(_,"prods",p);await T(k,{img:l,title:i,goal:s,discription:d,collected:c})}catch(l){console.error(l)}}async function le(e=null){if(!e){if(!p)throw new Error("Нет файла");const n=await x(S(_,"prods",p));if(!n||!n.data()?.img)throw new Error("Нет файла");return n.data()?.img}const t=I($,`prods/${e.name}`);return await U(t,e),await M(t)}const ce=new URLSearchParams(window.location.search),y=ce.get("id")||void 0;document.addEventListener("DOMContentLoaded",async()=>{if(!y)return;const e=await N(y);if(!e)return;const t=await H(e.userId);t&&(C(),await te(e,t),await ae(e),q())});document.addEventListener("loadingIsFinished",()=>{B()});

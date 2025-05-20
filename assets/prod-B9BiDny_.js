import{g as o,c as v,d as E,e as P,f as _,h as U,i as $,u as S,j as M,r as T,k as F,l as x,m as C,b as N,s as q,p as B}from"./firebace-Cb3kG9CG.js";import{J as R}from"./just-validate.es-C73wyOde.js";import{b as J,c as w}from"./requests-8AYIeyfP.js";const h=o(".info__btn"),f=o(".popup"),m=o(".popup__link"),O=o(".popup__close"),H=new URLSearchParams(window.location.search),K=H.get("id")||void 0,k=JSON.parse(localStorage.getItem("user")||"[]"),j=v.get("UID");function A(e,t){if(k&&j){h?.addEventListener("click",()=>{f?.classList.add("popup_active"),g(),m&&(m.href=e,m.innerText=e)}),G(),g(),V(t);return}h?.addEventListener("click",()=>{window.location.href="/Kindred/log-in.html"})}function G(){O?.addEventListener("click",()=>{f?.classList.contains("popup_active")&&f?.classList.remove("popup_active"),g()})}function g(){const e=o("body");if(e){if(f?.classList.contains("popup_active")){e.style.overflow="hidden";return}e.style.overflow="auto"}}function V(e){const t=o("#sup-popup");if(!t)return;const a=new R(t,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});a.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте зображення"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),a.onSuccess(async()=>{const n=o("#summ"),r=o("#file");n&&r&&await z(n,r,e),f?.classList.remove("popup_active")})}async function z(e,t,a){const n=t?.files?.[0];if(!n)return;const r=await Q(n);await E(P(_,"payments"),{sum:e.value,img:r,date:new Date().toLocaleDateString("ru-RU"),userId:k.id,prodId:K,prodUserId:a,status:"waiting"})}async function Q(e){if(!e)throw new Error("Нет файла");const t=U($,`payments/${e.name}`);return await S(t,e),await M(t)}const W=new URLSearchParams(window.location.search),X=W.get("id")||void 0,Y=JSON.parse(localStorage.getItem("user")||"[]"),Z=v.get("Role"),ee=v.get("UID");async function te(e,t){X&&(oe(e,t),A(e.link,t.id))}function oe(e,t){const a=o(".prod-info__img"),n=o(".info__title"),r=o(".info__owner"),s=o(".info__about"),i=o(".info__goal span"),c=o(".info__collected span"),d=o(".progress-bar__progress");!a||!n||!r||!s||!i||!c||!d||(a.innerHTML=`
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
  `,s.innerText=e.discription,i.innerText=e.goal+"грн.",c.innerText=e.collected+"грн.",d.style.width=e.collected*100/e.goal+"%")}const b=o(".info__title"),L=o(".prod-info"),y=o(".page"),ne=new URLSearchParams(window.location.search),p=ne.get("id");async function ae(e){if(!L||!b)return;const t=o("span",b);t&&t.addEventListener("click",async()=>{L.style.display="none",re(e)})}function re(e){if(!y)return;const t=T("div","change-info");t.innerHTML=`
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
  `,y.appendChild(t);const a=o("#title"),n=o("#goal"),r=o("#collected"),s=o("#discription"),i=o("#img");!a||!n||!r||!s||!i||(a.value=e.title,n.value=e.goal.toString(),r.value=e.collected.toString(),s.value=e.discription,setTimeout(()=>{se(e,a,n,r,s,i)},100))}function se(e,t,a,n,r,s){const i=o("#change-info");if(!i)return;const c=new R(i,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});c.addField("#title",[{rule:"required",errorMessage:"Введіть назву збору"},{rule:"minLength",value:2,errorMessage:"Довжина назви повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина назви повинна бути менше"}]).addField("#goal",[{rule:"required",errorMessage:"Це обов'язкове поле"}]).addField("#collected",[{rule:"required",errorMessage:"Це поле обовʼязкове"},{validator:()=>{const d=o("#collected");if(!d)return!1;const u=d.value.trim().replace(",","."),l=parseFloat(u);return isNaN(l)?!1:l>=e.collected},errorMessage:`Значення має бути більше або рівна ${e.collected}`}]).addField("#discription",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:20,errorMessage:"Напишіть трохи більше інформації"}]),c.onSuccess(async()=>{await ie(t,a,n,r,s),window.location.href=`/Kindred/prod.html?id=${p}`})}async function ie(e,t,a,n,r){const s=e.value,i=t.value,c=a.value,d=n.value,u=r?.files?.[0];try{if(!p)return;const l=await le(u),D=F(_,"prods",p);await x(D,{img:l,title:s,goal:i,discription:d,collected:c})}catch(l){console.error(l)}}async function le(e=null){if(!e){if(!p)throw new Error("Нет файла");const n=await C(F(_,"prods",p));if(!n||!n.data()?.img)throw new Error("Нет файла");return n.data()?.img}const t=U($,`prods/${e.name}`);return await S(t,e),await M(t)}const ce=new URLSearchParams(window.location.search),I=ce.get("id")||void 0,de=JSON.parse(localStorage.getItem("user")||"[]");document.addEventListener("DOMContentLoaded",async()=>{if(!I)return;const e=await J(I);if(!e)return;const t=await w(e.userId),a=await w(de.id);!t||!a||(N(),await te(e,t),await ae(e),q())});document.addEventListener("loadingIsFinished",()=>{B()});

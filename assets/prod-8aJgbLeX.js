import{g as o,c as v,d as D,e as E,f as _,h as U,i as $,u as S,j as M,r as T,k as F,l as x,m as C,b as q,s as B,p as J}from"./firebace-Cb3kG9CG.js";import{J as R}from"./just-validate.es-C73wyOde.js";import{b as N,c as w}from"./requests-CDtZGZDQ.js";const b=o(".info__btn"),u=o(".popup"),m=o(".popup__link"),O=o(".popup__close"),H=new URLSearchParams(window.location.search),K=H.get("id")||void 0,P=JSON.parse(localStorage.getItem("user")||"[]"),j=v.get("UID");function A(e,t){if(P&&j){b?.addEventListener("click",()=>{u?.classList.add("popup_active"),g(),m&&(m.href=e,m.innerText=e)}),G(),g(),V(t);return}b?.addEventListener("click",()=>{window.location.href="/Kindred/log-in.html"})}function G(){O?.addEventListener("click",()=>{u?.classList.contains("popup_active")&&u?.classList.remove("popup_active"),g()})}function g(){const e=o("body");if(e){if(u?.classList.contains("popup_active")){e.style.overflow="hidden";return}e.style.overflow="auto"}}function V(e){const t=o("#sup-popup");if(!t)return;const a=new R(t,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});a.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте зображення"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),a.onSuccess(async()=>{const n=o("#summ"),r=o("#file");n&&r&&await z(n,r,e),u?.classList.remove("popup_active")})}async function z(e,t,a){const n=t?.files?.[0];if(!n)return;const r=await Q(n);await D(E(_,"payments"),{sum:e.value,img:r,date:new Date().toLocaleDateString("ru-RU"),userId:P.id,prodId:K,prodUserId:a,status:"waiting"})}async function Q(e){if(!e)throw new Error("Нет файла");const t=U($,`payments/${e.name}`);return await S(t,e),await M(t)}const W=new URLSearchParams(window.location.search),X=W.get("id")||void 0,Y=JSON.parse(localStorage.getItem("user")||"[]"),Z=v.get("Role"),ee=v.get("UID");async function te(e,t){X&&(oe(e,t),A(e.link,t.id))}function oe(e,t){const a=o(".prod-info__img"),n=o(".info__title"),r=o(".info__owner"),s=o(".info__about"),i=o(".info__goal span"),l=o(".info__collected span"),c=o(".progress-bar__progress");!a||!n||!r||!s||!i||!l||!c||(a.innerHTML=`
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
    ${t.name} ${t.surname}
  </div>
   
  <div class="score">
    ${t.score} 
    <svg>
      <use href="#star"></use>
    </svg>
  </div>
  `,s.innerText=e.discription,i.innerText=e.goal+"грн.",l.innerText=e.collected+"грн.",c.style.width=e.collected*100/e.goal+"%")}const h=o(".info__title"),L=o(".prod-info"),I=o(".page"),ne=new URLSearchParams(window.location.search),f=ne.get("id");async function ae(e){if(!L||!h)return;const t=o("span",h);t&&t.addEventListener("click",async()=>{L.style.display="none",re(e)})}function re(e){if(!I)return;const t=T("div","change-info");t.innerHTML=`
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
  `,I.appendChild(t);const a=o("#title"),n=o("#goal"),r=o("#collected"),s=o("#discription"),i=o("#img");!a||!n||!r||!s||!i||(a.value=e.title,n.value=e.goal.toString(),r.value=e.collected.toString(),s.value=e.discription,setTimeout(()=>{se(e,a,n,r,s,i)},100))}function se(e,t,a,n,r,s){const i=o("#change-info");if(!i)return;const l=new R(i,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});l.addField("#title",[{rule:"required",errorMessage:"Введіть назву збору"},{rule:"minLength",value:2,errorMessage:"Довжина назви повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина назви повинна бути менше"}]).addField("#goal",[{rule:"required",errorMessage:"Це обов'язкове поле"}]).addField("#collected",[{rule:"required",errorMessage:"Це поле обовʼязкове"},{validator:()=>{const c=o("#collected");if(!c)return!1;const p=c.value.trim().replace(",","."),d=parseFloat(p);return isNaN(d)?!1:d>=e.collected},errorMessage:`Значення має бути більше або рівна ${e.collected}`}]).addField("#discription",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:20,errorMessage:"Напишіть трохи більше інформації"}]),l.onSuccess(async()=>{await ie(t,a,n,r,s),window.location.href=`/Kindred/prod.html?id=${f}`})}async function ie(e,t,a,n,r){const s=e.value,i=t.value,l=a.value,c=n.value,p=r?.files?.[0];try{if(!f)return;const d=await le(p),k=F(_,"prods",f);await x(k,{img:d,title:s,goal:i,discription:c,collected:l})}catch(d){console.error(d)}}async function le(e=null){if(!e){if(!f)throw new Error("Нет файла");const n=await C(F(_,"prods",f));if(!n||!n.data()?.img)throw new Error("Нет файла");return n.data()?.img}const t=U($,`prods/${e.name}`);return await S(t,e),await M(t)}const ce=new URLSearchParams(window.location.search),y=ce.get("id")||void 0,de=JSON.parse(localStorage.getItem("user")||"[]");document.addEventListener("DOMContentLoaded",async()=>{if(!y)return;const e=await N(y);if(!e)return;const t=await w(e.userId),a=await w(de.id);!t||!a||(q(),await te(e,t),await ae(e),B())});document.addEventListener("loadingIsFinished",()=>{J()});

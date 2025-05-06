import{g as o,a as v,c as T,d as x,e as _,f as S,h as M,u as F,i as R,r as C,j as k,k as q,l as B,b as J,s as N,p as O}from"./firebace-BfB2aKxu.js";import{J as P}from"./just-validate.es-C73wyOde.js";import{b as H,c as w}from"./requests-Czc6-qsb.js";const b=o(".info__btn"),f=o(".popup"),m=o(".popup__link"),K=o(".popup__close"),j=new URLSearchParams(window.location.search),A=j.get("id")||void 0,D=JSON.parse(localStorage.getItem("user")||"[]"),G=v.get("UID");function V(e,t){if(D&&G){b?.addEventListener("click",()=>{f?.classList.add("popup_active"),g(),m&&(m.href=e,m.innerText=e)}),z(),g(),Q(t);return}b?.addEventListener("click",()=>{window.location.href="/Kindred/log-in.html"})}function z(){K?.addEventListener("click",()=>{f?.classList.contains("popup_active")&&f?.classList.remove("popup_active"),g()})}function g(){const e=o("body");if(e){if(f?.classList.contains("popup_active")){e.style.overflow="hidden";return}e.style.overflow="auto"}}function Q(e){const t=o("#sup-popup");if(!t)return;const a=new P(t,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});a.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте зображення"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),a.onSuccess(async()=>{const n=o("#summ"),r=o("#file");n&&r&&await W(n,r,e),window.location.reload()})}async function W(e,t,a){const n=t?.files?.[0];if(!n)return;const r=await X(n);await T(x(_,"payments"),{sum:e.value,img:r,date:new Date().toLocaleDateString("ru-RU"),userId:D.id,prodId:A,prodUserId:a,status:"waiting"})}async function X(e){if(!e)throw new Error("Нет файла");const t=S(M,`payments/${e.name}`);return await F(t,e),await R(t)}const Y=new URLSearchParams(window.location.search),Z=Y.get("id")||void 0,h=JSON.parse(localStorage.getItem("user")||"[]"),L=v.get("Role"),ee=v.get("UID");async function te(e,t){Z&&(oe(e,t),V(e.link,t.id))}function oe(e,t){const a=o(".prod-info__img"),n=o(".info__title"),r=o(".info__owner"),s=o(".info__about"),i=o(".info__goal span"),l=o(".info__collected span"),c=o(".progress-bar__progress");!a||!n||!r||!s||!i||!l||!c||(a.innerHTML=`
    <img src="${e.img}" alt="${e.title}"></img>
  `,console.log(L,h.id===t.id),ee&&(h.id===t.id||L==="admin")?n.innerHTML=`
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
  `,s.innerText=e.discription,i.innerText=e.goal+"грн.",l.innerText=e.collected+"грн.",c.style.width=e.collected*100/e.goal+"%")}const I=o(".info__title"),y=o(".prod-info"),U=o(".page"),ne=new URLSearchParams(window.location.search),u=ne.get("id");async function ae(e){if(!y||!I)return;const t=o("span",I);t&&t.addEventListener("click",async()=>{y.style.display="none",re(e)})}function re(e){if(!U)return;const t=C("div","change-info");t.innerHTML=`
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
  `,U.appendChild(t);const a=o("#title"),n=o("#goal"),r=o("#collected"),s=o("#discription"),i=o("#img");!a||!n||!r||!s||!i||(a.value=e.title,n.value=e.goal.toString(),r.value=e.collected.toString(),s.value=e.discription,setTimeout(()=>{se(e,a,n,r,s,i)},100))}function se(e,t,a,n,r,s){const i=o("#change-info");if(!i)return;const l=new P(i,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});l.addField("#title",[{rule:"required",errorMessage:"Введіть назву збору"},{rule:"minLength",value:2,errorMessage:"Довжина назви повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина назви повинна бути менше"}]).addField("#goal",[{rule:"required",errorMessage:"Це обов'язкове поле"}]).addField("#collected",[{rule:"required",errorMessage:"Це поле обовʼязкове"},{validator:()=>{const c=o("#collected");if(!c)return!1;const p=c.value.trim().replace(",","."),d=parseFloat(p);return isNaN(d)?!1:d>=e.collected},errorMessage:`Значення має бути більше або рівна ${e.collected}`}]).addField("#discription",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:20,errorMessage:"Напишіть трохи більше інформації"}]),l.onSuccess(async()=>{await ie(t,a,n,r,s),window.location.href=`/Kindred/prod.html?id=${u}`})}async function ie(e,t,a,n,r){const s=e.value,i=t.value,l=a.value,c=n.value,p=r?.files?.[0];try{if(!u)return;const d=await le(p),E=k(_,"prods",u);await q(E,{img:d,title:s,goal:i,discription:c,collected:l})}catch(d){console.error(d)}}async function le(e=null){if(!e){if(!u)throw new Error("Нет файла");const n=await B(k(_,"prods",u));if(!n||!n.data()?.img)throw new Error("Нет файла");return n.data()?.img}const t=S(M,`prods/${e.name}`);return await F(t,e),await R(t)}const ce=new URLSearchParams(window.location.search),$=ce.get("id")||void 0,de=JSON.parse(localStorage.getItem("user")||"[]");document.addEventListener("DOMContentLoaded",async()=>{if(!$)return;const e=await H($);if(!e)return;const t=await w(e.userId),a=await w(de.id);console.log(e,t,a),!(!t||!a)&&(J(),await te(e,t),await ae(e),N())});document.addEventListener("loadingIsFinished",()=>{O()});

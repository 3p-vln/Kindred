import{g as n,h as I,b as f,d as u,u as h,i as T,a as C,c as N,e as v,r as q,j as B,k as H,l as J,m as O,f as A,s as K,p as j}from"./preloader-gurskksm.js";import{J as $}from"./just-validate.es-C73wyOde.js";const L=n(".info__btn"),_=n(".popup"),w=n(".popup__link"),G=n(".popup__close"),V=new URLSearchParams(window.location.search),S=V.get("id")||void 0,R=JSON.parse(localStorage.getItem("user")||"[]"),z=I.get("UID");function Q(e,o){if(R&&z){L?.addEventListener("click",()=>{_?.classList.add("popup_active"),b(),w&&(w.href=e,w.innerText=e)}),W(),b(),X(o);return}L?.addEventListener("click",()=>{window.location.href="/Kindred/log-in.html"})}function W(){G?.addEventListener("click",()=>{_?.classList.contains("popup_active")&&_?.classList.remove("popup_active"),b()})}function b(){const e=n("body");if(e){if(_?.classList.contains("popup_active")){e.style.overflow="hidden";return}e.style.overflow="auto"}}function X(e){const o=n("#sup-popup");if(!o)return;const t=new $(o,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});t.addField("#file",[{rule:"minFilesCount",value:1,errorMessage:"Будь ласка, додайте зображення"}]).addField("#summ",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"}]),t.onSuccess(async()=>{const s=n("#summ");s&&await Y(Number(s.value),e),window.location.reload()})}async function Y(e,o){if(!S)return;const t=f(u,"prods",S);await h(t,{collected:Number(o+e)});const s=f(u,"users",R.id);await h(s,{supportedProds:T(t.id)})}const Z=new URLSearchParams(window.location.search),M=Z.get("id")||void 0,ee=JSON.parse(localStorage.getItem("user")||"[]"),oe=I.get("Role"),te=I.get("UID");async function ne(){if(!M)return;const e=[];try{const o=await C(N(u,"prods"));for(const s of o.docs){const a=s.data();if(!a.status){let r={name:"Unknown",surname:"",score:0,id:"unknown"};if(a.userId){const i=f(u,"users",a.userId),c=await v(i);if(c.exists()){const d=c.data(),m=d.myProds||[];let l=0;for(const D of m){const E=f(u,"prods",D),y=await v(E);y.exists()&&y.data().status===!0&&l++}const g=m.length,F=g>0?l/g:0,x=Math.min(Math.ceil(F*5),5);r={name:d.name||"—",surname:d.surname||"",score:x,id:c.id||""}}}e.push({id:s.id,img:a.img,title:a.title,goal:a.goal,collected:a.collected,userInfo:r,discription:a.discription,link:a.link})}}const t=e.find(s=>s.id===M);if(!t)throw new Error;se(t),Q(t.link,t.collected)}catch(o){console.error("Ошибка при получении документов:",o)}}function se(e){const o=n(".prod-info__img"),t=n(".info__title"),s=n(".info__owner"),a=n(".info__about"),r=n(".info__goal span"),i=n(".info__collected span"),c=n(".progress-bar__progress");!o||!t||!s||!a||!r||!i||!c||(o.innerHTML=`
    <img src="${e.img}" alt="${e.title}"></img>
  `,te&&(ee.id===e.userInfo.id||oe==="admin")?t.innerHTML=`
    ${e.title} 
    <span>
      <svg>
        <use href="#pencil"></use>
      </svg>
    </span>
  `:t.innerText=e.title,s.innerHTML=`
  <div>
    <span>Збір від </span>
    ${e.userInfo.name} ${e.userInfo.surname}
  </div>
   
  <div class="score">
    ${e.userInfo.score} 
    <svg>
      <use href="#star"></use>
    </svg>
  </div>
  `,a.innerText=e.discription,r.innerText=e.goal+"грн.",i.innerText=e.collected+"грн.",c.style.width=e.collected*100/e.goal+"%")}const P=n(".info__title"),U=n(".prod-info"),k=n(".page"),ae=new URLSearchParams(window.location.search),p=ae.get("id");async function re(){if(!U||!P||!p)return;const e=n("span",P);e&&e.addEventListener("click",async()=>{try{const t=(await v(f(u,"prods",p))).data();U.style.display="none",ie(t)}catch(o){console.error(o)}})}function ie(e){if(!k)return;const o=q("div","change-info");o.innerHTML=`
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
  `,k.appendChild(o);const t=n("#title"),s=n("#goal"),a=n("#collected"),r=n("#discription"),i=n("#img");!t||!s||!a||!r||!i||(t.value=e.title,s.value=e.goal.toString(),a.value=e.collected.toString(),r.value=e.discription,setTimeout(()=>{ce(e,t,s,a,r,i)},100))}function ce(e,o,t,s,a,r){const i=n("#change-info");if(!i)return;const c=new $(i,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});c.addField("#title",[{rule:"required",errorMessage:"Введіть назву збору"},{rule:"minLength",value:2,errorMessage:"Довжина назви повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина назви повинна бути менше"}]).addField("#goal",[{rule:"required",errorMessage:"Це обов'язкове поле"}]).addField("#collected",[{rule:"required",errorMessage:"Це поле обовʼязкове"},{validator:()=>{const d=n("#collected");if(!d)return!1;const m=d.value.trim().replace(",","."),l=parseFloat(m);return isNaN(l)?!1:l>=e.collected},errorMessage:`Значення має бути більше або рівна ${e.collected}`}]).addField("#discription",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:20,errorMessage:"Напишіть трохи більше інформації"}]),c.onSuccess(async()=>{await le(o,t,s,a,r),window.location.href=`/Kindred/prod.html?id=${p}`})}async function le(e,o,t,s,a){const r=e.value,i=o.value,c=t.value,d=s.value,m=a?.files?.[0];try{if(!p)return;const l=await de(m),g=f(u,"prods",p);await h(g,{img:l,title:r,goal:i,discription:d,collected:c})}catch(l){console.error(l)}}async function de(e=null){if(!e){if(!p)throw new Error("Нет файла");const s=await v(f(u,"prods",p));if(!s||!s.data()?.img)throw new Error("Нет файла");return s.data()?.img}const o=B(H,`prods/${e.name}`);return await J(o,e),await O(o)}document.addEventListener("DOMContentLoaded",async()=>{A(),await ne(),await re(),K()});document.addEventListener("loadingIsFinished",()=>{j()});

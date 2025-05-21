import{g as o,c as U,r as M,k as c,f as d,l as L,m as E,h as C,i as I,u as P,j as $,w as D,t as S,x as T,b as F,s as B,p as k}from"./firebace-Cb3kG9CG.js";import{h as J,c as N}from"./requests-8AYIeyfP.js";import{J as O}from"./just-validate.es-C73wyOde.js";const i=o(".one-new__operation"),u=o(".one-new"),g=o(".page"),j=new URLSearchParams(window.location.search),s=j.get("id"),R=U.get("Role");async function q(e,n){if(!(!u||!i))if(R==="admin"||n===e.userId){const t=o(".one-new__edit",i);if(!t)return;t.addEventListener("click",async()=>{u.style.display="none",H(e)})}else i.remove()}function H(e){if(!g)return;const n=M("div","change-info");n.innerHTML=`
    <div class="container">
      <div class="change-info__content">
        <form id="change-info">
          <div class="change-info__form form">
            <div class="form__item">
              <label class="form__label" for="title">Заголовок новини/звітності</label>
              <input class="form__input" type="text" id="title">
            </div>
      
            <div class="form__item">
              <label class="form__label" for="info">Текст новини</label>
              <textarea class="form__textarea" id="info"></textarea>
            </div>
      
            <div class="form__item">
              <label class="form__label" for="img">Зображення для новини</label>
              <input class="form__input" type="file" id="img" accept="image/*">
            </div>
      
            <button class="form__btn btn btn_orange" type="submit">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  `,g.appendChild(n);const t=o("#title"),a=o("#info"),r=o("#img");!t||!a||!r||(t.value=e.title,a.value=e.info,setTimeout(()=>{K(t,a,r)},100))}function K(e,n,t){const a=o("#change-info");if(!a)return;const r=new O(a,{errorLabelStyle:{color:"#ff7d4e"},focusInvalidField:!0,lockForm:!1,validateBeforeSubmitting:!0});r.addField("#title",[{rule:"required",errorMessage:"Введіть заголовок новини/звітності"},{rule:"minLength",value:2,errorMessage:"Довжина заголовку повинна бути більше 1 літери"},{rule:"maxLength",value:50,errorMessage:"Довжина заголовку повинна бути менше"}]).addField("#info",[{rule:"required",errorMessage:"Це обов'язкове поле для заповнення"},{rule:"minLength",value:200,errorMessage:"Напишіть трохи більше інформації"}]),r.onSuccess(async()=>{await A(e,n,t),window.location.href=`/Kindred/one-new.html?id=${s}`})}async function A(e,n,t){const a=e.value,r=n.value,l=t?.files?.[0];try{if(!s)return;const m=await V(l),x=c(d,"news",s);await L(x,{img:m,title:a,info:r})}catch(m){console.error(m)}}async function V(e=null){if(!e){if(!s)throw new Error("Нет файла");const a=await E(c(d,"news",s));if(!a||!a.data()?.img)throw new Error("Нет файла");return a.data()?.img}const n=C(I,`news/${e.name}`);return await P(n,e),await $(n)}async function z(e,n){if(!(!u||!i))if(R==="admin"||n===e.userId){const t=o(".one-new__delete",i);if(!t)return;t.addEventListener("click",async()=>{await G(e)})}else i.remove()}async function G(e){try{const t=decodeURIComponent(e.img).split("/o/")[1].split("?")[0],a=C(I,t);await D(a);const r=c(d,"news",e.id);await S(r);const l=c(d,"users",e.userId);await L(l,{myNews:T(e.id)}),window.location.href="/Kindred/news.html"}catch(n){console.error(n)}}const f=o(".one-new__name"),w=o(".one-new__score"),_=o(".one-new__date"),v=o(".one-new__title"),h=o(".one-new__text"),p=o(".one-new__img img");function Q(e,n){!f||!w||!_||!v||!h||!p||(f.innerText=`${n.surname} ${n.name?n.name.charAt(0).toUpperCase()+".":""}`,f.href=`user.html?id=${n.id}`,w.innerHTML=`
    ${n.score.reduce((t,a)=>t+Number(a),0)/n.score.length}
    <svg>
      <use href="#star"></use>
    </svg>
    `,_.innerText=e.date,v.innerText=e.title,h.innerText=e.info,p.src=e.img)}const W=new URLSearchParams(window.location.search),b=W.get("id")||void 0,y=JSON.parse(localStorage.getItem("user")||"[]");document.addEventListener("DOMContentLoaded",async()=>{if(!b)return;const e=await J(b);if(!e)return;const n=await N(e.userId);n&&(await q(e,y.id),await z(e,y.id),Q(e,n),F(),B())});document.addEventListener("loadingIsFinished",()=>{k()});

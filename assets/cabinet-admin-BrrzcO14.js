import{g as c,r as i,j as m,e as f,t as v,k as $,b as w,s as R,p as O}from"./firebace-C7PoGh49.js";import{d as T,c as E,l as P,r as k,i as I,a as U,b as A,v as D}from"./redirect-Ctg2pMy4.js";import{r as L,p as x,v as M,a as F}from"./payments-yJO0jUYF.js";import{g as N,a as S,d as B}from"./requests-DCCC18zj.js";import"./index-yFKSUj0c.js";import"./just-validate.es-C73wyOde.js";import"./add-reg-user-DqNex4dN.js";const H=JSON.parse(localStorage.getItem("user")||"[]");async function j(e,n,t){const r=c(".users__content"),o=[];if(!r)return;e.forEach(a=>{const s={id:a.id,img:a.img,name:a.name,surname:a.surname,allCollections:a.myProds.length,succsesfulCollections:0,dateOfRegister:a.dateOfRegister,role:a.role,allProducts:a.myProds};a.myProds.forEach(p=>{n.forEach(l=>{l.id===p&&l.status&&s.succsesfulCollections++})}),s.id!==H.id&&o.push(s)}),o.sort((a,s)=>b(s.dateOfRegister).getTime()-b(a.dateOfRegister).getTime()).forEach(a=>{J(a,r,t)})}function b(e){const[n,t,r]=e.split(".").map(Number);return new Date(r,t-1,n)}function J(e,n,t){const r=i("div",["user-card",`user-card_${e.id}`]),o=i("a",["user",`user_${e.id}`]),d=i("div","user__img");d.innerHTML=`
     <img src="${e.img}" alt="${e.name}"/>
  `;const a=i("div","user__info"),s=i("div","user__name");s.innerText=`${e.name} ${e.surname}`;const p=i("div","user__all");p.innerText=`Кількість зборів: ${e.allCollections}`;const l=i("div","user__succsesful");l.innerText=`Успішних зборів: ${e.succsesfulCollections}`;const y=i("div","user__reg-date");y.innerText=`На сайті з ${e.dateOfRegister}`,a.appendChild(s),a.appendChild(p),a.appendChild(l),a.appendChild(y),o.appendChild(d),o.appendChild(a);const u=i("div",["user-card__operation","operation"]),C=i("div",["operation__role","role"]);C.innerHTML=`
            <p>Роль: </p>
            <form id="form-${e.id}">
              <label class="role__radio" for="admin-${e.id}">
                <input type="radio" id="admin-${e.id}" name="role${e.id}" ${e.role==="admin"?"checked":""}>
  
                <span class="custom-radio"></span>
  
                Адмін
              </label>
  
              <label class="role__radio" for="volunteer-${e.id}">
                <input type="radio" id="volunteer-${e.id}" name="role${e.id}" ${e.role==="volunteer"?"checked":""}>
  
                <span class="custom-radio"></span>
  
                Волонтер
              </label>
  
              <label class="role__radio" for="user-${e.id}">
                <input type="radio" id="user-${e.id}" name="role${e.id}" ${e.role==="customer"?"checked":""}>
  
                <span class="custom-radio"></span>
  
                Звич. користувач
              </label>
            </form>
  `;const _=i("div","operation__btns"),h=i("button",["operation__btn","btn","btn_yellow"]);h.innerText="Зберегти",h.addEventListener("click",async()=>{await z(e),T("")});const g=i("button",["operation__btn","btn","btn_red"]);g.innerText="Видалити",g.addEventListener("click",async()=>{await q(e,t)}),_.appendChild(h),_.appendChild(g),u.appendChild(C),u.appendChild(_),r.appendChild(o),r.appendChild(u),n.appendChild(r)}async function q(e,n){try{for(const r of e.allProducts){const o=m(f,"prods",r);await v(o);for(const d of n)if(d.prodId===r||d.userId===e.id){const a=m(f,"payments",d.id);await v(a)}}const t=m(f,"users",e.id);await v(t),c(`.user-card_${e.id}`)?.remove()}catch(t){console.error(t)}}async function z(e){const n=c(`#admin-${e.id}`),t=c(`#volunteer-${e.id}`),r=c(`#user-${e.id}`);try{const o=m(f,"users",e.id);n?.checked&&await $(o,{role:"admin"}),t?.checked&&await $(o,{role:"volunteer"}),r?.checked&&await $(o,{role:"customer"})}catch(o){console.error(o)}}document.addEventListener("DOMContentLoaded",async()=>{const e=await N(),n=await S(),t=await B();!e||!n||!t||(await E(e,n),await L(e,n,t),await P(),await x(t,e,n),await j(n,e,t),w(),k(),I(),U(),A(),D(),M(),F(),R())});document.addEventListener("loadingIsFinished",()=>{O()});

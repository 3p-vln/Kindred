import{g as l,r as i,k as f,f as u,t as C,a as y,l as b,b as M,s as P,p as k}from"./firebace-Cb3kG9CG.js";import{d as I,c as U,l as H,r as B,i as D,a as F,b as N,v as S}from"./redirect-3zRZpCuu.js";import{r as J,p as j,v as q,a as z}from"./payments-BVtqD0Qe.js";import{a as E,g as O,d as L,e as x}from"./requests-8AYIeyfP.js";import"./index-yFKSUj0c.js";import"./just-validate.es-C73wyOde.js";import"./add-reg-user-BtWTIkcb.js";const G=JSON.parse(localStorage.getItem("user")||"[]");async function A(e,a,o,n){const t=l(".users__content"),d=[];if(!t)return;e.forEach(r=>{const c={id:r.id,img:r.img,name:r.name,surname:r.surname,allCollections:r.myProds.length,succsesfulCollections:0,dateOfRegister:r.dateOfRegister,role:r.role,allProducts:r.myProds};r.myProds.forEach(_=>{a.forEach(m=>{m.id===_&&m.status&&c.succsesfulCollections++})}),c.id!==G.id&&d.push(c)}),d.sort((r,c)=>R(c.dateOfRegister).getTime()-R(r.dateOfRegister).getTime()).forEach(r=>{K(r,t,o,n)})}function R(e){const[a,o,n]=e.split(".").map(Number);return new Date(n,o-1,a)}function K(e,a,o,n){const t=i("div",["user-card",`user-card_${e.id}`]),d=i("a",["user",`user_${e.id}`]);d.href=`user.html?id=${e.id}`;const s=i("div","user__img");s.innerHTML=`
     <img src="${e.img}" alt="${e.name}"/>
  `;const r=i("div","user__info"),c=i("div","user__name");c.innerText=`${e.name} ${e.surname}`;const _=i("div","user__all");_.innerText=`Кількість зборів: ${e.allCollections}`;const m=i("div","user__succsesful");m.innerText=`Успішних зборів: ${e.succsesfulCollections}`;const $=i("div","user__reg-date");$.innerText=`На сайті з ${e.dateOfRegister}`,r.appendChild(c),r.appendChild(_),r.appendChild(m),r.appendChild($),d.appendChild(s),d.appendChild(r);const h=i("div",["user-card__operation","operation"]),v=i("div",["operation__role","role"]);v.innerHTML=`
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
  `;const g=i("div","operation__btns"),w=i("button",["operation__btn","btn","btn_yellow"]);w.innerText="Зберегти",w.addEventListener("click",async()=>{await V(e),I("")});const T=i("button",["operation__btn","btn","btn_red"]);T.innerText="Видалити",T.addEventListener("click",async()=>{await Q(e,o,n)}),g.appendChild(w),g.appendChild(T),h.appendChild(v),h.appendChild(g),t.appendChild(d),t.appendChild(h),a.appendChild(t)}async function Q(e,a,o){try{for(const t of e.allProducts){const d=f(u,"prods",t);await C(d);for(const s of a)if(s.prodId===t||s.userId===e.id){const r=f(u,"payments",s.id);await C(r)}for(const s of o)if(s.userId===e.id){const r=f(u,"applications",s.id);await C(r)}}const n=f(u,"users",e.id);if(await C(n),l(`.user-card_${e.id}`)?.remove(),y(`.application_${e.id}`).forEach(t=>{t.remove()}),y(".application").length===0){const t=l(".volonteer-application__content");t&&(t.innerText="Заявки відсутні.")}}catch(n){console.error(n)}}async function V(e){const a=l(`#admin-${e.id}`),o=l(`#volunteer-${e.id}`),n=l(`#user-${e.id}`);try{const t=f(u,"users",e.id);a?.checked&&await b(t,{role:"admin"}),o?.checked&&await b(t,{role:"volunteer"}),n?.checked&&await b(t,{role:"customer"})}catch(t){console.error(t)}}const p=l(".volonteer-application__content");async function W(e,a){const o=[];e.forEach(n=>{a.forEach(t=>{t.id===n.userId&&o.push({id:n.id,about:n.about,city:n.city,dateOfBirth:n.date,email:n.email,userId:n.userId,name:n.name,surname:n.surname,time:n.time,dateOfRegister:t.dateOfRegister,img:t.img,phone:n.phone})})}),o.length===0&&p&&(p.innerText="Заявки відсутні."),o.forEach(n=>{X(n)})}function X(e){console.log(p,e);const a=i("div",["application",`application_${e.userId}`]),o=i("div","application__img");o.innerHTML=`
    <img src="${e.img}" alt="${e.name}"/>
  `;const n=i("div","application__info"),t=i("p","application__name");t.innerText=e.name+" "+e.surname;const d=i("p","application__date-of-reg");d.innerText=`На сайті з ${e.dateOfRegister}`;const s=i("p","application__date-birth");s.innerHTML=`
    <span>Дата народження: </span>${e.dateOfBirth}
  `;const r=i("p","application__city");r.innerHTML=`
    <span>Місто: </span>${e.city}
  `;const c=i("p","application__phone");c.innerHTML=`
    <span>Контактний номер телефону: </span>${e.phone}
  `;const _=i("p","application__email");_.innerHTML=`
    <span>E-mail: </span>${e.email}
  `;const m=i("p","application__about");m.innerHTML=`
    <span>Про себе: </span>${e.about}
  `;const $=i("p","application__time");$.innerHTML=`
    <span>Час який готовий приділяти: </span>${e.time}
  `;const h=i("button","application__btns"),v=i("button",["application__btn","btn","btn_red"]);v.innerText="Відхилити",v.addEventListener("click",async()=>{await Y(e)});const g=i("button",["application__btn","btn","btn_yellow"]);g.innerText="Змінити роль",g.addEventListener("click",async()=>{await Z(e),await ee(),I("змінено")}),h.appendChild(v),h.appendChild(g),n.appendChild(t),n.appendChild(d),n.appendChild(s),n.appendChild(r),n.appendChild(c),n.appendChild(_),n.appendChild(m),n.appendChild($),n.appendChild(h),a.appendChild(o),a.appendChild(n),p&&p.appendChild(a)}async function Y(e){try{const a=f(u,"applications",e.id);await C(a),l(`.application_${e.userId}`)?.remove(),y(".application").length===0&&p&&(p.innerText="Заявки відсутні.")}catch(a){console.error(a)}}async function Z(e){const a=f(u,"users",e.userId);await b(a,{role:"volunteer"});const o=f(u,"applications",e.id);await C(o),l(`.application_${e.userId}`)?.remove(),y(".application").length===0&&p&&(p.innerText="Заявки відсутні.")}async function ee(){const e=await E(),a=await O(),o=await L(),n=await x();!e||!a||!o||!n||await A(e,a,o,n)}document.addEventListener("DOMContentLoaded",async()=>{const e=await O(),a=await E(),o=await L(),n=await x();!e||!a||!o||!n||(await U(e,a),await J(e,a,o),await H(),await j(o,e,a),await A(a,e,o,n),await W(n,a),M(),B(),D(),F(),N(),S(),q(),z(),P())});document.addEventListener("loadingIsFinished",()=>{k()});

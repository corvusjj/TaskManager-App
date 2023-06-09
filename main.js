(()=>{"use strict";var e={192:(e,t,r)=>{r.d(t,{Z:()=>i});var o=r(81),s=r.n(o),n=r(645),a=r.n(n)()(s());a.push([e.id,'*,*::before,*::after{box-sizing:border-box;padding:0;margin:0}body{font-family:"Helvetica"}header{background:#2e2e2e;display:flex;justify-content:space-between;padding:7px 25px 7px 20px}.header-icon{width:36px;height:36px}.header-icon:hover{background:rgba(255,255,255,.4);border-radius:5px;cursor:pointer}.title{display:flex;align-items:center;color:#fff}.title h2{margin-left:10px}.profile{display:flex;align-items:center}.profile img{width:30px;height:30x;object-fit:cover;margin-left:15px}.profile img:hover{cursor:pointer}',""]);const i=a},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",o=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),o&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),o&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,o,s,n){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(a[c]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);o&&a[l[0]]||(void 0!==n&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=n),r&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=r):l[2]=r),s&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=s):l[4]="".concat(s)),t.push(l))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function r(e){for(var r=-1,o=0;o<t.length;o++)if(t[o].identifier===e){r=o;break}return r}function o(e,o){for(var n={},a=[],i=0;i<e.length;i++){var c=e[i],d=o.base?c[0]+o.base:c[0],l=n[d]||0,p="".concat(d," ").concat(l);n[d]=l+1;var u=r(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)t[u].references++,t[u].updater(f);else{var h=s(f,o);o.byIndex=i,t.splice(i,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function s(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,s){var n=o(e=e||[],s=s||{});return function(e){e=e||[];for(var a=0;a<n.length;a++){var i=r(n[a]);t[i].references--}for(var c=o(e,s),d=0;d<n.length;d++){var l=r(n[d]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}n=c}}},569:e=>{var t={};e.exports=function(e,r){var o=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(r)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var o="";r.supports&&(o+="@supports (".concat(r.supports,") {")),r.media&&(o+="@media ".concat(r.media," {"));var s=void 0!==r.layer;s&&(o+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),o+=r.css,s&&(o+="}"),r.media&&(o+="}"),r.supports&&(o+="}");var n=r.sourceMap;n&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={id:o,exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0,(()=>{var e=r(379),t=r.n(e),o=r(795),s=r.n(o),n=r(569),a=r.n(n),i=r(565),c=r.n(i),d=r(216),l=r.n(d),p=r(589),u=r.n(p),f=r(192),h={};h.styleTagTransform=u(),h.setAttributes=c(),h.insert=a().bind(null,"head"),h.domAPI=s(),h.insertStyleElement=l(),t()(f.Z,h),f.Z&&f.Z.locals&&f.Z.locals;class m{constructor(e,t,r){this.name=e,this.color=t,this.favorite=r,this.tasks=[]}changeName(e){this.name=e}changeColor(e){this.color=e}changeFavorite(e){this.favorite=e}addTask(e){this.tasks.push(e)}removeTask(e){const t=this.tasks.filter((t=>t.id!==e.id));this.tasks.length=0,this.tasks.push(...t)}}class g{constructor(e,t,r,o,s){this.title=e,this.description=t,this.dueDate=r,this.priority=o,this.notes=[],this.projectId=s}changeTitle(e){this.title=e}changeDescription(e){this.description=e}changeDueDate(e){this.dueDate=e}changePriority(e){this.priority=e}changeProjectId(e){this.projectId=e}addNote(e){this.notes.push(e)}removeNote(e){const t=this.notes.filter((t=>t.id!==e.id));this.notes.length=0,this.notes.push(...t)}}class v{constructor(e,t,r){this.note=e,this.taskId=t,this.projectId=r}updateNote(e){this.note=e}}const y=(()=>{let e=[];const t=()=>{localStorage.setItem("usedIDs",JSON.stringify(e))};return{generateId:()=>{let r="";function o(){for(let e=0;e<8;e++){const e=Math.floor(72*Math.random());r+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()".charAt(e)}}return o(),e.includes(r)&&(r="",o()),e.push(r),t(),r},removeId:r=>{const o=e.indexOf(r);e.splice(o,1),t()},usedIDs:e}})(),k=(()=>{let e=[];const t=()=>{localStorage.setItem("projects",JSON.stringify(e))};return{projects:e,createProject:(r,o,s)=>{const n=new m(r,o,s);n.id=y.generateId(),e.push(n),t()},deleteProject:r=>{const o=e.indexOf(e.find((e=>e.id===r)));e.splice(o,1),I.clearTasksFromDeletedProject(r),j.clearNotesFromDeletedProject(r),y.removeId(r),t()},placeTask:r=>{e.find((e=>e.id===r.projectId)).addTask(r),t()},removeTask:r=>{e.find((e=>e.id===r.projectId)).removeTask(r),t()},transferTask:(r,o)=>{const s=e.find((e=>e.id===r.projectId)),n=s.tasks.indexOf(r);s.tasks.splice(n,1),e.find((e=>e.id===o)).tasks.push(r),t()},updateProjectStorage:t}})(),I=(()=>{let e=[];const t=()=>{localStorage.setItem("tasks",JSON.stringify(e))};return{tasks:e,createTask:(r,o,s,n,a)=>{const i=new g(r,o,s,n,a);i.id=y.generateId(),e.push(i),k.placeTask(i),t()},deleteTask:r=>{const o=e.find((e=>e.id===r));k.removeTask(o);const s=e.indexOf(e.find((e=>e.id===r)));e.splice(s,1),j.clearNotesFromDeletedTask(r),y.removeId(r),t()},clearTasksFromDeletedProject:r=>{e.filter((e=>e.projectId===r)).map((e=>e.id)).forEach((e=>y.removeId(e)));const o=e.filter((e=>e.projectId!==r));e.length=0,e.push(...o),t()},placeNote:r=>{e.find((e=>e.id===r.taskId)).addNote(r),t()},removeNote:r=>{e.find((e=>e.id===r.taskId)).removeNote(r),t()},transferToOtherProject:(r,o)=>{const s=e.find((e=>e.id===r));k.transferTask(s,o),s.changeProjectId(o),t()},updateTaskStorage:t}})(),j=(()=>{let e=[];const t=()=>{localStorage.setItem("notes",JSON.stringify(e))};return{notes:e,createNote:(r,o,s)=>{const n=new v(r,o,s);n.id=y.generateId(),e.push(n),t(),I.placeNote(n)},deleteNote:r=>{const o=e.find((e=>e.id===r));I.removeNote(o);const s=e.indexOf(e.find((e=>e.id===r)));e.splice(s,1),y.removeId(r),t()},clearNotesFromDeletedTask:r=>{e.filter((e=>e.taskId===r)).map((e=>e.id)).forEach((e=>y.removeId(e)));const o=e.filter((e=>e.taskId!==r));e.length=0,e.push(...o),t()},clearNotesFromDeletedProject:r=>{e.filter((e=>e.projectId===r)).map((e=>e.id)).forEach((e=>y.removeId(e)));const o=e.filter((e=>e.projectId!==r));e.length=0,e.push(...o),t()},updateNoteStorage:t}})();k.createProject("Parkour","red",!0),k.createProject("Drumming","white",!1),I.createTask("Kong Vault","monkey style","date Magellan died","least Prio",k.projects[0].id),I.createTask("Drum Fill Lesson","just the basics","january 1, 1947","no prio",k.projects[1].id),j.createNote("warmup",I.tasks[0].id,k.projects[0].id),j.createNote("dive and raise hips",I.tasks[0].id,k.projects[0].id),j.createNote("drumeo vid 1",I.tasks[1].id,k.projects[1].id),console.log(k.projects),console.log(I.tasks),console.log(j.notes),console.log(y.usedIDs),localStorage.setItem("projects",JSON.stringify(k.projects)),localStorage.setItem("tasks",JSON.stringify(I.tasks)),localStorage.setItem("notes",JSON.stringify(j.notes))})()})();
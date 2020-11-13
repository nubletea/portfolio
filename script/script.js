const SECTIONS = document.querySelectorAll(".tab_list");
const NAV_BTNS = document.querySelectorAll(".button-nav a");
const NAV_INPUTS = document.querySelectorAll(".gnb input");
const NAV = document.querySelector('nav');
const NAV_LI = document.querySelectorAll(".gnb li");
const NAV_SPAN = document.querySelectorAll(".gnb span");
const NAV_BAR = document.querySelector(".nav_bar");
const HAN_BTNS = document.querySelectorAll(".ham_nav_list a");
const HAM_ICON = document.querySelector(".hamburger_icon");
const ARROW_A = document.querySelector(".arrow a"); 
const INTRO = document.querySelector(".intro");
const EYE_BOX = document.querySelector(".eye_box");
const INTRO_BTN = document.querySelector(".intro_btn");
const SUMMARY = document.querySelectorAll(".summary");
const addEventListener = (eventList, fn) => {
  for (let i = 0; i < eventList.length; i++) {
    eventList[i].onclick = fn;
  }
};
window.addEventListener("DOMContentLoaded", (e) => {
  // init
  // event를 여러곳에 걸지 않고 작업(예제)
  document.querySelector(".arrow").addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "expand_less":
        arrowFn(-1);
        break;
      case "expand_more":
        arrowFn(1);
        break;
      default:
        new Error("error");
        break;
    }
  });

  // 위와같은 방식으로 바꿔보는것도 좋음
  quick_evt();
  nav_hover();
  addEventListener(NAV_INPUTS, nav_bar);
  addEventListener(NAV_BTNS, btn_nav);
  addEventListener(HAN_BTNS, ham_nav);
  addEventListener([HAM_ICON], ham_call);
  addEventListener([INTRO_BTN], mouse_click);
});
///스크롤 작업///
window.addEventListener("wheel", function (e) {
  if (e.deltaY < 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrowFn(-1);
  } else if (e.deltaY > 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrowFn(1);
  } else {
    return;
  }
  setTimeout(() => {
    sc.sc_is = true;
  }, 500);
});
/* intro */
// eye
const eye_egg=function(selector){
  let   LEFT_EYE=document.querySelector(selector),
        EYE=LEFT_EYE.querySelector('.eye'),
        EYE_s=LEFT_EYE.getBoundingClientRect();
        
  let move=function(mouseX, mouseY){
      let doto=Math.atan2(mouseY-(EYE_s.y+EYE_s.height*0.5),mouseX-(EYE_s.x+EYE_s.width*0.5));
      EYE.style.transform="rotate("+(180*doto/Math.PI+90)+'deg)';
      };
      return{
        move:move  
      };
  };
   const left_eye=eye_egg('.left_eye'),
         right_eye=eye_egg('.right_eye');
   window.addEventListener('mousemove',function(e){
       left_eye.move(e.pageX,e.pageY);
       right_eye.move(e.pageX,e.pageY);
  });
// intro_btn
function mouse_click(){
    EYE_BOX.style.display="none";
    INTRO_BTN.innerHTML="";
    INTRO_BTN.classList.add("active");
    setTimeout(()=>{
      INTRO.style.display="none";
    },1000);
}
// 오브젝트 모음 //
const sc = {
  sc_is: true,
};
const nav = {
  set_Attr: function (ME, value) {
    ME.setAttribute("value", value);
  },
  for_set_Attr: function (ME, value) {
    for (let i = 0; i < ME.length; i++) {
      nav.set_Attr(ME[i], value);
    }
  },
};
const style_change = {
  top: function (ME, count, value) {
    for (let i = count; i < ME.length; i++) {
      ME[i].style.top = value;
    }
  },
};
const count = {
  arrow: 0,
  arr_button: [],
  arr_ham: [],
  ham_is: true,
  for_arr_push: function (arrname, ME) {
    for (let i = 0; i < ME.length; i++) {
      arrname.push(ME[i]);
    }
  }
};
const class_change = {
  remove: function (ME, class_name) {
    for (let i = 0; i < ME.length; i++) {
      ME[i].classList.remove(class_name);
    }
  },
  add: function (ME, class_name) {
    ME.classList.add(class_name);
  },
};
const quick = {
  img_arr:[],
  link_arr:[]
}
//버튼 콜백
function aro_col(btn, arr, count) {
  style_change.top(arr, 0, "-100%");
  style_change.top(arr, count, "100%");
  class_change.remove(btn, "active");
  class_change.add(btn[count], "active");
  class_change.remove(arr, "active");
  class_change.add(arr[count], "active");
  summary_evt();
  quick_evt();
  arr[count].style.top = "0";
}
//button nav
function btn_nav() {
  count.for_arr_push(count.arr_button, NAV_BTNS);
  count.arrow = count.arr_button.indexOf(this);
  aro_col(NAV_BTNS, SECTIONS, count.arrow);
}
//ham_call
function ham_call() {
  if (count.ham_is === true) {
    ham_col(HAM_ICON, 0, "close", false);
  } else {
    ham_col(HAM_ICON, "-100%", "menu", true);
  }
}
function ham_col(ME, value, HTML, is) {
  let ham = document.querySelector(".mobile_menu");
  ham.style.left = value;
  ME.innerHTML = '<span class="material-icons">' + HTML + "</span>";
  count.ham_is = is;
  console.log(count.ham_is);
}
//hamburger nav
function ham_nav() {
  ham_call();
  count.for_arr_push(count.arr_ham, HAN_BTNS);
  count.arrow = count.arr_ham.indexOf(this);
  aro_col(HAN_BTNS, SECTIONS, count.arrow);
}

const arrowFn = (step) => {
  const { arrow } = count;
  const limit = SECTIONS.length;
  let pos = arrow + step;
  if (limit == pos) {
    pos = 0;
  } else if (pos < 0) {
    pos = limit - 1;
  }
  count.arrow = pos;
  aro_col(NAV_BTNS, SECTIONS, pos);
  aro_col(HAN_BTNS, SECTIONS, pos);
};
///네비게이션 클릭시///
function nav_bar() {
  let checked = this.checked;
  if (checked === true && this.getAttribute("value") === "Y") {
    NAV_BAR.style.display="block";
    nav.for_set_Attr(NAV_INPUTS, "N");
    this.checked = false;
  } else {
    NAV_BAR.style.display="none";
    nav.for_set_Attr(NAV_INPUTS, "N");
    nav.set_Attr(this, "Y");
  }
}
/// TEXT_EVENT////
const summary_evt = () => {
  if(count.arrow===0){
    return class_change.remove(SUMMARY,'active');
  }else{
  class_change.remove(SUMMARY,'active');
  class_change.add(SUMMARY[count.arrow-1],'active');
  }
};
/// Nav-hover ///
const nav_hover = () => {
    for(let i=0;i<NAV_SPAN.length;i++){
      NAV_SPAN[i].onmouseover = () => {
        let li_width=NAV_LI[i].offsetWidth;
        let span_width=NAV_SPAN[i].offsetWidth;
        NAV_BAR.style.display="block";
        NAV_BAR.style.left=li_width*i+((li_width-span_width)/2+64)+'px';
        NAV_BAR.style.width=span_width+'px';
      }
    }
    NAV.onmouseleave = () => {
      NAV_BAR.style.display="none";
    }
}
/// quick_evt ///
const quick_evt = () => {
  for(let i=0;i<SECTIONS.length;i++){
    quick.link_arr.push(SECTIONS[i].dataset.link);
    quick.img_arr.push(i);
  }
  ARROW_A.innerHTML='<img src="images/git-icon/'+quick.img_arr[count.arrow]+'.png" alt="'+quick.img_arr[count.arrow]+'"><br>git';
  ARROW_A.setAttribute('href','https://github.com/nubletea'+quick.link_arr[count.arrow]);
}
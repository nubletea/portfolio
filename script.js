///스크롤 작업///
window.addEventListener('wheel', function(e)
{
 if (e.deltaY < 0 && sc.sc_is===true){
    sc.sc_is=false;
    arrow_up();
}else if(e.deltaY > 0 && sc.sc_is===true)
{
    sc.sc_is=false;
    arrow_down();
}else{
    return;
};
setTimeout(() => {
    sc.sc_is=true;
},500);
});
// 오브젝트 모음 //
const sc={
    sc_is:true
} 
const nav={
    set_Attr:function(ME,value){
        ME.setAttribute('value',value);
    },
    for_set_Attr:function(ME,value){
        for(let i=0;i<ME.length;i++){
            nav.set_Attr(ME[i],value);
        } 
    }
};
const style_change={
    top:function(ME,count,value){
        for(let i=count;i<ME.length;i++){
            ME[i].style.top=value;
        }
    }
};
const count={
    arrow:0,
    arr_button:[],
    arr_ham:[],
    ham_is:true,
    for_arr_push:function(arrname,ME){
        for(let i=0;i<ME.length;i++){
            arrname.push(ME[i]);
        }
    }
};
const class_change={
    remove:function(ME,class_name){
        for(let i=0;i<ME.length;i++){
            ME[i].classList.remove(class_name);
        }
    },
    add:function(ME,class_name){
        ME.classList.add(class_name);
    }
};
//버튼 콜백
function aro_col(btn,section,count){
    style_change.top(section,0,'-100%');
    style_change.top(section,count,'100%');
    class_change.remove(btn,'active');
    class_change.add(btn[count],'active');
    class_change.remove(section,'active');
    class_change.add(section[count],'active');
    section[count].style.top='0';
};
//button nav
function btn_nav(ME){
    let section=document.querySelectorAll('.tab_list');
    let btn_a=document.querySelectorAll('.button-nav a');
    count.for_arr_push(count.arr_button,btn_a);
    count.arrow=count.arr_button.indexOf(ME);
        aro_col(btn_a,section,count.arrow);
};
//ham_call
function ham_call(ME){
    if(count.ham_is===true){
        ham_col(ME,0,'close',false);
    }else{
        ham_col(ME,'-100%','menu',true);
    }
}
function ham_col(ME,value,HTML,is){
    let ham=document.querySelector('.mobile_menu');
    ham.style.left=value;
    ME.firstChild.innerHTML=HTML;
    count.ham_is=is;
}
//hamburger nav
function ham_nav(ME){
    let section=document.querySelectorAll('.tab_list');
    let ham_a=document.querySelectorAll('.ham_nav_list a');
    let ham_icon=document.querySelector('.hamburger_icon');
    ham_call(ham_icon);
    count.for_arr_push(count.arr_ham,ham_a);
    count.arrow=count.arr_ham.indexOf(ME);
        aro_col(ham_a,section,count.arrow);
};
//up 버튼
function arrow_up(){
    let section=document.querySelectorAll('.tab_list');
    let ham_a=document.querySelectorAll('.ham_nav_list a');
    let btn_a=document.querySelectorAll('.button-nav a');
    if(count.arrow===0){
        count.arrow=section.length-1;
        aro_col(btn_a,section,count.arrow);
        aro_col(ham_a,section,count.arrow);
    }else{
        count.arrow-=1;
        aro_col(btn_a,section,count.arrow);
        aro_col(ham_a,section,count.arrow);
    }
};
//down 버튼
function arrow_down(){
    let section=document.querySelectorAll('.tab_list');
    let ham_a=document.querySelectorAll('.ham_nav_list a');
    let btn_a=document.querySelectorAll('.button-nav a');
    if(count.arrow===section.length-1){
        count.arrow=0;
        aro_col(btn_a,section,count.arrow);
        aro_col(ham_a,section,count.arrow);
    }else{
        count.arrow+=1;
        aro_col(btn_a,section,count.arrow);
        aro_col(ham_a,section,count.arrow);
    }
};
///네비게이션 클릭시///
function nav_bar(ME){
    let checked=ME.checked;
    let Y=ME.getAttribute('value');
    let input=document.querySelectorAll('.gnb input');
    if(checked===true && Y==='Y'){
        nav.for_set_Attr(input,"N");
        ME.checked=false;
    }else{
        nav.for_set_Attr(input,"N");
        nav.set_Attr(ME,'Y');
    }
};
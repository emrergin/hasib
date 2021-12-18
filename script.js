// BURADA HESAP ICIN GEREKEN FONKSIYONLAR VAR=======================================
function ekle()
{
    return arguments[0]+arguments[1];
}

function cikar()
{
    return arguments[0]-arguments[1];
}

function carp()
{
    return arguments[0]*arguments[1];
}

function bol()
{
    return arguments[0]/arguments[1];
}

function operate(say1,islem,say2){
    if (islem==`+`){return ekle(say1,say2);}
    if (islem==`-`){return cikar(say1,say2);}
    if (islem==`×`){return carp(say1,say2);}
    if (islem==`÷`){return bol(say1,say2);}
}

// BURADA BUTUN LISTENERLAR TANIMLANIYOR=======================================
const ekranDegeri=document.getElementById(`displayText`);
const sayilar = document.querySelectorAll('.sayi');
const islemler = document.querySelectorAll('.islem');
const esittir=document.getElementById(`esittir`);
const tertemiz=document.getElementById(`C`);
const geri=document.getElementById(`sil`);
const nokta=document.getElementById(`nokta`);
const kurukafa=document.getElementById(`dont`);
const dugmeler=document.querySelectorAll(`.karman`);
const audioses = document.querySelector("#ses");
const audiokisases = document.querySelector("#kisases");

let gercekDeger=`0`;
let kaosSayaci=0;

let ciktiGenisligi = ekranDegeri.clientWidth ;
ekranDegeri.style.cssText=`font-size:${ciktiGenisligi/9.85}px;`;


sayilar.forEach((sayi) => {
    sayi.addEventListener('click', sayiKoy);
})

islemler.forEach((islem) => {
    islem.addEventListener('click', islemKoy);
})

tertemiz.addEventListener('click',temizle);
esittir.addEventListener('click',hesapla);
geri.addEventListener('click',sil);
kurukafa.addEventListener('click',kaosCikar);
nokta.addEventListener('click',noktala);

window.addEventListener('keydown',tuslarlaYaz);

// BURADA DUGMELERLE ILGILI FONKSIYONLAR VAR=======================================
function sayiKoy(e){
    sayiKoyGenel(e.target.textContent);
}

function sayiKoyGenel(ek){
    if (ekranDegeri.textContent.length<15){
        gercekDeger+=ek;
        gercekDeger=gercekDeger.replace(/^([0])([0-9])/g,bastakiSifiriSil);
        gercekDeger=gercekDeger.replace(/([^0-9])([0])([0-9])/g,islemSonrasiSifiriSil);
        ekranDegeri.textContent=gorselDegerBul(gercekDeger);
    }    
}
function bastakiSifiriSil(match, p1, p2, p3, offset, string){
    // console.log(p1);
    return p2;
}

function islemSonrasiSifiriSil(match, p1, p2, p3, offset, string){
    return [p1, p3].join('');
}
function islemKoy(e){
    islemKoyGenel(e.target.textContent);
}

function islemKoyGenel(ek){
    if (ekranDegeri.textContent.length<15 && !(gercekDeger.charAt(gercekDeger.length-1)===`+`)&& !(gercekDeger.charAt(gercekDeger.length-1)===`-`) &&
    !(gercekDeger.charAt(gercekDeger.length-1)===`×`) && !(gercekDeger.charAt(gercekDeger.length-1)===`÷`)  &&!(gercekDeger.charAt(gercekDeger.length-1)===`.`)){
        gercekDeger+=ek;
        ekranDegeri.textContent=gorselDegerBul(gercekDeger);
    }    
}

function sonHucre(metin){
    return !(isNaN(metin.charAt(metin.length-1)));
}

function temizle(){
    ekranDegeri.textContent=`0`;
    gercekDeger=`0`;
    kaosSayaci=0;
}

function hesapla(){
    let sonucMetni=gercekDeger;
    if (!sonHucre(sonucMetni)){
        sonucMetni = sonucMetni.slice(0, -1); 
    }
    let sayi1=parseFloat(sonucMetni);
    sonucMetni=sonucMetni.replace(sayi1,'');
    if (sonucMetni === "")
    {
        gercekDeger=`${sayi1}`;
        ekranDegeri.textContent=gorselDegerBul(gercekDeger);
        return;
    }
    let islem=sonucMetni.charAt(0);
    sonucMetni=sonucMetni.replace(islem,'');
    let sayi2=parseFloat(sonucMetni);
    sonucMetni=sonucMetni.replace(sayi2,'');
    gercekDeger=operate(sayi1,islem,sayi2)+sonucMetni;
    ekranDegeri.textContent=gorselDegerBul(gercekDeger);
}

function sil(){
    gercekDeger=gercekDeger.slice(0, -1);
    if (gercekDeger.length===0) {
        gercekDeger=`0`;
    }
    ekranDegeri.textContent=gorselDegerBul(gercekDeger);
}

function kaosCikar(){
    kaosSayaci+=1;
    if (kaosSayaci<=3){
        alert("YAPMA!");
    }
    if (kaosSayaci>3){
        dugmeler.forEach((dugme) => {
            dugme.style.order= Math.floor(Math.random() * 20+1);
        })    
    }
    if (kaosSayaci>5){
        dugmeler.forEach((dugme) => {
            let zar=Math.random();
            if (zar>(1-kaosSayaci/20)){
                Math.random()>0.5? dugme.style.visibility="hidden" : dugme.style.display="none";
                ekranDegeri.style.cssText+=`transform: translate(${Math.random()}vw, ${Math.random()}vh) rotate(${25*Math.random()}deg)`;
            }
        })    
    } 
}

function noktala(){
    if (ekranDegeri.textContent.length<15 && sonHucre(gercekDeger) && !gercekDeger.match(/\.([^\+|\-|×|÷])+$/)){
        gercekDeger+=`.`;
    }
    ekranDegeri.textContent=gorselDegerBul(gercekDeger);
}

function tuslarlaYaz(e){
    if (e.keyCode===97 || e.keyCode===49) {sayiKoyGenel(`1`);}
    if (e.keyCode===98 || e.keyCode===50) {sayiKoyGenel(`2`);}
    if (e.keyCode===99 || e.keyCode===51) {sayiKoyGenel(`3`);}
    if (e.keyCode===100 || e.keyCode===52) {sayiKoyGenel(`4`);}
    if (e.keyCode===101 || e.keyCode===53) {sayiKoyGenel(`5`);}
    if (e.keyCode===102 || e.keyCode===54) {sayiKoyGenel(`6`);}
    if (e.keyCode===103 || e.keyCode===55) {sayiKoyGenel(`7`);}
    if (e.keyCode===104 || e.keyCode===56) {sayiKoyGenel(`8`);}
    if (e.keyCode===105 || e.keyCode===57) {sayiKoyGenel(`9`);}
    if (e.keyCode===96 || e.keyCode===58) {sayiKoyGenel(`0`);}
    if (e.keyCode===107 || e.keyCode===187) {islemKoyGenel(`+`);}
    if (e.keyCode===109) {islemKoyGenel(`-`);}
    if (e.keyCode===106) {islemKoyGenel(`×`);}
    if (e.keyCode===111 || e.keyCode===191) {islemKoyGenel(`÷`);}
    if (e.keyCode===13) {hesapla();}
    if (e.keyCode===190) {noktala();}
}



// BURADAN SONRASI GORULEN DEGERLE ILGILI=======================================
function gorselDegerBul(metin){
    let geciciDeger=``;
    geciciDeger= metin.replace(Infinity,'∞');
    geciciDeger=geciciDeger.replace(/(^[0-9]+)(\+|-|×|÷)([0-9]+)(\+|-|×|÷)/g,parantezEkle);
    let geciciDeger2=geciciDeger;
    do{
        geciciDeger=geciciDeger2;
        geciciDeger2=geciciDeger.replace(/^\(.+\)(\+|-|×|÷)([0-9]+)(\+|-|×|÷)/g,parantezEkle);
    }while(geciciDeger!==geciciDeger2);  
    geciciDeger=geciciDeger.replace(/([0-9]+)\.([0-9]+)/g,yuvarla);  
    return geciciDeger;
}


function parantezEkle(match, p1, p2, p3, offset, string){
    let bas=Array.from(match);
    bas.pop();
    bas=bas.join('');
    // console.log(bas);
    return (`(`+bas+`)`+match.charAt(match.length-1));
}

function yuvarla(match, p1, p2, p3, offset, string){
    match=Math.round((parseFloat(match)+ Number.EPSILON) * 10) / 10;
    return match;
}
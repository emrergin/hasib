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

// function bol2()
// {
//     if (isFinite(arguments[0]/arguments[1]) {
//         return arguments[0]/arguments[1];
//       }
//     else if (Math.sign(arguments[0])=== Math.sign(arguments[1]))
//     return (∞)
    
// }
function operate(say1,islem,say2){
    if (islem==`+`){return ekle(say1,say2);}
    if (islem==`-`){return cikar(say1,say2);}
    if (islem==`×`){return carp(say1,say2);}
    if (islem==`÷`){return bol(say1,say2);}
}

const ekranDegeri=document.getElementById(`displayText`);
const sayilar = document.querySelectorAll('.sayi');
const islemler = document.querySelectorAll('.islem');
const esittir=document.getElementById(`=`);
const tertemiz=document.getElementById(`C`);
let gercekDeger=`0`;

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

function sayiKoy(e){
    if (ekranDegeri.textContent.length<15){
        gercekDeger+=e.target.textContent;
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
    if (ekranDegeri.textContent.length<15 && !(gercekDeger.charAt(gercekDeger.length-1)===`+`)&& !(gercekDeger.charAt(gercekDeger.length-1)===`-`) &&
    !(gercekDeger.charAt(gercekDeger.length-1)===`×`) && !(gercekDeger.charAt(gercekDeger.length-1)===`÷`)){
        gercekDeger+=e.target.textContent;
        ekranDegeri.textContent=gorselDegerBul(gercekDeger);
    }    
}

function sonHucre(metin){
    return !(isNaN(metin.charAt(metin.length-1)));
}

function temizle(){
    ekranDegeri.textContent=`0`;
    gercekDeger=`0`;
}

function hesapla(){
    let sonucMetni=gercekDeger;
    if (!sonHucre(sonucMetni)){
        sonucMetni = sonucMetni.slice(0, -1); 
    }
    let sayi1=parseFloat(sonucMetni);
    sonucMetni=sonucMetni.replace(sayi1,'');
    console.log(sayi1);
    if (sonucMetni === "")
    {
        gercekDeger=`${sayi1}`;
        ekranDegeri.textContent=gorselDegerBul(gercekDeger);
        return;
    }
    let islem=sonucMetni.charAt(0);
    sonucMetni=sonucMetni.replace(islem,'');
    console.log(islem);
    let sayi2=parseFloat(sonucMetni);
    sonucMetni=sonucMetni.replace(sayi2,'');
    console.log(sayi2);
    gercekDeger=operate(sayi1,islem,sayi2)+sonucMetni;
    ekranDegeri.textContent=gorselDegerBul(gercekDeger);
}

function gorselDegerBul(metin){
    let geciciDeger=``;
    geciciDeger= metin.replace(Infinity,'∞');
    geciciDeger=geciciDeger.replace(/(^[0-9]+)(\+|-|×|÷)([0-9]+)(\+|-|×|÷)/g,parantezEkle);
    let geciciDeger2=geciciDeger;
    do{
        geciciDeger=geciciDeger2;
        geciciDeger2=geciciDeger.replace(/^\(.+\)(\+|-|×|÷)([0-9]+)(\+|-|×|÷)/g,parantezEkle);
        // console.log(geciciDeger);
        // console.log(geciciDeger2);
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
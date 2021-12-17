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
    if (arguments[1]===0){
        return `Sonsuz`
    }
    return arguments[0]/arguments[1];
}

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

let mevcutSayilar=[];
let mevcutIslemler=[];
// console.log(sonHucre(ekranDegeri.textContent));

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
        ekranDegeri.textContent+=e.target.textContent;
        ekranDegeri.textContent=ekranDegeri.textContent.replace(/^[0]/g,"");
        ekranDegeri.textContent=ekranDegeri.textContent.replace(/([^0-9])([0])([0-9])/g,duzenleyici);
    }    
}

function duzenleyici(match, p1, p2, p3, offset, string){
    return [p1, p3].join('');
}

function islemKoy(e){
    if (ekranDegeri.textContent.length<15 && sonHucre(ekranDegeri.textContent)){
        ekranDegeri.textContent+=e.target.textContent;
    }    
}

function sonHucre(metin){
    return !(isNaN(metin.charAt(metin.length-1)));
}

function temizle(){
    ekranDegeri.textContent=0;
}

function hesapla(){
    if (!sonHucre(ekranDegeri.textContent)){
        ekranDegeri.textContent = ekranDegeri.textContent.slice(0, -1); 
    }
    let sayi1=parseInt(ekranDegeri.textContent);
    ekranDegeri.textContent=ekranDegeri.textContent.replace(sayi1,'');
    console.log(sayi1);
    let islem=ekranDegeri.textContent.charAt(0);
    ekranDegeri.textContent=ekranDegeri.textContent.replace(islem,'');
    console.log(islem);
    let sayi2=parseInt(ekranDegeri.textContent);
    ekranDegeri.textContent=ekranDegeri.textContent.replace(sayi2,'');
    console.log(sayi2);
    ekranDegeri.textContent=operate(sayi1,islem,sayi2)+ekranDegeri.textContent;

}
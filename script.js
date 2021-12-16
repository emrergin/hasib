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
    if (islem==`*`){return carp(say1,say2);}
    if (islem==`/`){return bol(say1,say2);}
}

const ekranDegeri=document.getElementById(`displayText`);
const sayilar = document.querySelectorAll('.sayi');

sayilar.forEach((sayi) => {
    sayi.addEventListener('mousedown', sayiKoy);
})

function sayiKoy(e){
    ekranDegeri.textContent+=e.target.textContent;
}
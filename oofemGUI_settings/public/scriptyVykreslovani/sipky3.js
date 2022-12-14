
//dodelat reckou abecedu
//https://stackoverflow.com/questions/10745088/greek-letters-in-html5-canvas

//#########################################################################
//               Trida pro vykreslovani sipek


class sipkyData {

    constructor(){

        //var zarovnani = "nahore";
        //var zarovnani = "vlevo-nahore";
        //var zarovnani = "vlevo";
        //var zarovnani = "vpravo";
        //var zarovnani = "vpravo-nahore";
        //var zarovnani = "dole";
        //var zarovnani = "vlevo-dole";


        // '{"Ax":300,"Ay":100,"polomer":100,"start":0,"end":0,"text":"F","tloustkaCary":"","barvaCary":"","delkaHrotu":,"rozevreniHrotu":,"zarovnaniKonec":"vpravo","zarovnaniStred":"vpravo","natoceniSipky":0.2,"odsazeniX":5,"odsazenyY":5}'+

        this.class = '{"class": {' +
        '           "konzolaSilaNaKonci": [' +
        '                   "konzolaSilaNaKonci1"' +
        '           ]}' +    
        '       }'; 
      

        this.sipky = '{"sipky": ['+
                        '{"data": {'+
                            '"sikmo": ['+
                                    '{"Ax":300,"Ay":100,"Bx":100,"By":50,"text":"F","zarovnaniKonec":"","zarovnaniStred":"vpravo","tloustkaCary":"1","barvaCary":"darkBlue","odsazeniX":5,"odsazeniY":5}'+
                                '],'+
                            '"obloukove": ['+
                                    '{"Ax":300,"Ay":100,"polomer":50,"start":0,"end":0.5,"text":"F","natoceniSipky":0.3,"tloustkaCary":"1","barvaCary":"darkCyan","delkaHrotu":10,"rozevreniHrotu":3,"zarovnaniKonec":"vpravo","zarovnaniStred":"vpravo","odsazeniX":15,"odsazenyY":15}'+
                                ']'+
                            '},'+     
                            '"Ox":50,'+
                            '"Oy":130,'+
                            '"id":"konzolaSilaNaKonci",'+
                            '"class":"konzolaSilaNaKonci"'+
                        '}]' +
                    '}';

        
        this.vykreslujVsechnyPruty();
        
    }


    vykreslujVsechnyPruty(){

        var obj = JSON.parse(this.sipky);
        var pocetId;

        pocetId = obj.sipky.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ZiskejDataProCanvas(id);
        }    

    }


    ZiskejDataProCanvas(id){

        var obj = JSON.parse(this.sipky);

        var pocetPrutu;
        pocetPrutu = obj.sipky[id].data.length;

        var elementId = obj.sipky[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.grafyKCE[id].data[pocetPrutu-1].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykresliVsechnyKotyDaneKotyId(id, ctx, obj);
                    }
                    catch(err) {
                       
                    }

                }

            }
            
        }
        else {

            var c = document.getElementById(elementId);

          //  try {
                var ctx = c.getContext("2d");

                //vola konstruktor pro vykresleni sipek
                var sipky = new vykresliSipky(id, ctx, obj)
          //  }
           // catch(err) {
           //     console.log(elementId + " nenalezen");
           // }
            
        }
    }
}


class vykresliSipky {

    constructor(id, ctx, obj){

        var Ox = obj.sipky[id].data.Ox;
        var Oy = obj.sipky[id].data.Oy;

        //vykresluje prime sipky
        this.ziskejDataProVykresleniPrimeSipky(id, ctx, obj);
        
        //vykresluje obloukove sipky
        this.ziskejDataProVykresleniObloukoveSipky(id, ctx, obj);

    } 


    ziskejDataProVykresleniPrimeSipky(id, ctx, obj){

        var pocetPrimychSipek;
        pocetPrimychSipek = obj.sipky[id].data.sikmo.length;

        //vykresli prime sipky
        for (var i = 0; i < pocetPrimychSipek; i++) {

            var Ax = obj.sipky[id].data.sikmo[i].Ax;
            var Ay = obj.sipky[id].data.sikmo[i].Ay;
            var Bx = obj.sipky[id].data.sikmo[i].Bx;
            var By = obj.sipky[id].data.sikmo[i].By;
            var text = obj.sipky[id].data.sikmo[i].text;
            var tloustkaCary = obj.sipky[id].data.sikmo[i].tloustkaCary;
            var barvaCary = obj.sipky[id].data.sikmo[i].barvaCary;

            var delkaHrotu = 25;
            var rozevreniHrotu = 5;
            var zarovnaniKonec = obj.sipky[id].data.sikmo[i].zarovnaniKonec;
            var zarovnaniStred = obj.sipky[id].data.sikmo[i].zarovnaniStred;

            var odsazeniX = obj.sipky[id].data.sikmo[i].odsazeniX;
            var odsazeniY = obj.sipky[id].data.sikmo[i].odsazeniY;

          
            ctx.beginPath();

            //nakresli rovnou sipku
            this.nakresliPrimouSipku(ctx, Ax, Ay, Bx, By, text, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu, zarovnaniKonec, zarovnaniStred, odsazeniX, odsazeniY);
            
        }

    }


    ziskejDataProVykresleniObloukoveSipky(id, ctx, obj){

        var pocetObloukovychSipek;
        pocetObloukovychSipek = obj.sipky[id].data.obloukove.length;

        //vykresli obloukovou sipku
        for (var i = 0; i < pocetObloukovychSipek; i++) {

            var Ax = obj.sipky[id].data.obloukove[i].Ax;
            var Ay = obj.sipky[id].data.obloukove[i].Ay;
            var polomer = obj.sipky[id].data.obloukove[i].polomer;
            var start = obj.sipky[id].data.obloukove[i].start;
            var end = obj.sipky[id].data.obloukove[i].end;

            start = start*Math.PI;
            end = end*Math.PI;

            var text = obj.sipky[id].data.obloukove[i].text;
            var tloustkaCary = obj.sipky[id].data.obloukove[i].tloustkaCary;
            var barvaCary = obj.sipky[id].data.obloukove[i].barvaCary;
            var delkaHrotu = obj.sipky[id].data.obloukove[i].delkaHrotu;
            var rozevreniHrotu = obj.sipky[id].data.obloukove[i].rozevreniHrotu;
            var natoceniSipky = obj.sipky[id].data.obloukove[i].natoceniSipky;

            var zarovnaniKonec = obj.sipky[id].data.obloukove[i].zarovnaniKonec;
            var zarovnaniStred = obj.sipky[id].data.obloukove[i].zarovnaniStred;

            var odsazeniX = obj.sipky[id].data.obloukove[i].odsazeniX;
            var odsazenyY = obj.sipky[id].data.obloukove[i].odsazenyY;

            ctx.beginPath();

            //nakresli kruhovou sipku
            this.nakresliObloukovouSipku(ctx, Ax, Ay, polomer, start, end, text, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu, zarovnaniKonec, zarovnaniStred, natoceniSipky, odsazeniX, odsazenyY);

        } 

    }


    nakresliPrimouSipku(ctx, Ax, Ay, Bx, By, text, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu, zarovnaniKonec, zarovnaniStred, odsazeniX, odsazeniY){

        //nakresli telo prime sipky - hlavni primou caru
        this.nakresliTeloPrimeSipky(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary);

        //nakresli hrot sipky
        this.nakresliHrotSipky(ctx, Ax, Ay, Bx, By, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu)

        //vlozi popis
        var vlozPopis = new popis(text, Bx, By, Ax, Ay, ctx, delkaHrotu, zarovnaniKonec, zarovnaniStred, odsazeniX, odsazeniY);
        
    }


    nakresliObloukovouSipku(ctx, Ax, Ay, polomer, start, end, text, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu, zarovnaniKonec, zarovnaniStred, natoceniSipky, odsazeniX, odsazenyY)
    {

        var hrotX;
        var hrotY;
        var endX;
        var endY;
        var smerHrotuX;
        var smerHrotuY;
        
        var hrotXY = this.spoctiBodNaKruznici(polomer, start);
        var smerHrotuXY = this.spoctiBodNaKruznici(polomer, start + natoceniSipky);
        var endXY = this.spoctiBodNaKruznici(polomer, end);

        hrotX = hrotXY[0] + Ax;
        hrotY = hrotXY[1] + Ay;
        smerHrotuX = smerHrotuXY[0] + Ax;
        smerHrotuY = smerHrotuXY[1] + Ay;
        endX = endXY[0] + Ax;
        endY = endXY[1] + Ay;

        //nakresli kruznici
        this.nakresliKruznici(Ax, Ay, polomer, start, end, ctx);
        
        //nakresli hrot sipky
        this.nakresliHrotSipky(ctx, hrotX, hrotY, smerHrotuX, smerHrotuY, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu)

        //o tom zda se zarovna na konec nebo na stred se rozhoduje zde - prepocita se souradnice a zarovna se na konec vzdy
        if(zarovnaniKonec == ""){   //pokud se zarovnava na stred
            var popisXY = this.spoctiBodNaKruznici(polomer, (start + natoceniSipky + end)/2);
            var popisX = popisXY[0] + Ax;
            var popisY = popisXY[1] + Ay;

            console.log(odsazeniX);
            console.log(popisY);
            
            //zarovna na stred - vlozi popis
            var vlozPopis = new popis(text, popisX, popisY, -99, -99, ctx, -delkaHrotu, zarovnaniStred, "",  odsazeniX, odsazenyY);
        }
        else {
            //zarovna na konec - vlozi popis
            var vlozPopis = new popis(text, endX, endY, hrotX, hrotY, ctx, -delkaHrotu, zarovnaniKonec, "",  odsazeniX, odsazenyY);
        }

    }


    nakresliTeloPrimeSipky(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Bx, By);
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();
        }
    }


    nakresliHrotSipky(ctx, Ax, Ay, Bx, By, tloustkaCary, barvaCary, delkaHrotu, rozevreniHrotu){

        //inicializuje tridu pro ziskani souradnic pro vykresleni grafu na elementu
        var souradniceGrafuElementu = new vypocetSouradnicGrafuPrutu(Ax, Ay, Bx, By, delkaHrotu, rozevreniHrotu);

        this.konecSipkyXA = souradniceGrafuElementu.getFunkcniHodnotyXA();
        this.konecSipkyYA = souradniceGrafuElementu.getFunkcniHodnotyYA();

        this.konecSipkyXB = souradniceGrafuElementu.getFunkcniHodnotyXB();
        this.konecSipkyYB = souradniceGrafuElementu.getFunkcniHodnotyYB();

        this.nakresliCaruSrafy(Ax, Ay, this.konecSipkyXA, this.konecSipkyYA, ctx, barvaCary, tloustkaCary);
        this.nakresliCaruSrafy(Ax, Ay, this.konecSipkyXB, this.konecSipkyYB, ctx, barvaCary, tloustkaCary);

    }


    


    nakresliPrut(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Bx, By);
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();
        }
    }


    nakresliCaruSrafy(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){

            ctx.moveTo(Ax , Ay);
            ctx.lineTo(Bx , By);
    
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();

        }
    }


    spoctiBodNaKruznici(polomer, alfa)
    {
        var polomer;
        var alfa;

        var x;
        var y;

        var XYKruzniceObvod = [];

        x = Math.cos(alfa)*polomer;
        y = Math.sin(alfa)*polomer;

        XYKruzniceObvod[0] = x;
        XYKruzniceObvod[1] = y;
    
        return(XYKruzniceObvod);
    }

    nakresliKruznici(Ax, Ay, polomer, start, end, ctx)
    {
        ctx.beginPath();
        ctx.arc(Ax, Ay, polomer, start, end);
        ctx.stroke();
    } 

};


class popis {

    constructor(text, Ax, Ay, Bx, By, ctx, delkaHrotu, zarovnaniKonec, zarovnaniStred, odsazeniX, odsazeniY){

        var Axy = this.dopocitejSouradniceProVlozeniPopisu(text, Ax, Ay, Bx, By, zarovnaniKonec, zarovnaniStred, delkaHrotu);
        
        this.Ax = Axy[0] + odsazeniX;
        this.Ay = Axy[1] + odsazeniY;
    
        //kdyz neni zadan smer zarovnani korektne nevypise se nic
        if(this.Ax + this.Ay != -2){
            this.vlozpopis(text, this.Ax, this.Ay, ctx);
        }

        

    }


    dopocitejSouradniceProVlozeniPopisu(text, Ax, Ay, Bx, By, zarovnaniKonec, zarovnaniStred, delkaHrotu){

        var Axy = [];

        //pokud je zarovnaniKonec == "" pak zarovnava na stred
        if(zarovnaniKonec == ""){
            var Sx;
            var Sy;

            Sx = (Ax + Bx - delkaHrotu)/2
            Sy = (Ay + By - delkaHrotu)/2

            Axy = this.zarovnejTextSipky(text, Sx, Sy, zarovnaniStred);
        }

        else {
            Axy = this.zarovnejTextSipky(text, Ax, Ay, zarovnaniKonec);
        }

        return(Axy);

    }


    zarovnejTextSipky(text, Ax, Ay, zarovnani){

        var delkaStringu = String(text).length+1;
        var posunTextu = delkaStringu*6;

        var Ax0 = -1;
        var Ay0 = -1;

        console.log(zarovnani);

        if(zarovnani == "nahore"){
            Ax0 = Ax - posunTextu/2;
            Ay0 = Ay - 5;
        }

        if(zarovnani == "vlevo-nahore"){
            Ax0 = Ax - posunTextu;
            Ay0 = Ay - 5;
        }

        if(zarovnani == "vlevo"){
            Ax0 = Ax - posunTextu;
            Ay0 = Ay;
        }

        if(zarovnani == "vpravo"){
            Ax0 = Ax;
            Ay0 = Ay;
        }

        if(zarovnani == "vpravo-nahore"){
            Ax0 = Ax;
            Ay0 = Ay - 5;
        }

        if(zarovnani == "dole"){
            Ax0 = Ax - posunTextu/2;
            Ay0 = Ay + 12;
        }

        if(zarovnani == "vlevo-dole"){
            Ax0 = Ax - posunTextu;
            Ay0 = Ay + 12;
        }

        if(zarovnani == "vpravo-dole"){
            Ax0 = Ax;
            Ay0 = Ay + 12;
        }
       
        var Axy = [];

        Axy.push(Ax0);
        Axy.push(Ay0);

        return(Axy);

    }


    vlozpopis(text, textX, textY, ctx){

        console.log(text);
        console.log(textX);
        console.log(textY);
       
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text, textX, textY);

    }

}



//###############################################################################################
//        Trida pro vypocitavani souradnic funkcnich hodnot pro vykreslovani grafu

//zde se dopocitavaji jednotlive souradnice vsech bodu grafu na jednom elementu
//zadaji se souradnice x,y koncu elementu, predpis funkcnich hodnot a zbytek se dopocita sam


class vypocetSouradnicGrafuPrutu {

    constructor(Ax, Ay, Bx, By, delkaHrotu, rozevreniHrotu)
    {

        this.Ax = Ax;
        this.Ay = Ay;
        this.Bx = Bx;
        this.Ny = By;

        var funkcniHodnotaXY = [];

        //ziska data jedne casti hrotu
        funkcniHodnotaXY = this.vratFunkcniHodnoty(Ax, Ay, Bx, By, delkaHrotu, rozevreniHrotu)

        //nastavi pole jako clenska data
        this.funkcniHodnotyXVektA = funkcniHodnotaXY[0];
        this.funkcniHodnotyYVektA = funkcniHodnotaXY[1];

        //ziska data druhe casti hrotu
        funkcniHodnotaXY = this.vratFunkcniHodnoty(Ax, Ay, Bx, By, delkaHrotu, -rozevreniHrotu)

        //nastavi pole jako clenska data
        this.funkcniHodnotyXVektB = funkcniHodnotaXY[0];
        this.funkcniHodnotyYVektB = funkcniHodnotaXY[1];
        
    }


    //getry
    getFunkcniHodnotyXA()
    {
        return(this.funkcniHodnotyXVektA);
    };

    getFunkcniHodnotyYA()
    {
        return(this.funkcniHodnotyYVektA);
    };

    getFunkcniHodnotyXB()
    {
        return(this.funkcniHodnotyXVektB);
    };

    getFunkcniHodnotyYB()
    {
        return(this.funkcniHodnotyYVektB);
    };


    vratFunkcniHodnoty(Ax, Ay, Bx, By, delkaHrotu, rozevreniHrotu){

        var funkcniHodnotaXY = [];

        //koeficienty "a" a "b" pro y=ax + b
        this.a;
        this.b;

        //koeficienty normaly
        this.an;
        
        //vrati koeficienty "a" a "b" primky
        this.spocitejRovniciPrimky(Ax, Ay, Bx, By);
        
        Ax = this.spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(this.a, this.b, this.Ax, this.Ay, delkaHrotu, this.Bx);    
        Ay = this.a * Ax + this.b;
        var bn = this.vratVektorKoeficientuBn(Ax, Ay, this.a);
      
        var funkcniHodnota = rozevreniHrotu;
        this.vratVektorKoeficientuBn(Ax, Ay, this.a);
        var funkcniHodnotaX = this.spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(this.an, bn, Ax, Ay, funkcniHodnota, Bx);
        var funkcniHodnotaY = this.an * funkcniHodnotaX + bn;

        funkcniHodnotaX = this.zrcadliSouradniceX(funkcniHodnotaX, Ax, funkcniHodnota);
        funkcniHodnotaY = this.zrcadliSouradniceY(funkcniHodnotaY, Ay, funkcniHodnota);

        //nastavi data do pole aby mohl vratit obe 2 hodnoty
        funkcniHodnotaXY.push(funkcniHodnotaX);
        funkcniHodnotaXY.push(funkcniHodnotaY);

        return(funkcniHodnotaXY);

    }


    //obcas je reseni v jinem kvadrantu, nez je ocekavano, tak se data prepocitavaji
    zrcadliSouradniceX(hodnotaX, souradniceXVekt, funkcniHodnota){

        var funkcniHodnota;
        var hodnotaX;
        var vzdalenostX;
        var hodnotaXnew;
        var funkcniHodnotyXVektNew;
        var X0;

        if(funkcniHodnota > 0){
            X0 = souradniceXVekt;
            vzdalenostX = hodnotaX - X0;
            hodnotaXnew = X0 - vzdalenostX;
            funkcniHodnotyXVektNew = hodnotaXnew;
        }
        else { //jinak zapisuje puvodni hodnotu
            funkcniHodnotyXVektNew = hodnotaX;
        }

        return(funkcniHodnotyXVektNew);

    }


    //zrcadli souradnice Y
    zrcadliSouradniceY(hodnotaY, souradniceYVekt, funkcniHodnota){

        var funkcniHodnota;
        var hodnotaY;
        var vzdalenostY;
        var hodnotaYnew;
        var funkcniHodnotyYVektNew;
        var Y0;

        //data se prepocitavaji, pokud funkcni hodnota je kladna, jinak ne
        if(funkcniHodnota > 0){
            Y0 = souradniceYVekt; 
            vzdalenostY = hodnotaY - Y0;
            hodnotaYnew = Y0 - vzdalenostY;
            funkcniHodnotyYVektNew=hodnotaYnew;
        }
        else { //jinak zapisuje puvodni hodnotu
            funkcniHodnotyYVektNew=hodnotaY;
        }
 
        return(funkcniHodnotyYVektNew);

    }


    spocitejRovniciPrimky(Ax, Ay, Bx, By)
    {

        //koeficienty primky y = ax + b
        var a;
        var b;

        //smerovy vektor primky
        var u;
        var v;

        a = (Ay-By)/(Ax-Bx);
        b = By-Bx*a;

        u = 1;
        v = -a;

        this.a = a;
        this.b = b;

        this.u = u;
        this.v = v;        

    }


    vratVektorKoeficientuBn(Ax, Ay, ap)
    {

        //koeficienty "a" a "b" normaly
        var an;
        var bn;

        an = -1/ap;
        bn = -an*Ax + Ay; 

        this.an = an;  

        return(bn);

    }


    spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(aPrimka, bPrimka, Ax, Ay, r, Bx)
    {

        //spocita kvadratickou rovnici, jejiz koreny jsou pruseciky s primkou
        //kvadraticka rovnice je ve tvaru ax2 + bx + c = 0
        //pozn. Ox a Oy jsou souradnice stredu kruznice

        //aPrimka bPrimka jsou koeficienty "a" a "b" primky
        //koeficienty "a" a "b" jsou koeficienty kruznice

        //bod Bx je predan jen z duvodu, aby rozhodl, ktery koiren je spravny
        //koren musi lezet mezi Ax a Bx
        
        var a;
        var b;
        var c;
        var x1;
        var x2;
        var x;            //uvazovany koren ktery je mezi Ax a Bx
        var Diskriminant;

        //aPrimka = -1/aPrimka;

        var xAbs;

        var vzdalXBx1;     //vzdalenost mezi prusecikem kruznice a primky  a bodem Bx - uvazuje se koren x1 
        var vzdalXBx2;     //vzdalenost mezi prusecikem kruznice a primky  a bodem Bx - uvazuje se koren x2

        a = (Math.pow(aPrimka,2))+1;
        b = 2 * aPrimka * (bPrimka - Ay) - 2 * Ax;
        c = Math.pow((bPrimka - Ay), 2) + Math.pow(Ax, 2) - Math.pow(r, 2);

        //nize resi kvadratickou rovnici
        //x = (-b +-(b2-4ac)^0.5)/2a

        Diskriminant = b*b - 4*a*c;
        x1 = (-b + Math.pow(Diskriminant, 0.5))/(2*a);
        x2 = (-b - Math.pow(Diskriminant, 0.5))/(2*a);

        vzdalXBx1 = Math.abs(x1 - Bx);
        vzdalXBx2 = Math.abs(x2 - Bx);

        //vybere ten koren, ktery je mezi Ax a Bx
        //pozna se to podle vzdalenosti x1/x2 - Bx, ta ktera je mensi, ten koren lezi v intervalu
        if(vzdalXBx2 < vzdalXBx1){
            x = x2;
        }
        else {
            x = x1;
        }

        //pokud r = 0, pak za koren se povazuje Ax
        if(r == 0){
            x = Ax;
        }

        return(x)

    }

}



$(document).ready(function() {

    var grafika = new sipkyData();

});
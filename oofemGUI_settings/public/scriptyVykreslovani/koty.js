
class kotyData {

    constructor(){


        this.lines = [];
        this.popiskoty = [];


        //atribut class v JSONu zatím ještě nefunguje

        this.class = '{"class": {' +
        '           "konzolaSilaNaKonci": [' +
        '                   "konzolaSilaNaKonci1"' +
        '           ]}' +    
        '       }'; 

        this.vsechnyKoty = '{"koty": ['+
                                '{"data": {'+
                                    '"vodorovne": ['+
                                        '{"AxL":0,"AxP":300,"Ay":20,"kotaNahoru":false,"prepsatKotu":"L"}'+
                                        '],'+
                                    '"svisle": ['+
                                        ']'+
                                    '},'+
                                    '"Ox":50,'+
                                    '"Oy":130,'+
                                    '"meritko":40,'+
                                    '"id":"konzolaSilaNaKonci",'+
                                    '"class":"konzolaSilaNaKonci"'+
                                '},' +
                                '{"data": {'+
                                    '"vodorovne": ['+
                                        '{"AxL":100,"AxP":200, "Ay": 300, "kotaNahoru": true, "prepsatKotu": ""},'+
                                        '{"AxL":100,"AxP":300, "Ay": 400, "kotaNahoru": true, "prepsatKotu": ""},'+
                                        '{"AxL":100,"AxP":400, "Ay": 100, "kotaNahoru": false, "prepsatKotu": ""}'+
                                        '],'+
                                    '"svisle": ['+
                                        '{"AyH":100,"AyD":200, "Ax": 300, "kotaDoleva": true, "prepsatKotu": ""},'+
                                        '{"AyH":100,"AyD":200, "Ax": 400, "kotaDoleva": true, "prepsatKotu": ""},'+
                                        '{"AyH":100,"AyD":200, "Ax": 500, "kotaDoleva": false, "prepsatKotu": ""}'+
                                        ']'+
                                    '},'+
                                    '"Ox":0,'+
                                    '"Oy":0,'+
                                    '"meritko":1,'+
                                    '"id":"myCanvas2",'+
                                    '"class":"myCanvas2"'+
                                '}]' +
                            '}';

        //vykresli data (koty)
        this.vypocetVykresleni();
        this.vykresliVsechnyKoty();


        
        //console.log(this.lines);

        //vytvori json pro navrat dat
        this.dataKoty = {
            lines: this.lines,
            popisKoty: this.popiskoty
        }

    }


    getDataKoty(){
        return(this.dataKoty);
    }


    vykresliVsechnyKoty(){

        var obj = JSON.parse(this.vsechnyKoty);
        var pocetId;

        pocetId = obj.koty.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
        
            this.vykresliVsechnyKotyDaneKotyId(id, "", obj);
        }    

    }


    vykresliVsechnyKotyDaneKotyId(id, ctx, obj){

        var pocetKotVodorovnych;
        var pocetKotSvislych;

        pocetKotVodorovnych = obj.koty[id].data.vodorovne.length;
        pocetKotSvislych =  obj.koty[id].data.svisle.length;

        
        //vykresli vsechny koty vodorovne
        for (var i = 0; i < pocetKotVodorovnych; i++) {
            
            var AxL = obj.koty[id].data.vodorovne[i].AxL;
            var AxP = obj.koty[id].data.vodorovne[i].AxP;
            var Ay = obj.koty[id].data.vodorovne[i].Ay;
            var kotaNahoru = obj.koty[id].data.vodorovne[i].kotaNahoru;
            var prepsatKotu = obj.koty[id].data.vodorovne[i].prepsatKotu;

            console.log(kotaNahoru);

            var Ox = obj.koty[id].Ox;
            var Oy = obj.koty[id].Oy;
            var meritko = obj.koty[id].meritko;

            AxL = AxL + Ox;
            AxP = AxP + Ox;
            Ay = Ay + Oy;

            console.log("#0000000000000000000000");
            this.nakresliVodorovnouKotu(AxL, AxP, Ay, kotaNahoru, ctx, meritko, prepsatKotu);

        }

        //vykresli vsechny koty svisle
        for (var i = 0; i < pocetKotSvislych; i++) {

            var AyH = obj.koty[id].data.svisle[i].AyH;
            var AyD = obj.koty[id].data.svisle[i].AyD;
            var Ax = obj.koty[id].data.svisle[i].Ax;
            var kotaDoleva = obj.koty[id].data.svisle[i].kotaDoleva;
            var prepsatKotu = obj.koty[id].data.svisle[i].prepsatKotu;

            var Ox = obj.koty[id].Ox;
            var Oy = obj.koty[id].Oy;
            var meritko = obj.koty[id].meritko;
    
            AyH = AyH + Oy;
            AyD = AyD + Oy;
            Ax = Ax + Ox;

            this.nakresliSvislouKotu(AyH, AyD, Ax, kotaDoleva, ctx, meritko, prepsatKotu);

        }

    }


    vypocetVykresleni(){
 
        this.odsazeniKotovaciCary = 30;
        this.odsazVynKCE = 10;
        this.delkaVyn = 30;
        this.velSikmeCarky = 5;
        this.odsazeniTextu = 5;

        //dopocita meritko vzdalenost osy a scvisle odsazeni
  
    }


    //vykresli vodorovnou kotovaci caru - tam kde se zapisuje popis
    //souradnice x1, x2, y, jsou souradnice bodu, ktery se bude vykreslovat
    //odsazeni a presahy jsou dopocitavany uvnitr metody
    //pokud je smer +1, pak se vynasi nahoru, pokud -1, pak se vynasi dolu
    kotovaciCaraVodorovna(x1, x2, y, smer){
   
        var Ax = x1;
        var Ay = y + smer * (this.odsazeniKotovaciCary);

        var Bx = x2;
        var By = y + smer * (this.odsazeniKotovaciCary);

        var caraJSON = {
            coord:{
                Ax:Ax,
                Ay:Ay,
                Bx:Bx,
                By:By
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-kotovaciCaraVodorovna'
        }

        this.lines.push(caraJSON);

    }

    kotovaciCaraSvisla(y1, y2, x, smer){

        var Ax = x + smer * (this.odsazeniKotovaciCary);
        var Ay = y1;

        var Bx = x + smer * (this.odsazeniKotovaciCary);
        var By = y2;

        var caraJSON = {
            coord:{
                Ax:Ax,
                Ay:Ay,
                Bx:Bx,
                By:By
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-kotovaciCaraSvisla'
        }

        this.lines.push(caraJSON);

    }

    //vykresli svislou vynaseci caru (patrici k svisle kotovaci care)
    vynaseciCaraSvisla(x, y, smer){

        var y1;
        var y2;
        var y3;

        var xP;
        var xM;
        var yP;
        var yM;


        //zakresli vynaseci caru - data
        y1 = y + smer * (this.odsazVynKCE);
        y2 = y + smer * (this.odsazVynKCE + this.delkaVyn);
        y3 = y + smer * (this.odsazeniKotovaciCary)

        //zakresli sikmou carku - data
        xP = x + this.velSikmeCarky;
        xM = x - this.velSikmeCarky;

        yP = y3 + this.velSikmeCarky,
        yM = y3 - this.velSikmeCarky


        //zakresli vynaseci caru
        var caraJSON = {
            coord:{
                Ax:x,
                Ay:y1,
                Bx:x,
                By:y2
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-vynaseciCara-kotaSvisla'
        }

        this.lines.push(caraJSON);


        //zakresli sikmou carku
        var caraJSON = {
            coord:{
                Ax:xP,
                Ay:yM,
                Bx:xM,
                By:yP
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-sikmaCarka-kotaSvisla'
        }

        this.lines.push(caraJSON);

        /*
        //zakresli vynaseci caru
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        //zakresli sikmou carku
        ctx.beginPath();
        ctx.moveTo(x - this.velSikmeCarky, y3 + this.velSikmeCarky);
        ctx.lineTo(x + this.velSikmeCarky, y3 - this.velSikmeCarky);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();
        */
    }

    //vykresli vodorovnou vynaseci caru (patrici k svisle kotovaci care)
    vynaseciCaraVodorovna(x, y, smer){

        var x1;
        var x2;
        var x3;

        var xP;
        var xM;
        var yP;
        var yM;

        //zakresli vynaseci caru - data
        x1 = x + smer * (this.odsazVynKCE);
        x2 = x + smer * (this.odsazVynKCE + this.delkaVyn);
        x3 = x + smer * (this.odsazeniKotovaciCary)

        //zakresli sikmou carku - data
        xP = x3 + this.velSikmeCarky;
        xM = x3 - this.velSikmeCarky;

        yP = y + this.velSikmeCarky,
        yM = y - this.velSikmeCarky

        /*
        //zakresli vynaseci caru
        this.Ax.push(x1);
        this.Ay.push(y);

        this.Bx.push(x2);
        this.By.push(y);


        //zakresli sikmou carku
        this.Ax.push(x3);
        this.Ay.push(this.velSikmeCarky, y - this.velSikmeCarky);

        this.Bx.push(x3);
        this.By.push(this.velSikmeCarky, y - this.velSikmeCarky);
        */

        //zakresli vynaseci caru
        var caraJSON = {
            coord:{
                Ax:x1,
                Ay:y,
                Bx:x2,
                By:y
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-vynaseciCara-kotaVodorovna'
        }

        this.lines.push(caraJSON);


        //zakresli sikmou carku
        var caraJSON = {
            coord:{
                Ax:xP,
                Ay:yM,
                Bx:xM,
                By:yP
            },
            thick: 1,
            color : '#000000',
            popis: 'koty-sikmaCarka-kotaVodorovna'
        }

        this.lines.push(caraJSON);


        /*
        //zakresli vynaseci caru
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        //zakresli sikmou carku
        ctx.beginPath();
        ctx.moveTo(x3 + this.velSikmeCarky, y - this.velSikmeCarky);
        ctx.lineTo(x3 - this.velSikmeCarky, y + this.velSikmeCarky);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();
        */

    }

    //dopisuje text na kotu vodorovnou
    //souradnice x, y udavaji souradnici bodu na konstrukci
    //smer je koeficient, tak jak tomu je u jinych metod
    dopisTextNaKotuVodorovnou(x1, x2, y, smer, ctx, meritko, prepsatKotu){

        var text;
        var xText;
        var yText;

        if(prepsatKotu == ""){
            text = (x2-x1)/(meritko);
            text = (Math.round(text*100))/100;
        }
        else {
            text = prepsatKotu;
        }

        xText = (x1+x2)/2-10;
        yText = y + smer * (this.odsazeniKotovaciCary) - this.odsazeniTextu;

        /*
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text,xText,yText);
        */

        var popis = {
            coord:{
                Ax:xText,
                Ay:yText,
            },
            text: text,
            color : '#000000',
            popis: 'textKoty-kotaVodorovna'
        }

        this.popiskoty.push(popis);

    }

    //dopisuje text na kotu svislou
    dopisTextNaKotuSvislou(y1, y2, x, smer, ctx, meritko, prepsatKotu){
       
        var text;
        var xText;
        var yText;

        var delkaStringu;
        
        if(prepsatKotu == ""){
            text = (y2-y1)/(meritko);
            text = (Math.round(text*100))/100;
        }
        else {
            text = prepsatKotu;
        }

        xText = x + smer * (this.odsazeniKotovaciCary);
        yText = (y1+y2)/2 + 5;

        if(smer < 0){
            delkaStringu = String(text).length + 1
            xText = xText - delkaStringu*8;
        }
        else {
            xText = xText + this.odsazeniTextu
        }


        var popis = {
            coord:{
                Ax:xText,
                Ay:yText,
            },
            text: text,
            color : '#000000',
            popis: 'textKoty-kotaSvisla'
        }

        this.popiskoty.push(popis);

        //ctx.font = "15px Arial";
        //ctx.fillText(text,xText,yText);

    }

    nakresliVodorovnouKotu(AxL, AxP, Ay, kotaNahoru, ctx, meritko, prepsatKotu){

        var smer;
        if(kotaNahoru == true){
            smer = -1;
        }
        else {
            smer = 1;
        }

        //kotovaci cara (nad kterou je popis)
        console.log("#0000111111000000");
        this.kotovaciCaraVodorovna(AxL, AxP, Ay, smer);

        //vynaseci cara vlevo
        this.vynaseciCaraSvisla(AxL, Ay, smer);

        //vynaseci cara vpravo
        this.vynaseciCaraSvisla(AxP, Ay, smer);

        //doplni text na kotu
        this.dopisTextNaKotuVodorovnou(AxL, AxP, Ay, smer, ctx, meritko, prepsatKotu);

    }

    nakresliSvislouKotu(AyH, AyD, Ax, kotaDoleva, ctx, meritko, prepsatKotu){

        var smer;
        if(kotaDoleva == true){
            smer = -1;
        }
        else {
            smer = 1;
        }

        //SVISLA KOTA - UVNITR KOMORY
        this.kotovaciCaraSvisla(AyH, AyD, Ax, smer, ctx);

        //vynaseci cara k bodu A
        this.vynaseciCaraVodorovna(Ax, AyH, smer, ctx);

        //vynaseci cara k bodu E
        this.vynaseciCaraVodorovna(Ax, AyD, smer, ctx);

        //doplni text na kotu
        this.dopisTextNaKotuSvislou(AyH, AyD, Ax, smer, ctx, meritko, prepsatKotu);

    }

}


export const koty = ((DBKotyData) => {

    var grafikaKoty = new kotyData();
    var dataKoty = grafikaKoty.getDataKoty();

    return(dataKoty);

});

class pruzinaData {

    constructor(){

        this.lines = [];

        this.class = '{"class": {' +
        '           "konzolaSilaNaKonci": [' +
        '                   "konzolaSilaNaKonci1"' +
        '           ]}' +    
        '       }'; 
        
        this.pruzina =  {
                            "pruzina":[
                            {
                                "data":{
                                    "vodorovne":[
                                        {
                                        "Ax":10,
                                        "Ay":100,
                                        "prumerPruziny":40,
                                        "delkaZavitu":10,
                                        "pocetZavitu":3,
                                        "delkaKonce":40,
                                        "tloustkaCary":"2",
                                        "barvaCary":"#000000"
                                        }
                                    ],
                                    "svisle":[
                                        {
                                        "Ax":100,
                                        "Ay":10,
                                        "prumerPruziny":40,
                                        "delkaZavitu":10,
                                        "pocetZavitu":3,
                                        "delkaKonce":40,
                                        "tloustkaCary":"1",
                                        "barvaCary":"#000000"
                                        }
                                    ]
                                },
                                "Ox":50,
                                "Oy":130,
                                "id":"konzolaSilaNaKonci",
                                "class":"konzolaSilaNaKonci"
                            }
                            ]
                        }
                        

        //vykresli vsechny sipky
        this.vykreslivsechnyPruziny();    
        
    }


    getDataPruzina(){
        return(this.lines);
    }


    vykreslivsechnyPruziny(){

        var obj = this.pruzina;
        var pocetId;

        pocetId = obj.pruzina.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.vykreslivsechnyPruzinyDaneId(id, "", obj);
        }    

    }


    vykreslivsechnyPruzinyDaneId(id, ctx, obj)
    {

        var pocetPruzinVodorovnych;
        var pocetPruzinSvislych;

        var vsechnyBodyX = [];
        var vsechnyBodyY = [];
        var popisPruziny = [];

        pocetPruzinVodorovnych = obj.pruzina[id].data.vodorovne.length;
        pocetPruzinSvislych = obj.pruzina[id].data.svisle.length;


        //vykresli vsechny sipky vodorovne
        for (var i = 0; i < pocetPruzinVodorovnych; i++) {

            var prumerPruziny = obj.pruzina[id].data.vodorovne[i].prumerPruziny;
            var delkaZavitu = obj.pruzina[id].data.vodorovne[i].delkaZavitu;
            var pocetZavitu = obj.pruzina[id].data.vodorovne[i].pocetZavitu;
            var delkaKonce = obj.pruzina[id].data.vodorovne[i].delkaKonce;
            var osa = obj.pruzina[id].data.vodorovne[i].Ay;
            var Xzacatek = obj.pruzina[id].data.vodorovne[i].Ax;

            var tloustkaCary = obj.pruzina[id].data.vodorovne[i].tloustkaCary; 
            var barvaCary = obj.pruzina[id].data.vodorovne[i].barvaCary;

            var nakresliVodorovnouPruzinu = new pruzinaVodorovna(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osa, Xzacatek, tloustkaCary, barvaCary);

            var bodyXPruzinaVod = nakresliVodorovnouPruzinu.getBodyX();
            var bodyYPruzinaVod = nakresliVodorovnouPruzinu.getBodyX();
            var dataPopisPruziny = this.vratPolePopisuPruziny(i, "pruzinaVodorovna-", bodyXPruzinaVod.length);

            vsechnyBodyX = vsechnyBodyX.concat(bodyXPruzinaVod);
            vsechnyBodyY = vsechnyBodyY.concat(bodyYPruzinaVod);
            popisPruziny = popisPruziny.concat(dataPopisPruziny);
        }
        

        for (var i = 0; i < pocetPruzinSvislych; i++) {

            var prumerPruziny = obj.pruzina[id].data.svisle[i].prumerPruziny;
            var delkaZavitu = obj.pruzina[id].data.svisle[i].delkaZavitu;
            var pocetZavitu = obj.pruzina[id].data.svisle[i].pocetZavitu;
            var delkaKonce = obj.pruzina[id].data.svisle[i].delkaKonce;
            var osa = obj.pruzina[id].data.svisle[i].Ax;
            var Xzacatek = obj.pruzina[id].data.svisle[i].Ay;

            var tloustkaCary = obj.pruzina[id].data.svisle[i].tloustkaCary; 
            var barvaCary = obj.pruzina[id].data.svisle[i].barvaCary;

            var nakresliSvislouPruzinu = new pruzinaSvisla(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osa, Xzacatek, tloustkaCary, barvaCary);
            
            var bodyXPruzinaSvis = nakresliSvislouPruzinu.getBodyX();
            var bodyYPruzinaSvis = nakresliSvislouPruzinu.getBodyX();
            var dataPopisPruziny = this.vratPolePopisuPruziny(i, "pruzinaSvisla-", bodyXPruzinaVod.length);

            vsechnyBodyX = vsechnyBodyX.concat(bodyXPruzinaSvis);
            vsechnyBodyY = vsechnyBodyY.concat(bodyYPruzinaSvis);
            popisPruziny = popisPruziny.concat(dataPopisPruziny);

        }

        this.vytvorJsonPruziny(vsechnyBodyX, vsechnyBodyY, popisPruziny);

    }


    //aby se data dala lepe testovat z Jsonu, zde se vytvari popis
    vratPolePopisuPruziny(indexPruziny, textPruziny, pocetBodu){

        var popis = textPruziny + indexPruziny;
        var popisPruziny = [];

        for (var i = 0; i < pocetBodu; i++) {
            popisPruziny.push(popis);
        }

        return(popisPruziny);

    }


    vytvorJsonPruziny(vsechnyBodyX, vsechnyBodyY, popisPruziny){


        for (var i = 1; i < vsechnyBodyX.length; i++) {

            var Ax = vsechnyBodyX[i-1];
            var Ay = vsechnyBodyY[i-1];
            var Bx = vsechnyBodyX[i];
            var By = vsechnyBodyY[i];

            var caraJSON = {
                coord:{
                    Ax:Ax,
                    Ay:Ay,
                    Bx:Bx,
                    By:By
                },
                thick: 1,
                color : '#000000',
                popis: popisPruziny[i]
            
            }
    
            //prida caru do dat
            this.lines.push(caraJSON);  

        }

    }
}


class pruzinaVodorovna {

    //##############################################################
    //       Kresli pruzinu vodorovnou

    constructor(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osaY, Xposledni, tloustkaCary, barvaCary){

        //vytvari sled X a Y-ovych souradnic
        this.bodyX = [];
        this.bodyY = [];


        //nakresli pruzinu
        /*
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.beginPath();
        */

        Xposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Xposledni, osaY);
        Xposledni = this.nakresliPulZavitZleva(ctx, prumerPruziny, delkaZavitu, Xposledni, osaY);

        //vykresli dany pocet zavitu
        for (var id = 0; id < pocetZavitu; id++) {
            Xposledni = this.nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Xposledni, osaY);
        }

        Xposledni = this.nakresliPulZavitZprava(ctx, delkaZavitu, Xposledni, osaY);
        Xposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Xposledni, osaY);

        //ctx.stroke();

    }


    getBodyX(){
        return(this.bodyX);
    }


    getBodyY(){
        return(this.bodyY);
    }


    //nakresli zacatek nebo konec pruziny (vodorovnou caru)
    nakresliZacKonecPruziny(ctx, delkaKonce, X, Y)
    {

        //console.log(X);
        //ctx.moveTo(X, Y);

        this.bodyX.push(X);
        this.bodyY.push(Y);

        X = X + delkaKonce;
        //console.log(X);

        //ctx.lineTo(X, Y);
        this.bodyX.push(X);
        this.bodyY.push(Y);

        return(X);
    }

    //nakresli prvni (pul)zavit zleva
    nakresliPulZavitZleva(ctx, prumerPruziny, delkaZavitu, X, osaY)
    {
        X = X + delkaZavitu/2;
        //ctx.lineTo(X, osaY-prumerPruziny/2);

        this.bodyX.push(X);
        this.bodyY.push(osaY-prumerPruziny/2);
        
        return(X);
    }

    //nakresli prvni (pul)zavit zprava
    nakresliPulZavitZprava(ctx, delkaZavitu, X, osaY)
    {
        X = X + delkaZavitu/2;
        //ctx.lineTo(X, osaY);

        this.bodyX.push(X);
        this.bodyY.push(osaY);
        
        return(X);
    }

    //nakresli jeden zavit pruziny
    nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, X, osaY)
    {
        var Y;
        
        X = X + delkaZavitu;
        Y = osaY + prumerPruziny/2;
        //ctx.lineTo(X, Y);

        this.bodyX.push(X);
        this.bodyY.push(Y);

        X = X + delkaZavitu;
        Y = osaY - prumerPruziny/2;
        //ctx.lineTo(X, Y);

        this.bodyX.push(X);
        this.bodyY.push(Y);

        return(X);
    }


}



class pruzinaSvisla {

    //##############################################################
    //       Kresli pruzinu vodorovnou

    constructor(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osaX, Yposledni, tloustkaCary, barvaCary){

        this.bodyX = [];
        this.bodyY = [];

        //nakresli pruzinu
        /*
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.beginPath();
        */

        Yposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Yposledni, osaX);
        Yposledni = this.nakresliPulZavitZHora(ctx, prumerPruziny, delkaZavitu, Yposledni, osaX);
        
        //vykresli dany pocet zavitu
        for (var id = 0; id < pocetZavitu; id++) {
            Yposledni = this.nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Yposledni, osaX);
        }
        
        Yposledni = this.nakresliPulZavitZDola(ctx, delkaZavitu, Yposledni, osaX);        
        Yposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Yposledni, osaX);

    }


    getBodyX(){
        return(this.bodyX);
    }


    getBodyY(){
        return(this.bodyY);
    }


    //nakresli zacatek nebo konec pruziny (vodorovnou caru)
    nakresliZacKonecPruziny(ctx, delkaKonce, Y, X)
    {
        //ctx.moveTo(X, Y);
        this.bodyX.push(X);
        this.bodyY.push(Y);

        Y = Y + delkaKonce;

        //ctx.lineTo(X, Y);
        this.bodyX.push(X);
        this.bodyY.push(Y);

        return(Y);
    }

    //nakresli prvni (pul)zavit zleva
    nakresliPulZavitZHora(ctx, prumerPruziny, delkaZavitu, Y, osaX)
    {
        Y = Y + delkaZavitu/2;
        //ctx.lineTo(osaX-prumerPruziny/2, Y);

        this.bodyX.push(osaX-prumerPruziny/2);
        this.bodyY.push(Y);
        
        return(Y);
    }

    //nakresli prvni (pul)zavit zprava
    nakresliPulZavitZDola(ctx, delkaZavitu, Y, osaX)
    {
        Y = Y + delkaZavitu/2;
        //ctx.lineTo(osaX, Y);

        this.bodyX.push(osaX);
        this.bodyY.push(Y);
        
        return(Y);
    }

    //nakresli jeden zavit pruziny
    nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Y, osaX)
    {
        var X;
        
        Y = Y + delkaZavitu;
        X = osaX + prumerPruziny/2;
        //ctx.lineTo(X, Y);

        this.bodyX.push(X);
        this.bodyY.push(Y);

        Y = Y + delkaZavitu;
        X = osaX - prumerPruziny/2;
        //ctx.lineTo(X, Y);

        this.bodyX.push(X);
        this.bodyY.push(Y);

        return(Y);
    }


}



export const pruzina = ((DBPruzinaData) => {

    var grafikaPruzina = new pruzinaData();
    var dataPruzina = grafikaPruzina.getDataPruzina();

    return(dataPruzina);

});

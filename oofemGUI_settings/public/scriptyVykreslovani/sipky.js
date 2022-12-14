
class sipky {

    constructor(){

        this.class = '{"class": {' +
        '           "konzolaSilaNaKonci": [' +
        '                   "konzolaSilaNaKonci1"' +
        '           ]}' +    
        '       }'; 

        this.sipky = '{"sipky": ['+
                        '{"data": {'+
                            '"vodorovne": ['+
                                '],'+
                            '"svisle": ['+
                                '{"Ax":300,"Ay":0,"delkaSipky":100,"sipkaDolu":true,"text":"F"}'+
                                ']'+
                            '},'+
                            '"Ox":50,'+
                            '"Oy":130,'+
                            '"id":"konzolaSilaNaKonci",'+
                            '"class":"konzolaSilaNaKonci"'+
                        '},' +
                        '{"data": {'+
                            '"vodorovne": ['+
                                '{"Ax":405,"Ay":0,"delkaSipky":50,"sipkaDoprava":false,"text":"X1=1"}'+
                                '],'+
                            '"svisle": ['+
                                ']'+
                            '},'+
                            '"Ox":50,'+
                            '"Oy":200,'+
                            '"id":"ccc",'+
                            '"class":"konzolaSilaNaKonci1"'+
                        '},' +
                            '{"data": {'+
                            '"vodorovne": ['+
                                '{"Ax":400,"Ay":0,"delkaSipky":50,"sipkaDoprava":false,"text":"200kN"},'+
                                '{"Ax":0,"Ay":0,"delkaSipky":50,"sipkaDoprava":true,"text":"200kN"}'+
                                '],'+
                            '"svisle": ['+
                                '{"Ax":0,"Ay":15,"delkaSipky":100,"sipkaDolu":false,"text":"A=150kN"},'+
                                '{"Ax":400,"Ay":15,"delkaSipky":100,"sipkaDolu":false,"text":"B=450kN"}'+
                                ']'+
                            '},'+
                            '"Ox":100,'+
                            '"Oy":200,'+
                            '"id":"dddd",'+
                            '"class":"konzolaSilaNaKonci1"'+
                        '}]' +
                    '}';

        //vykresli vsechny sipky
        this.vykreslivsechnySipky()    
        
    }

    vykreslivsechnySipky(){

        var obj = JSON.parse(this.sipky);
        var pocetId;

        pocetId = obj.sipky.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ziskejDataProCanvas(id, obj);
        }    

    }

    ziskejDataProCanvas2(id, obj){

        try {
            var elementId = obj.sipky[id].id;
            var c = document.getElementById(elementId);
            var ctx = c.getContext("2d");
            
            this.vykreslivsechnySipkyDaneId(id, ctx, obj);
        }
        catch(err) {
            console.log(elementId + " nenalezen");
        }

    }

    ziskejDataProCanvas(id, obj){

        var elementId = obj.sipky[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.sipky[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykreslivsechnySipkyDaneId(id, ctx, obj);
                    }
                    catch(err) {
                        console.log(elementId + " nenalezen");
                    }

                }
            
            }
            
        }
        else {

            var c = document.getElementById(elementId);

            try {
                var ctx = c.getContext("2d");
                this.vykreslivsechnySipkyDaneId(id, ctx, obj);
            }
            catch(err) {
                console.log(elementId + " nenalezen");
            }
            
        }
     
    }


    vykreslivsechnySipkyDaneId(id, ctx, obj)
    {
        
        var pocetSipekVodorovnych;
        var pocetSipekSvislych;

        //delka a rozevreni hrotu
        var delkaHrotu = 20;
        var rozevreniHrotu = 5;

        var Ox = obj.sipky[id].Ox;
        var Oy = obj.sipky[id].Oy;

        pocetSipekVodorovnych = obj.sipky[id].data.vodorovne.length;
        pocetSipekSvislych = obj.sipky[id].data.svisle.length;

        //vykresli vsechny sipky vodorovne
        for (var i = 0; i < pocetSipekVodorovnych; i++) {
            
            var Ax = obj.sipky[id].data.vodorovne[i].Ax;
            var Ay = obj.sipky[id].data.vodorovne[i].Ay;
            var delkaSipky = obj.sipky[id].data.vodorovne[i].delkaSipky;
            var sipkaDoprava = obj.sipky[id].data.vodorovne[i].sipkaDoprava;
            var text = obj.sipky[id].data.vodorovne[i].text;

            Ax = Ax + Ox;
            Ay = Ay + Oy;

            this.kresliSipkuVodorovnou(Ax, Ay, delkaSipky, delkaHrotu, rozevreniHrotu, sipkaDoprava, text, ctx);

        }

        //vykresli vsechny sipky svisle
        for (var i = 0; i < pocetSipekSvislych; i++) {
            
            var Ax = obj.sipky[id].data.svisle[i].Ax;
            var Ay = obj.sipky[id].data.svisle[i].Ay;
            var delkaSipky = obj.sipky[id].data.svisle[i].delkaSipky;
            var sipkaDolu = obj.sipky[id].data.svisle[i].sipkaDolu;
            var text = obj.sipky[id].data.svisle[i].text;

            Ax = Ax + Ox;
            Ay = Ay + Oy;

            this.kresliSipkuSvislou(Ax, Ay, delkaSipky, delkaHrotu, rozevreniHrotu, sipkaDolu, text, ctx);

        }

    }


    kresliSipkuVodorovnou(Ax, Ay, delkaSipky, delkaHrotu, rozevreniHrotu, sipkaDoprava, text, ctx)
    {

        var smer;
        var posunTextu;

        var textX;
        var textY;
        var delkaStringu;

        if(sipkaDoprava == false){
            smer = 1;
            posunTextu = delkaSipky + 5;
            textX = Ax + posunTextu;
            textY = Ay -2;
        }
        else {
            smer = -1;
            delkaStringu = String(text).length + 1;
            posunTextu = - delkaStringu*8 - delkaSipky;
            textX = Ax + posunTextu;
            textY = Ay -2;
        }

    
        //nakresli vodorovnou carku
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + smer*delkaSipky, Ay);
        ctx.stroke();

        //nakresli hrot
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + smer*delkaHrotu, Ay - rozevreniHrotu);
        ctx.stroke();

        console.log(Ax)

        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + smer*delkaHrotu, Ay + rozevreniHrotu);
        ctx.stroke();

        this.dopisTextKSipce(text, textX, textY, ctx);

    }


    kresliSipkuSvislou(Ax, Ay, delkaSipky, delkaHrotu, rozevreniHrotu, sipkaDolu, text, ctx)
    {

        var smer;
        var posunTextu;

        var textX;
        var textY;

        if(sipkaDolu == true){
            smer = -1;
            posunTextu = - delkaSipky - 5;
            textX = Ax + 5;
            textY = Ay + posunTextu;
        }
        else {
            smer = 1;
            posunTextu = delkaSipky + 15;
            textX = Ax + 5;
            textY = Ay + posunTextu;
        }

        //nakresli svislou carku
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax, Ay + smer*delkaSipky);
        ctx.stroke();

        //nakresli hrot
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + rozevreniHrotu, Ay + smer*delkaHrotu);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax - rozevreniHrotu, Ay + smer*delkaHrotu);
        ctx.stroke();

        this.dopisTextKSipce(text, textX, textY, ctx);

    }


    dopisTextKSipce(text, textX, textY, ctx)
    {

        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text, textX, textY);

    }



}


$(document).ready(function() {

    var grafika = new sipky();

});

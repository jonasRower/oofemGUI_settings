
class popis {

    constructor(){

        this.class = '{"class": {' +
        '           "konzolaSilaNaKonci": [' +
        '                   "konzolaSilaNaKonci1"' +
        '           ]}' +    
        '       }'; 

        /*
        this.popis = '{"popis": [' +
                        '{"data":' +
                            '{"popis": [' +
                                '{"Ax":210,"Ay":-80,"popis":"c","index":"index","zarovnani":"HS","odstupX":5,"odstupY":5},'+
                                '{"Ax":400,"Ay":0,"popis":"b","index":"index","zarovnani":"DL","odstupX":5,"odstupY":5},'+
                                '{"Ax":0,"Ay":0,"popis":"a","index":"index","zarovnani":"DP","odstupX":5,"odstupY":5}'+
                            ']' +
                        '},' +
                        '"Ox":50,'+
                        '"Oy":130,'+
                        '"id":"test",' +
                        '"class":"konzolaSilaNaKonciXX"}' +
                        ']}'
        */

        this.popis =    '{"popis": [' +
                        '  {"data":' +
                        '    {"popis": [' +
                        '      {"Ax":0.0,"Ay":0.0,"popis":"1.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5},' +
                        '      {"Ax":240.0,"Ay":0.0,"popis":"2.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5},' +
                        '      {"Ax":380.0,"Ay":0.0,"popis":"3.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5},' +
                        '      {"Ax":580.0,"Ay":150.0,"popis":"4.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5},' +
                        '      {"Ax":780.0,"Ay":300.0,"popis":"5.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5},' +
                        '      {"Ax":240.0,"Ay":300.0,"popis":"6.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}' +
                        '    ]' +
                        '  },' +
                        '  "Ox":50,' +
                        '  "Oy":100,' +
                        '  "id":"test",' +
                        '  "class":"konzolaSilaNaKonciXX"}' +
                        ']}';


        this.vykresliVsechnyPopisy()

        //pouze pro orientaci - jako test
        //this.test();

    }


    vykresliVsechnyPopisy(){

        var obj = JSON.parse(this.popis);
        var pocetId;

        pocetId = obj.popis.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ziskejDataProCanvas(id, obj);
        }    

    }

    ziskejDataProCanvas(id, obj){

        var elementId = obj.popis[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.popis[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];
            
            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykreslivsechnyPopisyDaneId(id, ctx, obj);
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
                this.vykreslivsechnyPopisyDaneId(id, ctx, obj);
            }
            catch(err) {
                console.log(elementId + " nenalezen");
            }
            
        }
     
    }

    vykreslivsechnyPopisyDaneId(id, ctx, obj){
        
        var pocetPopisu;
        pocetPopisu = obj.popis[id].data.popis.length;
        
        var Ox = obj.popis[id].Ox;
        var Oy = obj.popis[id].Oy;

        //vykresli vsechen popis
        for (var i = 0; i < pocetPopisu; i++) {
            
            var Ax = obj.popis[id].data.popis[i].Ax;
            var Ay = obj.popis[id].data.popis[i].Ay;
            var popis = obj.popis[id].data.popis[i].popis;
            var zarovnani = obj.popis[id].data.popis[i].zarovnani;
            var odstupX = obj.popis[id].data.popis[i].odstupX;         //odstup mezi vychozim bodem "Ax" a textem 
            var odstupY = obj.popis[id].data.popis[i].odstupY;         //odstup mezi vychozim bodem "Ay" a textem 
            var index = obj.popis[id].data.popis[i].index; 

            Ax = Ax + Ox;
            Ay = Ay + Oy;

            this.dopocitejSouradniceAVlozPopis(Ax, Ay, popis, zarovnani, odstupX, odstupY, index ,ctx);

        }

    }


    dopocitejSouradniceAVlozPopis(Ax, Ay, text, zarovnani, odstupX, odstupY, index, ctx){

        var textX;
        var textY;
        var indexX;
        var indexY;

        var vyskaPismaPosun = 13;   //upravuje posun textu s ohledem na vysku pisma

        var delkaStringu;
        var posunTextu;

        delkaStringu = String(text).length+1;
        posunTextu = delkaStringu*6;
        
        // text vztazen k dolnimu-levemu rohu
        if(zarovnani == "DL"){
            textX = Ax + odstupX;
            textY = Ay - odstupY;
        }

        // text zarovnan na stredni bod dole
        if(zarovnani == "DS"){
            textX = Ax - posunTextu/2;
            textY = Ay - odstupY;
        }

        // text vztazen k dolnimu-pravemu rohu
        if(zarovnani == "DP"){
            textX = Ax - posunTextu - odstupX;
            textY = Ay - odstupY;
        }

        //-------------------------------------------

        // text vztazen k hornimu-levemu rohu
        if(zarovnani == "HL"){
            textX = Ax + odstupX;
            textY = Ay + vyskaPismaPosun + odstupY;
        }

        // text zarovnan na stredni bod nahoře
        if(zarovnani == "HS"){
            textX = Ax - posunTextu/2;
            textY = Ay + vyskaPismaPosun + odstupY;
        }

        // text vztazen k hornimu-pravemu rohu
        if(zarovnani == "HP"){
            textX = Ax - posunTextu - odstupX;
            textY = Ay + vyskaPismaPosun + odstupY;
        }

        
        this.vlozpopis(text, textX, textY, ctx)

        //vlozi index
        indexX = textX + posunTextu;
        indexY = textY + 5;

        this.vlozpopis(index, indexX, indexY, ctx);

    }


    vlozpopis(text, textX, textY, ctx){

        console.log(text);
       
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text, textX, textY);

    }


    //slouzi pro orientaci na plose - nebude soucasti projektu
    test(){

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 50);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 125);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 200);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 275);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 350);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 425);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

    }


}


$(document).ready(function(){

    var grafika = new popis();
        
});

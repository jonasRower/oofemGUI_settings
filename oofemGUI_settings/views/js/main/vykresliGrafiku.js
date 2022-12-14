

class nactiJSONajaxCanvas{

    constructor(){

        const nJSON = new nactiJSONCanvas();
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataCanvas");
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataMeritko");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 2);
        });
    }

}



class nactiJSONCanvas{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        
        console.log(this.jsonPole[0]);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
            
            //vykresli data do canvasu
            var vykresliCanvas = new tridaProVykresleni(this.jsonPole[0], this.jsonPole[1]);
        }
    }

}



class tridaProVykresleni{

    constructor(line, meritko){

        //upravi data
        this.line = line.lines;

        //ziska meritko
        this.ziskejMeritkoAPosun(meritko);

        //vykresli data
        this.vykresliGrafiku();        
    }


    ziskejMeritkoAPosun(meritko){

        this.meritko = meritko.hlavniPohled.meritko;
        this.posunX = meritko.hlavniPohled.posunX;
        this.posunY = meritko.hlavniPohled.posunY;

    }


    vykresliGrafiku(){

        //Canvas
        const canvas = document.getElementById('drawing');
        const context = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight;
    
        canvas.width = width;
        canvas.height = height;
    
        const socket = io();
        
    
        socket.on('draw_line', () => {

            context.beginPath();
            context.linewidth = 2;


            for (var i = 0; i < this.line.length; i++) {
                var Ax;
                var Ay;
                var Bx;
                var By;

                Ax = this.line[i].Ax * this.meritko + this.posunX;
                Ay = this.line[i].Ay * this.meritko + this.posunY;
                Bx = this.line[i].Bx * this.meritko + this.posunX;
                By = this.line[i].By * this.meritko + this.posunY;

                console.log(Ax);
                console.log(Ay);
                console.log(Bx);
                console.log(By);

                //context.moveTo(Ax * width, Ay * height);
                //context.lineTo(Bx * width, By * height);

                context.moveTo(Ax, Ay);
                context.lineTo(Bx, By);
            }

            context.moveTo(Ax * width, Ay * height);
            context.lineTo(Bx * width, By * height);

            context.stroke();
        });

    }

}



//reaguje na klikani do menu
$( 'document' ).ready(function(){

    var jsonWebService = new nactiJSONajaxCanvas();

});
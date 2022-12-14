
class nactiJSONajaxCanvas{

    constructor(){

        const nJSON = new nactiJSONCanvas();
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataCanvas/lines");
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataCanvas/text");
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/scales");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 3);
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
            var newGrafika = new vykresliCanvas(this.jsonPole);

        }
    }

}


class vykresliCanvas{

    constructor(canvasData){

        //Canvas
        var canvas = document.getElementById('drawing');
        var context = canvas.getContext('2d');
        var width = window.innerWidth;
        var height = window.innerHeight;

        //ziska meritko
        var meritkoData = canvasData[canvasData.length-1];
        this.ziskejMeritkoAPosun(meritkoData);

        //vykresli data
        var canvasLines = new vykresliLines(canvasData[0], this.meritko, this.posunX, this.posunY, canvas, context, width, height);
        //var canvasText = new vykresliText(canvasData[1], this.meritko, this.posunX, this.posunY, canvas, context, width, height);

    }


    ziskejMeritkoAPosun(meritkoData){

        this.meritko = meritkoData.mainView.ScaleUni;
        this.posunX = meritkoData.mainView.ShiftX;
        this.posunY = meritkoData.mainView.ShiftY;

    }

}


class vykresliLines{

    constructor(line, meritko, posunX, posunY, canvas, context, width, height){

        //upravi data
        this.line = line.lines;
        this.color = line.color;
       
        this.meritko = meritko;
        this.posunX = posunX;
        this.posunY = posunY;
        

        //vykresli data
        this.vykresliGrafiku(canvas, context, width, height);        
    }


   
    vykresliGrafiku(canvas, context, width, height){

        canvas.width = width;
        canvas.height = height;
    
        const socket = io(); 
        socket.on('draw_line', () => {

            context.beginPath();

            for (var i = 0; i < this.line.length; i++) {

                var Ax;
                var Ay;
                var Bx;
                var By;

                //context.linewidth = this.line[i].thick;
                Ax = this.line[i].coord.Ax * this.meritko + this.posunX;
                Ay = this.line[i].coord.Ay * this.meritko + this.posunY;
                Bx = this.line[i].coord.Bx * this.meritko + this.posunX;
                By = this.line[i].coord.By * this.meritko + this.posunY;

                

                //context.lineWidth = 10;
                context.lineWidth = this.line[i].thick;
                context.strokeStyle = this.line[i].color;
            
                context.moveTo(Ax, Ay);
                context.lineTo(Bx, By);
            }
            

            context.stroke();

        });

    }

}



class vykresliText{


    constructor(textData, meritko, posunX, posunY, canvas, context, width, height){

        //upravi data
        this.textData = textData;
     
        this.meritko = meritko;
        this.posunX = posunX;
        this.posunY = posunY;


        this.vykresliPopis(canvas, context, width, height);

    }


    vykresliPopis(canvas, context, width, height){

        canvas.width = width;
        canvas.height = height;
    
        const socket = io(); 
        socket.on('draw_line', () => {

            context.beginPath();

            for (var i = 0; i < this.textData.length; i++) {

                var Ax;
                var Ay;
            
                Ax = this.textData[i][0].coord.Ax * this.meritko + this.posunX;
                Ay = this.textData[i][0].coord.Ay * this.meritko + this.posunY;
          
                // nacte text a barvu
                var text = this.textData[i][0].text;

                // zapise text
                context.fillText(text,Ax,Ay);
            
            }
            
            context.stroke();
    
        });
    
    }

    

}



//reaguje na klikani do menu
$( 'document' ).ready(function(){

    var jsonWebService = new nactiJSONajaxCanvas();

});
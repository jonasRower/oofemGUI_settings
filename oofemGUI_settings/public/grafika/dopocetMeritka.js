
//seskupi oddelene JSONy, tak aby na router "/dataCanvas"
//byl odeslan pouze jeden JSON a data byla vykreslena najednou
class dopocitejMeritko{

    constructor(dataCanvas){

        this.dataCanvas = dataCanvas;

        //sirka a vyska okna pro vykreslovani
        var widthWindow = 800;
        var heightWindow = 600;
        
        var maxX = this.vratMaximalniHodnotu('Ax', 'Bx', this.dataCanvas);
        var maxY = this.vratMaximalniHodnotu('Ay', 'By', this.dataCanvas);

        var minX = this.vratMinimalniHodnotu('Ax', 'Bx', this.dataCanvas);
        var minY = this.vratMinimalniHodnotu('Ay', 'By', this.dataCanvas);

        var rozdilX = Math.abs(maxX - minX);
        var rozdilY = Math.abs(maxY - minY);


        var posunX = 0.05;
        var posunY = 0.05;

        var meritkoX = widthWindow/rozdilX
        var meritkoY = heightWindow/rozdilY
        var meritko = Math.min(meritkoX, meritkoY);


        this.meritkoJSON = {

            "hlavniPohled":{
                "meritkoX":meritkoX,
                "meritkoY":meritkoY,
                "meritko":meritko,
                "posunX":posunX,
                "posunY":posunY
            }
        }

    }


    vratMaximalniHodnotu(A, B, dataCanvas){

        var maxSour = 0;

        for (var i = 0; i < dataCanvas.lines.length; i++) {
            var canvasRadek = dataCanvas.lines[i]
            var Asour = canvasRadek[A];
            var Bsour = canvasRadek[B];

            if(Asour > maxSour){
                maxSour = Asour;
            }
            if(Bsour > maxSour){
                maxSour = Bsour;
            }

        }

        
        return maxSour;

    }


    vratMinimalniHodnotu(A, B, dataCanvas){

        var minSour;

        for (var i = 0; i < dataCanvas.lines.length; i++) {

            var canvasRadek = dataCanvas.lines[i]
            var Asour = canvasRadek[A];
            var Bsour = canvasRadek[B];

            //v prvnim kroku nastavi souradnici
            if(i == 0){
                minSour = Asour;
            }
            else{
                if(Asour < minSour){
                    minSour = Asour;
                }
                if(Bsour < minSour){
                    minSour = Bsour;
                }
            }
            
        }

        return minSour;

    }

    //vrati seskupena data - JSON
    getSeskupenaData(){
        return(this.seskupenaDataJSON);
    }

}



export const dopocetMeritka = ((dataCanvas) => {

    var dpocitaneMeritko = new dopocitejMeritko(dataCanvas);
    return(dpocitaneMeritko.meritkoJSON);

});
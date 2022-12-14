// nastavi data do routeru "http://localhost:3000/settings/scales"
// meritka se nastavuji v settings, ale muzou se i prenastavit na hlavnim okne
// prosterednictvim priblizovani a oddalovani, nebo zaskrtnutim prislusneho checkboxu

class meritkaData {

    constructor(layoutSizeData, reqSubmit){

        //jsou-li prichozi data objekt, pak vrati jen pozadovana data
        if(typeof layoutSizeData === 'object'){
   
            //ziska data z layoutSizeData
            this.meritkaJsonNew = layoutSizeData.scalesSubmit;
            
            if(this.meritkaJsonNew == undefined){
                this.meritkaJsonNew = this.vratMeritkaJsonDefault();
            }

            //aktualizuje statusy
            this.meritkaJsonNew = this.aktualizujStatusy(reqSubmit, this.meritkaJsonNew);

            //aktualizuje zoom in/out
            this.meritkaJsonNew = this.aktualizujZoom(reqSubmit, this.meritkaJsonNew);


            console.log(this.meritkaJsonNew);
        }
        else { //nejedna-li se o objekt, pak se jedna o 1. volani a je treba vytvorit data vychozi
            this.meritkaJsonNew = this.vratMeritkaJsonDefault();
        }

    }

    getMeritkaJson(){
        return(this.meritkaJsonNew);
    }


    //pri kazdem obnoveni hlavniho GUI aktualizuje statusy u meritka
    //tak aby nacital spravna data z WS
    aktualizujStatusy(reqSubmit, meritkaJson){

        if(reqSubmit != undefined){
            if(typeof reqSubmit === 'object'){

                var statusScaleUni = reqSubmit.statusScaleUni === 'true';
                var statusScaleX = reqSubmit.statusScaleX === 'true';
                var statusScaleY = reqSubmit.statusScaleY === 'true';
                var statusShiftX = reqSubmit.statusShiftX === 'true';
                var statusShiftY = reqSubmit.statusShiftY === 'true';


                console.log(statusScaleUni);
                console.log(statusScaleX);
                console.log(statusScaleY);
                console.log(statusShiftX);
                console.log(statusShiftY);


                meritkaJson.mainView.ScaleUni.status = statusScaleUni;
                meritkaJson.mainView.ScaleX.status = statusScaleX;
                meritkaJson.mainView.ScaleY.status = statusScaleY;
                meritkaJson.mainView.ShiftX.status = statusShiftX;
                meritkaJson.mainView.ShiftY.status = statusShiftY;
            }    
        }

        return(meritkaJson);

    }


    // pri kazdem poslani na backend se aktualizuje meritko
    // jelikoz se kliklo na "+" nebo "-"
    aktualizujZoom(reqSubmit, meritkaJson){

        if(typeof reqSubmit === 'object'){

            var idZoom = reqSubmit.idZoom;
            var valueZoom = reqSubmit.valueZoom;

            if(idZoom != ''){
                meritkaJson.mainView[idZoom].ValueDefault = parseFloat(valueZoom);
            }
        }
        

        return(meritkaJson)

    }


    //nastavi defaultni hodnoty meritek, aby mohl data zapsat na WS
    vratMeritkaJsonDefault(){

        //bude treba dodelat, aby se meritko prepocitavalo automaticky, 
        //jak je tomu v predchozi verzi
        var meritka = {
            mainView:{
                ScaleUni:{
                    ValueDefault: 4,
                    ZoomInOut: 0.2,
                    status: true
                },
                ScaleX: {
                    ValueDefault: 3,
                    ZoomInOut: 0.2,
                    status: false
                },
                ScaleY: {
                    ValueDefault: 2,
                    ZoomInOut: 0.3,
                    status: false
                },
                ShiftX: {
                    ValueDefault: 0.05,
                    ZoomInOut: 0.002,
                    status: true
                },
                ShiftY: {
                    ValueDefault: 0.06,
                    ZoomInOut: 0.003,
                    status: false
                }
            }
        }

        return(meritka);

    }


}



//zde zacina modul
export const meritkaMainSettings = ((meritkoJson, reqSubmit) => {

    var aktualizujMeritka = new meritkaData(meritkoJson, reqSubmit)
    var meritkaJSONNew = aktualizujMeritka.getMeritkaJson();

    return(meritkaJSONNew)

});
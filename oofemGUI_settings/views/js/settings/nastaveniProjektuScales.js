
class nactiJSONajaxScales{

    constructor(){

        const nJSON = new nactiJSONScales();
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/scales");

    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 1);
        });
    }

}



class nactiJSONScales{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){

            // vytvori data pro vykresleni tabulky
            //var tabulkaNahled = new sestavTabulkuProNahledProjektu(this.jsonPole[0])
        
            // vytvori data pro zobrazeni comboboxu pro vyber projektu
            var comboDomainANazevProjektu = new nastavTabulkuScalesZWS(this.jsonPole[0]);
        }
        
    }

}


class nastavTabulkuScalesZWS{

    constructor(jsonScales){

        this.jsonScales = jsonScales;
        let allData = Object.keys( this.jsonScales.mainView)
        this.zapisVsechnyDataDoTabulky(allData);

        //po stisku tlacitka se vytvori Json pro odeslani dat na backend
        $("#confirmScales").click(function() {
            var odesliDataNaBackend = new sestavJsonScaleSubmit(allData);
            var scalesJsonSubmit = odesliDataNaBackend.getScalesJsonSubmit();
            var scalesJsonSubmitStr = JSON.stringify(scalesJsonSubmit);

            //zapise data do input pro submit, aby je dokazal vratit
            $("#scalesSubmit").val(scalesJsonSubmitStr);
           
        });

    }


    zapisVsechnyDataDoTabulky(allData){

        for (var i = 0; i < allData.length; i++) {
            var idProm = allData[i];

            //zapise data do sloupce "Value default"
            this.zapisDataDoTextBoxu(idProm, 'ValueDefault')

            //zapise do sloupce "Zoom in/out with value"
            this.zapisDataDoTextBoxu(idProm, 'ZoomInOut')

            //zaskrtne dana radiobuttony, prip. checkbox
            this.zapisStatus(idProm, i);

        }

    }

    zapisDataDoTextBoxu(idProm, valueZoom){

        var id = '#' + idProm + valueZoom;
        var hodnota = this.jsonScales.mainView[idProm][valueZoom];

        $(id).val(hodnota);

    }

    zapisStatus(idProm, i){

        var id;
        var status;
        var checkRadio;
        var idLabel;

        if(i == 0){
            checkRadio = 'Check'
        }
        else {
            checkRadio = 'Radio'
        }

        id = '#' + idProm + checkRadio;
        status = this.jsonScales.mainView[idProm].status;

        //zaskrtne checkbox nebo radiobutton
        $(id).prop("checked", status);


        //zobrazi /skryje "as default"
        idLabel = id.replace(checkRadio, 'Label')
        
        if(status == true){
            $(idLabel).show();
        }
        else{
            $(idLabel).hide();
        }
        

    }

}




// ovlada tabulku s meritky
class ovladejRadioButtony{


    //podle statusu skryva nebo zobrazuje "as default" u "scale"
    zobrazSkryjAsDefaultScale(){

        //enabluje radiobuttony (muzou byt disablovane)
        $("#ScaleXRadio").attr("disabled", false);
        $("#ScaleYRadio").attr("disabled", false);

        var vybranyRadioButt = $('input[name="radioScaleDirection"]:checked').val();
        
        if (vybranyRadioButt == 'ScaleXRadio') {
            $("#ScaleUniLabel").hide();
            $("#ScaleXLabel").show();
            $("#ScaleYLabel").hide();
        }
        if (vybranyRadioButt == 'ScaleYRadio') {
            $("#ScaleUniLabel").hide();
            $("#ScaleXLabel").hide();
            $("#ScaleYLabel").show();
        }

    }


    //podle statusu skryva nebo zobrazuje "as default" u "shift"
    zobrazSkryjAsDefaultShift(){

        var vybranyRadioButt = $('input[name="radioShiftDirection"]:checked').val();
        
        if (vybranyRadioButt == 'ShiftXRadio') {
            $("#ShiftXLabel").show();
            $("#ShiftYLabel").hide();
        }
        if (vybranyRadioButt == 'ShiftYRadio') {
            $("#ShiftXLabel").hide();
            $("#ShiftYLabel").show();
        }
    }
}


//zde jsou posluchaci udalosti
class udalostiRadioButtony{

    constructor(){

        //udalost na radiobutton scale
        $('input[type=radio][name=radioScaleDirection]').change(function() {

            var event = new ovladejRadioButtony();
            event.zobrazSkryjAsDefaultScale();

        });


        //udalost na radiobutton shift
        $('input[type=radio][name=radioShiftDirection]').change(function() {

            var event = new ovladejRadioButtony();
            event.zobrazSkryjAsDefaultShift();

        });


        //udalost na checkbox
        $("#ScaleUniCheck").change(function() {

            var checkBoxStatus = $('#ScaleUniCheck').is(":checked");
            if(checkBoxStatus == true){

                $("#ScaleUniLabel").show();
                $("#ScaleXLabel").hide();
                $("#ScaleYLabel").hide();

                //disabluje radiobuttony
                $("#ScaleXRadio").attr("disabled", true);
                $("#ScaleYRadio").attr("disabled", true);

            }
            if(checkBoxStatus == false){

                var event = new ovladejRadioButtony();
                event.zobrazSkryjAsDefaultScale();

            }
        });
    }
}


//trida vytvori data, aby je zpet poslala na backend pomoci submitu
class sestavJsonScaleSubmit{

    constructor(allId){

        this.scalesJsonSubmit = this.vratVsechnyDataTabulkyScales(allId);

    }
    

    getScalesJsonSubmit(){

        return(this.scalesJsonSubmit);

    }


    vratVsechnyDataTabulkyScales(allId){

        var scalesJsonSubmit = {mainView:{}}
   
        for (var i = 0; i < allId.length; i++) {
            var idProm = allId[i];
            var valueDefault = this.vratHodnotuTextArea(idProm, 'ValueDefault');
            var zoomInOut = this.vratHodnotuTextArea(idProm, 'ZoomInOut');
            var status = this.vratStatusCheckRadio(idProm, i)

            var scalesJson = {
                ValueDefault: valueDefault, 
                ZoomInOut: zoomInOut,
                status: status
            }

            console.log(scalesJson);
            scalesJsonSubmit.mainView[idProm] = scalesJson;
            
        }

        return(scalesJsonSubmit);

    }

    //vrati obsah text inputu
    vratHodnotuTextArea(idProm, valueZoom){

        var id = '#' + idProm + valueZoom;
        var hodnota =  parseFloat($(id).val());

        return(hodnota)

    }


    //vrati status checkboxu nebo radiobuttonu
    vratStatusCheckRadio(idProm, i){

        var id;
        var status;
        var checkRadio;

        if(i == 0){
            checkRadio = 'Check'
        }
        else {
            checkRadio = 'Radio'
        }

        id = '#' + idProm + checkRadio;
        status = $(id).is(':checked');

        return(status);

    }

    


}


$( 'document' ).ready(function(){

    var vyplnTabulkuScales = new nactiJSONajaxScales();
    var event = new udalostiRadioButtony();

    
    
});

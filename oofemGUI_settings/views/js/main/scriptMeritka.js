
class nactiJSONajaxMainScales{

    constructor(){

        const nJSON = new nactiJSONMainScales();
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



class nactiJSONMainScales{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
            let zobrazGUIPriStartu = new nacteniStrankyGUI(this.jsonPole[0]);
            let statusyCheckboxu = new zobrazujNastaveniMeritka(this.jsonPole[0]);
        }
        
    }

}


//zobrazuje/skryva jednotlive checkboxy/radiobuttony dle nastaveni z WS
class nacteniStrankyGUI{

    constructor(meritkoJson){

        this.zobrazGUI(meritkoJson);

    }

    zobrazGUI(meritkoJson){

        console.log(meritkoJson);

        //aby prevadel na boolean je treba "=== 'true'"
        var aktivniScaleUni = meritkoJson.mainView.ScaleUni.status;
        var aktivniScaleX = meritkoJson.mainView.ScaleX.status;
        var aktivniScaleY = meritkoJson.mainView.ScaleY.status;
        var aktivniShiftX = meritkoJson.mainView.ShiftX.status;
        var aktivniShiftY = meritkoJson.mainView.ShiftY.status;

        console.log(aktivniScaleUni);
        console.log(aktivniScaleX);
        console.log(aktivniScaleY);
        console.log(aktivniShiftX);
        console.log(aktivniShiftY);


        if(aktivniScaleUni == true){
            $('#meritkoZvlast').prop('checked', false);
            $(".smery").hide();
        }
        else{
            $('#meritkoZvlast').prop('checked', true);
            $(".smery").show();

            if(aktivniScaleX == true){
                $("#smerX").prop("checked", true);
                $("#smerY").prop("checked", false);
            }
            if(aktivniScaleY == true){
                $("#smerX").prop("checked", false);
                $("#smerY").prop("checked", true);
            }
        }

        //zapise statusy do input-submitu, pokud nema pri prepinani radiobuttonu data, aby je mel odkud nacitat
        $("#statusScaleUni").val(aktivniScaleUni);
        $("#statusScaleX").val(aktivniScaleX);
        $("#statusScaleY").val(aktivniScaleY);
        $("#statusShiftX").val(aktivniShiftX);
        $("#statusShiftY").val(aktivniShiftY);

    }

}




//zobrazuje a skryva jednotlive nastaveni v okne meritek
class zobrazujNastaveniMeritka{

    constructor(meritkoJson){


        console.log(meritkoJson);
        this.ovladejGUI();

        let vyberSelect;
        var smerRadio;
        var smerVyber;
        var checkBoxIsChecked;
        var smeryRadioJsouZobrazeny;
        var meritkoO;
        var meritkoAktualni = 2;
        var meritkoNew;
        var posunAktualni = 0.05;
        var posunNew;

        var vyberTyp;



        this.ovladejGUI(meritkoJson);
        this.ovladejTlacitka(meritkoJson);

    }



    ovladejGUI(meritkoJson){

        let meritkaJson = meritkoJson;

        var vyberSelect;
        var smerRadio;
        var smerVyber;
        var checkBoxIsChecked;
        var smeryRadioJsouZobrazeny;
        var meritkoO;
        var meritkoAktualni = 2;
        var meritkoNew;
        var posunAktualni = 0.05;
        var posunNew;
        var vyberTyp;


        //pokud ani jeden radiobutton neni zaskrtnut, pak nacita data ze submitu
        function nastavNeaktivniRadiobuttony(){

            //detekuje, zda ani jeden radiobutton neni zaskrtnut
            var smerXChecked =  $("#smerX").prop("checked");
            var smerYChecked =  $("#smerY").prop("checked");

            if(smerXChecked == false){
                if(smerYChecked == false){

                    //pak nacita data z posunu
                    //preavadi na boolean, proto " === 'true'"
                    var aktivniShiftX = ($("#statusShiftX").val() === 'true');
                    var aktivniShiftY = ($("#statusShiftY").val() === 'true');

                    $("#smerX").prop("checked", aktivniShiftX);
                    $("#smerY").prop("checked", aktivniShiftY);

                }
            }

        }

        
        //vyber z comboboxu
        $("select").change(function(vyberSelect) {

            vyberSelect = $( '.selectMeritka :selected' ).text(); 
            if(vyberSelect == "Měřítko"){
                console.log("Měřítko");
                $(".meritkoZvlast").show();

                var checkBoxIsChecked = $('#meritkoZvlast').is(":checked");
                if(checkBoxIsChecked == true){
                    $(".smery").show();

                    //pokud neni zaskrtnut ani jeden smer zkontroluje a zaskrtne
                    nastavNeaktivniRadiobuttony();

                }
                else {
                    $(".smery").hide();
                }


                //radiobutton se směry se zobrazí jen když:
                //smeryRadioJsouZobrazeny == true,
                //jedná-li se o posun
                
                if(smeryRadioJsouZobrazeny == true){
                    $(".smery").show()

                    //pokud neni zaskrtnut ani jeden smer zkontroluje a zaskrtne
                    nastavNeaktivniRadiobuttony();
                }
                else {
                    $(".smery").hide()
                }
                
            }
            else {
                $(".meritkoZvlast").hide();

                //radiobutton se směry se zobrazí vždy, jedná-li se o posun
                $(".smery").show()

                //pokud neni zaskrtnut ani jeden smer zkontroluje a zaskrtne
                nastavNeaktivniRadiobuttony();
            }

        });
        
        //vyber radiobuttonu
        $('input[type=radio][name=smery]').change(function(vyberSelect, smerVyber) {
            smerRadio = this.value;
        });
        
        //ovlada checkbox
        $("#meritkoZvlast").change(function() {
            if(this.checked) {
                smeryRadioJsouZobrazeny = true;
                $(".smery").show()

                //pokud neni zaskrtnut ani jeden smer zkontroluje a zaskrtne
                nastavNeaktivniRadiobuttony();
            }
            else {
                smeryRadioJsouZobrazeny = false;
                $(".smery").hide()
            }
        });

    }


    ovladejTlacitka(meritkoJson){
       
        console.log(meritkoJson);
        let meritkaJson = meritkoJson;  //aby se data dostala do eventu-click


        
        //funkce volaná z "$("#buttPlus").click" / "$("#buttMinus").click"
        function zapisujStatusyDoSubmitu(meritkoJson){

            //defaultne nacita data z WS, nize data prepisuje aktualnimi
            var statusScaleUni = meritkoJson.mainView.ScaleUni.status;
            var statusScaleX = meritkoJson.mainView.ScaleX.status;
            var statusScaleY = meritkoJson.mainView.ScaleY.status;
            var statusShiftX = meritkoJson.mainView.ShiftX.status; 
            var statusShiftY = meritkoJson.mainView.ShiftY.status; 
    
            //prepisuje data aktualne zvolenym nastavenim
            //var vyberSelect = "" + $(".selectMeritka:selected").val();
            var vyberSelect = $( '.selectMeritka :selected' ).text(); 
            console.log(vyberSelect);
            if(vyberSelect == "Měřítko"){
                if($('#meritkoZvlast').prop('checked') == false){
                    statusScaleUni = true;
                    statusScaleX = false;
                    statusScaleY = false;
                }
                else{
                    statusScaleUni = false;
                    statusScaleX = $('#smerX').prop('checked');
                    statusScaleY = $('#smerY').prop('checked');
                }
            }
            else{
                statusShiftX = $('#smerX').prop('checked');
                statusShiftY = $('#smerY').prop('checked');
            }

            //zapise data do submitu
            $("#statusScaleUni").val(statusScaleUni);
            $("#statusScaleX").val(statusScaleX);
            $("#statusScaleY").val(statusScaleY);
            $("#statusShiftX").val(statusShiftX);
            $("#statusShiftY").val(statusShiftY);
    
        }


        function vyberDataProPrepocitani(meritkoJson){

            //detekuje, ktere meritko ma prepocitat
            var statusScaleUni = $("#statusScaleUni").val() === 'true';
            var statusScaleX = $("#statusScaleX").val() === 'true';
            var statusScaleY = $("#statusScaleY").val() === 'true';
            var statusShiftX = $("#statusShiftX").val() === 'true';
            var statusShiftY = $("#statusShiftY").val() === 'true';

            var vyberSelect = $( '.selectMeritka :selected' ).text(); 
            var valueZoomStatus;

            if(vyberSelect == 'Měřítko'){
                if(statusScaleUni == true){
                    valueZoomStatus = meritkoJson.mainView.ScaleUni;
                    $("#idZoom").val("ScaleUni");
                }
                if(statusScaleX == true){
                    valueZoomStatus = meritkoJson.mainView.ScaleX;
                    $("#idZoom").val("ScaleX");
                }
                if(statusScaleY == true){
                    valueZoomStatus = meritkoJson.mainView.ScaleY;
                    $("#idZoom").val("ScaleY");
                }
            }
            else {
                if(statusShiftX == true){
                    valueZoomStatus = meritkoJson.mainView.ShiftX;
                    $("#idZoom").val("ShiftX");
                }
                if(statusShiftY == true){
                    valueZoomStatus = meritkoJson.mainView.ShiftY;
                    $("#idZoom").val("ShiftY");
                }
            }


            return(valueZoomStatus);

        }


        function prepocitejMeritko(meritkoJson, inOut){

            var valueZoomStatus = vyberDataProPrepocitani(meritkoJson);
            var value = valueZoomStatus.ValueDefault;
            var zoom = valueZoomStatus.ZoomInOut
            
            //priblizi nebo oddali meritko
            var valueNew = value + inOut * zoom;
            $("#valueZoom").val(valueNew);

        }

        var meritkoO = $("#meritkoO").val();


        //ovlada tlacitko "+"
        $("#buttPlus").click(function() {

            //zapise statusy 
            zapisujStatusyDoSubmitu(meritkaJson);

            //zapise aktualni meritko (po prepocitani zoom in/out) do submitu
            prepocitejMeritko(meritkaJson, 1);


           

        });

        //ovlada tlacitko "-"
        $("#buttMinus").click(function() {

            //zapise statusy 
            zapisujStatusyDoSubmitu(meritkaJson);

            //zapise aktualni meritko (po prepocitani zoom in/out) do submitu
            prepocitejMeritko(meritkaJson, -1);

        });

    };


}


$( 'document' ).ready(function(){

    //nacte meritka z web. sluzby a pak ovlada GUI
    var nactiMeritkaZWS = new nactiJSONajaxMainScales();



});
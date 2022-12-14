
class nactiJSONajaxWrapper{

    constructor(){

        const nJSON = new nactiJSONWrapper();
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/dataWrapper");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 1);
        });
    }

}



class nactiJSONWrapper{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
            let zobrazujSkryvejOkna = new zobrazujDleNastaveni(this.jsonPole[0]);
            let rozvrzeni = new generujRozvrzeni(this.jsonPole[0]);
            let chybaGUI = new generujChybu(this.jsonPole[0]);
        }
        
    }

    

}


class zobrazujDleNastaveni{

    //constructor(wrapperJson){
    constructor(wrapperJson){

        var nastaveniZobrazeni = wrapperJson.nastaveni;
        //console.log(nastaveniZobrazeni);

        this.zobrazElementy = this.ziskejJsonProZobrazeni(nastaveniZobrazeni);
        this.zobrazVybraneNastaveni(this.zobrazElementy);

    }


    //projde json s nastavenim vsech elementu a postupne vola metodu "zobrazSkryjDanyElement"
    zobrazVybraneNastaveni(zobrazElementy){

        Object.keys(zobrazElementy).forEach(function(key) {
            var elementClass = key;
            var zobrazit = zobrazElementy[key];
            
            if(zobrazit == true){
                $("." + elementClass).show();
            }
    
            if(zobrazit == false){
                $("." + elementClass).hide();
            }
        })

    }


    // ziska json, aby vedel jake elementy se budou zobrazovat
    ziskejJsonProZobrazeni(nastaveniZobrazeni){

        var hlavicka;
        var meritka;
        var menu;
        var hlOkno;
        var detOkno;
        var vodRez;
        var svisRez;

        
        if(nastaveniZobrazeni == "hlPohled_bezDetailu"){
            hlavicka = true;
            meritka = true;
            menu = true;
            hlOkno = true;
            detOkno = false;
            vodRez = false;
            svisRez = false;
        }
        if(nastaveniZobrazeni == "hlPohled_detail"){
            hlavicka = true;
            meritka = true;
            menu = true;
            hlOkno = true;
            detOkno = true;
            vodRez = false;
            svisRez = false;
        }
        if(nastaveniZobrazeni == "hlPohled_rezy"){
            hlavicka = true;
            meritka = true;
            menu = true;
            hlOkno = true;
            detOkno = true;
            vodRez = true;
            svisRez = true;
        }


        //nastavi JSON
        var zobrazElementy = {
            hlavicka: hlavicka,
            meritka: meritka,
            menu: menu,
            hlOkno: hlOkno,
            detOkno: detOkno,
            vodRez: vodRez,
            svisRez: svisRez,
        }


        return(zobrazElementy);

    }

}


class generujRozvrzeni{

    constructor(wrapperJson){

        //ziska data z jsonu
        var nastaveniZobrazeni = wrapperJson.nastaveni;
        var rozvrzeniArr = wrapperJson.dataWrapper;

        //vytvori GUI
        this.vytvorWrapper(rozvrzeniArr);

        //nastavi rozmery GUI
        this.nastavMaxWidthHeight(wrapperJson);

    }

    //vlozi ".wrapper" do css-style
    vytvorWrapper(rozvrzeniArr){

        var wrapperArr = this.vratPoleRadkuWrapper(rozvrzeniArr);
        var wrapperStr = "";

        for (var i = 0; i < wrapperArr.length; i++) {
            var wrapperLine = wrapperArr[i];
            wrapperStr = wrapperStr + wrapperLine;
        }

        $("<style>")
        .prop("type", "text/css")
        .html(wrapperStr).appendTo("head");

    }

    //nastavi rozmery "max-width: ??px;" a "max-height: ??px;"
    nastavMaxWidthHeight(wrapperJson){

        var maxWidth = wrapperJson.maxWidth;
        var maxHeight = wrapperJson.maxHeight;

        //sirka a vyska se upravuje jen v pripade, ze je upravena
        if(maxWidth != "0"){
            $(".wrapper").css("max-width", maxWidth);
        }
        if(maxHeight != "0"){
            $(".wrapper").css("max-height", maxHeight);
        }
    }


    vratPoleRadkuWrapper(rozvrzeniArr){

        var wrapperArr = [];

        wrapperArr.push('            .wrapper {');
        wrapperArr.push('                background-color: #2196F3;');
        wrapperArr.push('                display: grid;');
        wrapperArr.push('                grid-template-columns: repeat(8, 1fr);');
        wrapperArr.push('                gap: 10px;');
        wrapperArr.push('                grid-auto-rows: 100px;');
        wrapperArr.push('                grid-template-areas:');

        wrapperArr = wrapperArr.concat(rozvrzeniArr);

        /*
        if(nastaveniZobrazeni == "hlPohled_bezDetailu"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d";');

        }    

        if(nastaveniZobrazeni == "hlPohled_detail"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a e e e e e e";');
            
        }    

        if(nastaveniZobrazeni == "hlPohled_rezy"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d g"');
            wrapperArr.push('                "a a d d d d d g"');
            wrapperArr.push('                "a a f f f f f e";');
            
        }    
        */

        wrapperArr.push('                padding: 10px;');
        wrapperArr.push('            }');

        return(wrapperArr);

    }

}


class generujChybu{

    constructor(wrapperJson){

        var status = wrapperJson.status;
        var jetoOK = this.detekujZdaDataObsahujiChybu(status);

        if(jetoOK == false){
            this.vypisChybu(status);
        }
    
    }


    detekujZdaDataObsahujiChybu(status){

        var jeToOK = true;

        var statusHeight = status.statusHeight;
        var statusWidth = status.statusWidth;

        if(typeof statusHeight === 'object'){
            jeToOK = false;
        }

        if(typeof statusWidth === 'object'){
            jeToOK = false;
        }

        

        return(jeToOK);

    }


    vypisChybu(status){

        $("#error").css("border", "5px outset red");
        $("#error").css("text-align", "center");
        $("#error").css("padding", "10px");
        $("#error").css("background-color", "yellow");
        $("#error").css("height", "70px");

        var statusStr = JSON.stringify(status);
        var statusWidth = status.statusWidth;
        var statusHeight = status.statusHeight;

        var errStrWidth = this.vratErrStr(statusWidth, 'width');
        var errStrHeight = this.vratErrStr(statusHeight, 'height');

        $("#errorWidth").html(errStrWidth);
        $("#errorHeight").html(errStrHeight);

        console.log(errStrWidth);
        //console.log(errStrHeight);

    }


    vratErrStr(statusWidthHeight, widthHeight){

        var errStr
        console.log(statusWidthHeight);

        if(statusWidthHeight === 'OK'){
            errStr = '<strong>' + widthHeight + '</strong><br>OK'
        }
        else {
            var errId = statusWidthHeight.errId;
            var errInfo = statusWidthHeight.errInfo;
            var errPerc = statusWidthHeight.errPerc;

            var divStr1 = '<div>'
            var errStrLabel = '<strong>' + widthHeight + '</strong><br>'
            var errStrId = 'Id: ' + errId + '<br>';
            var errStrPerc = widthHeight + ':' + errPerc + '<br>';
            var errStrInfo = '<strong>' + errInfo + '</strong>';
            var divStr2 = '</div>'

            errStr = divStr1 + errStrLabel + errStrId + errStrPerc + errStrInfo + divStr2;
        }
        
        return(errStr);

    }

}



$( 'document' ).ready(function(layoutSizeData){

    var nastaveniZobrazeni = "hlPohled_rezy";
    //var zobrazujSkryvejOkna = new zobrazujDleNastaveni(nastaveniZobrazeni);
    //var rozvrzeni = new generujRozvrzeni(nastaveniZobrazeni);
    var hlavniOknoGUI = new nactiJSONajaxWrapper();


    //console.log("---- scriptROzvrzeni -----");
    //console.log(layoutSizeData);

    //if(nastaveniZobrazeni == "hlPohled_rezy"){
    //    $(".detOkno").css("width", 100);
    //}


    //prepina na nastaveni projektu
    $("#buttNastaveniProjektu").click(function() {
        window.location.href="http://localhost:3000/nastaveniProjektu"
    });
    
});
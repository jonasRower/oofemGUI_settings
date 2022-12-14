
// generuje jednotlive radky elementu
class generujRadkyElementu{

    //vraci redek elementu <p>
    vratRadekP(elementP){

        var pDescription = elementP.pDescription;
        var pId = elementP.pId;
        var pClass = elementP.pClass;
        var radekElementu = '<p';

        //zapise Id a class
        var radekIDClass = this.zapisIdClass(pId, pClass);
        
        radekElementu = radekElementu + radekIDClass;
        radekElementu = radekElementu + '>' + pDescription + '</p>';

        return(radekElementu);

    }


    //vraci radek elementu <select> 
    vratRadekSelect(elementSelect){

        var selectId = elementSelect.selectId;
        var selectClass = elementSelect.selectClass;

        var radekElementu = '<select';

        //zapise Id a class
        var radekIDClass = this.zapisIdClass(selectId, selectClass);
        radekElementu = radekElementu + radekIDClass;

        radekElementu = radekElementu  + '>';

        return(radekElementu);

    }


    //vraci radky <option>
    vratRadkyOption(elementSelect, nastaveniMenu){

        var radkyElementu = "";
        var radekElementu;
        var radkyOption = elementSelect.radkyOption;
        var selectId = this.vratIdElementSelectu(elementSelect);


        for (var i = 0; i < radkyOption.length; i++) {

            var polozkaJeNastavena = this.detekujNastavenouPolozku(nastaveniMenu, radkyOption[i], selectId);

            //nastavi vychozi nastaveni option
            if(polozkaJeNastavena == false){
                radekElementu = '<option>' + radkyOption[i] + '</option>';
            };
            if(polozkaJeNastavena == true){
               
                radekElementu = '<option selected>' + radkyOption[i] + '</option>';
               
            }
            
            radkyElementu = radkyElementu + radekElementu;

        }

        radkyElementu = radkyElementu + '</select>'

        return(radkyElementu);

    }


    //vrati id selectu
    vratIdElementSelectu(elementSelect){

        try{
            var selectId = elementSelect["selectId"];
            return(selectId);
     
        }
        catch {
            return("");
        }

    }


    //vraci radek elementu <form> 
    vratRadekForm(elementForm){

        var formId = elementForm.formId;
        var formClass = elementForm.formClass;
        var radekElementu = '<form';

        //zapise Id a class
        var radekIDClass = this.zapisIdClass(formId, formClass);
        radekElementu = radekElementu + radekIDClass;

        radekElementu = radekElementu  + '>';

        return(radekElementu);

    }
    

    //vraci radky <input>
    vratRadkyForm(elementForm, nastaveniMenu){

        var radkyInput;
        var radekInput;
        var radekElementu;
        var radkyElementu = "";
        

        radkyInput = elementForm.radkyInput;

        for (var i = 0; i < radkyInput.length; i++) {

            radekInput = radkyInput[i];
            var checked = "";

            // detekuje, zda je dany radiobutton nastaven
            var polozkaJeNastavena = this.detekujNastavenouPolozku(nastaveniMenu, radekInput);
            
            if(polozkaJeNastavena == true){
                checked = "checked";
            }

            radekElementu = '<input ' + checked + ' type="radio" name="radioName" id="' + radekInput + '" value="' + radekInput + '"/> ' + radekInput + ' <br />';
            radkyElementu = radkyElementu + radekElementu;

        }

        radkyElementu = radkyElementu + '</form>'

        return(radkyElementu);

    }


    //na zaklade "id" a "class" zapise parametry do radku
    //jsou-li "id" nebo "class" prazdne, parametry vynecha
    zapisIdClass(elId, elClass){

        var radekElementu = "";

        if(elId != ""){
            radekElementu = radekElementu + ' id="' + elId + '"';
        }

        if(elClass != ""){
            radekElementu = radekElementu + ' class="' + elClass + '"';
        }

        return(radekElementu);

    }


    // detekuje zda se jedna o polozku, ktera je nastavena
    detekujNastavenouPolozku(nastaveniMenu, polozkaExp, selectId){

        var polozkaJeNastavena = false;

        if(selectId != undefined){
            polozkaJeNastavena = this.testujKlicHodnotu(selectId, polozkaExp, nastaveniMenu)
        }
        else {
            for (var key in nastaveniMenu) {
                
                var polozka = nastaveniMenu[key];
                if(polozka == polozkaExp){
                    polozkaJeNastavena = true;
                    break;
                }
            }
        }


        return(polozkaJeNastavena);

    }


    testujKlicHodnotu(klic, hodnota, nastaveniMenu){

        var jsonObsahujeKlicHodnotu;
        var nastaveniMenuStr;
        var klicHodnotaStr;
        var indStr;
        
        jsonObsahujeKlicHodnotu = false;
        klicHodnotaStr = '"' + klic + 'Submit":"' + hodnota + '"';
        nastaveniMenuStr = JSON.stringify(nastaveniMenu);

        indStr = nastaveniMenuStr.indexOf(klicHodnotaStr);
        if(indStr > -1){
            jsonObsahujeKlicHodnotu = true
        }

        return(jsonObsahujeKlicHodnotu);

    }

}



class nactiJSONajax{

    constructor(){

        const nJSON = new nactiJSON2();
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataMenu");
        this.nactiDataUrl(nJSON, "http://localhost:3000/nastaveniMenu");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 2);
        });
    }

}


class nactiJSON{

    constructor(){
        this.jsonPole = [];
    }


    setData(data){
        //$("#json").append(JSON.stringify(data))
    }

}




class nactiJSON2{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
            this.generovaniElementu(this.jsonPole[0], this.jsonPole[1]);
        }
    }

    generovaniElementu(response, nastaveniMenu){

        $("#json").append(JSON.stringify(response))

        //ziska obsah html pro vykresleni menu
        var generujElementy = new generovaniElementu(response, nastaveniMenu);
        var poleRadkuElementu = generujElementy.getPoleRadkuElementu(response);

        //zobrazi menu
        //<option selected> je 2x - chyba
        console.log(poleRadkuElementu);
        $(".menu").append(poleRadkuElementu);

        //prida udalosti pro jednotlive elementy, aby dokazal zapsat data pro submit
        var udalostiGUI = new ElementEvent(poleRadkuElementu);

    }

}



class generovaniElementu{

    constructor(response, nastaveniMenu){

        var polePoradi;
        this.elementyMenu = response;

        polePoradi = this.ziskejPoradiElementu();

        this.poleRadkuElementu = this.ziskejPoleElementu(polePoradi, response, nastaveniMenu);
        
    }


    getPoleRadkuElementu(){

        return(this.poleRadkuElementu);
    }


    //ziska poradi elemntu, aby vedel v jakem poradi je bude vyhledavat
    ziskejPoleElementu(polePoradi, elementyMenu, nastaveniMenu){

        var poradiElement;
        var splitArr = [];
        var typElementu;
        var indexVPoli;

        var parametryElementu;
        var radkyElementuZFunkce;
        var radkyElementu = [];


        for (var i = 0; i < polePoradi.length; i++) {

            poradiElement = polePoradi[i];
            splitArr = poradiElement.split("_");
            typElementu = splitArr[0];
            indexVPoli = parseInt(splitArr[1]);

            parametryElementu = this.ziskejElementyZJSONu(elementyMenu, typElementu, indexVPoli);
            radkyElementuZFunkce = this.vratRadekElementuNaZakladeTypu(typElementu, parametryElementu, nastaveniMenu);

            radkyElementu.push(radkyElementuZFunkce);
     
        }

        return(radkyElementu);
    
    }


    //rozlisuje o jaky se jedna typ elementu, zavola spravnou metodu a vrati radek elementu
    vratRadekElementuNaZakladeTypu(typElementu, parametryElementu, nastaveniMenu){

        var radkyElementu;
        var radkyElementuAll = [];
        var genElement = new generujRadkyElementu();
        
        if(typElementu == "elementP"){
            //vytvori <p>
            radkyElementu = genElement.vratRadekP(parametryElementu);
            radkyElementuAll = radkyElementu;     
        }
        if(typElementu == "elementSelect"){
            //vytvori <select>
            radkyElementu = genElement.vratRadekSelect(parametryElementu);
            radkyElementuAll = radkyElementu;
            
            //vytvori <option>
            radkyElementu = genElement.vratRadkyOption(parametryElementu, nastaveniMenu);
            radkyElementuAll = radkyElementuAll + radkyElementu;
        }
        if(typElementu == "elementForm"){
            //vytvori <form> 
            radkyElementu = genElement.vratRadekForm(parametryElementu);
            radkyElementuAll = radkyElementu;

            //vytvori <input>
            radkyElementu = genElement.vratRadkyForm(parametryElementu, nastaveniMenu);
            radkyElementuAll = radkyElementuAll + radkyElementu;
        }

        return(radkyElementuAll);

    }



    //ziska elementy z JSONu
    ziskejElementyZJSONu(elementyMenu, typElementu, indexVPoli){

        var parametryElementu;

        if(typElementu == "elementP"){
            parametryElementu = elementyMenu.elementP[indexVPoli];
        }
        if(typElementu == "elementSelect"){
            parametryElementu = elementyMenu.elementSelect[indexVPoli];
        }
        if(typElementu == "elementForm"){
            parametryElementu = elementyMenu.elementForm[indexVPoli];
        }

        return(parametryElementu);

    }

    
    // vytvori pole, urcujici poradi v jakem sub-JSONy budou nacitany
    ziskejPoradiElementu(){

        var polePoradi = [];
        var pocetElementu;
        var poradiElementu;

        pocetElementu = this.elementyMenu.pocetElementu;

        for (var i = 0; i <= pocetElementu; i++) {
            poradiElementu = this.vyhledejElementMenu(this.elementyMenu, i)
            polePoradi.push(poradiElementu);
        }
        
        return(polePoradi);

    }


    //vyhleda dany element dle "poradiElementu"
    vyhledejElementMenu(elementyMenu, poradiElementuExp){

        var ElementMenuIndex = "";

        //vyhledava v "elementP"
        if(ElementMenuIndex == ""){

            for (var i = 0; i < elementyMenu.elementP.length; i++) {
                var poradiElementu = elementyMenu.elementP[i].poradiElementu;
                if(poradiElementu == poradiElementuExp){
                    ElementMenuIndex = "elementP_" + i;
                }
            }
        }

        //vyhledava v "elementSelect"
        if(ElementMenuIndex == ""){

            for (var i = 0; i < elementyMenu.elementSelect.length; i++) {
                var poradiElementu = elementyMenu.elementSelect[i].poradiElementu;
                if(poradiElementu == poradiElementuExp){
                    ElementMenuIndex = "elementSelect_" + i;
                }
            }
        }

        //vyhledava v "elementForm"
        if(ElementMenuIndex == ""){

            for (var i = 0; i < elementyMenu.elementForm.length; i++) {
                var poradiElementu = elementyMenu.elementForm[i].poradiElementu;
                if(poradiElementu == poradiElementuExp){
                    ElementMenuIndex = "elementForm_" + i;
                }
            }
        }

        return(ElementMenuIndex);

    }


    ziskejElementyMenu(){

        var json = "http://localhost:3000/dataMenu";
        
        $.getJSON( json, {})
            .done(function( data ) {
                var elementyMenu = data;
                return(elementyMenu);
            });
        };

}


//udalosti vytvorenych elementu
class ElementEvent{

    constructor(poleRadkuElementu){

        this.udalostiGUI(poleRadkuElementu);

    }

    udalostiGUI(poleRadkuElementu){

        $("#selectPrePost").on('change', function() {
            $("#inputId").val('selectPrePost');
            $("#inputValue").val($( '#selectPrePost :selected' ).text());
        });

        $("#selectLoad").on('change', function() {
            $("#inputId").val('selectLoad');
            $("#inputValue").val($( '#selectLoad :selected' ).text());           
        });

        $("#specifyDOF").on('change', function() {
            $("#inputId").val('specifyDOF');
            $("#inputValue").val($('input[name=radioName]:checked', '#specifyDOF').val());         
        });

        $("#selectDOFinputs").on('change', function() {
            $("#inputId").val('selectDOFinputs');
            $("#inputValue").val($( '#selectDOFinputs :selected' ).text());            
        });

        $("#selectResults").on('change', function() {
            $("#inputId").val('selectResults');
            $("#inputValue").val($( '#selectResults :selected' ).text());            
        });

        $("#selectDOF").on('change', function() {
            $("#inputId").val('selectDOF');
            $("#inputValue").val($( '#selectDOF :selected' ).text());            
        });

        $("#selectOFT").on('change', function() {
            $("#inputId").val('selectOFT');
            $("#inputValue").val($( '#selectOFT :selected' ).text());
        });

        $("#filterBy").on('change', function() {
            $("#inputId").val('filterBy');
            $("#inputValue").val($('input[name=radioName]:checked', '#filterBy').val()); 
        });

        $("#selectElementPreview").on('change', function() {
            $("#inputId").val('selectElementPreview');
            $("#inputValue").val($( '#selectElementPreview :selected' ).text());
        });

        $("#numberValues").on('change', function() {
            $("#inputId").val('numberValues');
            $("#inputValue").val($( '#numberValues :selected' ).text());
        });

        $("#selectNodePreview").on('change', function() {
            $("#inputId").val('selectNodePreview');
            $("#inputValue").val($( '#selectNodePreview :selected' ).text());
        });

        $("#moveText").on('change', function() {
            $("#inputId").val('moveText');
            $("#inputValue").val($( '#moveText :selected' ).text());
        });     

    }

}



//reaguje na klikani do menu
$( 'document' ).ready(function(){

    var generujElementyAjax = new nactiJSONajax();

});

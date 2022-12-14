
class nactiJSONajaxLayout{

    constructor(){

        const nJSON = new nactiJSONLayout();
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/layout");
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/layoutSize");

    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 2);
        });
    }

}



class nactiJSONLayout{

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
            var comboDomainANazevProjektu = new sledujRadio(this.jsonPole[0], this.jsonPole[1]);
        }
        
    }

}


//#######################################################################


//bude pouzito v pripade dopocitani zbyvajich polozek
//pokud se jedna o submit, budou se nacitat vsechny polozky najednou
class nastavRozmeryGUI{

    constructor(rozvrzeniData){

        console.log(rozvrzeniData);

        this.idVsechSelectu = this.vratVsechnyIDselectu();
        this.sledujNastaveniVsechComboboxu(this.idVsechSelectu);

        //nastavovat sirky dle nastaveni, tady v menu - casem, nema prioritu

    }


    sledujNastaveniVsechComboboxu(idVsechSelectu){
       
        $( "select" ).change(function () {

            for (var i = 0; i < idVsechSelectu.length; i++) {
                var idSelectu = "#" + idVsechSelectu[i];

                $( idSelectu + " option:selected" ).each(function() {
                    console.log( $( this ).text() );
                });
            }

        })
        .change();

    }


    //vrati vsechna id, selectu, aby je dokazal sledovat pres script
    vratVsechnyIDselectu(){

        console.log($('select'));

        var idVsechSelectu = [];
        
            $('select').each(function () {
                idVsechSelectu.push(this.id);
        });

        return(idVsechSelectu);
        
    }


    sledujNastaveniComboboxu(){

        $( "#headerOptWidth" )
        .change(function () {
            $( "#headerOptWidth option:selected" ).each(function() {
                alert( $( this ).text() );
            });
        })
        .change();

    }

}


//#######################################################################
// vytvori rozvrzeni (v nastaveni)

class sledujRadio{

    constructor(rozvrzeniData, rozvrzeniSizeAll){

        this.rozvrzeniData = rozvrzeniData;
        this.rozvrzeniSizeAll = rozvrzeniSizeAll;
        this.sledujPrenastaveniRadioButtonu();

        //jedna se o data, ktera budou vykreslovana v hlavni grafice
        //je potreba pred odeslanim na backend data zkontrolovat, aby grafiku bylo mozne vykreslit
        this.potvrdZmenyLayoutSize();  

        //pokud se zobrazi na poprve, vykresli se rozvrzeni rovnou
        //pouzije se "rozvrzeniAktualni" z webové služby
        var rozvrzeniAktualni = "";
        var rozvrzeniVNastaveniData = new generujRozvrzeniVNastaveni(rozvrzeniAktualni, rozvrzeniData);
        var rozvrzeniVNastaveniSize = new nastavRozvrzeniSize(rozvrzeniSizeAll);

        //pri prvnim zobrazeni nastavi radio z webove sluzby
        this.nastavRadioZWS()
    }


    //sleduje radiobutton "choose the layout of GUI"
    sledujPrenastaveniRadioButtonu(){

        let rozvrzeniData = this.rozvrzeniData;
        let rozvrzeniSizeAll = this.rozvrzeniSizeAll;
        this.rozvrzeniData = rozvrzeniData;

        //do submitu se uklada rozvrzeni predchozi, tj. rozvrzeni pred zmenou
        //proto je potreba ulozit predchozi radioButton
        let rozvrzeniPredchozi = $('input[name="vyberGUI"]:checked').val();

        //neni-li zaskrtnut radiobutton, nastavuje se vychozi zadani z WS
        if(rozvrzeniPredchozi == undefined){
            rozvrzeniPredchozi = rozvrzeniSizeAll.rozvrzeniAktualni;
        }


        $('input:radio[name=vyberGUI]').change(function() {

            var rozvrzeniSizePredchozi = rozvrzeniSizeAll[rozvrzeniPredchozi];

            //drive nez se prekresli rozvrzeni, je treba ulozit stare zmeny
            var jsonLayoutSizeSubmit = new sestavJsonLayoutSizeSubmit(rozvrzeniSizePredchozi);
            var layoutSizeSubmit = jsonLayoutSizeSubmit.getLayoutSizeSubmit()
            var layoutSizeSubmitStr = JSON.stringify(layoutSizeSubmit);
            
            //ziska id submit inputu, aby vedel do ktereho bude zapisovat data
            var idSubmit = '#' + rozvrzeniPredchozi + '-layoutSizeSubmit';
            
            //zapise data do submitu, neni nutno data kontrolovat, jelikoz se nejedna o data,
            //na zaklade nichz se bude vykreslovat grafika v hlavnim okne
            //data se odesilaji z duvodu, ze kdyz se znova vyvola toto nastaveni, aby si data pamatoval
            $(idSubmit).val(layoutSizeSubmitStr);

            var rozvrzeniAktualni = $('input[name="vyberGUI"]:checked').val();

            $("#tableLayout").html("");
            var rozvrzeniVNastaveniData = new generujRozvrzeniVNastaveni(rozvrzeniAktualni, rozvrzeniData);
            var rozvrzeniVNastaveniSize = new nastavRozvrzeniSize(rozvrzeniSizeAll);

            //je treba uchovat data do dalsi zmeny
            rozvrzeniPredchozi = rozvrzeniAktualni;
            
        });

    }


    //pouzije nstaveni z webové služby a nastavi radiobutton
    nastavRadioZWS(){

        //nacte aktualni rozvrzeni z webove sluzby
        this.rozvrzeniAktualni = this.rozvrzeniData.rozvrzeniAktualni;

        //zaskrtne dany radiobutton
        $('#' + this.rozvrzeniAktualni).prop('checked',true);

    }


    //po stisku tlacitka prepise zmeny do submit poli, aby je mohl predat na backend
    potvrdZmenyLayoutSize(){

        //let rozvrzeniData = this.rozvrzeniData;
        let rozvrzeniSizeAll = this.rozvrzeniSizeAll;

        $("#confirmLayout").click(function() {

            //ziska aktualni Json
            var rozvrzeniAktualni = $('input[name="vyberGUI"]:checked').val();
            var rozvrzeniSize = rozvrzeniSizeAll[rozvrzeniAktualni];

            //do tridy pro zpetne nacitani dat (pro submit) odesilam vsechna id
            var jsonLayoutSizeSubmit = new sestavJsonLayoutSizeSubmit(rozvrzeniSize);
            var layoutSizeSubmit = jsonLayoutSizeSubmit.getLayoutSizeSubmit();
            var layoutSizeSubmitStr = JSON.stringify(layoutSizeSubmit);

            //zapise data do input pro submit, aby je dokazal vratit
            var rozvrzeniAktualni = $('input[name="vyberGUI"]:checked').val();
            var idSubmit = '#' + rozvrzeniAktualni + '-layoutSizeSubmit';
            $(idSubmit).val(layoutSizeSubmitStr);

            //zapise vybrany radiobutton, aby bylo jasne, jaky je aktualni - ten se bude vykreslovat
            $("#radioLayoutSubmit").val(rozvrzeniAktualni);

            //proveri zda dalsi input-submity jsou vyplneny, pokud ne, vyplni je orig daty
            var vyplnSubmity = new zapisOstatniInputyProSubmit(rozvrzeniSizeAll, rozvrzeniAktualni);

            //prepise maxWidth/HeightSubmit
            var maxWidthSubmit = $("#maxWidth").val();
            var maxHeightSubmit = $("#maxHeight").val();

            if(maxWidthSubmit == ""){
                maxWidthSubmit = "0";
            }

            if(maxHeightSubmit == ""){
                maxHeightSubmit = "0";
            }

            $("#maxWidthSubmit").val(maxWidthSubmit);
            $("#maxHeightSubmit").val(maxHeightSubmit);

        });

    }

}


//pred submitem kontroluje zda jsou vsechna pole vyplnena
//pokud ne, je treba do input-submit poli vyplnit alespon originalni data - jelikoz data nejsou zmenena
//pokud by data zmenena byla, pak se vyplnili s prepnutim radiobuttonu
class zapisOstatniInputyProSubmit{

    constructor(rozvrzeniSizeAll, rozvrzeniAktualni){

        this.rozvrzeniSizeAll = rozvrzeniSizeAll;
        this.rozvrzeniAktualni = rozvrzeniAktualni;
        this.inputSubmityID = this.vratVsechnaInputSubmity(rozvrzeniSizeAll);
        this.jsonyJsouZapsany = this.zjistiZdaJsouInputyVyplneny(this.inputSubmityID);
        this.doplnNevyplnenaPole(this.jsonyJsouZapsany, this.inputSubmityID);

        console.log(this.inputSubmityID);
        console.log(this.jsonyJsouZapsany);

    }


    vratVsechnaInputSubmity(rozvrzeniSizeAll){

        var inputSubmityID = [];

        var vsechnyId = Object.keys(rozvrzeniSizeAll)
        for (var i = 0; i < vsechnyId.length; i++) {
            var id = vsechnyId[i];
            var idSubmit = '#' + id + '-layoutSizeSubmit';
            inputSubmityID.push(idSubmit);
        }

        return(inputSubmityID);

    }


    zjistiZdaJsouInputyVyplneny(inputSubmityID){

        var JsonJeZapsan = []

        for (var i = 0; i < inputSubmityID.length; i++) {
            var idSubmit = inputSubmityID[i];
            var obsahInputu = $(idSubmit).val();

            if(obsahInputu == ""){
                JsonJeZapsan.push(false);
            }
            else{
                JsonJeZapsan.push(true);
            }
        }

        return(JsonJeZapsan);

    }


    doplnNevyplnenaPole(jsonyJsouZapsany, inputSubmityID){

        for (var i = 0; i < inputSubmityID.length; i++) {
            var jsonJeZapsan = jsonyJsouZapsany[i];
            if(jsonJeZapsan == false){
                var inputSubmit = inputSubmityID[i];
                var id = inputSubmit.replace('-layoutSizeSubmit', '');
                id = id.replace('#', '');

                var jsonOrig = this.rozvrzeniSizeAll[id];
                var jsonOrigStr = JSON.stringify(jsonOrig);
                $(inputSubmit).val(jsonOrigStr);
            }
        }

    }



}



//trida nastavi jednotlive comboboxy (nebo textboxy) + radiobuttony, dle dat z WS:
//http://localhost:3000/nastaveniProjektu/layoutSize

class nastavRozvrzeniSize{

    constructor(rozvrzeniSizeAll){

        //nsatavi aktualni json
        this.rozvrzeniSize = this.vyberJson(rozvrzeniSizeAll);
        this.nastavVsechnyElementy()

    }


    //vybere data dle aktualniho nastaveni radiobuttonu
    vyberJson(rozvrzeniSizeAll){

        var rozvrzeniAktualni = $('input[name="vyberGUI"]:checked').val();
        var rozvrzeniSize;

        //neni-li vybrano zadne combo, pak nacita data vychozi
        if(rozvrzeniAktualni == undefined){
            rozvrzeniAktualni = rozvrzeniSizeAll.rozvrzeniAktualni;
        }

        //pokud byl radiobutton prepnut, zmenena data byla ulozena
        //aby se prepsala data v rozvrzeni nelze nacitat originalni data, 
        //jelikoz by se neuchovavaly zmeny, proto pri novem prepnuti radiobuttonu
        //se jiz nenacitaji originalni data

        //to se zjistuje tak, ze pokud input-submit obsahuje "", pak se nacita z originalnich dat
        //jinak se nacita z input-submit nazpatek, aby se vzdy nacetly zmenena data
        var idSubmit = '#' + rozvrzeniAktualni + '-layoutSizeSubmit';
        var inputSubmit = $(idSubmit).val();

        //pokud je input-submit prazdny (jeste nebyl vyplnen - nedoslo ke zmene zadani)
        //pak se nahraji data ze vstupu
        if(inputSubmit == ""){
            rozvrzeniSize = rozvrzeniSizeAll[rozvrzeniAktualni];
        }
        else{ //pokud jsou jiz data ulozena, nahraji se data ktera jsou v input-submitu
            var rozvrzeniSizeStr = $(idSubmit).val();
            rozvrzeniSize = JSON.parse(rozvrzeniSizeStr);
        }

        return(rozvrzeniSize);

    }


    nastavVsechnyElementy(){

        var vsechnyID = Object.keys(this.rozvrzeniSize);

        //nastavuje elementy "width" a "height" pres stejnou metodu
        this.nastavElementyWidthHeight(vsechnyID, "width");
        this.nastavElementyWidthHeight(vsechnyID, "height");

    }


    //nastavi vsechny elementy width nebo height
    nastavElementyWidthHeight(vsechnyID, widthHeight){

        var id;
        var JsonId;
        var JsonIdWidthHeight;
        var px;
        var perc;

        for (var i = 0; i < vsechnyID.length; i++) {
            id = vsechnyID[i];
            JsonId = this.rozvrzeniSize[id];
            JsonIdWidthHeight = JsonId[widthHeight];

            px = JsonIdWidthHeight.px;
            perc = JsonIdWidthHeight.perc;

            this.nastavTextBoxSize(id, widthHeight, px);
            this.nastavComboboxSize(id, widthHeight, perc);
            this.nastavRadioButtonSize(id, widthHeight, px);

        }

    }


    nastavTextBoxSize(id, widthHeight, px){

        var widthHeightNew = this.zmenPrvniPismeno(widthHeight);
        var idElementu = '#' + id + "Text" + widthHeightNew;

        //zaporne pixely znamenaji, ze radiobutton je nastaven na "perc"
        //nevyplnuje se zde nic
        if(px == -1){
            px = "";
        }
        
        $(idElementu).val(px);

    }

    nastavComboboxSize(id, widthHeight, perc){

        var widthHeightNew = this.zmenPrvniPismeno(widthHeight);
        var idElementu = '#' + id + "Opt" + widthHeightNew;

        //nastavi combobox
        $(idElementu).val(perc).change();

    }

    nastavRadioButtonSize(id, widthHeight, px){

        var widthHeightNew = this.zmenPrvniPismeno(widthHeight);
        var idElementu;
        var pxPerc;

        if(px == -1){
            pxPerc = "Perc";
        }
        else {
            pxPerc = "Px";
        }

        idElementu = '#' + id + pxPerc + widthHeightNew;
    
        //nastavi radioButton
        $(idElementu).prop('checked', true);

        //disabluje combobox
        this.disablujComboNeboText(idElementu);

    }

    disablujComboNeboText(idElementu){

        var indexOfPx = idElementu.indexOf("Px");
        var indexOfPerc = idElementu.indexOf("Perc");

        var idCombo = idElementu.replace("Px", "Opt");
        var idText = idElementu.replace("Perc", "Text");


        //zpristupni textbox
        if(indexOfPx > -1){
            $(idCombo).attr("disabled", true);
            $(idText).attr("disabled", false);
        }

        //zpristupni combobox
        if(indexOfPerc > -1){
            $(idText).attr("disabled", true);
            $(idCombo).attr("disabled", false);
        }
    }

    zmenPrvniPismeno(widthHeight){

        var widthHeightNew;

        //zmeni 1. pismeno na velke
        if(widthHeight == "width"){
            widthHeightNew = "Width";
        }
        if(widthHeight == "height"){
            widthHeightNew = "Height";
        }

        return(widthHeightNew);
    }

}



//trida vygeneruje append-string pro zobrazeni rozvrzeni, zde v nasteveni
//pouziva data z:
//http://localhost:3000/nastaveniProjektu/layout

class generujRozvrzeniVNastaveni{

    constructor(rozvrzeniAktualni, rozvrzeniData){

        this.rozvrzeniAktualni = rozvrzeniAktualni;
        this.rozvrzeniData = rozvrzeniData;

        this.vykresliRozvrzeniNastaveniProjektu();

    }

    
    vykresliRozvrzeniNastaveniProjektu(){

        //vybere data z webové sluzby
        var poleID = this.vyberDataZWS();
        var kostraTabulkyPoleRadku = this.generujBunkyTabulky(poleID);
        var kostraTabulkyStr = this.prevedPoleNaString(kostraTabulkyPoleRadku);

        //prida obsah html layout
        $("#tableLayout").append(kostraTabulkyStr);

        //vytvori udalosti pro prepinani mezi radiobuttony
        this.vytvorUdalostiNaGenerovaneElementy(poleID);

    }


    //disabluje textbox nebo combo dle zaškrtnutí radiobuttonu
    vytvorUdalostiNaGenerovaneElementy(poleID){

        for (var r = 0; r < 4; r++) {
            for (var s = 0; s < 2; s++) {
                var id = poleID[r][s][1];
    
                var radioNameWidth = id + "RadioWidth";
                var radioNameHeight = id + "RadioHeight";

                //prida udalost k Width
                this.pridejUdalostNaElement(radioNameWidth);

                //prida udalost k height
                this.pridejUdalostNaElement(radioNameHeight);

            }
        }
    }


    //prida udalosti k jednotlivym radiobuttonum
    pridejUdalostNaElement(radioName){

        $('input[type=radio][name=' + radioName + ']').change(function() {
            var idRadioCombo = "#" + radioName.replace("Radio", "Perc");

            var idCombo = "#" + radioName.replace("Radio", "Opt");
            var idText = "#" + radioName.replace("Radio", "Text");

            var idComboChecked = $(idRadioCombo).is(":checked");

            if(idComboChecked == true){
                $(idText).attr("disabled", true);
                $(idCombo).attr("disabled", false);

                //vymaze textbox
                $(idText).val('');
            }
            else {
                $(idText).attr("disabled", false);
                $(idCombo).attr("disabled", true);
            }

        });

    }


    generujBunkyTabulky(poleID){

        var radkyHtml = [];

        for (var r = 0; r < 4; r++) {
            var radekTrStart = '<tr class="' + r + '_">';
            radkyHtml.push(radekTrStart);
    
            //console.log(poleID);

            for (var s = 0; s < 2; s++) {
                var text = poleID[r][s][0];
                var id = poleID[r][s][1];
                var sloucit = poleID[r][s][2];

                if(text != ""){

                    var radekTdStart = '<td class="' + r + '_' + s + '" ' + sloucit + '>';
                    var radekLabel = '<label class="nadpisBunky">' + text + '</label>';
                    var radkyObsahuBunky = this.vratObsahBunky(id);
                    var radekTdEnd = '</td>';

                    radkyHtml.push(radekTdStart);
                    radkyHtml.push(radekLabel);

                    //pripoji pole radku html obsahujici pole radku bunky
                    radkyHtml = radkyHtml.concat(radkyObsahuBunky);
                    radkyHtml.push(radekTdEnd);

                }
            }

            var radekTrEnd = '</tr>';

        }

        return(radkyHtml);

    }


    //vybere aktualni nastaveni rozvrzeni a vrati data, aby mohl vytvorit kostru
    vyberDataZWS(){

        //neni-li rozvrzene vybrano, pouzije data z WS
        if(this.rozvrzeniAktualni == ""){
            this.rozvrzeniAktualni = this.rozvrzeniData.rozvrzeniAktualni;
        }
        
        var rozvrzeniNastaveniProjektu = this.rozvrzeniData[this.rozvrzeniAktualni];

        return(rozvrzeniNastaveniProjektu);

    }


    vratObsahBunky(id){

        var poleRadkuObsahBunky = [];
        var poleRadkuCombo = this.vratPoleRadkuCombo();
        var poleRadkuRadioWidth = this.vratPoleRadkuRadio(id, 'Width');
        var poleRadkuRadioHeight = this.vratPoleRadkuRadio(id, 'Height');


        poleRadkuObsahBunky.push('<br>');


        // +++++++++++++++++++++++++ sekce width +++++++++++++++++++++++++
        poleRadkuObsahBunky.push('<label class="' + id + 'LabelWidth">width:</label>');
        poleRadkuObsahBunky.push('<div class="' + id + 'InputWidth">');

        //pripoji radky radiobuttonu - Width:
        poleRadkuObsahBunky = poleRadkuObsahBunky.concat(poleRadkuRadioWidth);
        poleRadkuObsahBunky.push('<select class="combo" id="' + id + 'OptWidth">');

        //vlozi radky comboboxu
        poleRadkuObsahBunky = poleRadkuObsahBunky.concat(poleRadkuCombo);
        poleRadkuObsahBunky.push('</select>');
        poleRadkuObsahBunky.push('</div>');


        // +++++++++++++++++++++++++ sekce height +++++++++++++++++++++++++
        poleRadkuObsahBunky.push('<label class="' + id + 'LabelHeight">&nbsp; &nbsp; height:</label>');
        poleRadkuObsahBunky.push('<div class="' + id + 'InputHeight">');

        //pripoji radky radiobuttonu - Height:
        poleRadkuObsahBunky = poleRadkuObsahBunky.concat(poleRadkuRadioHeight);
        poleRadkuObsahBunky.push('<select class="combo" id="' + id + 'OptHeight">');

        //vlozi radky comboboxu
        poleRadkuObsahBunky = poleRadkuObsahBunky.concat(poleRadkuCombo);
        poleRadkuObsahBunky.push('</select>');
        poleRadkuObsahBunky.push('</div>');

        return(poleRadkuObsahBunky)

    }


    vratPoleRadkuCombo(){

        var poleRadkuCombo = [];

        poleRadkuCombo.push('<option value="10%">10%</option>');
        poleRadkuCombo.push('<option value="20%">20%</option>');
        poleRadkuCombo.push('<option value="30%">30%</option>');
        poleRadkuCombo.push('<option value="40%">40%</option>');
        poleRadkuCombo.push('<option value="50%">50%</option>');
        poleRadkuCombo.push('<option value="60%">60%</option>');
        poleRadkuCombo.push('<option value="70%">70%</option>');
        poleRadkuCombo.push('<option value="80%">80%</option>');
        poleRadkuCombo.push('<option value="90%">90%</option>');


        return(poleRadkuCombo);

    }


    vratPoleRadkuRadio(id, widthHeight){

        var idPx = id + 'Px' +  widthHeight;
        var idPerc = id + 'Perc' +  widthHeight;
        var idText = id + 'Text' +  widthHeight;
        var name = id + 'Radio' +  widthHeight;

        var poleRadkuRadio = []

        var radekInput1 = '<input type="radio" id="' + idPx + '" name="' + name + '" value="' + name + '">'
        var radekInput2 = '<input class="textField" for="' + idPx + '" type="text" id="' + idText + '"><br></br>'
        var radekInput3 = '<input type="radio" id="' + idPerc + '" name="' + name + '" value="' + name + '">'

        poleRadkuRadio.push(radekInput1);
        poleRadkuRadio.push(radekInput2);
        poleRadkuRadio.push(radekInput3);

        return(poleRadkuRadio);

    }
   
    prevedPoleNaString(poleRadku){

        var poleRadkuStr = "";

        //prevede pole na string
        for (var i = 0; i < poleRadku.length; i++) {
            poleRadkuStr = poleRadkuStr + poleRadku[i] + "\n";
        }

        return(poleRadkuStr)

    }


    udalostiNaVytvoreneGUI(){

        $('input[type=radio][name=radioShiftDirection]').change(function() {

        }


        )}

}


//trida, ktera vytvori JSON, podobny jako "rozvrzeniSize" - resp. ma stejnou strukturu
//ale slouzi k predani dat pomoci submitu na backend

class sestavJsonLayoutSizeSubmit{

    constructor(rozvrzeniSize){

        this.rozvrzeniSize = rozvrzeniSize;
        this.layoutSizeSubmit = this.nactiDataZLayoutSize();

    }

    //dodelat kontrolu na soucet procent, zda to v okne sedi

    //vrati data
    getLayoutSizeSubmit(){
        console.log(this.layoutSizeSubmit);
        return(this.layoutSizeSubmit);
    }


    //nacte vsechny data z nastaveni rozvrzeni a vytvori novy JSON
    nactiDataZLayoutSize(){

        var layoutSize = {};
        var vsechnaID = Object.keys(this.rozvrzeniSize)

        for (var i = 0; i < vsechnaID.length; i++) {
            var id = vsechnaID[i];

            var pxPercValueHeight = this.nactiDataPxPerc(id, "Height");
            var pxPercValueWidth = this.nactiDataPxPerc(id, "Width");

            //console.log()

            var idJson = {
                height: pxPercValueHeight,
                width: pxPercValueWidth
            }

            layoutSize[id] = idJson;
        }

        return (layoutSize);


    }

    //nacte data z textboxu a comboboxu
    nactiDataPxPerc(id, widthHeight){

        var idPx = '#' + id + "Text" + widthHeight;
        var idPerc = '#' + id + "Opt" + widthHeight;

        var pxValue = $(idPx).val();
        var percValue = $(idPerc).find(":selected").text();

        if(pxValue == undefined){
            pxValue = -1;
        }

        if(pxValue == ""){
            pxValue = -1;
        }

        //pokud percValue, pak hodnota nebyla vyplnena
        //vyplnuje se tedy hodnota z originalnich dat
        if(percValue == ''){
            percValue = this.vratHodnotuZOriginalnichDat(id, widthHeight, 'perc');
        }


        var pxPercValue = {
            px: pxValue,
            perc: percValue
        }

        return (pxPercValue);

    }


    //pokud neni hodnota v GUI zadana, pak dohledava hodnotu v originalnich datech
    //tato situace nastava, v pripade, kdy neni nastavene plne GUI (napr. rezy), pak data nejsou vyplnena
    //je treba tedy vratit i data nevyplnena, v pripade, ze uzivatel uzivatel prepne GUI, tak aby tam data byla
    vratHodnotuZOriginalnichDat(id, widthHeight, pxPerc){

        var widthHeightNew = widthHeight.toLowerCase();
        var JsonId = this.rozvrzeniSize[id];
        var JsonIdWidthHeight = JsonId[widthHeightNew];
        var hodnotaOrig = JsonIdWidthHeight[pxPerc];

        return(hodnotaOrig);

    }

}



$( 'document' ).ready(function(){

    //nacte data z WS a zobrazi je v nastaveni rozvrzeni
    var rozvrzeniVNastaveni = new nactiJSONajaxLayout();

   
    
});
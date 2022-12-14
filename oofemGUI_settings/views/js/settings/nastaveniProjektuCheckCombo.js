
class nactiJSONajaxCheckCombo{

    constructor(){

        const nJSON = new nactiJSONCheckCombo();
        this.nactiDataUrl(nJSON, "http://localhost:3000/settings/checkCombo");

    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 1);
        });
    }

}


class nactiJSONCheckCombo{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
        
            // vytvori data pro zobrazeni comboboxu pro vyber projektu
            var comboDomainANazevProjektu = new udalostiProComboboxy(this.jsonPole[0]);

            //nefunguje prepinani radiobuttonu´:
            // Main view
            // Main view + detail view
            // Main view + section view

        }
        
    }

}


class udalostiProComboboxy{

    constructor(checkComboDataAll){

        this.checkComboDataAll = checkComboDataAll;

        this.rozvrzeniAktualni = $('input[name="vyberGUI"]:checked').val();
        this.checkComboData = this.checkComboDataAll[this.rozvrzeniAktualni];

        //poskytne udalosti vsem comboboxum Height
        this.widthHeight = "Height";
        this.aktualizujTimeVsemComboBoxum();

        //poskytne udalosti vsem comboboxum Width
        this.widthHeight = "Width";
        this.aktualizujTimeVsemComboBoxum();

    }

    vratVsechnyIdZJsonu(){

        var widthHeight = this.widthHeight.toLowerCase();
        
        var idAll = [];
        var idJson = this.checkComboData[widthHeight].id;
        var pocetR = idJson.length;

        
        for (var r = 0; r < pocetR; r++) {
            var pocerS = idJson[r].length;
            for (var s = 0; s < pocerS; s++) {
                var id = idJson[r][s];
                idAll.push(id);
            }
        }

        var idAllUnique = idAll.filter(this.onlyUnique);
      
        return(idAllUnique);

    }


    aktualizujTimeVsemComboBoxum(){

        var idAll = this.vratVsechnyIdZJsonu();

        for (var i = 0; i < idAll.length; i++) {
            var id = idAll[i];
            var idComboboxu = '#' + id + 'Opt' + this.widthHeight;

            this.sledujNastaveniComboboxu(idComboboxu);


        }
    }


    //vrati id vsech comboboxu, ktere maji datvat soucet 100%
    //vraci se vzdy ke comboboxu naposledy vybranemu
    //vratIdOstatnichComboboxu()


    //zapise casy zmen comboboxu, aby vedel jake combo ma zmenit, pokud soucet nesouhlasi    
    sledujNastaveniComboboxu(idComboboxu){

        let checkComboData = this.checkComboData;
        let widthHeightUp = this.widthHeight;
        let widthHeight = this.widthHeight.toLowerCase();
        let checkComboDataAll = this.checkComboDataAll;
        let rozvrzeniAktualni = this.rozvrzeniAktualni;

        $(idComboboxu).on('change', function() {

            var idCombo = $( this ).closest('.combo').attr('id');
            var kontrolujComba = new kontrolujComboboxy(checkComboDataAll, rozvrzeniAktualni, widthHeightUp, checkComboData);

            //zapise casy znmeny comboboxu
            kontrolujComba.zapisujCasyComboboxu(idCombo);

            //opravi ostatni comboboxy, u kterych ma byt soucet = 100
            kontrolujComba.opravDataOstatnichComboboxu(idCombo)
            var zmeneneCombo = kontrolujComba.getIdComboChanged();

            //zmeni cas opraveneho comba
            kontrolujComba.zapisujCasyComboboxu(zmeneneCombo);

            //jelikoz zmeneny combo je navazany na dalsi, zmeni i tento
            kontrolujComba.opravDataOstatnichComboboxu(zmeneneCombo);

        });
        
    }


    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

}


class kontrolujComboboxy{

    //do constructoru se ulozi data
    //je treba data uchovat, jelikoz "vratIdOstatnichComboboxu" se vola rekurzivne
    constructor(checkComboDataAll, rozvrzeniAktualni, widthHeightUp, checkComboData){

        this.checkComboDataAll = checkComboDataAll;
        this.rozvrzeniAktualni = rozvrzeniAktualni;
        this.widthHeightUp = widthHeightUp;
        this.widthHeight = widthHeightUp.toLowerCase();

        this.checkComboData = checkComboData;
        this.cyklus = 0;

    }

    //vrati id zmeneneho comba, tak aby mohl testovat i ostatni vazby
    getIdComboChanged(){
        return(this.idComboMin);
    }

    //ziska cas posledniZmeny
    getPosledniCas(){
        return(this.posledniCas);
    }

    //zapise casy aktualizace comboboxu
    zapisujCasyComboboxu(idCombo){

        //pokud jeste neni zapsan JSON v submitu, nacita data z webove sluzby (this.checkComboDataAll)
        //jinak nacita ze submit-inputu
        let checkComboDataNew;

        var dataZeSubmitu = $("#checkComboSubmit").val();
        if(dataZeSubmitu == ""){
            checkComboDataNew = this.checkComboDataAll;
        }
        else {
            checkComboDataNew = JSON.parse(dataZeSubmitu);
        }

        //zjisti id
        var idExp = idCombo.replace('Opt' + this.widthHeightUp, '');

        var d = new Date();
        var time = d.getTime();

        var idJson = this.checkComboData[this.widthHeight].id;
        var timeJson = this.checkComboData[this.widthHeight].time;

        var pocetR = idJson.length;
        
        for (var r = 0; r < pocetR; r++) {
            var pocerS = idJson[r].length;
            for (var s = 0; s < pocerS; s++) {
                var id = idJson[r][s];
                if(id == idExp){
                    timeJson[r][s] = time;
                }
            }
        }

        //ziska posledni cas
        this.posledniCas = time;

        //upravi puvodni json
        checkComboDataNew[this.rozvrzeniAktualni][this.widthHeight].time = timeJson;

        //console.log(checkComboDataNew);

        //zapise Json do submitu
        var checkComboDataStr = JSON.stringify(checkComboDataNew);
        console.log(checkComboDataNew);
        $("#checkComboSubmit").val(checkComboDataStr);

    }

    //opravuje data ostatnich comboboxu
    opravDataOstatnichComboboxu(idCombo){

        //jelikoz se trida vola rekurzivne, data se nacitaji z this
        var checkComboDataAll = this.checkComboDataAll;
        var rozvrzeniAktualni = this.rozvrzeniAktualni;
        var widthHeightUp = this.widthHeightUp;

        //console.log(idCombo);
        //console.log(checkComboDataAll);

        var checkComboData = checkComboDataAll[rozvrzeniAktualni];
        var idExp = idCombo.replace("Opt" + widthHeightUp, "");
        var widthHeight = widthHeightUp.toLowerCase();

        var dataId = checkComboData[widthHeight].id;
        var dataTime = checkComboData[widthHeight].time;
        var indexRPole = this.vratVsechnyRadkyPoleKtereMajiDaneId(dataId, idExp);

        console.log(dataId);

        for (var i = 0; i < indexRPole.length; i++) {
            var indexR = indexRPole[i];
            console.log(indexR);
            var dataCombaAll = this.vratIdComboboxuProKontroluSouctu(dataId[indexR], dataTime[indexR], widthHeightUp);
            this.opravNejstarsiPerc(dataCombaAll);
        
        }

    }


    //dopocita vzdy ten nejstarsi combobox (=nejdrive zmeneny)
    opravNejstarsiPerc(dataCombaAll){

        var timeMin = dataCombaAll[0][2];
        var percDopocet = [dataCombaAll[0][1]];
        var indexMin = 0;
        
        for (var i = 1; i < dataCombaAll.length; i++) {
            var time = dataCombaAll[i][2];
            var perc = dataCombaAll[i][1];
            if(time < timeMin) {
                timeMin = time;
                indexMin = i;
            }

            percDopocet.push(perc);
        }

        var percMin = dataCombaAll[indexMin][1];
        var idComboMin = dataCombaAll[indexMin][0];

        //odebere polozku, ktera nejde do vypoctu - ktera bude prepsana
        var iDop = percDopocet.indexOf(percMin);
        if (iDop !== -1) {
            percDopocet[iDop] = "";
        }

        console.log(percDopocet);

        var opravenaHodnota = this.vratDopoctenouHodnotu(percDopocet);
        console.log(opravenaHodnota);

        //prenastavi combo
        $(idComboMin).val(opravenaHodnota);

        //nastavi data jako tridni, aby mohl data vratit
        this.idComboMin = idComboMin.replace('#', '');


    }


    vratDopoctenouHodnotu(percDopocet){

        var soucetClenu = 0;
        var opravitNaHodnotu;
        var opravitNaPerc;

        for (var i = 0; i < percDopocet.length; i++) {
            var perc = percDopocet[i];
            if(perc != ''){
                var percCislo = parseInt(perc);
                soucetClenu = soucetClenu + percCislo;
            }  
        }

        opravitNaHodnotu = 100-soucetClenu;
        opravitNaPerc = opravitNaHodnotu + "%"

        return(opravitNaPerc);

    }


    vratIdComboboxuProKontroluSouctu(dataId, dataTime, widthHeightUp){

        var dataCombaAll = [];

        for (var i = 0; i < dataId.length; i++) {
            var id = dataId[i];
            var idCombo = '#' + id + 'Opt' + widthHeightUp;
            var time = dataTime[i];

            var vybranaHodnota = $(idCombo).find(":selected").text();
            var dataComba = [];

            dataComba.push(idCombo);
            dataComba.push(vybranaHodnota);
            dataComba.push(time);

            dataCombaAll.push(dataComba);
    
        }   

        return(dataCombaAll);

    }



    vratVsechnyRadkyPoleKtereMajiDaneId(data, idExp){

        var pocetR = data.length;
        var indexR = [];

        for (var r = 0; r < pocetR; r++) {
            var pocerS = data[r].length;
            for (var s = 0; s < pocerS; s++) {
                var id = data[r][s];
                if(id == idExp){
                    indexR.push(r);
                }
            }
        }

        return(indexR);

    }


    

}


$( 'document' ).ready(function(){

    //nacte data z WS a zobrazi je v nastaveni rozvrzeni
    var rozvrzeniVNastaveni = new nactiJSONajaxCheckCombo();
   
});
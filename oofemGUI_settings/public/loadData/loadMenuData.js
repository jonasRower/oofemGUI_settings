
class roztridDataProjektu {

    constructor(jsonMenu, obsahyMenu, hodnotyProjektuActual, zavislostiJson){

        //ziska json menu, ktere se bude prepisovat (nahrazovat aktualnimi daty)
        //var menuDataCl = new menuData();
        //this.JSONMenu = menuDataCl.getJSONMenu();
        this.JSONMenu = jsonMenu;
        console.log(obsahyMenu);

        this.radkyOptionAktualni = this.ziskejDataDoJsonMenu(hodnotyProjektuActual, obsahyMenu, zavislostiJson);   
        this.JSONMenuNew = this.nahradDataJsonMenu(this.radkyOptionAktualni, this.JSONMenu);

    }

    getJSONMenuNew(){
        return(this.JSONMenuNew);
    }


    //vrati data, aby vedel jake polozky z DB ma prirazovat pod konkretni selectId, jako napr.:
    //vi, ze 'ElementLoads' patri pod 'selectId: "selectLoad"' , jelikoz v DB jsou Id jine a jinak seskupene
    vratPrednastavenyObsahElementu(){

        //udava, co muzou dane elementy obsahovat
        var obsahElementu = {
            elementy : [ 
                {
                    selectId: "selectLoad",
                    radkyOption: [
                        "ElementLoads",
                        "NodalLoads",
                        "ForcedDisplacement",
                        "TemperatureLoad"
                    ]
                },
                {
                    selectId: "selectDOFinputs",
                    radkyOption: ["**int"]
                },
                {
                    selectId: "selectResults",
                    radkyOption: [
                        "LocalDisplacements",
                        "GlobalDisplacements",
                        "LocalForces",
                        "Reactions",
                        "NodalDisplacements"
                    ]
                },
                {
                    selectId: "selectDOF",
                    radkyOption: ["**int"]
                },
                { 
                    selectId: 'selectOFT',
                    radkyOption: ["**float"]
                }	
            ]	
        }

        return(obsahElementu)

    }

    
    nahradDataJsonMenu(radkyOptionAktualni, JSONMenu){

        /*
        // --------- test ---------------------------
        
        radkyOptionAktualni = [{
            selectId: 'selectLoad',
            radkyOptionAktualni: [
              'ElementLoads',
              'NodalLoads',
              'ForcedDisplacement',
              'TemperatureLoad'
            ]
        },
        {
            selectId: 'selectDOFinputs'
        },
        {
            selectId: 'selectResults',
            radkyOptionAktualni: [
              'LocalDisplacements',
              'GlobalDisplacements',
              'LocalForces',
              'Reactions'
            ]
        },
        { 
            selectId: 'selectDOF'
        },
        
    
        ]
        */

        var JsonMenuNew;

        //for (var i = 0; i < JSONMenu.length; i++) {
        for (var i = 0; i < radkyOptionAktualni.length; i++) {
            var optionAktualniJson = radkyOptionAktualni[i];
            JsonMenuNew = this.nahradDataPodleOptionAktualni(optionAktualniJson, JSONMenu);
        }

        return(JsonMenuNew);

    }


    nahradDataPodleOptionAktualni(optionAktualniJson, menu){

        let JSONMenu = menu;

        //nahrazuje data v dilcim uzlu od JSONMenu
        function nahradElementSelect(elementSelect, optionAktualniJson){

            var selectIdExp = optionAktualniJson.selectId;
            var radkyOptionNew = optionAktualniJson.radkyOptionAktualni;

            //pokud chybeji data, prepise chybovou hlaskou
            if(radkyOptionNew.length === 0){
                radkyOptionNew = ["empty data"];
            }
         
            for (var i = 0; i < elementSelect.length; i++) {
                var elementSelectUzel = elementSelect[i];
                var selectId = elementSelectUzel.selectId;
                if(selectId == selectIdExp){
                    elementSelectUzel.radkyOption = radkyOptionNew;
        
                    //zapise data nazpet
                    elementSelect[i] = elementSelectUzel;
                    
                }
            }

            return(elementSelect)

        }


        Object.keys(JSONMenu).forEach(function(key) {
            
            var caseJson = JSONMenu[key];
            var elementSelect = caseJson.elementSelect;
            var elementSelectNew = nahradElementSelect(elementSelect, optionAktualniJson);

            //prepise data nazpet
            JSONMenu[key].elementSelect = elementSelectNew;

        })

        /*
        //slouzi k testovani dat, jelikoz conzole nezobrazuje zanorena data
        Object.keys(JSONMenu).forEach(function(key) {
            console.log("+++++++++++++++++AA");
            console.log(JSONMenu[key].elementSelect);
            console.log("+++++++++++++++++AA");
        });
        */

        return(JSONMenu);

    }


    //ziska data do JsonMenu
    ziskejDataDoJsonMenu(hodnotyProjektuActual, obsahyMenu, zavislostiJson){

        var radkyOptionAktualniAll = [];

        for (var i = 0; i < obsahyMenu.elementy.length; i++) {
        
            var element = obsahyMenu.elementy[i];
            var selectId = element.selectId;
            var radkyOption = element.radkyOption;

            var dataDB = this.vyberDataDleSelectId(selectId, hodnotyProjektuActual);

            //detekuje, ktere data z db se maji pouzit do menu
            //jelikoz v databazi mohou byt nekorektni data
            var pouzitRadkyCl = new detekujKteraDataPouzit(radkyOption, dataDB);
            var pouzitRadky = pouzitRadkyCl.getPouzitRadky();

            console.log("pouzijDatapouzijDatapouzijDatapouzijData");
            console.log(pouzitRadky);
            console.log("pouzijDatapouzijDatapouzijDatapouzijData");

            //var pouzitRadky = this.detekujKtereRadkyOptionPouzit(radkyOption, dataDB);
            var radkyOptionAktualni = this.vratRadkyOptionAktualni(radkyOption, pouzitRadky, selectId, dataDB)
            
            
            console.log("--------");
            console.log(dataDB);
            console.log(radkyOption);
            console.log(pouzitRadky);
            console.log(selectId);
            console.log("--------");
            
            
            radkyOptionAktualniAll.push(radkyOptionAktualni);

        }

        return(radkyOptionAktualniAll);

    }


    // vrati radkyOption platne pro stavajici projekt
    vratRadkyOptionAktualni(radkyOption, pouzitRadky, selectId, dataDB){

        var radkyOptionAktualni = [];
        var radkyOptionAktualniJson;
        var fLetter = radkyOption[0].charAt(0);

        //bud nacita data z aplikace nebo z databaze
        var pouzijData;

        if(fLetter == '*'){
            pouzijData = dataDB;

            if(radkyOption[0] == '**allList'){ //vyjimka - je treba pouzit cely seznam, prednastaveny
                pouzijData = radkyOption;
            }
        }
        else {
            pouzijData = radkyOption;
        }
          
        
        for (var i = 0; i < pouzijData.length; i++) {
            var radekOption = pouzijData[i];
            var pouzitRadek = pouzitRadky[i];
            
            if(pouzitRadek == true){
                radkyOptionAktualni.push(radekOption);
            }
        }
        

        radkyOptionAktualniJson = {
            selectId: selectId,
            radkyOptionAktualni: radkyOptionAktualni
        }

        return(radkyOptionAktualniJson);

    }


    //je treba priradit k "selectId" data z databaze
    //"selectId" je nastaveno zde: "vratPrednastavenyObsahElementu -> obsahElementu"
    vyberDataDleSelectId(selectId, hodnotyProjektuActual){

        var dataDB;
        if(selectId == "selectLoad"){
            dataDB = hodnotyProjektuActual.hodnotyTypDat;
        }
        if(selectId == "selectDOFinputs"){
            dataDB = hodnotyProjektuActual.hodnotyDOF;
        }
        if(selectId == "selectResults"){
            dataDB = hodnotyProjektuActual.hodnotyTypDat;
        }
        if(selectId == "selectDOF"){
            dataDB = hodnotyProjektuActual.hodnotyDOF;
        }
        if(selectId == "selectOFT"){
            dataDB = hodnotyProjektuActual.hodnotyOFT;
        }

        return dataDB;

    }


    //vrati pole true/false dle radku, ktere pouzije
    detekujKtereRadkyOptionPouzit(radkyOption, dataDB){

        var pouzitRadky = [];

        for (var i = 0; i < radkyOption.length; i++) {
            var shoda = false;
            var hodnotaOption = radkyOption[i];
            var hodnotaOption1 = this.prevedNaJednotneCislo(hodnotaOption);
            
            for (var iDB = 0; iDB < dataDB.length; iDB++) {
                var polozkaDB = dataDB[iDB];
                var polozkaDB1 = this.prevedNaJednotneCislo(polozkaDB);

                if(polozkaDB1 == hodnotaOption1){
                    shoda = true;
                    break;
                }
            }
            pouzitRadky.push(shoda);
        }

        return(pouzitRadky);

    }


    //obcas tam jsou rozdily - jednotne/mnozne cislo nazvu, proto prevadi vzdy na cislo jednotne
    prevedNaJednotneCislo(polozka){

        var last = polozka.substring(polozka.length - 1, polozka.length);
        if (last == 's'){
            var polozka1 = polozka.substring(0, polozka.length - 1);
        }
        else {
            var polozka1 = polozka;
        }

        return(polozka1);

    }



    ziskejPoleSelectIdObsahElementu(obsahElementu){

        var selectIdPole = [];

        for (var i = 0; i < obsahElementu.elementy.length; i++) {

            var element = obsahElementu.elementy[i];
            var selectId = element.selectId;

            selectIdPole.push(selectId);

        }

        return(selectIdPole);

    }


}


//vrati pole true/false podle polozek z DB, ktera se pouziji
//databaze muze obsahovat nesmysly, je treba tyto data nevypisovat v comboboxech
class detekujKteraDataPouzit{

    constructor(radkyOption, dataDB){

        var pouzitRadky;
        var fLetter = radkyOption[0].charAt(0);

        //bud se do tridy detekujKteraDataPouzit posila seznam hodnot (ktere se zobrazi v comboboxu),
        //nebo je potreba detekovat cislo, jelikoz se muze jednat o cislo jakekoliv
        //v tom pripade se radkyOption nastavuji jako **int nebo ** float - aby se vedelo jaky typ cisel vracet
        if(fLetter == '*'){
            if(radkyOption[0] == '**int'){
                pouzitRadky = this.detekujKtereRadkyOptionPouzitCislaInt(dataDB);
            }
            else if(radkyOption[0] == '**float'){
                pouzitRadky = this.detekujKtereRadkyOptionPouzitCislaFloat(dataDB);
            }
            else if(radkyOption[0] == '**allList'){
                pouzitRadky = this.detekujKtereRadkyPouzitAllList(radkyOption);
            }
        }

        else { //bezny seznam hodnot, ani ne **int , ani **float
            pouzitRadky = this.detekujKtereRadkyOptionPouzitSeznam(radkyOption, dataDB);
        }

       

        this.pouzitRadky = pouzitRadky;
    }


    getPouzitRadky(){
        return(this.pouzitRadky);
    }


    //vrati "pouzitRadky",  pokud je nastaveno "**allList"
    detekujKtereRadkyPouzitAllList(radkyOption){

        var pouzitRadky = [];
        pouzitRadky.push(false)  //prvni clen je vzdy false, protoze obsahuje '**allList'

        //ostatni jsou true, vzdy, jelikoz se z DB nenacita
        for (var i = 1; i < radkyOption.length; i++) {
            pouzitRadky.push(true);
        }

        return(pouzitRadky);

    }

    //vrati pole true/false dle radku, ktere pouzije
    detekujKtereRadkyOptionPouzitSeznam(radkyOption, dataDB){

        var pouzitRadky = [];

        for (var i = 0; i < radkyOption.length; i++) {
            var shoda = false;
            var hodnotaOption = radkyOption[i];
            var hodnotaOption1 = this.prevedNaJednotneCislo(hodnotaOption);
            
            for (var iDB = 0; iDB < dataDB.length; iDB++) {
                var polozkaDB = dataDB[iDB];
                var polozkaDB1 = this.prevedNaJednotneCislo(polozkaDB);

                if(polozkaDB1 == hodnotaOption1){
                    shoda = true;
                    break;
                }
            }
            pouzitRadky.push(shoda);
        }

        return(pouzitRadky);

    }


    detekujKtereRadkyOptionPouzitCislaInt(dataDB){

        var pouzitRadky = [];

        for (var i = 0; i < dataDB.length; i++) {
            var hodnotaDB = dataDB[i];
            var shoda = this.isInt(parseFloat(hodnotaDB));
            pouzitRadky.push(shoda);
        }

        return(pouzitRadky);

    }


    detekujKtereRadkyOptionPouzitCislaFloat(dataDB){

        var pouzitRadky = [];

        for (var i = 0; i < dataDB.length; i++) {
            var hodnotaDB = dataDB[i];
            var shoda = this.sFloat(parseFloat(hodnotaDB));
            if(shoda == false){
                //proveri znovu, pokud je v exponencialnim tvaru, obcas klame, proto proveruje zde:
                shoda = this.detekujZdaSeJednaOExponecialniTvar(hodnotaDB);
            }

            pouzitRadky.push(shoda);

        }

        return(pouzitRadky);

    }


    detekujZdaSeJednaOExponecialniTvar(cislo){

        var shoda = false;
        var myArray = cislo.split("e");

        if(myArray.length > 1){
            var expo = myArray[1];
            var fLetter = expo.charAt(0);
            var expoNum = expo.replace(fLetter, "");

            var shoda = this.isInt(parseFloat(expoNum));
            
        }

        return(shoda);

    }


    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
    sFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }


    //obcas tam jsou rozdily - jednotne/mnozne cislo nazvu, proto prevadi vzdy na cislo jednotne
    prevedNaJednotneCislo(polozka){

        var last = polozka.substring(polozka.length - 1, polozka.length);
        if (last == 's'){
            var polozka1 = polozka.substring(0, polozka.length - 1);
        }
        else {
            var polozka1 = polozka;
        }

        return(polozka1);

    }
    
}



//zde zacina modul
export const loadMenuData = ((jsonMenu, obsahyMenu, hodnotyProjektuActual, zavislostiJson) => {

    //roztridi data
    var roztridData = new roztridDataProjektu(jsonMenu, obsahyMenu, hodnotyProjektuActual, zavislostiJson);
    var JSONMenu = roztridData.getJSONMenuNew();

    //var menuDataCl = new menuData();
    //var JSONMenu = menuDataCl.getJSONMenu();

    return(JSONMenu);
      
});
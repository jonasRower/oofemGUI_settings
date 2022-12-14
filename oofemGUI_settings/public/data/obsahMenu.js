//definuje jaka data lze pouzit z db pro konkretni comboboxy
//bude se pouziji data z DB, nebo se pouziji data filtru

class obsahMenuData{

    constructor(zavislostiFilter, dbUzelPrut, cisloUzlu, cisloPrutu){
        
        var obsahElementu;

        cisloUzlu = 2;

        if(dbUzelPrut == "db"){
            obsahElementu = this.vratObsahElementuDB();
        }
        else {
            obsahElementu = this.vratObsahElementuVyberUzlyPruty(zavislostiFilter, cisloUzlu, cisloPrutu);
        }

        console.log(obsahElementu.elementy);

        this.obsahElementu = obsahElementu;
        
    }

    getObsahElementu(){
        return(this.obsahElementu);
    }


    vratObsahElementuDB(){

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


    vratObsahElementuVyberUzlyPruty(zavislostiFilter, cisloUzlu, cisloPrutu){

        var selectNodeRadkyOption;
        var selectElementRadkyOption;

        //pokud "cisloUzlu == -1", pak vraci vsechny pruty
        if(cisloUzlu == -1){
            selectNodeRadkyOption = this.vratVsechnyPolozky(zavislostiFilter.prutyUzly, 'cisloPrutu');
        }
        else {
            selectNodeRadkyOption = this.vratRadkyOptionPruty(zavislostiFilter, cisloUzlu, 'cisloPrutu');
        }

        //pokud "cisloUzlu == -1", pak vraci vsechny uzly
        if(cisloPrutu == -1){
            selectElementRadkyOption = this.vratVsechnyPolozky(zavislostiFilter.uzlyPruty, 'cisloUzlu');
        }
        else {
            selectElementRadkyOption = this.vratRadkyOptionUzly(zavislostiFilter, cisloPrutu, 'cisloUzlu');
        }


        //udava, co muzou dane elementy obsahovat
        var obsahElementu = {
            elementy : [ 
                {
                    selectId: "selectNodePreview",
                    radkyOption: selectNodeRadkyOption
                },
                {
                    selectId: "selectElementPreview",
                    radkyOption: selectElementRadkyOption
                }
            ]	
        }


        return(obsahElementu);


    } 


    vratRadkyOptionUzly(zavislostiFilter, cislo){

        var dataZavislosti = zavislostiFilter.prutyUzly;
        var element = this.vyhledejElement(dataZavislosti, cislo, 'cisloPrutu');
        var uzelStartEnd = [];

        console.log(dataZavislosti);
        console.log(element);

        uzelStartEnd.push('**allList');
        uzelStartEnd.push(element.uzelStart);
        uzelStartEnd.push(element.uzelEnd);

        return(uzelStartEnd);

    }


    vratRadkyOptionPruty(zavislostiFilter, cislo){

        var dataZavislosti = zavislostiFilter.uzlyPruty;
        var element = this.vyhledejElement(dataZavislosti, cislo, 'cisloUzlu');



        var nalezenePruty = []
        nalezenePruty.push('**allList');
        nalezenePruty = nalezenePruty.concat(element.nalezenePruty);
  
        return(nalezenePruty);

    }


    vratVsechnyPolozky(dataZavislosti, indexStr){

        var vsechnyElementy = []
        vsechnyElementy.push('**allList');

        for (var i = 0; i < dataZavislosti.length; i++) {
            var elementCislo = dataZavislosti[i][indexStr];
            vsechnyElementy.push(elementCislo);
        }

        return(vsechnyElementy);

    }


    vyhledejElement(dataZavislosti, cisloExp, indexStr){

        var element;

        for (var i = 0; i < dataZavislosti.length; i++) {
            var cislo = dataZavislosti[i][indexStr];
            if(cislo == cisloExp){
                element = dataZavislosti[i];
                break;
            }
            
        }


        return(element);

    }



/*
    selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
*/
}


//zde zacina modul
export const obsahMenu = ((zavislostiFilter, dbUzelPrut, cisloUzlu, cisloPrutu) => {

    //ziska jonMenu
    var obsahMenuCl = new obsahMenuData(zavislostiFilter, dbUzelPrut, cisloUzlu, cisloPrutu)
    var obsahElementu = obsahMenuCl.getObsahElementu();


    return(obsahElementu);
      
});

// sem se posle menuNastaveni a zjistuje se o jaky se jedna case (kejz)
// v kazdem case jsou podminky, ktere, kdyz budo splneny, tan dany case se odesle
// a tim se obnovi (prekresli) menu

class JsonMenuData{

    constructor(moznost, JSONMenuData){

        var JSONMenu;
        switch (moznost) {

            case 0: JSONMenu = JSONMenuData.case0; 
                                            break;
            case 1: JSONMenu = JSONMenuData.case1; 
                                            break; 
            case 2: JSONMenu = JSONMenuData.case2; 
                                            break; 
            case 3: JSONMenu = JSONMenuData.case3; 
                                            break; 
            case 4: JSONMenu = JSONMenuData.case4; 
                                            break; 
            case 5: JSONMenu = JSONMenuData.case5; 
                                            break; 
            case 6: JSONMenu = JSONMenuData.case6; 
                                            break; 
            case 7: JSONMenu = JSONMenuData.case7; 
                                            break; 
            case 8: JSONMenu = JSONMenuData.case8; 
                                            break; 
            case 9: JSONMenu = JSONMenuData.case9; 
                                            break; 
            case 10: JSONMenu = JSONMenuData.case10; 
                                            break; 
            case 11: JSONMenu = JSONMenuData.case11; 
                                            break;  
            case 12: JSONMenu = JSONMenuData.case12; 
                                            break;  
            case 13: JSONMenu = JSONMenuData.case13; 
                                            break;  
            case 14: JSONMenu = JSONMenuData.case14; 
                                            break;  
            case 15: JSONMenu = JSONMenuData.case15; 
                                            break;  
            case 16: JSONMenu = JSONMenuData.case16; 
                                            break;  
            case 17: JSONMenu = JSONMenuData.case17; 
                                            break;  
           
            }
           
            this.JSONMenu = JSONMenu;

    }


    getJSONMenu(){
        return(this.JSONMenu);
    }

}




//zde je kod, ktery detekuje ktery case ma byt vybrán
class rozpoznejMoznost{

    constructor(menuNastaveni, moznostiObj){
        this.indexCase = this.vratIndexCase(menuNastaveni, moznostiObj);
    }


    getIndexCase(){
        return(this.indexCase);
    }


    vratIndexCase(menuNastaveni, moznostiObj){

        var indexCaseNalezen;
        var pocetCases = 17;
        var indexCaseNalezeny;

        for (var indexCase = 0; indexCase < pocetCases; indexCase++) {
            indexCaseNalezen = this.detekujZdaIndexCaseObsahujeKlicHodnotu(indexCase, menuNastaveni, moznostiObj)
            if(indexCaseNalezen == true){
                indexCaseNalezeny = indexCase;

                break;
            }
        }

        return(indexCaseNalezeny);
    }


    proverZdaKlicHodnotaJeVmenuNastaveni(klicHodnotaStr, menuNastaveni){

        var objektObsahujeKlicHodnotu;
        var menuNastaveniStr;
        var indInStr;
        
        menuNastaveniStr = JSON.stringify(menuNastaveni); 
        indInStr = menuNastaveniStr.indexOf(klicHodnotaStr);

        if(indInStr > -1){
            objektObsahujeKlicHodnotu = true
        }
        else {
            objektObsahujeKlicHodnotu = false
        }

        return(objektObsahujeKlicHodnotu);

    }


    detekujZdaIndexCaseObsahujeKlicHodnotu(indexCase, menuNastaveni, moznostiObj){

        //var moznostiObj;
        var moznostCase;
        var klic;
        var hodnota;
        var hodnota1;
        var klicHodnotaStr;
        var objektObsahujeKlicHodnotu;
        var indexCaseNalezen;
        var ocekavanaShoda = true;
        var jeToPole;
        var i;

        //moznostiObj = moznostiData.moznosti;
        moznostCase = moznostiObj.cases[indexCase].conditions;
        indexCaseNalezen = true;


        i = 0;
        for(var key in moznostCase){
            klic = key;
            hodnota = this.vratMensiVetsiHodnotu(klic, moznostCase[key], menuNastaveni);
            hodnota1 = moznostCase[key];
            jeToPole = Array.isArray(hodnota);

            if(jeToPole == true){
                objektObsahujeKlicHodnotu = this.testujHodnotuJakoPole(klic, hodnota, menuNastaveni)
            
            }
            else{
                klicHodnotaStr = '"' + klic + '":"' + hodnota + '"';
                objektObsahujeKlicHodnotu = this.proverZdaKlicHodnotaJeVmenuNastaveni(klicHodnotaStr, menuNastaveni)    
           
           
            }


            if(objektObsahujeKlicHodnotu != ocekavanaShoda){
                indexCaseNalezen = false;
                break;
            }
            i = i + 1;

        }

        return(indexCaseNalezen);

    }


    //vraci true/false pokud hodnota je napr. [ElementLoads, NodalLoads, ForcedDisplacement]
    testujHodnotuJakoPole(klic, hodnotaPole, menuNastaveni){

        var hodnotaPoleNalezena;
        var hodnotaNalezena;
        var klicHodnotaStr;
        var hodnota;
        var i;

        hodnotaNalezena = false;

        for (var i = 0; i < hodnotaPole.length; i++) {
            hodnota = hodnotaPole[i];
            klicHodnotaStr = '"' + klic + '":"' + hodnota + '"';
            hodnotaPoleNalezena = this.proverZdaKlicHodnotaJeVmenuNastaveni(klicHodnotaStr, menuNastaveni);
            if(hodnotaPoleNalezena == true){
                hodnotaNalezena = true;
                break;
            }
        }

        return(hodnotaNalezena);

    }


    //pokud hodnota = "<>-1", pak vraci skutecne nalezenou hodnotu, ktera je <>-1
    //cimz dojde pravdepodobne do shody
    vratMensiVetsiHodnotu(klic, hodnota, menuNastaveni){

        var indMensiVetsi;
        var hodnotaSkut;
        var hodnotaNavrat;
        var hodnotaBezVetsiMensi;

        hodnotaNavrat = hodnota;


        indMensiVetsi = hodnota.indexOf("<>");
        if(indMensiVetsi > -1) {
            hodnotaSkut = menuNastaveni[klic];
            hodnotaBezVetsiMensi = hodnota.replace("<>", "");
            if(hodnotaSkut != hodnotaBezVetsiMensi){
                hodnotaNavrat = hodnotaSkut;
            }
        }


        return(hodnotaNavrat);
    }

}



export const elementyMenu = ((reqSubmit, menuNastaveni, dataPreview, moznostiMenu) => {

    let JSONMenu;
    let moznost;

    var moznosti = moznostiMenu.moznosti;
    var JSONMenuData = moznostiMenu.JSONMenu;
    
    
    if(typeof reqSubmit === 'object'){
        
        //zmeni hodnotu klice
        var klic = reqSubmit.inputId + "Submit";

        //prepise hodnotu
        menuNastaveni[klic] = reqSubmit.inputValue;

        var rozpoznejNastaveni = new rozpoznejMoznost(menuNastaveni, moznosti);
        moznost = rozpoznejNastaveni.getIndexCase();

    }    
   

    if(moznost == undefined){
        moznost = 1;
    }
    
    //zjisti JSONMoznost v jine tride
    var JSONMenuCl = new JsonMenuData(moznost, JSONMenuData);
    JSONMenu = JSONMenuCl.getJSONMenu();

    //ziska a zmeni obsah comboboxu
    //var comboboxyPreview = new comboboxyMenu(menuNastaveni, dataPreview, JSONMenu);



    return(JSONMenu);

});
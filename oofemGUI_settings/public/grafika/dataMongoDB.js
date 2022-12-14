
import "babel-polyfill";
import { Console } from "console";

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class mongoDBData{

    constructor(menuNastaveni){

        //nastaveni, pro ktere je potreba v budoucnu dodelat GUI
        this.domain = this.nastavDomenu(menuNastaveni);

        //tohle se musi predelat
        if(this.domain == "2dBeam"){
            this.nazevProjektu = "beam2D_1";
            this.typJSON = "GrafyKceInput";
        }
        if(this.domain == "2dIncompFlow"){
            this.nazevProjektu = "axi01";
            this.typJSON = "elementy2D";
        }

        
        if(menuNastaveni)

        this.menuNastaveni = this.nastavVychoziNastaveni(menuNastaveni);
        this.ziskejDataZDB(this.menuNastaveni);

        //bude vyhledavat z databaze, dle nasledujiciho klice
        this.headerFind = this.ziskejDataZDB(this.menuNastaveni);

        this.seznamJSONuZDB(this.headerFind);


    }

    test(){
        console.log("TEST");
    }


    //vrati headerFind z tridy
    async geVykreslitDataZDB(){
        console.log("this.vykreslitDataZDB");
        console.log(this.vykreslitDataZDB);
        console.log("this.vykreslitDataZDB");
        return(this.vykreslitDataZDB);
    }


    //pokud je "typDat: 'NodalDisplacement'", pak je treba prepnout na "domain: '2dIncompFlow'"
    nastavDomenu(menuNastaveni){

        var domain = "2dBeam";

        //pri nasledujicim nastaveni se domena zmeni
        if(menuNastaveni.selectPrePostSubmit == 'outputs'){
            if(menuNastaveni.selectResultsSubmit == 'NodalDisplacement'){
                domain = "2dIncompFlow";
            }
        }

        return(domain);
    }


    // pokud je menuNastaveni == undefined, pak nastavuje vychozi zadani
    nastavVychoziNastaveni(menuNastaveni){

        var menuNastaveniNew;

        if(menuNastaveni == undefined){

            var menuNastaveniVychozi = {
                selectPrePostSubmit: 'inputs',
                selectLoadSubmit: 'ElementLoads',
                specifyDOFSubmit: 'Specify DOF',
                selectDOFinputsSubmit: '1',
                selectResultsSubmit: 'LocalDisplacements',
                selectDOFoutputsSubmit: '1',
                selectOFTSubmit: '1.00000000e+00',
                filterBySubmit: 'Element -> Node',
                selectElementPreviewSubmit: '-1',
                numberValuesSubmit: 'Number of nodes',
                selectNodePreviewSubmit: '-1',
                moveTextSubmit: 'false'
            }

            menuNastaveniNew = menuNastaveniVychozi

        }
        else {
            menuNastaveniNew = menuNastaveni
        }

        return(menuNastaveniNew)

    }



    ziskejDataZDB(menuNastaveni){

        console.log("menuNastavenimenuNastavenimenuNastaveni");
        console.log(menuNastaveni);
        console.log("menuNastavenimenuNastavenimenuNastaveni");

        var nazevProjektu = this.nazevProjektu;
        var domain = this.domain;
        var typJSON = this.typJSON;

        var prePost = menuNastaveni.selectPrePostSubmit;
        var typDat;
        var DOF;
        var OFT = menuNastaveni.selectOFTSubmit;

        //jedna-li se o vstupy(inputs)
        if(prePost == 'inputs'){
            typDat = menuNastaveni.selectLoadSubmit;
            DOF = menuNastaveni.selectDOFinputsSubmit;
        }

        //jedna-li se o vystupy(outputs)
        if(prePost == 'outputs'){
            typDat = menuNastaveni.selectResultsSubmit;
            DOF = menuNastaveni.selectDOFoutputsSubmit;
            typJSON = typJSON.replace("Input", "");
        }

        //prepise data, jelikoz pro 'ElementLoads' je vzdy OFT = 0
        if(typDat == 'ElementLoads'){
            OFT = "0";
        }

        //jsou-li nastaveny trojuhelnikove elementy, pak je treba prepsta dof - predelat!!
        if(domain == '2dIncompFlow'){
            if(DOF == "1"){
                DOF = "7";
            }
            if(DOF == "3"){
                DOF = "8";
            }
            if(DOF == "5"){
                DOF = "11";
            }
        }
        

        var headerFind = {
            header: {
                nazevProjektu: nazevProjektu,
                domain: domain,
                typDat: typDat,
                DOF: DOF,
                typJSON: typJSON,
                OFT: OFT
            }
        }

        //console.log("headerFindheaderFindheaderFindheaderFind");
        //console.log(headerFind);
        //console.log("headerFindheaderFindheaderFindheaderFind");

        return(headerFind);
        
    }    


    async seznamJSONuZDB(headerFind) {

        //console.log("AAAAAAAAAAAAAAAAA");
        //console.log(headerFind);
        //console.log("AAAAAAAAAAAAAAAAA");


        let db = await MongoClient.connect(url);
        let dbo = db.db("database");
        await dbo.collection("OOFEM").find(headerFind).toArray()
            .then((response)  => { 
                this.zapisJSON(response[0]);
            }
    )};


    zapisJSON(data){
        this.vykreslitDataZDB = data;
    }

}



//zde zacina modul
export const dataMongoDB = ((menuNastaveni) => {
   
    let myPromise = new Promise(function(myResolve, myReject) {
    
        var mongoData = new mongoDBData(menuNastaveni);

        setTimeout(() => {
            var vykreslitDataZDB = mongoData.vykreslitDataZDB;
            myResolve(vykreslitDataZDB)
        }, 100);
    });

    return(myPromise);
      
});
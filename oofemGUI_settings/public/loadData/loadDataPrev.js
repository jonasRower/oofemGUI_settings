
import "babel-polyfill";
import { Console } from "console";

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class mongoDBData{

    constructor(){

        this.dbHeaderData = [];
        this.seznamJSONuZDB(this.headerFind);
        
    }


    // ziska data z databaze
    async seznamJSONuZDB() {

        let db = await MongoClient.connect(url);
        let dbo = db.db("database");
        await dbo.collection("OOFEM").find().toArray()
            .then((response)  => { 
                this.ziskejHodnotyProjektu(response);
            }
    )};


    // ziska jen headers z dat z DB
    ziskejHodnotyProjektu(dataMongoDB){

        var hodnotyVsechProjektu = []

        for (var i = 0; i < dataMongoDB.length; i++) {
            var mongoDoc = dataMongoDB[i];
            var dbHeader = mongoDoc.header;
            this.dbHeaderData.push(dbHeader);
        }

        var nazvyProjektuPole = this.ziskejPoleSNazvyProjektu(this.dbHeaderData);

        for (var i = 0; i < nazvyProjektuPole.length; i++) {
            var nazevProjektu = nazvyProjektuPole[i];
            var hodnotyProjektu = this.vratHodnotyDleProjektu(nazevProjektu, this.dbHeaderData);

            hodnotyVsechProjektu.push(hodnotyProjektu);
        }
        
        //console.log(hodnotyVsechProjektu);
        this.hodnotyVsechProjektu = hodnotyVsechProjektu;

    }


    vratHodnotyDleProjektu(nazevProjektu, dbHeaderData){

        var hodnotyDomain = this.vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, nazevProjektu, 'domain');
        var hodnotyTypDat = this.vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, nazevProjektu, 'typDat');
        var hodnotyDOF = this.vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, nazevProjektu, 'DOF');
        var hodnotyTypJSON = this.vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, nazevProjektu, 'typJSON');
        var hodnotyOFT = this.vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, nazevProjektu, 'OFT');

        var hodnotyProjektu = {
                nazevProjektu: nazevProjektu,
                hodnotyDomain: hodnotyDomain,
                hodnotyTypDat: hodnotyTypDat,
                hodnotyDOF: hodnotyDOF,
                hodnotyTypJSON: hodnotyTypJSON,
                hodnotyOFT: hodnotyOFT
        }

        return(hodnotyProjektu);

    }


    //vrati vsechny hodnoty ke klici dle nazvu projektu
    vratVsechnyHodnotyKeKliciDleProjektu(dbHeaderData, NazevProjektuExp, klic){

        var hodnotyPole = []

        for (var i = 0; i < dbHeaderData.length; i++) {
            var headerData = dbHeaderData[i];
            var nazevProjektu = headerData.nazevProjektu;
            if(nazevProjektu == NazevProjektuExp){
                var hodnota = headerData[klic];
                hodnotyPole.push(hodnota);
            }
        }

        var unique = hodnotyPole.filter((item, i, ar) => ar.indexOf(item) === i);

        return(unique)

    }


    // ziska pole se vsemi nazvy projektu
    ziskejPoleSNazvyProjektu(dbHeaderData){
        
        var nazvyProjektuPole = []
        
        for (var i = 0; i < dbHeaderData.length; i++) {
            var dbHeader = dbHeaderData[i];
            var nazevProjektu = dbHeader.nazevProjektu;
            nazvyProjektuPole.push(nazevProjektu);
        }

        var unique = nazvyProjektuPole.filter((item, i, ar) => ar.indexOf(item) === i);

        return(unique);

    }

}


//zde zacina modul
export const loadDataPrev = ((menuNastaveni) => {
   
    let myPromise = new Promise(function(myResolve, myReject) {
    
        var mongoData = new mongoDBData(menuNastaveni);

        setTimeout(() => {
            var hodnotyVsechProjektu = mongoData.hodnotyVsechProjektu;
            myResolve(hodnotyVsechProjektu);
        }, 100);
    });

    return(myPromise);
      
});

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const http = require('http');


// initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// settings
app.set('port', process.env.PORT || 3000);

//const port = 3000

//const express = require('express');
//const socketIO = require('socket.io');
//const path = require('path');
//const http = require('http');

//const app = express();
//const port = 3000

//const bodyParser = require('body-parser');
//const server = http.createServer(app);
//const io = socketIO(server);


//app.set('view engine', 'ejs');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });


//ziska data do elementyMenu
import { moznostiMenuData } from './public/data/moznostiMenuData.js';

//vytvori json na zaklade cehoz zobrazi/skryje jednotlive polozky v menu
//json uchovava jen data, ktera budou zobrazovana (v menu), ty co budou skryta JSON neobsahuje
import { elementyMenu } from './public/data/elementyMenu.js';

//json uchovavajici posledni nastaveni v menu, tak aby si pamatoval nastaveni do pristiho refreshnuti menu
import { nastaveniMenu } from './public/data/nastaveniMenu.js';


//vyhleda v databazi prislusna data na zaklade "menuNastaveni"
// - pak nasledne pouzije puvodni kod k ziskani souradnic na prutech
// - pak seskupi data, aby sly za sebou - vsechny cary
// - pak data vrati sem a tady je odesle na webovou sluzbu
// - tam si je nacte a zobrazi v grafice
import { dataMongoDB } from './public/grafika/dataMongoDB.js';

//spousti vlastni jadro pro dopocitani souradnic pro vykresleni
//import { grafyNaPrutech } from './public/grafika/grafyNaPrutech.js';

//seskupi data do 1 jsonu, aby data dokazal vykreslovat v grafice
//import { seskupJSON } from './public/grafika/seskupJSON.js';

//před startem aplikace je potřeba prohledat databázi a vrátit jména všech projektů apod.
//aby bylo možné vybrat projekt a nastavit správná data do comboboxů
import { loadDataPrev } from './public/loadData/loadDataPrev.js';

//dopocita meritko automaticky, jelikoz pro kazdy projekt muze byt jine
import { dopocetMeritka } from './public/grafika/dopocetMeritka.js';

//je potreba nacitat vsechny drzy rozvrzeni a umistit je na webovou sluzbu
//data slouzi k zobrazeni rozvrzeni v okne http://localhost:3000/nastaveniProjektu
import { rozvrzeniNastaveni } from './public/settings/rozvrzeniNastaveni.js';

//upravi data prijata z backendu - layoutSize
import { fromBackendData } from './public/settings/layoutSize.js';

//ziska data pro kontrolu sirky checkboxu
import { checkCombo } from './public/settings/checkCombo.js';

//vytvori data pro rozvrzeni GUI
import { dataWrapper } from './public/settings/dataWrapper.js';

//vytvori data pro meritka (vychozi, nebo upravene)
import { meritkaMainSettings } from './public/data/meritkaMainSettings.js';

//ziska jsonMenu
import { dataMenuAll } from './public/data/dataMenuAll.js';

//urcuje ktera data z db pouzit a nebo ktera pouzit z filtru
import { obsahMenu } from './public/data/obsahMenu.js';

//ziska aktualni data projektu
import { actualProjectData } from './public/loadData/actualProjectData.js';

//ziska menuData (json) dle aktualniho nastaveni projektu
import { loadMenuData } from './public/loadData/loadMenuData.js';

//ziska zatim testovaci data do filtru
import { testJson } from './public/loadData/testJson.js';

//ziska zavislosti pro filtr
import { vratZavislostiFilter } from './public/filter/zavislostiFilter.js';



//nejake promenne, ktere se ukladaji na globalni urovni
let reqSubmit = ""
let menuNastaveni;
let dataCanvas;         //data pro vykresleni grafiky, budou ulozena na routeru "/dataCanvas"
let hodnotyProjektu;    //uklada data z databaze, ktere jsou nacteny hned po startu aplikace - slouzi pro aktualni vykreslovani GUI
let meritkoJSON;        //obsahuje JSON s meritkami - meritko se dopocitava automaticky


//uchovava JSON, ktery odesila z backendu na frontend
let layoutSizeData;

//uchovava JSON obsahujici data meritek
let meritkaJson;

//uchovava data projektu, ktery je momentalne vybrany, data jdou na WS
let hodnotyProjektuActual;

//zatim jen testovaci data z databaze - data zatim jsou v souboru na disku, nikoliv z databaze
//casem predelat, aby se nacitali z databaze rovnou
//data budou slouzit pro zjisteni zavislosti mezi cisla uzlu a elementu
let dataFilter;

//uchovava zavislosti prut-uzel / uzel-prut, ktere se budou zobrazovat v comboboxu "filter"
let zavislostiFilter;

//uchovava vsechny data menu
//dle tohoto jsonu se generuje menu a pote se vykresluje
//to take zalezi na moznostech prave vybraneho comboboxu a odeslaneho na backend

//uchovava vsechny moznosti (vsechny data - i skryte) v nastaveni menu, dle aktualniho projektu
let menuData = dataMenuAll();

// nacita moznosti pro zmenu menu
//data jsou stejna po cely beh appky, proto se nacitaji zde
let moznosti = moznostiMenuData();
let moznostiMenu;

//urcuje ktera data se povazuji za jake z dabatabze, nebo z filtru
//jelikoz v DB je jine oznaceni klicu
let obsahyMenu;

//data z DB pro vykresleni grafiky - data se ziskaji po zavolani WS '/dataMenu'
let dataJsonMongoDB;

let dataGrafyNaPrutech;



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//zde se vykresluje grafika




// nacita data do webove sluzby
// zatim jsou data nastavena natvrdo
//import { dataCanvasTest } from './public/testData/dataCanvasTest.js';

// zde se nacitaji data - v budoucnosti pujdou z DB, ted jsou natvrdo
//import { DBElementy2D } from './public/dataDB/DBElementy2D.js';
import { DBGrafyNaPrutech } from './public/dataBB/DBGrafyNaPrutech.js';
import { DBKoty } from './public/dataBB/DBKoty.js';
import { DBPodpory } from './public/dataBB/DBPodpory.js';
//import { DBPopis } from './public/dataDB/DBPopis.js';
//import { DBPruzina } from './public/dataDB/DBPruzina.js';
import { DBPruzina } from './public/dataBB/DBPruzina.js';
//import { DBSipky } from './public/dataDB/DBSipky.js';

//importuje scripty na backend
import { grafyNaPrutech } from './public/scriptyVykreslovani/grafyNaPrutech.js';
import { koty } from './public/scriptyVykreslovani/koty.js';
import { podpory } from './public/scriptyVykreslovani/podpory.js';
import { pruzina } from './public/scriptyVykreslovani/pruzina.js';

//seskupi Jsony, aby zobrazoval na WS jednotna data
import { seskupJSON } from './public/scriptyVykreslovani/seskupJSON.js';


//ziska data "z databaze" - provizorme ze souboru
let DBGrafyNaPrutechData = DBGrafyNaPrutech();
let DBKotyData = DBKoty();
let DBPodporyData = DBPodpory();
let DBPruzinaData = DBPruzina();

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 



//nastavi data
layoutSizeData = fromBackendData("");
meritkaJson = meritkaMainSettings("");



// static files
app.use(express.static(path.join(__dirname, 'views')));

//hlavni okno
app.get('/', function(req, res){
    res.render('profile');
});
  
//okno s vyberem projektu a dalsiho nastaveni
app.get('/nastaveniProjektu', function(req, res){
    res.render('nastaveniProjektu');
});

//sockets (pro vykreslovani hlavni grafiky)
require('./public/grafika/sockets')(io);



//--------------------------------------------------------------------------------
//zalozi webovou sluzbu, tak aby nacetl data pro vykresleni prave z webove sluzby
//zde nacita data pro vykreslovani v grafice
/*
app.get('/dataCanvas', function(req, res){

    res.send("xxxx");

}); 


app.use('/dataCanvas', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(dataCanvas);
    next();

});
*/
//???? nevim zda se bude pouzivat ???? - asi NE

/*
//meritko se jiz dopocitava automaticky - v modulu "dopocetMeritka.js"
app.get('/dataMeritko', function(req, res){

    res.send(meritkoJSON);

}); 
*/
//???? nevim zda se bude pouzivat ????  - asi NE


//data pro vykresleni menu
//pri obnoveni stranky se JQuery dotaze na router '/dataMenu', je tedy treba aby mel k dispozici data
app.use('/dataMenu', function(req, res, next){

    
    function nactiMongoData(callback) {
        let myPromise;

        setTimeout(function () { 

            myPromise = dataMongoDB(menuNastaveni);
            myPromise.then(
       
                function(jsonMongoDB) {

                    dataJsonMongoDB = jsonMongoDB;
                    /*
                    //odesle data pro vypocet souradnic do "grafyNaPrutech"
                    //ziska data, ktera je treba jeste seskupit, aby se daly vykreslovat
                    var dataKSeskupeni = grafyNaPrutech(jsonMongoDB);
                     
                    //seskupi data do JSONu
                    dataCanvas = seskupJSON(dataKSeskupeni);

                    console.log("dataCanvasdataCanvasdataCanvasdataCanvas");
                    console.log(dataCanvas);
                    console.log("dataCanvasdataCanvasdataCanvasdataCanvas");

                    //dopocita meritko, podle aktualnich dat "dataCanvas"
                    meritkoJSON = dopocetMeritka(dataCanvas);
                    */
            
                }
                
            );    
        }, 200);

        callback();
    }
    
      
    nactiMongoData(function () {});
     

    //slozi se data do jsonu
    moznostiMenu = {
        moznosti: moznosti,         //data jsoui stejna pri kazdem behu appky
        JSONMenu: menuData          //jsou nacitany pri spusteni appky, nebo pri zmene projektu v settings
    }

    console.log(moznostiMenu);

    var JSONMenu = elementyMenu(reqSubmit, menuNastaveni, "", moznostiMenu);
    res.send(JSONMenu);
    next();

});

app.get('/dataMenu', function(req, res){
    //console.log(dataMenu);
}); 


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 


//--------------------------------------------------------------------------------
//zalozi webovou sluzbu, tak aby nacetl data pro vykresleni prave z webove sluzby
//zde nacita data pro vykreslovani v grafice

//app.use('/dataCanvas/line', function(req, res, next){

    //odesle data pro vypocet souradnic do "grafyNaPrutech"
    //ziska data, ktera je treba jeste seskupit, aby se daly vykreslovat
    //var dataKSeskupeni = grafyNaPrutech(DBGrafyNaPrutechData);
    /*
    var dataKSeskupeni = grafyNaPrutech(dataJsonMongoDB);

    console.log("/dataCanvas/lines/dataCanvas/lines/dataCanvas/lines");
    console.log(dataJsonMongoDB);
    console.log("/dataCanvas/lines/dataCanvas/lines/dataCanvas/lines");
    */
    //var dataKoty = koty(DBKotyData);
    //var dataPodpory = podpory(DBPodporyData);
    //var dataPruzina = pruzina(DBPruzinaData);
        
    //seskupi data do JSONu
    //var dataCanvas = seskupJSON(dataKSeskupeni);

    //res.send(dataCanvas);
    //res.send(dataKSeskupeni);
    //res.send("xxxxx");
    //next();

//}); 


app.use('/dataCanvas/lines', function(req, res, next){

    console.log(dataJsonMongoDB);
    var dataKSeskupeni = grafyNaPrutech(dataJsonMongoDB);
    var dataCanvas = seskupJSON(dataKSeskupeni);

    res.send(dataCanvas);
    next();

}); 


app.get('/dataCanvas/lines', function(req, res){

    
}); 


app.get('/dataCanvas/text', function(req, res){

    //odesle data pro vypocet souradnic do "grafyNaPrutech"
    //ziska data, ktera je treba jeste seskupit, aby se daly vykreslovat
    //var dataKSeskupeni = grafyNaPrutech(DBGrafyNaPrutechData);   //grafyNaPrutech vola 2x vymyslet jinak
                                                                    // -> udelat na submit
                                                                    //res.send(dataKSeskupeni.popisGrafu);


    var dataKSeskupeni = grafyNaPrutech(dataJsonMongoDB);

    var dataKoty = koty(DBKotyData);
    res.send(dataKoty.popisKoty);

}); 



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 


//umisti menuData na WS
app.get('/menu/menuData', function(req, res){

    //pri startu appky se nacitaji dataMenu, ktere se modifuikuji dle nastaveneho projektu
    res.send(menuData);

});



//vychozi data pro menu
app.use('/nastaveniMenu', function(req, res){
    menuNastaveni = nastaveniMenu(reqSubmit, menuNastaveni);

    //je potreba znovu nacist data z databaze
    //aby se prekreslila grafika
    function nactiMongoData(callback) {
        let myPromise;

        setTimeout(function () { 

            myPromise = dataMongoDB(menuNastaveni);
            myPromise.then(
       
                function(jsonMongoDB) {

                    dataJsonMongoDB = jsonMongoDB;

                    //odesle data pro vypocet souradnic do "grafyNaPrutech"
                    //ziska data, ktera je treba jeste seskupit, aby se daly vykreslovat
                    //var dataKSeskupeni = grafyNaPrutech(jsonMongoDB);
                     
                    //seskupi data do JSONu
                    //dataCanvas = seskupJSON(dataKSeskupeni);

                    //dopocita meritko, podle aktualnich dat "dataCanvas"
                    //meritkoJSON = dopocetMeritka(dataCanvas);
            
                }
                
            );    
        }, 200);

        callback();
    }

    nactiMongoData(function () {});

    res.send(menuNastaveni);
});


app.get('/nastaveniMenu', function(req, res){
    
}); 


//umisti meritka na webovou sluzbu
app.use('/settings/scales', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(meritkaJson);
    next();

});


//umisti meritka na webovou sluzbu
app.get('/settings/scales', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(meritkaJson);
    }

}); 


//data z DB se posilaji na WS
//posila se pri otevreni appky
app.get('/hodnotyProjektu', function(req, res){

    res.send(hodnotyProjektu);

});


app.use('/settings/actualProjectData', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(hodnotyProjektuActual);
    next();

});


//uklada data aktualniho projektu na WS
app.get('/settings/actualProjectData', function(req, res, err){
    
    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(hodnotyProjektuActual);
    }

});


app.get('/settings/checkCombo', function(req, res){
    
    //u nasledujicich id comboboxu se kontroluje, aby soucet = 100%
    //zapise na webovou sluzbu co ma s cim kontrolovat
    var checkComboSize = checkCombo()

    res.send(checkComboSize);

});


app.get('/settings/dataWrapper', function(req, res){
    
    //vytvori data, aby vykreslil spravne GUI
    var checkComboSize = checkCombo()
    var wrapperArr = dataWrapper(layoutSizeData, checkComboSize);
    res.send(wrapperArr);

});


app.get('/settings/layout', function(req, res){

    var rozvrzeniData = rozvrzeniNastaveni();
    res.send(rozvrzeniData);

});


app.use('/settings/layoutSize', function(req, res, next){

    //zapise data na webovou sluzbu
    res.send(layoutSizeData);
    next();

});


app.get('/settings/layoutSize', function(req, res, err){

    if (err){
        //nechci vypisovat nic
    }
    else {
        //zapise data na webovou sluzbu
        res.send(layoutSizeData);
    }

});



//prichozi data pro refresh menu a grafiky
app.post('/submitMenu', urlencodedParser, function(req, res){
    
    reqSubmit = req.body;
  
    //aktualizuje statusy u meritek
    meritkaJson = meritkaMainSettings(layoutSizeData, reqSubmit);

    //urcuje, ktera data pouzit do filtru
    // !!!!!!
    //tohle upravit, az se bude rozsirovat GUI - zatim to nema prioritu
    //filtry se skryvaji, zrejme spatny case
    obsahyMenu = obsahMenu(zavislostiFilter, "uzel", -1, -1);
    // !!!!!!

    //pri vybrani filtru se prekresluje menu znovu
    menuData = loadMenuData(menuData, obsahyMenu, hodnotyProjektuActual, zavislostiFilter);


    //po submitu se presmeruje na 'http://localhost:3000/'
    //ceka 5 sekund
    setTimeout(() => {res.redirect('http://localhost:3000/')}, 2*1000);
});


//prichozi data z nastaveni projektu
app.post('/settings', urlencodedParser, function(req, res){

    //ziska layoutSize data
    layoutSizeData = fromBackendData(req.body);
    
    //odseparuje data pro meritka, aby je mohl aktualizovat ve webové službě
    meritkaJson = meritkaMainSettings(layoutSizeData, reqSubmit);

    //urcuje, ktera data pouzit z DB
    obsahyMenu = obsahMenu(zavislostiFilter, "db", -1, -1);

    //ziska aktualni data projektu, aby je mohl zapsat na WS, jelikoz po navratu z nastaveni se muze menit nazev projektu
    hodnotyProjektuActual = actualProjectData(hodnotyProjektu, layoutSizeData);

    //pri opusteni okna settings(nastaveni projektu) se muze zmenit nazev projektu, proto se znovu nacte menu
    menuData = loadMenuData(menuData, obsahyMenu, hodnotyProjektuActual, zavislostiFilter);


    //po submitu se presmeruje na 'http://localhost:3000/'
    //ceka 5 sekund
    setTimeout(() => {res.redirect('http://localhost:3000/')}, 2*1000);
});




//app.listen(port, () => {
server.listen(app.get('port'), () => {

    //nacte data z DB
    function nactiMongoPriSpusteni(callback) {
        
        let myPromise;

        setTimeout(function () { 

            myPromise = loadDataPrev();
            myPromise.then(


                function(hodnotyProjektuDB) {
                    hodnotyProjektu = hodnotyProjektuDB;

                    console.log(menuData);

                    //urcuje, ktera data pouzit z DB
                    obsahyMenu = obsahMenu(zavislostiFilter, "db", -1, -1);
                    console.log(obsahyMenu);

                    //nastavi vychozi data projektu, aby jej mohl zapsat do WS
                    hodnotyProjektuActual = actualProjectData(hodnotyProjektu, "");

                    //zatim nacita z pevneho souboru, ale bude nacitat z DB
                    dataFilter = testJson();
                    
                    //ziska zavislosti pro filtr
                    zavislostiFilter = vratZavislostiFilter(dataFilter);

                    //pri startu appky se nacitaji dataMenu, ktere se modifuikuji dle nastaveneho projektu
                    menuData = loadMenuData(menuData, obsahyMenu, hodnotyProjektuActual, zavislostiFilter);

                    //tady jsem skoncil
                    //console.log(zavislostiJson);
                    
                }
               
            );    

        }, 200);

        callback();
        
    }

    nactiMongoPriSpusteni(function () {});

    console.log('Server on port 3000');
    
  })
 






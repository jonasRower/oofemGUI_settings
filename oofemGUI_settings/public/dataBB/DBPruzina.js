
class dataDB{

    constructor(){

        this.dataBB = {"pruzina": [
                        {"data": {
                            "vodorovne": [
                                {"Ax":10,"Ay":100,"prumerPruziny":40,"delkaZavitu":10,"pocetZavitu":3,"delkaKonce":40,"tloustkaCary":"2","barvaCary":"#000000"}
                                ],
                            "svisle": [
                                {"Ax":100,"Ay":10,"prumerPruziny":40,"delkaZavitu":10,"pocetZavitu":3,"delkaKonce":40,"tloustkaCary":"1","barvaCary":"#000000"}
                                ]
                            },
                            "Ox":50,
                            "Oy":130,
                            "id":"konzolaSilaNaKonci",
                            "class":"konzolaSilaNaKonci"
                        }] 
                    };
    }
};



//v budoucnosti pujdou data z DB, nyni jdou odsud
export const DBPruzina = (() => {

    var dataDBCl = new dataDB();
    var dataZDB = dataDBCl.dataBB;

    return(dataZDB);
});

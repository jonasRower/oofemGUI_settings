

class dataDB{

    constructor(){

        this.dataBB = {"popis": [ 
                            {"data": 
                            {"popis": [ 
                                {"Ax":0.0,"Ay":0.0,"popis":"1.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}, 
                                {"Ax":240.0,"Ay":0.0,"popis":"2.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}, 
                                {"Ax":380.0,"Ay":0.0,"popis":"3.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}, 
                                {"Ax":580.0,"Ay":150.0,"popis":"4.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}, 
                                {"Ax":780.0,"Ay":300.0,"popis":"5.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5}, 
                                {"Ax":240.0,"Ay":300.0,"popis":"6.0","index":"","zarovnani":"HS","odstupX":5,"odstupY":5} 
                            ] 
                            }, 
                            "Ox":50, 
                            "Oy":100, 
                            "id":"test", 
                            "class":"konzolaSilaNaKonciXX"} 
                        ]};
        
    }
};





//v budoucnosti pujdou data z DB, nyni jdou odsud
export const DBPopis = (() => {

    var dataDBCl = new dataDB();
    var dataZDB = dataDBCl.dataBB;

    return(dataZDB);

});

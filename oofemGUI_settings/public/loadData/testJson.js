//obsahuje testovaci data
//data se budou primo nacitat z databaze, zatim jsou data tady
//data slouzi k vyvoji algoritmu urcujici zavislost cisla uzlu na elementech a opacne

class testData {

    constructor(){

        this.testJson = {"grafyKCE": [ 
            {"data": [ 
                {"prut": { 
                    "kce": {"Ax":0.0,"Ay":0.0,"Bx":120.0,"By":0.0,"graf":true,"vykreslitPrut":true,"barvaCary":"darkBlue", "tloustkaCary":"3", "uzelStart":"1", "uzelEnd":"2"}, 
                    "graf": {"delkaKrokuPriblizne":10,"nasobkyMocnin":[[0, 1], [-0.0013717, -0.0013717]],"vykreslitGraf":true,"vykreslitSrafu":true,"barvaCarySrafy":"#000000","tloustkaCarySrafa":"0.5","barvaCaryGraf":"#000000","tloustkaCaryGraf":"1"} 
                }}, 
                {"prut": { 
                    "kce": {"Ax":120.0,"Ay":0.0,"Bx":190.0,"By":0.0,"graf":true,"vykreslitPrut":true,"barvaCary":"darkBlue", "tloustkaCary":"3", "uzelStart":"2", "uzelEnd":"3"}, 
                    "graf": {"delkaKrokuPriblizne":10,"nasobkyMocnin":[[0, 1], [-0.0013717, -0.0013717]],"vykreslitGraf":true,"vykreslitSrafu":true,"barvaCarySrafy":"#000000","tloustkaCarySrafa":"0.5","barvaCaryGraf":"#000000","tloustkaCaryGraf":"1"} 
                }}, 
                {"prut": { 
                    "kce": {"Ax":190.0,"Ay":0.0,"Bx":290.0,"By":75.0,"graf":true,"vykreslitPrut":true,"barvaCary":"darkBlue", "tloustkaCary":"3", "uzelStart":"3", "uzelEnd":"4"}, 
                    "graf": {"delkaKrokuPriblizne":10,"nasobkyMocnin":[[0, 1], [-0.0010721, -0.0010721]],"vykreslitGraf":true,"vykreslitSrafu":true,"barvaCarySrafy":"#000000","tloustkaCarySrafa":"0.5","barvaCaryGraf":"#000000","tloustkaCaryGraf":"1"} 
                }}, 
                {"prut": { 
                    "kce": {"Ax":290.0,"Ay":75.0,"Bx":390.0,"By":150.0,"graf":true,"vykreslitPrut":true,"barvaCary":"darkBlue", "tloustkaCary":"3", "uzelStart":"4", "uzelEnd":"5"}, 
                    "graf": {"delkaKrokuPriblizne":10,"nasobkyMocnin":[[0, 1], [-0.0010721, -0.0010721]],"vykreslitGraf":true,"vykreslitSrafu":true,"barvaCarySrafy":"#000000","tloustkaCarySrafa":"0.5","barvaCaryGraf":"#000000","tloustkaCaryGraf":"1"} 
                }}, 
                {"prut": { 
                    "kce": {"Ax":120.0,"Ay":150.0,"Bx":120.0,"By":0.0,"graf":true,"vykreslitPrut":true,"barvaCary":"darkBlue", "tloustkaCary":"3", "uzelStart":"6", "uzelEnd":"2"}, 
                    "graf": {"delkaKrokuPriblizne":10,"nasobkyMocnin":[[0, 1], [0.0, -2.0312e-14]],"vykreslitGraf":true,"vykreslitSrafu":true,"barvaCarySrafy":"#000000","tloustkaCarySrafa":"0.5","barvaCaryGraf":"#000000","tloustkaCaryGraf":"1"} 
                }}, +
                {"Ox":50}, 
                {"Oy":100}, 
                {"meritkoGraf":29160.9}, 
                {"id":"test"}, 
                {"class":""} 
            ]} 
        ]};
    }
}




//zde zacina modul
export const testJson = ((db) => {

    var testDataCl = new testData;
    var jsonTestData = testDataCl.testJson;

    return(jsonTestData);
      
});
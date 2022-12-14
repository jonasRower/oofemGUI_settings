//prenastavuje menu
//s kazdym submitem prekresli menu znovu, je treba prenastavit parametry
//tak aby se menu prekreslilo spravne

export const nastaveniMenu = ((reqSubmit, menuNastaveni) => {

    try{
        //defaulne nic nemeni
        if(reqSubmit == ""){

            //vytvori JSON
            var menuNastaveni = {
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
                moveTextSubmit: 'false',
            }

            return(menuNastaveni);
        }
    }
    catch{
        //zmeni hodnotu klice
        var klic = reqSubmit.inputId + "Submit";

        //prepise hodnotu
        menuNastaveni[klic] = reqSubmit.inputValue;
        return(menuNastaveni);
    }

});
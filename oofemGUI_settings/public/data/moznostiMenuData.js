


class moznostiAMenu {

    constructor(){

        this.moznosti = this.sestavMoznosti();
       
    }


    getMoznostiMenuData(){
        return(this.moznosti);
    }

    
    //moznost = 1:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "Specify DOF"
    //4) "Element->Node"
    //5) Element Previev = -1

    //moznost = 2:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "All DOF"
    //4) "Element->Node"
    //5) Element Previev = -1

    //moznost = 3:
    //1) "inputs"
    //2) "TemperatureLoads"
    //3) "All DOF"
    //4) "Element->Node"
    //5) Element Previev = -1

    //moznost = 4:
    //1) "inputs"
    //2) "TemperatureLoads"
    //3) "Node -> Element"
    //4) Node Previev = -1

    //moznost = 5:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "All DOF"
    //4) "Element->Node"
    //5) Element Previev > -1

    //moznost = 6:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "Specify DOF"
    //4) "Element->Node"
    //5) Element Previev > -1

    //----------------------------

    //moznost = 7:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "Specify DOF"
    //4) "Node -> Element"
    //5) Node Previev = -1

    //moznost = 8:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "All DOF"
    //4) "Node -> Element"
    //5) Node Previev = -1

    //moznost = 9:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "All DOF"
    //4) "Node -> Element"
    //5) Node Previev > -1

    //moznost = 10:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "Specify DOF"
    //4) "Node -> Element"
    //5) Node Previev > -1

    //moznost = 11:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "All DOF"
    //4) "Node -> Element"
    //5) Node Previev > -1
    //6) Element Previev > -1

    //moznost = 12:
    //1) "inputs"
    //2) "ElementLoads" nebo "NodalLoads" nebo "ForcedDisplacement"
    //3) "Specify DOF"
    //4) "Node -> Element"
    //5) Node Previev > -1
    //6) Element Previev > -1

    //----------------------------

    //moznost = 13:
    //1) "outputs"
    //2) "LocalDisplacements", "GlobalDisplacements", "LocalForces", "Reactions"
    //3) "Element->Node"
    //4) Element Previev = -1

    //moznost = 14:
    //1) "outputs"
    //2) "LocalDisplacements", "GlobalDisplacements", "LocalForces", "Reactions"
    //3) "Element->Node"
    //4) Element Previev > -1

    //moznost = 15:
    //1) "outputs"
    //2) "LocalDisplacements", "GlobalDisplacements", "LocalForces", "Reactions"
    //3) "Element->Node"
    //4) Node Previev = -1

    //moznost = 16:
    //1) "outputs"
    //2) "LocalDisplacements", "GlobalDisplacements", "LocalForces", "Reactions"
    //3) "Element->Node"
    //4) Node Previev > -1



    //obsahuje pouzer data - jednotlive podminky, za kterych se prepinaji jednotlive case
    //po prepnuti na dany case se odeslou data na frontend a prekresli se menu      
    sestavMoznosti(){

        var moznosti = {
            cases: [
                {
                    //nikdy se nevybere
                    case: "case0",
                    conditions: {
                        selectPrePostSubmit: 'xxx',
                    }
                },
                {
                    case: "case1",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'Specify DOF',
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '-1'
                    }
                },
                {
                    case: "case2",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'All DOF',
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '-1'
                    }
                },
                {
                    case: "case3",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: 'TemperatureLoad',
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '-1'
                    }
                },
                {
                    case: "case4",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: 'TemperatureLoad',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '-1'
                    }
                },
                {
                    case: "case5",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'All DOF',
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case6",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'Specify DOF',
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case7",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'Specify DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '-1'
                    }
                },
                {
                    case: "case8",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'All DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '-1'
                    }
                },
                {
                    case: "case9",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'All DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case10",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'Specify DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case11",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'All DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1',
                        selectElementPreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case12",
                    conditions: {
                        selectPrePostSubmit: 'inputs',
                        selectLoadSubmit: ['ElementLoads', 'NodalLoads', 'ForcedDisplacement'],
                        specifyDOFSubmit: 'Specify DOF',
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1',
                        selectElementPreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case13",
                    conditions: {
                        selectPrePostSubmit: 'outputs',
                        selectResultsSubmit: ['LocalDisplacements', 'GlobalDisplacements', 'LocalForces', 'Reactions', 'NodalDisplacement'],
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '-1'
                    }
                },
                {
                    case: "case14",
                    conditions: {
                        selectPrePostSubmit: 'outputs',
                        selectResultsSubmit: ['LocalDisplacements', 'GlobalDisplacements', 'LocalForces', 'Reactions', 'NodalDisplacement'],
                        filterBySubmit: 'Element -> Node',
                        selectElementPreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case15",
                    conditions: {
                        selectPrePostSubmit: 'outputs',
                        selectResultsSubmit: ['LocalDisplacements', 'GlobalDisplacements', 'LocalForces', 'Reactions', 'NodalDisplacement'],
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '-1'
                    }
                },
                {
                    case: "case16",
                    conditions: {
                        selectPrePostSubmit: 'outputs',
                        selectResultsSubmit: ['LocalDisplacements', 'GlobalDisplacements', 'LocalForces', 'Reactions', 'NodalDisplacement'],
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1'
                    }
                },
                {
                    case: "case17",
                    conditions: {
                        selectPrePostSubmit: 'outputs',
                        selectResultsSubmit: ['LocalDisplacements', 'GlobalDisplacements', 'LocalForces', 'Reactions', 'NodalDisplacement'],
                        filterBySubmit: 'Node -> Element',
                        selectNodePreviewSubmit: '<>-1',
                        selectElementPreviewSubmit: '<>-1'
                    }
                }
            ]
        }

        return(moznosti)

    }
    
}


//exportuje moznosti a menu data tj. data pro vykreslovani menu
export const moznostiMenuData = ((db) => {

    //vygeneruje Json, podle ktereho se bude vykreslovat menu
    var moznostiAMenuData = new moznostiAMenu();
    var moznostiMenu = moznostiAMenuData.getMoznostiMenuData();

    
    return(moznostiMenu);

});
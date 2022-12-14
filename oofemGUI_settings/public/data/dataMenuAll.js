

class menuData{

    constructor(){

        this.JSONMenu = this.sestavCases();

    }

    getJSONMenu(){
        return(this.JSONMenu);
    }

    sestavCases(){

        var JSONMenu = {
            case0 : {
                pocetElementu:  18,
                elementP: [
                    {
                        poradiElementu: 0,
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: 2,
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: 5,
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "inputsDOF"
                    },
                    {
                        poradiElementu: 7,
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: 9,
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: 11,
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: 13,
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: 15,
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: 17,
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                                                    
                                                    
                ],
                                                        
                elementSelect: [
                    {
                        poradiElementu: 1,
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: 3,
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: 6,
                        selectId: "selectDOFinputs",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: 8,
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: 10,
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: 12,
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: 16,
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                            "-1",
                            "0"
                        ]
                    }
                                                    
                ],                                
                elementForm: [
                    {
                        poradiElementu: 4,
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: 14,
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: 18,
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case1: {
                pocetElementu:  18,			
                elementP: [			
                    {		
                        poradiElementu:	"0",
                        pDescription:	"Preprocessor/Postprocessor",
                        pId:	"",
                        pClass:	""
                    },		
                    {		
                        poradiElementu:	"2",
                        pDescription:	"Type of Loads",
                        pId:	"",
                        pClass:	"inputs"
                    },		
                    {		
                        poradiElementu:	"5",
                        pDescription:	"Select DOF",
                        pId:	"",
                        pClass:	"inputsDOF"
                    },		
                    {		
                        poradiElementu:	"7",
                        pDescription:	"Filter by",
                        pId:	"",
                        pClass:	"elementPreview"
                    },		
                    {		
                        poradiElementu:	"9",
                        pDescription:	"Element Preview",
                        pId:	"",
                        pClass:	"elementPreview"
                    },		
                    {		
                        poradiElementu:	"11",
                        pDescription:	"Move Text",
                        pId:	"",
                        pClass:	"moveText"
                    }		
                ],			
                            
                elementSelect: [			
                    {		
                        poradiElementu:	"1",
                        selectId:	"selectPrePost",
                        selectClass:	"PrePost",
                        radkyOption:[	
                            "inputs",
                            "outputs"
                        ]	
                    },		
                    {		
                        poradiElementu:	"3",
                        selectId:	"selectLoad",
                        selectClass:	"inputs",
                        radkyOption: [
                            ""
                        ]
                    },		
                    {		
                        poradiElementu:	"6",
                        selectId:	"selectDOFinputs",
                        selectClass:	"inputs",
                        radkyOption:[	
                            ""
                        ]	
                    },		
                    {		
                        poradiElementu:	"10",
                        selectId:	"selectElementPreview",
                        selectClass:	"elementPreview",
                        radkyOption:[	
                            "-1",
                            "0"
                        ]	
                    }		
                ],			
                            
                elementForm: [			
                    {		
                        poradiElementu:	"4",
                        formId:	"specifyDOF",
                        formClass:	"inputs",
                        radkyInput:[	
                            "All DOF",
                            "Specify DOF"
                        ]	
                    },		
                    {		
                        poradiElementu:	"8",
                        formId:	"filterBy",
                        formClass:	"elementPreview",
                        radkyInput:[	
                            "Element -> Node",
                            "Node -> Element"
                        ]	
                    },		
                    {		
                        poradiElementu:	"12",
                        formId:	"moveText",
                        formClass:	"moveText",
                        radkyInput:[	
                            "Old algorithm",
                            "New algorithm"
                        ]	
                    }		
                ]			
            },				
            case2: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "8",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                            "-1",
                            "0"
                        ]
                    }
                ],
                                                        
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "6",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "10",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case3: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                            "-1",
                            "0"
                        ]
                    }
                ],
                                                        
                elementForm:  [
                    {
                        poradiElementu: "5",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "9",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case4: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                        
                elementForm:  [
                        {
                            poradiElementu: "5",
                            formId: "filterBy",
                            formClass: "elementPreview",
                            radkyInput: [
                                    "Element -> Node",
                                    "Node -> Element"
                            ]
                        },
                        {
                            poradiElementu: "9",
                            formId: "moveText",
                            formClass: "moveText",
                            radkyInput: [
                                    "Old algorithm",
                                    "New algorithm"
                            ]
                        }
                    ]
            },
            case5: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                            
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "8",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                        
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "6",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "9",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case6: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "inputsDOF"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "14",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "6",
                        selectId: "selectDOFinputs",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "10",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                    ],
                                                            
                    elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "8",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "11",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "15",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case7:{ 
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "inputsDOF"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "11",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "6",
                        selectId: "selectDOFinputs",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "10",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "8",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case8: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "8",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "6",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "10",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case9: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "11",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "8",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "10",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "6",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case10: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "13",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOFinputs",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "9",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "7",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "14",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case11: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "5",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "7",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "8",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "10",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "6",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "11",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case12: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Loads",
                        pId: "",
                        pClass: "inputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "13",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectLoad",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOFinputs",
                        selectClass: "inputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "9",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],

                elementForm:  [
                    {
                        poradiElementu: "4",
                        formId: "specifyDOF",
                        formClass: "inputs",
                        radkyInput: [
                                "All DOF",
                                "Specify DOF"
                        ]
                    },
                    {
                        poradiElementu: "7",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "14",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case13: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {     
                        poradiElementu: "2",
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "13",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                        
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
               
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                    
                elementForm:  [
                    {
                        poradiElementu: "9",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "14",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case14:{
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "13",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "15",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                    
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "14",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                            
                elementForm:  [
                    {
                        poradiElementu: "9",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "12",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "16",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            }, 
            case15: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                                            
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]   
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                    ],
                                                            
                    elementForm:  [
                    {
                        poradiElementu: "9",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case16: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "9",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                            
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "11",
                        selectId: "selectNodePreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    },
                    {
                        poradiElementu: "10",
                        selectId: "selectElementPreview",
                        selectClass: "elementPreview",
                        radkyOption: [
                                "-1",
                                "0"
                        ]
                    }
                ],
                                                        
                elementForm:  [
                    {
                        poradiElementu: "9",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "13",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            },
            case17: {
                pocetElementu:   18,
                elementP:  [
                    {
                        poradiElementu: "0",
                        pDescription: "Preprocessor/Postprocessor",
                        pId: "",
                        pClass: ""
                    },
                    {
                        poradiElementu: "2",
                        pDescription: "Type of Results",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "4",
                        pDescription: "Select DOF",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "6",
                        pDescription: "Select OFT",
                        pId: "",
                        pClass: "outputs"
                    },
                    {
                        poradiElementu: "8",
                        pDescription: "Filter by",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "10",
                        pDescription: "Node Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "12",
                        pDescription: "Element Preview",
                        pId: "",
                        pClass: "elementPreview"
                    },
                    {
                        poradiElementu: "15",
                        pDescription: "Move Text",
                        pId: "",
                        pClass: "moveText"
                    }
                ],
                                            
                elementSelect:  [
                    {
                        poradiElementu: "1",
                        selectId: "selectPrePost",
                        selectClass: "PrePost",
                        radkyOption: [
                                "inputs",
                                "outputs"
                        ]
                    },
                    {
                        poradiElementu: "3",
                        selectId: "selectResults",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "5",
                        selectId: "selectDOF",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "7",
                        selectId: "selectOFT",
                        selectClass: "outputs",
                        radkyOption: [
                            ""
                        ]
                    },
                    {
                        poradiElementu: "11",
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
                        ]
                    }
                ],
                                                        
                elementForm:  [
                    {
                        poradiElementu: "9",
                        formId: "filterBy",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Element -> Node",
                                "Node -> Element"
                        ]
                    },
                    {
                        poradiElementu: "14",
                        formId: "numberValues",
                        formClass: "elementPreview",
                        radkyInput: [
                                "Number of nodes",
                                "Values"
                        ]
                    },
                    {
                        poradiElementu: "16",
                        formId: "moveText",
                        formClass: "moveText",
                        radkyInput: [
                                "Old algorithm",
                                "New algorithm"
                        ]
                    }
                ]
            }
        }  

        return(JSONMenu);
    }

}


//zde zacina modul
export const dataMenuAll = ((db) => {

    //ziska jonMenu
    var jsonMenuCl = new menuData()
    var jsonMenu = jsonMenuCl.getJSONMenu();


    return(jsonMenu);
      
});
angular.module('cp_app').controller('financialWiser_Ctrl', function ($scope, $rootScope) {
    console.log('Intiated::');
    $scope.siteURL = siteURL;
    $rootScope.projectId;
    $rootScope.proposalId;
    $rootScope.contactId;
    $rootScope.apaId = '';
    $scope.expenseDetails = false;
    $scope.accList = [];
    $scope.expenseList = [];
    $scope.accId = '';
    $scope.manPowerRecords = [];
    $scope.consumables = [];
    $scope.Equipment = [];
    $scope.travel = [];
    $scope.other = [];
    $scope.Showyear2 = false;
    $scope.Showyear3 = false;
    $scope.durationMonths = 0;
    $rootScope.candidateId;

    const PER_DIEM_MONTHLY = 2300;
    const DAYS_IN_MONTH = 30;
    const PER_DAY_COST = PER_DIEM_MONTHLY / DAYS_IN_MONTH;


    // Budget table variables (using different names to avoid conflicts with expense arrays)
    $scope.budgetResearchStay = {
        daysYear1: 0,
        daysYear2: 0,
        daysYear3: 0,
        costYear1: 0,
        costYear2: 0,
        costYear3: 0,
        totalDays: 0,
        totalCost: 0
    };
    $scope.budgetTravel = {
        costYear1: 0,
        costYear2: 0,
        costYear3: 0,
        totalCost: 0
    };
    $scope.researchStayTravelTotal = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.totalResearchAmount = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.budgetOverhead = {
        percentageYear1: 0,
        percentageYear2: 0,
        percentageYear3: 0,
        amountYear1: 0,
        amountYear2: 0,
        amountYear3: 0,
        totalAmount: 0
    };
    $scope.remainingForResearch = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.budgetResearchStaff = {
        positionsYear1: 0,
        positionsYear2: 0,
        positionsYear3: 0,
        costYear1: 0,
        costYear2: 0,
        costYear3: 0,
        hoursYear1: 0,
        hoursYear2: 0,
        hoursYear3: 0,
        totalYear1: 0,
        totalYear2: 0,
        totalYear3: 0,
        totalAmount: 0
    };
    $scope.budgetConsumables = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.minorEquipment = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.budgetContingency = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.grandTotal = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };
    $scope.finalTotalExcludingTravel = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };

    $scope.originalResearchAmount = {
        year1: 0,
        year2: 0,
        year3: 0,
        total: 0
    };

    //     $scope.budgetResearchStay = {
    //     daysYear1,
    //     daysYear2,
    //     daysYear3,
    //     costYear1,
    //     costYear2,
    //     costYear3,
    //     totalDays,
    //     totalCost
    // };
    // $scope.budgetTravel = {
    //     costYear1,
    //     costYear2,
    //     costYear3,
    //     totalCost
    // };
    // $scope.researchStayTravelTotal = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.totalResearchAmount = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.budgetOverhead = {
    //     percentageYear1,
    //     percentageYear2,
    //     percentageYear3,
    //     amountYear1,
    //     amountYear2,
    //     amountYear3,
    //     totalAmount
    // };
    // $scope.remainingForResearch = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.budgetResearchStaff = {
    //     positionsYear1,
    //     positionsYear2,
    //     positionsYear3,
    //     costYear1,
    //     costYear2,
    //     costYear3,
    //     hoursYear1,
    //     hoursYear2,
    //     hoursYear3,
    //     totalYear1,
    //     totalYear2,
    //     totalYear3,
    //     totalAmount
    // };
    // $scope.budgetConsumables = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.minorEquipment = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.budgetContingency = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };
    // $scope.grandTotal = {
    //     year1,
    //     year2,
    //     year3,
    //     total
    // };

    if (localStorage.getItem('apaId')) {
        $rootScope.apaId = localStorage.getItem('apaId');
        console.log('Loaded proposalId from localStorage:', $rootScope.apaId);
    }

    console.log('$rootScope.candidateId ===>>' + $rootScope.candidateId);

    $scope.getApplicantStatusFromAPA = function () {
        debugger;
        ApplicantPortal_Contoller.fetchApplicantStatus($rootScope.apaId, function (result, event) {
            debugger;

            console.log('result return onload :: ');
            console.log(result);
            console.log('event:', event);

            if (event.status) {
                $rootScope.isCurrentUserSubmitted = result;
                CKEDITOR.config.readOnly = true;
            } else {
                console.log('Error in fetchApplicantStatus:', event.message);
            }
        }, {
            escape: true
        });
    }
    $scope.getApplicantStatusFromAPA();

    $scope.getAccounts = function () {
        debugger;
        IndustrialFellowshipController.getProposalAccounts($rootScope.proposalId, $rootScope.candidateId, function (result, event) {
            console.log('onload :: =>');
            console.log(result);
            if (event.status && result != null) {
                debugger;
                if (result.accountDetail.Name != undefined || result.accountDetail.Name != "") {
                    result.accountDetail.Name = result.accountDetail.Name ? result.accountDetail.Name.replace(/&amp;/g, '&').replaceAll('&amp;amp;', '&').replaceAll('&amp;gt;', '>').replaceAll('&lt;', '<').replaceAll('lt;', '<').replaceAll('&gt;', '>').replaceAll('gt;', '>').replaceAll('&amp;', '&').replaceAll('amp;', '&').replaceAll('&quot;', '\'') : result.accountDetail.Name;
                }
                $scope.accDetails = result.accountDetail;
                $scope.durationMonths = result.durationInMonths;
                if ($scope.durationMonths > 12 && $scope.durationMonths < 25) {
                    $scope.Showyear2 = true;
                    $scope.numberOfYears = 2;
                } else if ($scope.durationMonths > 24) {
                    $scope.Showyear2 = true;
                    $scope.Showyear3 = true;
                    $scope.numberOfYears = 3;
                } else {
                    $scope.numberOfYears = 1;
                }
                console.log($scope.durationMonths);
                $scope.getExpenseRecords();

                // Try to get expense records from ApplicantPortal_Contoller if contactId is available
                if ($rootScope.proposalId && $rootScope.contactId) {
                    $scope.getExpenseRecordsFromApex();
                } else {
                    // Initialize budget table calculations even if we don't have contactId
                    $scope.recalculateAll();
                }

                $scope.$apply();
            }
        })
    }
    $scope.getAccounts();


    $scope.getExpenseRecords = function () {
        debugger;
        IndustrialFellowshipController.getExpenseRecords($rootScope.proposalId, function (result, event) {
            console.log("declred expense list");
            console.log(result);
            debugger;
            if (event.status) {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].Name != undefined || result[i].Name != "") {
                            result[i].Name = result[i].Name ? result[i].Name.replace(/&amp;/g, '&').replaceAll('&amp;amp;', '&').replaceAll('&amp;gt;', '>').replaceAll('&lt;', '<').replaceAll('lt;', '<').replaceAll('&gt;', '>').replaceAll('gt;', '>').replaceAll('&amp;', '&').replaceAll('amp;', '&').replaceAll('&quot;', '\'') : result[i].Name;
                        }
                        if (result[i].Expense_Line_Items__r == undefined) {
                            result[i].Expense_Line_Items__r = [];
                            result[i].Expense_Line_Items__r.push({ "Expense_Head__c": result[i].Id, 'Description__c': '', "Year1_Expense__c": "", "Year2_Expense__c": "", "Year3_Expense__c": "", "Total_Expense__c": "", "Expense_Type__c": "" });
                        } else {
                            result[i].Expense_Line_Items__r = result[i].Expense_Line_Items__r;
                            for (var j = 0; j < result[i].Expense_Line_Items__r.length; j++) {
                                if (result[i].Expense_Line_Items__r[j].Description__c != undefined || result[i].Expense_Line_Items__r[j].Description__c != "") {
                                    result[i].Expense_Line_Items__r[j].Description__c = result[i].Expense_Line_Items__r[j].Description__c ? result[i].Expense_Line_Items__r[j].Description__c.replace(/&amp;/g, '&').replaceAll('&amp;amp;', '&').replaceAll('&amp;gt;', '>').replaceAll('&lt;', '<').replaceAll('lt;', '<').replaceAll('&gt;', '>').replaceAll('gt;', '>').replaceAll('&amp;', '&').replaceAll('amp;', '&').replaceAll('&quot;', '\'') : result[i].Expense_Line_Items__r[j].Description__c;
                                }
                            }
                        }
                    }
                    $scope.expenseList = result;
                    // Process expense records to populate expense table arrays
                    $scope.processExpenseRecordsForTable();
                    $scope.calculateOtherField();
                    $scope.calculateOtherField2();
                    $scope.calculateOtherField3();
                } else {
                    $scope.createExpenceHead();
                }
                $scope.$apply();
            }
        },
            { escape: true }
        )
    }

    // Process expense records to populate expense table arrays - Matching ExpenseDeclaration.js logic
    $scope.processExpenseRecordsForTable = function () {
        // Reset arrays
        $scope.manPowerRecords = [];
        $scope.consumables = [];
        $scope.Equipment = [];
        $scope.travel = [];
        $scope.outsourcing = [];
        $scope.contingency = [];
        $scope.overhead = [];

        // Reset totals
        $scope.manPower = {};
        $scope.equipmentTotals = {};
        $scope.consumableTotal = {};
        $scope.travelTotal = {};
        $scope.outsourcingTotal = {};
        $scope.contingencyTotal = {};
        $scope.overheadCharges = {};

        if ($scope.expenseList && $scope.expenseList.length > 0) {
            for (var i = 0; i < $scope.expenseList.length; i++) {
                var expenseHead = $scope.expenseList[i];
                var headName = expenseHead.Name;

                if (expenseHead.Expense_Line_Items__r && expenseHead.Expense_Line_Items__r.length > 0) {
                    for (var j = 0; j < expenseHead.Expense_Line_Items__r.length; j++) {
                        var lineItem = expenseHead.Expense_Line_Items__r[j];

                        var record = {
                            Id: lineItem.Id,
                            Description__c: lineItem.Description__c || '',
                            Position__c: lineItem.Position__c || '',
                            Number__c: lineItem.Number__c || '',
                            Person_Month__c: lineItem.Person_Month__c || '',
                            Salary_Month__c: lineItem.Salary_Month__c || '',
                            Unit_Price__c: lineItem.Unit_Price__c || '',
                            Multiplier__c: lineItem.Multiplier__c || '',
                            Year1_Expense__c: lineItem.Year1_Expense__c || 0,
                            Year2_Expense__c: lineItem.Year2_Expense__c || 0,
                            Year3_Expense__c: lineItem.Year3_Expense__c || 0,
                            Total_Expense__c: lineItem.Total_Expense__c || 0,
                            Expense_Head__c: expenseHead.Id,
                            Expense_Type__c: headName
                        };

                        // Categorize by expense head name - Matching ExpenseDeclaration.js
                        if (headName === 'Research staff' || headName === 'Manpower') {
                            $scope.manPowerRecords.push(record);
                            $scope.manPower.Total_Year1_Expense__c = Number((($scope.manPower.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.manPower.Total_Year2_Expense__c = Number((($scope.manPower.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.manPower.Total_Year3_Expense__c = Number((($scope.manPower.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.manPower.Overall_Expense = Number(($scope.manPower.Total_Year1_Expense__c + $scope.manPower.Total_Year2_Expense__c + $scope.manPower.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Consumables' || headName === 'Consumables/Materials') {
                            $scope.consumables.push(record);
                            $scope.consumableTotal.Total_Year1_Expense__c = Number((($scope.consumableTotal.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.consumableTotal.Total_Year2_Expense__c = Number((($scope.consumableTotal.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.consumableTotal.Total_Year3_Expense__c = Number((($scope.consumableTotal.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.consumableTotal.Overall_Expense = Number(($scope.consumableTotal.Total_Year1_Expense__c + $scope.consumableTotal.Total_Year2_Expense__c + $scope.consumableTotal.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Equipment' || headName === 'Equipment & Accessories') {
                            $scope.Equipment.push(record);
                            $scope.equipmentTotals.Total_Year1_Expense__c = Number((($scope.equipmentTotals.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.equipmentTotals.Total_Year2_Expense__c = Number((($scope.equipmentTotals.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.equipmentTotals.Total_Year3_Expense__c = Number((($scope.equipmentTotals.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.equipmentTotals.Overall_Expense = Number(($scope.equipmentTotals.Total_Year1_Expense__c + $scope.equipmentTotals.Total_Year2_Expense__c + $scope.equipmentTotals.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Travel' || headName === 'Travel & Networking') {
                            $scope.travel.push(record);
                            $scope.travelTotal.Total_Year1_Expense__c = Number((($scope.travelTotal.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.travelTotal.Total_Year2_Expense__c = Number((($scope.travelTotal.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.travelTotal.Total_Year3_Expense__c = Number((($scope.travelTotal.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.travelTotal.Overall_Expense = Number(($scope.travelTotal.Total_Year1_Expense__c + $scope.travelTotal.Total_Year2_Expense__c + $scope.travelTotal.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Overhead' || headName === 'Projektpauschale') {
                            $scope.overhead.push(record);
                            $scope.overheadCharges.Total_Year1_Expense__c = Number((($scope.overheadCharges.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.overheadCharges.Total_Year2_Expense__c = Number((($scope.overheadCharges.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.overheadCharges.Total_Year3_Expense__c = Number((($scope.overheadCharges.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.overheadCharges.Overall_Expense = Number(($scope.overheadCharges.Total_Year1_Expense__c + $scope.overheadCharges.Total_Year2_Expense__c + $scope.overheadCharges.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Contingency') {
                            $scope.contingency.push(record);
                            $scope.contingencyTotal.Total_Year1_Expense__c = Number((($scope.contingencyTotal.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.contingencyTotal.Total_Year2_Expense__c = Number((($scope.contingencyTotal.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.contingencyTotal.Total_Year3_Expense__c = Number((($scope.contingencyTotal.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.contingencyTotal.Overall_Expense = Number(($scope.contingencyTotal.Total_Year1_Expense__c + $scope.contingencyTotal.Total_Year2_Expense__c + $scope.contingencyTotal.Total_Year3_Expense__c).toFixed(2));
                        } else if (headName === 'Subcontract/Outsourcing' || headName === 'Miscellaneous and Others') {
                            $scope.outsourcing.push(record);
                            $scope.outsourcingTotal.Total_Year1_Expense__c = Number((($scope.outsourcingTotal.Total_Year1_Expense__c || 0) + (lineItem.Year1_Expense__c || 0)).toFixed(2));
                            $scope.outsourcingTotal.Total_Year2_Expense__c = Number((($scope.outsourcingTotal.Total_Year2_Expense__c || 0) + (lineItem.Year2_Expense__c || 0)).toFixed(2));
                            $scope.outsourcingTotal.Total_Year3_Expense__c = Number((($scope.outsourcingTotal.Total_Year3_Expense__c || 0) + (lineItem.Year3_Expense__c || 0)).toFixed(2));
                            $scope.outsourcingTotal.Overall_Expense = Number(($scope.outsourcingTotal.Total_Year1_Expense__c + $scope.outsourcingTotal.Total_Year2_Expense__c + $scope.outsourcingTotal.Total_Year3_Expense__c).toFixed(2));
                        }
                    }
                }
            }
        }

        // Ensure arrays have at least one empty record if they're empty
        if ($scope.manPowerRecords.length === 0) {
            $scope.manPowerRecords.push({
                "Position__c": "",
                "Person_Month__c": "",
                "Salary_Month__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.consumables.length === 0) {
            $scope.consumables.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Number__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.Equipment.length === 0) {
            $scope.Equipment.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Number__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.travel.length === 0) {
            $scope.travel.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Number__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.overhead.length === 0) {
            $scope.overhead.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.contingency.length === 0) {
            $scope.contingency.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }
        if ($scope.outsourcing.length === 0) {
            $scope.outsourcing.push({
                "Description__c": "",
                "Unit_Price__c": "",
                "Year1_Expense__c": undefined,
                "Year2_Expense__c": undefined,
                "Year3_Expense__c": undefined,
                "Total_Expense__c": undefined
            });
        }

        $scope.updateTotals();
    }

    $scope.createExpenceHead = function () {
        debugger;
        if ($scope.accDetails.Contacts[0].MailingCountry == "India") {
            var allExpencehead = [{
                'Account__c': $scope.accDetails.Id,
                "Name": "Research staff",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Consumables",
                "Proposals__c": $rootScope.projectId,
            },
            {
                'Account__c': $scope.accDetails.Id,
                "Name": "Research stay",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Travel",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Contingency",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Miscellaneous and Others",
                "Proposals__c": $rootScope.projectId,
            }]
        } else if ($scope.accDetails.Contacts[0].MailingCountry == "Germany") {
            var allExpencehead = [{
                'Account__c': $scope.accDetails.Id,
                "Name": "Research staff",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Consumables",
                "Proposals__c": $rootScope.projectId,
            },
            {
                'Account__c': $scope.accDetails.Id,
                "Name": "Research stay",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Travel",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Contingency",
                "Proposals__c": $rootScope.projectId,
            }, {
                'Account__c': $scope.accDetails.Id,
                "Name": "Miscellaneous and Others",
                "Proposals__c": $rootScope.projectId,
            }]
        }

        IndustrialFellowshipController.createExpenceHead(allExpencehead, function (result, event) {
            console.log("declred expense    list");
            console.log(result);
            debugger;
            if (event.status && result != null) {
                for (var i = 0; i < result.length; i++) {
                    result[i].Expense_Line_Items__r = [];
                    result[i].Expense_Line_Items__r.push({ "Expense_Head__c": result[i].Id, 'Description__c': '', "Year1_Expense__c": "", "Year2_Expense__c": "", "Year3_Expense__c": "", "Total_Expense__c": "", "Expense_Type__c": "" });
                }
                $scope.Expense_Line_Items__r = result;
                $scope.expenseList = result;
                $scope.$apply();
            }
        },
            { escape: true }
        )
    }

    console.log('$scope.manPowerRecords::' + $scope.manPowerRecords);
    // $scope.proposalId = 'a081y0000029D81AAE';



    $scope.addRow = function (param1) {
        debugger;
        $scope.expenseList[param1].Expense_Line_Items__r.push({
            'Description__c': '',
            "Year1_Expense__c": "",
            "Year2_Expense__c": "",
            "Year3_Expense__c": "",
            "Expense_Head__c": $scope.expenseList[param1].Id
        });
        $scope.$apply();

    }

    $scope.deleteRow = function (param1, param2) {
        debugger;
        if ($scope.expenseList[param1].Expense_Line_Items__r.length > 1) {
            $scope.expenseList[param1].Expense_Line_Items__r.splice(param2, 1);
        }
    }

    $scope.saveExpenceLineitems = function () {
        // Use new budget table save method if apaId is available
        if ($rootScope.apaId) {
            $scope.saveBudgetTableData();
            return;
        }

        // Otherwise use existing method
        $scope.expLineItem = [];
        debugger;

        $scope.emptyDescription = false;
        $scope.researchSum = 0;
        $scope.researchSum2 = 0;
        $scope.researchSum3 = 0;

        $scope.researchSumGermany = 0;
        $scope.researchSum2Germany - 0;
        $scope.researchSum3Germany = 0;

        $scope.travelSum = 0;
        $scope.travelSum2 = 0;
        $scope.travelSum3 = 0;

        $scope.travelSumGermany = 0;
        $scope.travelSum2Germany = 0;
        $scope.travelSum3Germany = 0;

        for (var i = 0; i < $scope.expenseList.length; i++) {
            for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                if (!$scope.expenseList[i].Expense_Line_Items__r[j].Description__c || $scope.expenseList[i].Expense_Line_Items__r[j].Description__c.trim() === "") {
                    $scope.emptyDescription = true;
                    break;
                }
            }
            if ($scope.emptyDescription) break;
        }

        if ($scope.emptyDescription) {
            swal("info", "Please fill in all descriptions before saving.", "info");
            return;
        }

        for (var i = 0; i < $scope.expenseList.length; i++) {
            if ($scope.accDetails.Contacts[0].MailingCountry == "India") {

                if ($scope.expenseList[i].Name == "Research stay") {
                    for (let j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        $scope.researchSum = $scope.researchSum + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        $scope.researchSum2 = $scope.researchSum2 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        $scope.researchSum3 = $scope.researchSum3 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                    }
                } else if ($scope.expenseList[i].Name == "Travel") {
                    for (let j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        $scope.travelSum = $scope.travelSum + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        $scope.travelSum2 = $scope.travelSum2 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        $scope.travelSum3 = $scope.travelSum3 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                    }
                }
            } else {
                if ($scope.expenseList[i].Name == "Research stay") {
                    for (let j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        $scope.researchSumGermany = $scope.researchSumGermany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        $scope.researchSum2Germany = $scope.researchSum2Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        $scope.researchSum3Germany = $scope.researchSum3Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                    }
                } else if ($scope.expenseList[i].Name == "Travel") {
                    for (let j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        $scope.travelSumGermany = $scope.travelSumGermany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        $scope.travelSum2Germany = $scope.travelSum2Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        $scope.travelSum3Germany = $scope.travelSum3Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                    }
                }
            }
        }

        for (var i = 0; i < $scope.expenseList.length; i++) {
            for (let j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                delete ($scope.expenseList[i].Expense_Line_Items__r[j]['$$hashKey']);
                $scope.expLineItem.push($scope.expenseList[i].Expense_Line_Items__r[j]);
            }
        }
        $scope.totalSum = "";

        if ($scope.accDetails.Contacts[0].MailingCountry == "India") {
            // if($scope.researchSum > 200000){
            //     swal("info", "Research stay expense for each year should not be more than 200000.","info");
            //     return;  
            // }
            // if($scope.researchSum2 > 200000){
            //     swal("info", "Research stay expense for each year should not be more than 200000.","info");
            //     return;  
            // }
            // if($scope.researchSum3 > 200000){
            //     swal("info", "Research stay expense for each year should not be more than 200000.","info");
            //     return;  
            // }

            // if($scope.travelSum > 100000){
            //     swal("info", "Travel expense for each year should not be more than 100000.","info");
            //     return;  
            // }
            // if($scope.travelSum2 > 100000){
            //     swal("info", "Travel expense for each year should not be more than 100000.","info");
            //     return;  
            // }
            // if($scope.travelSum3 > 100000){
            //     swal("info", "Travel expense for each year should not be more than 100000.","info");
            //     return;  
            // }

            if ($scope.year1 > 1300000) {
                swal("info", "Year 1 expense should not be more than 1300000.", "info");
                return;
            }
            if ($scope.year2 > 1300000) {
                swal("info", "Year 2 expense should not be more than 1300000.", "info");
                return;
            }
            if ($scope.year3 > 1300000) {
                swal("info", "Year 3 expense should not be more than 1300000.", "info");
                return;
            }
            $scope.totalSum = $scope.year1 + $scope.year2 + $scope.year3;
        } else {
            // if($scope.researchSumGermany > 2300){
            //     swal("info", "Research stay expense for each year should not be more than 2300 €.","info");
            //     return;  
            // }
            // if($scope.researchSum2Germany > 2300){
            //     swal("info", "Research stay expense for each year should not be more than 2300 €.","info");
            //     return;  
            // }
            // if($scope.researchSum3Germany > 2300){
            //     swal("info", "Research stay expense for each year should not be more than 2300 €.","info");
            //     return;  
            // }

            // if($scope.travelSumGermany > 1500){
            //     swal("info", "Travel expense for each year should not be more than 1500 €.","info");
            //     return;  
            // }
            // if($scope.travelSum2Germany > 1500){
            //     swal("info", "Travel expense for each year should not be more than 1500 €.","info");
            //     return;  
            // }
            // if($scope.travelSum3Germany > 1500){
            //     swal("info", "Travel expense for each year should not be more than 1500 €.","info");
            //     return;  
            // }

            if ($scope.year1Germany > 16000) {
                swal("info", "Year 1 expense should not be more than 16000 €.", "info");
                return;
            }
            if ($scope.year2Germany > 16000) {
                swal("info", "Year 2 expense should not be more than 16000 €.", "info");
                return;
            }
            if ($scope.year3Germany > 16000) {
                swal("info", "Year 3 expense should not be more than 16000 €.", "info");
                return;
            }

            $scope.totalSum = $scope.year1Germany + $scope.year2Germany + $scope.year3Germany;
        }

        debugger;
        IndustrialFellowshipController.saveExpenceLineItemWISER($scope.expLineItem, $scope.totalSum, function (result, event) {
            if (event.status && result != null) {
                console.log(result);
                swal({
                    title: "SUCCESS",
                    text: 'Budget details have been saved successfully.',
                    icon: "success",
                    button: "ok!",
                })
                $scope.redirectPageURL('ExistingGrantWISER');

            } else {
                swal({
                    title: "ERROR",
                    text: "Exception !",
                    icon: "error",
                    button: "ok!",
                });
            }
            // if (event.status && result != null) {
            //     debugger;
            //     Swal.fire(
            //         'Success',
            //         'Budget details have been saved successfully.',
            //         'success'
            //    );
            //     $scope.redirectPageURL('HostProjectDetails');
            // }
        })
    }



    $scope.calculateOtherField = function () {
        debugger;
        $scope.year1 = 0;
        $scope.year1Germany = 0;
        for (var i = 0; i < $scope.expenseList.length; i++) {
            if ($scope.accDetails.Contacts[0].MailingCountry == "India") {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c != undefined) {
                            $scope.year1 = $scope.year1 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        }

                    }
                }
            } else {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c != undefined) {
                            $scope.year1Germany = $scope.year1Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year1_Expense__c);
                        }

                    }
                }
            }
        }
        $scope.$apply();
    }


    $scope.calculateOtherField2 = function () {
        debugger;
        $scope.year2 = 0;
        $scope.year2Germany = 0;
        for (var i = 0; i < $scope.expenseList.length; i++) {
            if ($scope.accDetails.Contacts[0].MailingCountry == "India") {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c != undefined) {
                            $scope.year2 = $scope.year2 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        }
                    }
                }
            } else {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c != undefined) {
                            $scope.year2Germany = $scope.year2Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year2_Expense__c);
                        }
                    }
                }
            }
        }
    }

    $scope.calculateOtherField3 = function () {
        debugger;
        $scope.year3 = 0;
        $scope.year3Germany = 0;
        for (var i = 0; i < $scope.expenseList.length; i++) {
            if ($scope.accDetails.Contacts[0].MailingCountry == "India") {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c != undefined) {
                            $scope.year3 = $scope.year3 + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                        }
                    }
                }
            } else {
                if ($scope.expenseList[i].Expense_Line_Items__r != undefined) {
                    for (var j = 0; j < $scope.expenseList[i].Expense_Line_Items__r.length; j++) {
                        if ($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c != undefined) {
                            $scope.year3Germany = $scope.year3Germany + Number($scope.expenseList[i].Expense_Line_Items__r[j].Year3_Expense__c);
                        }
                    }
                }
            }
        }
    }
    $scope.redirectPageURL = function (pageName) {
        debugger;
        var link = document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href = "#/" + pageName;
        link.click();
    }

    // Expense Table Variables - Matching ExpenseDeclaration.js
    $scope.numberOfYears = 1;
    $scope.outsourcing = [];
    $scope.contingency = [];
    $scope.overhead = [];
    $scope.manPower = {};
    $scope.equipmentTotals = {};
    $scope.consumableTotal = {};
    $scope.travelTotal = {};
    $scope.outsourcingTotal = {};
    $scope.contingencyTotal = {};
    $scope.overheadCharges = {};
    $scope.subTotal = {};
    $scope.totals = {};
    $scope.igstcFunding = {};
    $scope.industryContr = {};

    // Add row methods - Matching ExpenseDeclaration.js
    $scope.addRow = function (param1, param2) {
        $scope.manPowerRecords.push({
            "Position__c": "",
            "Person_Month__c": "",
            "Salary_Month__c": "",
            "Year1_Expense__c": undefined,
            "Year2_Expense__c": undefined,
            "Year3_Expense__c": undefined,
            "Total_Expense__c": undefined
        });
        $scope.$apply();
    }
    $scope.addRowCon = function (param1, param2) {
        $scope.consumables.push({
            "Description__c": "",
            "Unit_Price__c": "",
            "Number__c": "",
            "Year1_Expense__c": undefined,
            "Year2_Expense__c": undefined,
            "Year3_Expense__c": undefined,
            "Total_Expense__c": undefined
        });
    }
    $scope.addRowEquip = function (param1, param2) {
        $scope.Equipment.push({
            "Description__c": "",
            "Unit_Price__c": "",
            "Number__c": "",
            "Year1_Expense__c": undefined,
            "Year2_Expense__c": undefined,
            "Year3_Expense__c": undefined,
            "Total_Expense__c": undefined
        });
    }
    $scope.addRowOutsourcing = function (param1, param2) {
        $scope.outsourcing.push({
            "Description__c": "",
            "Unit_Price__c": "",
            "Year1_Expense__c": undefined,
            "Year2_Expense__c": undefined,
            "Year3_Expense__c": undefined,
            "Total_Expense__c": undefined
        });
    }

    // Delete row methods - Matching ExpenseDeclaration.js
    $scope.deleteRow = function (param1, param2, Id) {
        if ($scope.manPowerRecords.length > 1) {
            $scope.manPowerRecords.splice(param2, 1);
        }
        $scope.manPower.Total_Year1_Expense__c = $scope.manPowerRecords.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.manPower.Total_Year2_Expense__c = $scope.manPowerRecords.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.manPower.Total_Year3_Expense__c = $scope.manPowerRecords.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.manPower.Overall_Expense = $scope.manPowerRecords.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }
    $scope.deleteRowConsumables = function (param1, param2, Id) {
        if ($scope.consumables.length > 1) {
            $scope.consumables.splice(param2, 1);
        }
        $scope.consumableTotal.Total_Year1_Expense__c = $scope.consumables.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.consumableTotal.Total_Year2_Expense__c = $scope.consumables.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.consumableTotal.Total_Year3_Expense__c = $scope.consumables.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.consumableTotal.Overall_Expense = $scope.consumables.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }
    $scope.deleteRowEquipment = function (param1, param2, Id) {
        if ($scope.Equipment.length > 1) {
            $scope.Equipment.splice(param2, 1);
        }
        $scope.equipmentTotals.Total_Year1_Expense__c = $scope.Equipment.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.equipmentTotals.Total_Year2_Expense__c = $scope.Equipment.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.equipmentTotals.Total_Year3_Expense__c = $scope.Equipment.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.equipmentTotals.Overall_Expense = $scope.Equipment.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }
    $scope.deleteRowOutsourcing = function (param1, param2, Id) {
        if ($scope.outsourcing.length > 1) {
            $scope.outsourcing.splice(param2, 1);
        }
        $scope.outsourcingTotal.Total_Year1_Expense__c = $scope.outsourcing.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.outsourcingTotal.Total_Year2_Expense__c = $scope.outsourcing.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.outsourcingTotal.Total_Year3_Expense__c = $scope.outsourcing.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.outsourcingTotal.Overall_Expense = $scope.outsourcing.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }
    $scope.deleteRowContingency = function (param1, param2, Id) {
        if ($scope.contingency.length > 1) {
            $scope.contingency.splice(param2, 1);
        }
        $scope.contingencyTotal.Total_Year1_Expense__c = $scope.contingency.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.contingencyTotal.Total_Year2_Expense__c = $scope.contingency.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.contingencyTotal.Total_Year3_Expense__c = $scope.contingency.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.contingencyTotal.Overall_Expense = $scope.contingency.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }
    $scope.deleteRowOverhead = function (param1, param2, Id) {
        if ($scope.overhead.length > 1) {
            $scope.overhead.splice(param2, 1);
        }
        $scope.overheadCharges.Total_Year1_Expense__c = $scope.overhead.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year1_Expense__c || 0);
        }, 0);
        $scope.overheadCharges.Total_Year2_Expense__c = $scope.overhead.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year2_Expense__c || 0);
        }, 0);
        $scope.overheadCharges.Total_Year3_Expense__c = $scope.overhead.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Year3_Expense__c || 0);
        }, 0);
        $scope.overheadCharges.Overall_Expense = $scope.overhead.reduce(function (accumulator, currentValue) {
            return accumulator + (currentValue.Total_Expense__c || 0);
        }, 0);
        $scope.updateTotals();
    }

    // Calculate Other Field - Matching ExpenseDeclaration.js
    $scope.calculateOtherField = function (exType) {
        function toNum(val) {
            return val != null && val !== '' && !isNaN(val)
                ? Number(parseFloat(val).toFixed(2))
                : 0;
        }

        function round2(val) {
            return Number(parseFloat(val).toFixed(2));
        }

        function sum(arr, field) {
            return round2(arr.reduce((acc, cur) => acc + toNum(cur[field]), 0));
        }

        function calcTotals(list, totalObj) {
            for (let i = 0; i < list.length; i++) {
                const r = list[i];
                r.Total_Expense__c = round2(toNum(r.Year1_Expense__c) + toNum(r.Year2_Expense__c) + toNum(r.Year3_Expense__c));
            }
            totalObj.Total_Year1_Expense__c = sum(list, 'Year1_Expense__c');
            totalObj.Total_Year2_Expense__c = sum(list, 'Year2_Expense__c');
            totalObj.Total_Year3_Expense__c = sum(list, 'Year3_Expense__c');
            totalObj.Overall_Expense = round2(list.reduce((acc, cur) => acc + toNum(cur.Total_Expense__c), 0));
        }

        if (exType === 'man') {
            calcTotals($scope.manPowerRecords, $scope.manPower);
        }
        else if (exType === 'cons') {
            calcTotals($scope.consumables, $scope.consumableTotal);
        }
        else if (exType === 'equi') {
            calcTotals($scope.Equipment, $scope.equipmentTotals);
        }
        else if (exType === 'travel') {
            calcTotals($scope.travel, $scope.travelTotal);
        }
        else if (exType === 'outsourcing') {
            calcTotals($scope.outsourcing, $scope.outsourcingTotal);
        }
        else if (exType === 'contingency') {
            calcTotals($scope.contingency, $scope.contingencyTotal);
        }
        else if (exType === 'overhead') {
            calcTotals($scope.overhead, $scope.overheadCharges);
        }
        else if (exType === 'igstc') {
            $scope.igstcFunding.Total_Expense__c = round2(
                toNum($scope.igstcFunding.Year1_Expense__c) +
                toNum($scope.igstcFunding.Year2_Expense__c) +
                toNum($scope.igstcFunding.Year3_Expense__c)
            );
        }
        else if (exType === 'ic') {
            $scope.industryContr.Total_Expense__c = round2(
                toNum($scope.industryContr.Year1_Expense__c) +
                toNum($scope.industryContr.Year2_Expense__c) +
                toNum($scope.industryContr.Year3_Expense__c)
            );
        }
        $scope.updateTotals();
    };

    // Update Totals - Matching ExpenseDeclaration.js
    $scope.updateTotals = function () {
        function toNum(val) {
            return val != null && val !== '' && !isNaN(val)
                ? Number(parseFloat(val).toFixed(2))
                : 0;
        }

        function round2(val) {
            return Number(parseFloat(val).toFixed(2));
        }

        $scope.subTotal.Total_Year1_Expense__c = round2(
            toNum($scope.manPower.Total_Year1_Expense__c) +
            toNum($scope.consumableTotal.Total_Year1_Expense__c) +
            toNum($scope.equipmentTotals.Total_Year1_Expense__c) +
            toNum($scope.travelTotal.Total_Year1_Expense__c) +
            toNum($scope.outsourcingTotal.Total_Year1_Expense__c) +
            toNum($scope.contingencyTotal.Total_Year1_Expense__c)
        );

        $scope.subTotal.Total_Year2_Expense__c = round2(
            toNum($scope.manPower.Total_Year2_Expense__c) +
            toNum($scope.consumableTotal.Total_Year2_Expense__c) +
            toNum($scope.equipmentTotals.Total_Year2_Expense__c) +
            toNum($scope.travelTotal.Total_Year2_Expense__c) +
            toNum($scope.outsourcingTotal.Total_Year2_Expense__c) +
            toNum($scope.contingencyTotal.Total_Year2_Expense__c)
        );

        $scope.subTotal.Total_Year3_Expense__c = round2(
            toNum($scope.manPower.Total_Year3_Expense__c) +
            toNum($scope.consumableTotal.Total_Year3_Expense__c) +
            toNum($scope.equipmentTotals.Total_Year3_Expense__c) +
            toNum($scope.travelTotal.Total_Year3_Expense__c) +
            toNum($scope.outsourcingTotal.Total_Year3_Expense__c) +
            toNum($scope.contingencyTotal.Total_Year3_Expense__c)
        );

        $scope.subTotal.Overall_Expense = round2(
            toNum($scope.manPower.Overall_Expense) +
            toNum($scope.consumableTotal.Overall_Expense) +
            toNum($scope.equipmentTotals.Overall_Expense) +
            toNum($scope.travelTotal.Overall_Expense) +
            toNum($scope.outsourcingTotal.Overall_Expense) +
            toNum($scope.contingencyTotal.Overall_Expense)
        );

        $scope.totals.Total_Year1_Expense__c = round2(
            toNum($scope.subTotal.Total_Year1_Expense__c) +
            toNum($scope.overheadCharges.Total_Year1_Expense__c)
        );

        $scope.totals.Total_Year2_Expense__c = round2(
            toNum($scope.subTotal.Total_Year2_Expense__c) +
            toNum($scope.overheadCharges.Total_Year2_Expense__c)
        );

        $scope.totals.Total_Year3_Expense__c = round2(
            toNum($scope.subTotal.Total_Year3_Expense__c) +
            toNum($scope.overheadCharges.Total_Year3_Expense__c)
        );

        $scope.totals.Overall_Expense = round2(
            toNum($scope.subTotal.Overall_Expense) +
            toNum($scope.overheadCharges.Overall_Expense)
        );
    };

    // ========== BUDGET TABLE CALCULATION METHODS ==========
    // Flag to prevent infinite loops during calculations
    $scope.isCalculating = false;

    // Master calculation method - calls all calculations in correct order without circular dependencies
    $scope.recalculateAll = function () {
        if ($scope.isCalculating) {
            return; // Prevent infinite loops
        }
        $scope.isCalculating = true;

        try {

            // --- CALCULATION : Research Stay Per diem cost --- //
            const perDay = 2300 / 30;

            // --- Research Stay Days ---
            const d1 = Number($scope.budgetResearchStay.daysYear1) || 0;
            const d2 = Number($scope.budgetResearchStay.daysYear2) || 0;
            const d3 = Number($scope.budgetResearchStay.daysYear3) || 0;

            $scope.budgetResearchStay.totalDays = d1 + d2 + d3;

            // --- Research Stay Per Diem Cost (AUTO CALCULATED) ---
            $scope.budgetResearchStay.costYear1 = Math.round(d1 * perDay * 100) / 100;
            $scope.budgetResearchStay.costYear2 = Math.round(d2 * perDay * 100) / 100;
            $scope.budgetResearchStay.costYear3 = Math.round(d3 * perDay * 100) / 100;

            $scope.budgetResearchStay.totalCost =
                $scope.budgetResearchStay.costYear1 +
                $scope.budgetResearchStay.costYear2 +
                $scope.budgetResearchStay.costYear3;

            // --- CALCULATION : Travel Cost per Visit (AUTO CALCULATED) ---
            $scope.budgetTravel.costYear1 =
                $scope.budgetResearchStay.costYear1 > 0 ? 1500 : 0;

            $scope.budgetTravel.costYear2 =
                $scope.budgetResearchStay.costYear2 > 0 ? 1500 : 0;

            $scope.budgetTravel.costYear3 =
                $scope.budgetResearchStay.costYear3 > 0 ? 1500 : 0;

            $scope.budgetTravel.totalCost =
                $scope.budgetTravel.costYear1 +
                $scope.budgetTravel.costYear2 +
                $scope.budgetTravel.costYear3;


            // Step 1: Calculate individual component totals
            $scope.budgetResearchStay.totalDays = ($scope.budgetResearchStay.daysYear1 || 0) + ($scope.budgetResearchStay.daysYear2 || 0) + ($scope.budgetResearchStay.daysYear3 || 0);
            $scope.budgetResearchStay.totalCost = ($scope.budgetResearchStay.costYear1 || 0) + ($scope.budgetResearchStay.costYear2 || 0) + ($scope.budgetResearchStay.costYear3 || 0);

            $scope.budgetTravel.totalCost = ($scope.budgetTravel.costYear1 || 0) + ($scope.budgetTravel.costYear2 || 0) + ($scope.budgetTravel.costYear3 || 0);

            $scope.budgetResearchStaff.totalYear1 = ($scope.budgetResearchStaff.positionsYear1 || 0) * ($scope.budgetResearchStaff.costYear1 || 0) * ($scope.budgetResearchStaff.hoursYear1 || 0);
            $scope.budgetResearchStaff.totalYear2 = ($scope.budgetResearchStaff.positionsYear2 || 0) * ($scope.budgetResearchStaff.costYear2 || 0) * ($scope.budgetResearchStaff.hoursYear2 || 0);
            $scope.budgetResearchStaff.totalYear3 = ($scope.budgetResearchStaff.positionsYear3 || 0) * ($scope.budgetResearchStaff.costYear3 || 0) * ($scope.budgetResearchStaff.hoursYear3 || 0);
            $scope.budgetResearchStaff.totalAmount = $scope.budgetResearchStaff.totalYear1 + $scope.budgetResearchStaff.totalYear2 + $scope.budgetResearchStaff.totalYear3;

            $scope.budgetConsumables.total = ($scope.budgetConsumables.year1 || 0) + ($scope.budgetConsumables.year2 || 0) + ($scope.budgetConsumables.year3 || 0);
            $scope.minorEquipment.total = ($scope.minorEquipment.year1 || 0) + ($scope.minorEquipment.year2 || 0) + ($scope.minorEquipment.year3 || 0);
            $scope.budgetContingency.total = ($scope.budgetContingency.year1 || 0) + ($scope.budgetContingency.year2 || 0) + ($scope.budgetContingency.year3 || 0);

            // Step 2: Calculate Research Stay + Travel totals
            $scope.researchStayTravelTotal.year1 = ($scope.budgetResearchStay.costYear1 || 0) + ($scope.budgetTravel.costYear1 || 0);
            $scope.researchStayTravelTotal.year2 = ($scope.budgetResearchStay.costYear2 || 0) + ($scope.budgetTravel.costYear2 || 0);
            $scope.researchStayTravelTotal.year3 = ($scope.budgetResearchStay.costYear3 || 0) + ($scope.budgetTravel.costYear3 || 0);
            $scope.researchStayTravelTotal.total = $scope.researchStayTravelTotal.year1 + $scope.researchStayTravelTotal.year2 + $scope.researchStayTravelTotal.year3;

            // Step 3: Calculate Total Research Amount (before overhead)
            $scope.totalResearchAmount.year1 = ($scope.researchStayTravelTotal.year1 || 0) + ($scope.budgetResearchStaff.totalYear1 || 0) + ($scope.budgetConsumables.year1 || 0) + ($scope.minorEquipment.year1 || 0) + ($scope.budgetContingency.year1 || 0);
            $scope.totalResearchAmount.year2 = ($scope.researchStayTravelTotal.year2 || 0) + ($scope.budgetResearchStaff.totalYear2 || 0) + ($scope.budgetConsumables.year2 || 0) + ($scope.minorEquipment.year2 || 0) + ($scope.budgetContingency.year2 || 0);
            $scope.totalResearchAmount.year3 = ($scope.researchStayTravelTotal.year3 || 0) + ($scope.budgetResearchStaff.totalYear3 || 0) + ($scope.budgetConsumables.year3 || 0) + ($scope.minorEquipment.year3 || 0) + ($scope.budgetContingency.year3 || 0);
            $scope.totalResearchAmount.total = $scope.totalResearchAmount.year1 + $scope.totalResearchAmount.year2 + $scope.totalResearchAmount.year3;

            // Preserve original Total Research Amount for overhead calculation
            $scope.originalResearchAmount.year1 = $scope.totalResearchAmount.year1;
            $scope.originalResearchAmount.year2 = $scope.totalResearchAmount.year2;
            $scope.originalResearchAmount.year3 = $scope.totalResearchAmount.year3;
            $scope.originalResearchAmount.total = $scope.totalResearchAmount.total;


            // Step 4: Calculate Overhead amounts based on Total Research Amount
            var baseYear1 = $scope.totalResearchAmount.year1 || 0;
            var baseYear2 = $scope.totalResearchAmount.year2 || 0;
            var baseYear3 = $scope.totalResearchAmount.year3 || 0;

            $scope.budgetOverhead.amountYear1 = Math.round((baseYear1 * ($scope.budgetOverhead.percentageYear1 || 0) / 100) * 100) / 100;
            $scope.budgetOverhead.amountYear2 = Math.round((baseYear2 * ($scope.budgetOverhead.percentageYear2 || 0) / 100) * 100) / 100;
            $scope.budgetOverhead.amountYear3 = Math.round((baseYear3 * ($scope.budgetOverhead.percentageYear3 || 0) / 100) * 100) / 100;
            $scope.budgetOverhead.totalAmount = $scope.budgetOverhead.amountYear1 + $scope.budgetOverhead.amountYear2 + $scope.budgetOverhead.amountYear3;

            // Step 5: Calculate Remaining Amount for Research Heads
            $scope.remainingForResearch.year1 = baseYear1 - $scope.budgetOverhead.amountYear1;
            $scope.remainingForResearch.year2 = baseYear2 - $scope.budgetOverhead.amountYear2;
            $scope.remainingForResearch.year3 = baseYear3 - $scope.budgetOverhead.amountYear3;
            $scope.remainingForResearch.total = $scope.remainingForResearch.year1 + $scope.remainingForResearch.year2 + $scope.remainingForResearch.year3;

            // Step 6: Calculate Grand Total (Total Research Amount + Overhead)
            $scope.grandTotal.year1 = ($scope.totalResearchAmount.year1 || 0) + ($scope.budgetOverhead.amountYear1 || 0);
            $scope.grandTotal.year2 = ($scope.totalResearchAmount.year2 || 0) + ($scope.budgetOverhead.amountYear2 || 0);
            $scope.grandTotal.year3 = ($scope.totalResearchAmount.year3 || 0) + ($scope.budgetOverhead.amountYear3 || 0);
            $scope.grandTotal.total = $scope.grandTotal.year1 + $scope.grandTotal.year2 + $scope.grandTotal.year3;

            // Step 7: Adjust Total Research Amount (Grand Total - Travel)
            $scope.totalResearchAmount.year1 =
                ($scope.grandTotal.year1 || 0) -
                ($scope.researchStayTravelTotal.year1 || 0);

            $scope.totalResearchAmount.year2 =
                ($scope.grandTotal.year2 || 0) -
                ($scope.researchStayTravelTotal.year2 || 0);

            $scope.totalResearchAmount.year3 =
                ($scope.grandTotal.year3 || 0) -
                ($scope.researchStayTravelTotal.year3 || 0);

            $scope.totalResearchAmount.total =
                $scope.totalResearchAmount.year1 +
                $scope.totalResearchAmount.year2 +
                $scope.totalResearchAmount.year3;

        } finally {
            $scope.isCalculating = false;
        }
    };

    // Individual calculation methods - they only update their own values and call recalculateAll
    $scope.calculateResearchStay = function () {
        $scope.recalculateAll();
    };

    $scope.calculateTravel = function () {
        $scope.recalculateAll();
    };

    $scope.calculateResearchStaff = function () {
        $scope.recalculateAll();
    };

    $scope.calculateTotals = function () {
        $scope.recalculateAll();
    };

    // ========== FETCH AND SAVE METHODS (Similar to ExpenseDeclaration.js) ==========
    // Get expense records from Apex using ApplicantPortal_Contoller
    $scope.getExpenseRecordsFromApex = function () {
        debugger;
        if (!$rootScope.proposalId || !$rootScope.contactId) {
            console.log('ProposalId or ContactId not available for expense records');
            return;
        }
        ApplicantPortal_Contoller.getExpenseRecords($rootScope.proposalId, $rootScope.contactId, function (result, event) {
            debugger;
            console.log("expense records result");
            console.log(result);
            if (event.status && result != null) {
                debugger;
                $scope.accList = result?.conList[0]?.Account;
                $scope.applicantProposalAsscocition = result.apa[0];
                $rootScope.apaId = $scope.applicantProposalAsscocition.Id;

                if ($rootScope.apaId) {
                    $scope.getExpenseHeadLineItemsFromApex();
                }

                $scope.$apply();
            }
        },
            { escape: true }
        )
    };

    // Get expense head line items and populate budget table
    $scope.getExpenseHeadLineItemsFromApex = function () {
        if (!$rootScope.apaId) {
            console.log('APA Id not available yet');
            return;
        }

        ApplicantPortal_Contoller.getExpenseHeadLineItems($rootScope.apaId, function (result, event) {
            console.log('getExpenseHeadLineItems result:', result);
            if (event.status && result != null && result.lineItems != null) {
                // Process line items and populate budget table variables
                for (let i = 0; i < result.lineItems.length; i++) {
                    let item = result.lineItems[i];
                    let expenseType = item.Expense_Type__c || '';

                    // Decode special characters
                    if (item.Description__c) {
                        item.Description__c = item.Description__c
                            .replace(/&amp;/g, '&')
                            .replace(/&#39;/g, '\'')
                            .replaceAll('&amp;amp;', '&')
                            .replaceAll('&lt;', '<')
                            .replaceAll('&gt;', '>')
                            .replaceAll('&quot;', '\'');
                    }

                    // Map expense types to budget table fields
                    if (expenseType === 'Research stay' || expenseType === 'Research Stay') {
                        // Assuming first item is days, second is cost
                        if (item.Description__c && item.Description__c.toLowerCase().includes('day')) {
                            $scope.budgetResearchStay.daysYear1 = item.Year1_Expense__c || 0;
                            $scope.budgetResearchStay.daysYear2 = item.Year2_Expense__c || 0;
                            $scope.budgetResearchStay.daysYear3 = item.Year3_Expense__c || 0;
                        } else {
                            $scope.budgetResearchStay.costYear1 = item.Year1_Expense__c || 0;
                            $scope.budgetResearchStay.costYear2 = item.Year2_Expense__c || 0;
                            $scope.budgetResearchStay.costYear3 = item.Year3_Expense__c || 0;
                        }
                    } else if (expenseType === 'Travel' || expenseType === 'Travel & Networking') {
                        $scope.budgetTravel.costYear1 = item.Year1_Expense__c || 0;
                        $scope.budgetTravel.costYear2 = item.Year2_Expense__c || 0;
                        $scope.budgetTravel.costYear3 = item.Year3_Expense__c || 0;
                    } else if (expenseType === 'Research staff' || expenseType === 'Manpower') {
                        if (item.Position__c) {
                            $scope.budgetResearchStaff.positionsYear1 = item.Number__c || 0;
                            $scope.budgetResearchStaff.positionsYear2 = item.Number__c || 0;
                            $scope.budgetResearchStaff.positionsYear3 = item.Number__c || 0;
                        }
                        if (item.Salary_Month__c) {
                            $scope.budgetResearchStaff.costYear1 = item.Salary_Month__c || 0;
                            $scope.budgetResearchStaff.costYear2 = item.Salary_Month__c || 0;
                            $scope.budgetResearchStaff.costYear3 = item.Salary_Month__c || 0;
                        }
                        if (item.Person_Month__c) {
                            $scope.budgetResearchStaff.hoursYear1 = item.Person_Month__c || 0;
                            $scope.budgetResearchStaff.hoursYear2 = item.Person_Month__c || 0;
                            $scope.budgetResearchStaff.hoursYear3 = item.Person_Month__c || 0;
                        }
                    } else if (expenseType === 'Consumables' || expenseType === 'Consumables/Materials') {
                        $scope.budgetConsumables.year1 = item.Year1_Expense__c || 0;
                        $scope.budgetConsumables.year2 = item.Year2_Expense__c || 0;
                        $scope.budgetConsumables.year3 = item.Year3_Expense__c || 0;
                    } else if (expenseType === 'Equipment' || expenseType === 'Equipment & Accessories' || expenseType === 'Minor equipment') {
                        $scope.minorEquipment.year1 = item.Year1_Expense__c || 0;
                        $scope.minorEquipment.year2 = item.Year2_Expense__c || 0;
                        $scope.minorEquipment.year3 = item.Year3_Expense__c || 0;
                    } else if (expenseType === 'Contingency') {
                        $scope.budgetContingency.year1 = item.Year1_Expense__c || 0;
                        $scope.budgetContingency.year2 = item.Year2_Expense__c || 0;
                        $scope.budgetContingency.year3 = item.Year3_Expense__c || 0;
                    } else if (expenseType === 'Overhead' || expenseType === 'Projektpauschale') {
                        // Overhead percentage might be stored differently
                        $scope.budgetOverhead.percentageYear1 = item.Year1_Expense__c || 0;
                        $scope.budgetOverhead.percentageYear2 = item.Year2_Expense__c || 0;
                        $scope.budgetOverhead.percentageYear3 = item.Year3_Expense__c || 0;
                    }
                }

                // Recalculate all totals after populating data
                $scope.recalculateAll();

                $scope.$apply();
            }
        }, { escape: true });
    };

    // Save expense details using ApplicantPortal_Contoller
    $scope.saveBudgetTableData = function () {
        debugger;

        // Prepare line items for saving
        var allExpenseLineItems = [];

        // Research Stay - days
        allExpenseLineItems.push({
            Index__c: 1,
            Description__c: 'Research Stay - No. of days',
            Year1_Expense__c: $scope.budgetResearchStay.daysYear1 || 0,
            Year2_Expense__c: $scope.budgetResearchStay.daysYear2 || 0,
            Year3_Expense__c: $scope.budgetResearchStay.daysYear3 || 0,
            Total_Expense__c: $scope.budgetResearchStay.totalDays || 0,
            Expense_Type__c: 'Research stay'
        });

        // Research Stay - cost
        allExpenseLineItems.push({
            Index__c: 2,
            Description__c: 'Research Stay Per diem cost',
            Year1_Expense__c: $scope.budgetResearchStay.costYear1 || 0,
            Year2_Expense__c: $scope.budgetResearchStay.costYear2 || 0,
            Year3_Expense__c: $scope.budgetResearchStay.costYear3 || 0,
            Total_Expense__c: $scope.budgetResearchStay.totalCost || 0,
            Expense_Type__c: 'Research stay'
        });

        // Travel
        allExpenseLineItems.push({
            Description__c: 'Travel cost per visit',
            Year1_Expense__c: $scope.budgetTravel.costYear1 || 0,
            Year2_Expense__c: $scope.budgetTravel.costYear2 || 0,
            Year3_Expense__c: $scope.budgetTravel.costYear3 || 0,
            Total_Expense__c: $scope.budgetTravel.totalCost || 0,
            Expense_Type__c: 'Travel'
        });

        // Research Staff
        allExpenseLineItems.push({
            Description__c: 'Research Staff',
            Number__c: $scope.budgetResearchStaff.positionsYear1 || 0,
            Salary_Month__c: $scope.budgetResearchStaff.costYear1 || 0,
            Person_Month__c: $scope.budgetResearchStaff.hoursYear1 || 0,
            Year1_Expense__c: $scope.budgetResearchStaff.totalYear1 || 0,
            Year2_Expense__c: $scope.budgetResearchStaff.totalYear2 || 0,
            Year3_Expense__c: $scope.budgetResearchStaff.totalYear3 || 0,
            Total_Expense__c: $scope.budgetResearchStaff.totalAmount || 0,
            Expense_Type__c: 'Research staff'
        });

        // Consumables
        allExpenseLineItems.push({
            Description__c: 'Consumables',
            Year1_Expense__c: $scope.budgetConsumables.year1 || 0,
            Year2_Expense__c: $scope.budgetConsumables.year2 || 0,
            Year3_Expense__c: $scope.budgetConsumables.year3 || 0,
            Total_Expense__c: $scope.budgetConsumables.total || 0,
            Expense_Type__c: 'Consumables'
        });

        // Minor Equipment
        allExpenseLineItems.push({
            Description__c: 'Minor equipment',
            Year1_Expense__c: $scope.minorEquipment.year1 || 0,
            Year2_Expense__c: $scope.minorEquipment.year2 || 0,
            Year3_Expense__c: $scope.minorEquipment.year3 || 0,
            Total_Expense__c: $scope.minorEquipment.total || 0,
            Expense_Type__c: 'Minor equipment'
        });

        // Contingency
        allExpenseLineItems.push({
            Description__c: 'Contingency and Miscellaneous',
            Year1_Expense__c: $scope.budgetContingency.year1 || 0,
            Year2_Expense__c: $scope.budgetContingency.year2 || 0,
            Year3_Expense__c: $scope.budgetContingency.year3 || 0,
            Total_Expense__c: $scope.budgetContingency.total || 0,
            Expense_Type__c: 'Contingency'
        });

        // Overhead
        allExpenseLineItems.push({
            Description__c: 'Overheads Percentage',
            Year1_Expense__c: $scope.budgetOverhead.percentageYear1 || 0,
            Year2_Expense__c: $scope.budgetOverhead.percentageYear2 || 0,
            Year3_Expense__c: $scope.budgetOverhead.percentageYear3 || 0,
            Total_Expense__c: $scope.budgetOverhead.totalAmount || 0,
            Expense_Type__c: 'Overhead'
        });

        // Prepare APA update object
        var updatedApa = {
            'Id': $rootScope.apaId
        };

        // Save using ApplicantPortal_Contoller
        ApplicantPortal_Contoller.createExpenseWithHeadAndLineItemsForWiser(
            allExpenseLineItems, $rootScope.apaId, updatedApa,
            function (result, event) {
                if (event.status && result != null) {
                    debugger;
                    if (result.startsWith && result.startsWith('error')) {
                        swal("Error", "Error saving budget details: " + result, "error");
                        return;
                    }

                    swal("Success", "Budget details have been saved successfully.", "success");
                    $scope.redirectPageURL('ExistingGrantWISER');
                    $scope.$apply();
                }
            },
            { escape: true }
        );
    };

    // Initialize: Try to get expense records using ApplicantPortal_Contoller if available
    // This will be called after getAccounts() sets up proposalId and contactId
    // We'll call it from getAccounts() callback if needed

})
var workingDaysValues = [];
var siteURL;
var candidateId;
var gender;
var country;
var nationality;
var available_followship;
var associated_with_igstc;
var profilePicURL;
var isCoordinator;
var partnerSubmission;

var app = angular.module('cp_app');
debugger;
var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';    // ======================>
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    var rp = $routeProvider;

    for (var i = 0; i < tabValues.length; i++) {
        var pageName = '/' + tabValues[i].Name;

        if (tabValues[i].Apex_class_Name__c != undefined) {
            rp.when(pageName, {

                templateUrl: sitePrefix + pageName,
                controller: tabValues[i].Apex_class_Name__c
            });
        } else {
            rp.when(pageName, {
                templateUrl: sitePrefix + pageName,
            })
        }

    }
});
app.filter('specialChar', function () {
    return function (input) {
        return input ? input.replace(/&amp;/g, '&').replace(/&#39;/g, '\'').replaceAll('&amp;amp;', '&').replaceAll('&amp;gt;', '>').replaceAll('&lt;', '<').replaceAll('lt;', '<').replaceAll('&gt;', '>').replaceAll('gt;', '>').replaceAll('&amp;', '&').replaceAll('amp;', '&').replaceAll('&quot;', '\'') : input;
    }
});

function wysiwygeditor($scope) {
    $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;
};

app.controller('cp_dashboard_ctrl', function ($scope, $rootScope, $timeout, $window, $location, $element) {
    $scope.config = {};
    debugger;
    $scope.isLoading = false;
    $scope.$on('$locationChangeSuccess', function () {
        $scope.$evalAsync(function () {
            $rootScope.isRoutedView = $location.path() !== '' && $location.path() !== '/';
        });
    });
    $scope.load = function () {
        const hashCode = localStorage.getItem('hashCode');
        if (hashCode == null || hashCode == '') {
            window.location.href = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';
            history.pushState(null, null, window.location.href);
        }
    };
    $scope.load();
    $scope.selectedMenu = 'Programs';

    $scope.config.toolbarGroups = [
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
    ];
    $scope.configg = {
        options: "",
        trackBy: 'Id',
        displayBy: ['Name'],
        multiSelect: true,
        preSelectItem: true,
        preSelectAll: false
    };
    $scope.allPrograms = [];
    $scope.appliedPrograms = [];
    $scope.config.removeButtons = 'BGColor,Anchor,Subscript,Superscript,Paste,Copy,Cut,Undo,Redo';
    $rootScope.countrytype = countrytype;
    $rootScope.campaignId;
    $rootScope.countryCode = countryCode;
    $rootScope.availingFellowship = availingFellowship;
    $rootScope.pairedApplicant = pairedApplicant;
    $rootScope.participantType = participantType;
    $rootScope.bankType = bankType;
    $rootScope.participatingWorkshop = participatingWorkshop;
    $rootScope.presentingWorkshop = presentingWorkshop;
    $rootScope.candidateId = candidateId;
    $rootScope.campaigntype = campaigntype;
    $rootScope.siteURL = siteURL;
    $rootScope.profilePicURL = profilePicURL;
    $rootScope.thematicAreaList = thematicAreaList;
    $rootScope.gender = gender;

    $rootScope.proposalId = '';
    $rootScope.currencyPickList = currencyPickList;
    //  $rootScope.accList = accList;
    $rootScope.country = country;
    $rootScope.nationality = nationality;
    $rootScope.available_followship = available_followship;
    $rootScope.associated_with_igstc = associated_with_igstc;
    $rootScope.applicantName = applicantName;
    $rootScope.applicantEmail = applicantEmail;
    $rootScope.isPrimaryContact = isPrimaryContact;
    $rootScope.accountId = accountId;
    $rootScope.natureOfThesisWork = natureOfThesisWork;
    $rootScope.natureOfPhDWork = natureOfPhDWork;
    $rootScope.percentCGPA = percentCGPA;
    $rootScope.states = states;
    $rootScope.signDate = signDate;
    $rootScope.secondStage = false;

    $scope.applicantAssociationListData;
    $scope.contactName;

    $scope.proposalWrapperList = proposalWrapperList
        .replace(/^\[|\]$/g, '')
        .split(/proposalWrap:/)
        .filter(s => s.trim())
        .map(item => {
            const obj = {};
            item
                .replace(/^\[|\]$/g, '')
                .split(',')
                .forEach(pair => {
                    const [key, value] = pair.split('=').map(v => v.trim());
                    if (key) obj[key] = (value === 'null') ? null : value;
                });
            return obj;
        });

    // if(secondstage == "1st Stage"){
    //     $rootScope.secondStage = false;
    // }else{
    //     $rootScope.secondStage = true;
    // }
    // if(secondstage == '' || secondstage == undefined){
    //     $rootScope.secondStage = false;
    // }

    $rootScope.contactId = contactId;
    $rootScope.projectId = '';
    $rootScope.campaignName = '';
    $rootScope.isCoordinator = isCoordinator;
    $rootScope.partnerSubmission = partnerSubmission;
    $rootScope.secondstage = false;
    $rootScope.emailVerified;
    $rootScope.proposalStage = false;
    // if(secondstage == "2nd Stage"){
    //     $rootScope.secondstage = true;
    // }else{
    //     $rootScope.secondstage = false;
    // }

    //added by Aman 4th September
    // Desc: to account for Per partner submission.
    // if(proposalStage != "Draft" || (proposalStage == "Draft" && partnerSubmission == "true")){
    //     // if(proposalStage != "Draft"){
    //     $rootScope.proposalStage = true;
    //     CKEDITOR.config.readOnly = true;
    // }else{
    //     $rootScope.proposalStage = false;
    // }
    // if(proposalStage==undefined || proposalStage==''){
    //     $rootScope.proposalStage = false;
    //     CKEDITOR.config.readOnly = false;
    // }
    //  CKEDITOR.replace( 'Resolution', {
    //     height: 800
    // } );
    //  $scope.checkCampaign = function(){
    //     debugger;
    //     if($rootScope.campaigntype.toUpperCase() != $scope.programmeHeaderName){
    //         swal(
    //             '',
    //             'incorrect',
    //             'error'
    //         );
    //         if($rootScope.campaigntype == "pecfar"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Pecfar';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         if($rootScope.campaigntype == "wiser"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=LANDING_PAGE_WISER';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         if($rootScope.campaigntype == "if"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Industrial_Fellowship';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         if($rootScope.campaigntype == "sing"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=LANDING_PAGE_SING';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         if($rootScope.campaigntype == "workshop"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Workshop';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         if($rootScope.campaigntype == "2plus2"){
    //             var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Two_Plus_Two';
    //             setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //         }
    //         return;
    //     }else{
    //     }
    // }
    // $scope.checkCampaign();

    CKEDITOR.addCss('border:solid 1px red !important;');
    // $scope.redirect = function(){
    //     debugger;
    //     if($scope.res == "workshop"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Workshop';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);

    //     }else if($scope.res == "pecfar"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Pecfar';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);

    //     }else if($scope.res == "if"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Industrial_Fellowship';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);

    //     }
    //     else if($scope.res == "sing"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=LANDING_PAGE_SING';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);

    //     }
    //     else if($scope.res == "wiser"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=LANDING_PAGE_WISER';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);

    //     }
    //     else if($scope.res == "2plus2"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_Two_Plus_Two';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //     }
    //     else if($scope.res == "connect"){
    //         var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard?campaign=Landing_Page_CONNECT_PLUS';
    //         setTimeout(function() {window.location.replace(window.location.origin + sitePrefix )}, 5000);
    //     }

    //         var sitePrefix; 
    //         // switch($rootScope.CampainURL.toUpperCase()){
    //         //         case 'if':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=Landing_Page_Industrial_Fellowship';
    //         //             break;
    //         //         case 'pecfar':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=Landing_Page_Pecfar';
    //         //             break;
    //         //         case 'workshop':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=Landing_Page_Workshop';
    //         //             break;
    //         //         case '2plus2':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=Landing_Page_Two_Plus_Two';
    //         //             break;
    //         //         case 'wiser':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=LANDING_PAGE_WISER';
    //         //             break;
    //         //         case 'sing':
    //         //             sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=LANDING_PAGE_SING';
    //         //             break;
    //         //             // default:
    //         //             //     sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/?campaign=Landing_Page_Industrial_Fellowship';
    //         //             //     break;
    //         // }  
    //         // window.location.replace(window.location.origin +sitePrefix);
    // }
    // $scope.LogoutApplicant=function(){        
    //     ApplicantPortal_Contoller.LogoutApplicant($rootScope.candidateId, function (result, event) {
    //         debugger
    //         console.log(result);
    //         console.log(event);
    //         if(event.status){
    //             $rootScope.applicantEmail='';
    //             $rootScope.applicantName='';
    //             $rootScope.campaignId = '';
    //             $scope.res=result;
    //             $scope.redirect();
    //             $scope.$apply();
    //         }
    //     });   
    // }

    $scope.getContactName = function () {
        debugger;

        $scope.isLoading = true;
        ApplicantPortal_Contoller.getContactName($scope.candidateId, function (result, event) {
            if (event.status && result != null) {
                $rootScope.contactName = result;
            }
        });
    }
    $scope.getContactName();

    $scope.getApplicantData = function () {
        $scope.isLoading = true;
        ApplicantPortal_Contoller.getApplicantData($scope.candidateId, function (result, event) {
            debugger;
            if (event.status && result != null) {
                debugger;
                console.log('campaign::=>');
                console.log(result);
                $scope.allCamapigns = result.campaignList;
                $scope.appliedCampaigns = result.appliedCampaign;

                $scope.appliedPrograms = $scope.appliedCampaigns ? $scope.appliedCampaigns.map(item => {
                    return {
                        name: item?.Proposals__r?.Campaign__r?.Name ?? "",
                        desc: item?.Proposals__r?.Campaign__r?.Description ?? "",
                        deadline: item.Proposals__r?.Campaign__r?.Actual_End_Date__c ? new Date(item.Proposals__r?.Campaign__r?.Actual_End_Date__c).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }) : 'Not mentioned',
                        icon: item.Proposals__r?.Campaign__r?.Icon__c ?? "",
                        redirectUrl: item?.Proposals__r?.Campaign__r?.RedirectPage__c ?? "",
                        campaignId: item?.Proposals__r?.Campaign__r?.Id ?? "",
                        proposalId: item?.Proposals__c ?? "",
                        category: 'applied'
                    }
                }) : [];
                if (!$scope.appliedPrograms || !$scope.appliedPrograms.length) {
                    // If no applied programs → keep all campaigns
                    $scope.allPrograms = $scope.allCamapigns.map(item => ({
                        name: item.Name,
                        desc: item.Description,
                        deadline: item.Actual_End_Date__c
                            ? new Date(item.Actual_End_Date__c).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })
                            : 'Not mentioned',
                        icon: item.Icon__c,
                        redirectUrl: item.RedirectPage__c,
                        campaignId: item.Id,
                        proposalId: '',
                        category: 'not applied'
                    }));
                } else {
                    // Build a Set of applied program names
                    const appliedNames = new Set(
                        $scope.appliedPrograms
                            .filter(a => a && a.name) // safety filter
                            .map(a => a.name)
                    );

                    // Exclude already applied campaigns
                    $scope.allPrograms = $scope.allCamapigns
                        .filter(item => !appliedNames.has(item.Name)) // not equal condition
                        .map(item => ({
                            name: item.Name,
                            desc: item.Description,
                            deadline: item.Actual_End_Date__c
                                ? new Date(item.Actual_End_Date__c).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })
                                : 'Not mentioned',
                            icon: item.Icon__c,
                            redirectUrl: item.RedirectPage__c,
                            campaignId: item.Id,
                            category: 'not applied'
                        }));
                }
                $scope.isLoading = false;
                $scope.$apply();
            }
        },
            { escape: true }
        );
    }
    $scope.getApplicantData();
    $scope.redirectToForm = function (val) {
        debugger;
        if (val.category == 'applied' && (val.proposalId != undefined || val.proposalId != '')) {
            const proposalData = $scope.proposalWrapperList.find(item => item.Id == val.proposalId);
            $rootScope.proposalId = proposalData.Id;
            if (proposalData.stage == "1st Stage") {
                $rootScope.secondStage = false;
            } else {
                $rootScope.secondStage = true;
            }
            if (proposalData.stage == '' || proposalData.stage == undefined) {
                $rootScope.secondStage = false;
            }
            if (proposalData.proposalStage != "Draft" || (proposalData.proposalStage == "Draft" && partnerSubmission == "true")) {
                // if(proposalStage != "Draft"){
                $rootScope.proposalStage = true;
                CKEDITOR.config.readOnly = true;
            } else {
                $rootScope.proposalStage = false;
            }
            if (proposalData.proposalStage == undefined || proposalData.proposalStage == '') {
                $rootScope.proposalStage = false;
                CKEDITOR.config.readOnly = false;
            }
        } else {
            $rootScope.secondStage = false;
        }
        $rootScope.campaignId = val.campaignId;
        $location.path('/' + val.redirectUrl);
    }

    $scope.showSection = function (menu) {
        $scope.selectedMenu = menu;
    };

    $scope.logout = function () {
        // Redirect to login page after logout
        debugger;
        /*
        $scope.isLoading = true;
        ApplicantPortal_Contoller.LogoutApplicant($rootScope.candidateId,function(result,event){
            debugger;
            if(event.status && result == 'Success'){
                localStorage.setItem('hashCode','');
                window.location.href = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';
                history.pushState(null, null, window.location.href);
                // history.back();
                $scope.isLoading = false;
            }else if(result == 'Error'){
                window.location.href = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';
                history.pushState(null, null, window.location.href);
                // history.back();
                $scope.isLoading = false;
            }else{
                alert('Error logging Out !');
                console.log('Error ---> '+event.message);
                $scope.isLoading = false;
            }
            $scope.$apply();
        });
    };
   */
        $scope.isLoading = true;
        ApplicantPortal_Contoller.LogoutApplicant($rootScope.candidateId, function (result, event) {
            debugger;
            if (event.status && result === 'Success') {
                localStorage.setItem('hashCode', '');
                window.location.href = 'https://indo-germansciencetechnologycentre--newdevutil.sandbox.my.salesforce-sites.com/ApplicantDashboard/';
                $scope.isLoading = false;
            } else if (result === 'Error') {
                window.location.href = 'https://indo-germansciencetechnologycentre--newdevutil.sandbox.my.salesforce-sites.com/ApplicantDashboard/';
                $scope.isLoading = false;
            } else {
                alert('Error logging Out!');
                console.log('Error ---> ' + event.message);
                $scope.isLoading = false;
            }
            $scope.$apply();
        });
    };


});




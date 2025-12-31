global without sharing  class DynamicCongaTempGeneration {
    global Static void GenerateCongaTemplatesUsingCS(String recordID, String TempName){
<<<<<<< HEAD
        system.debug('TempName----------' +TempName);
        system.debug('recordID----------' +recordID);
=======
>>>>>>> company/saurabh
        TemplateURLByName__c TempInfoRec=[select id,name,Object_Name__c,Formula_Field_Name__c from TemplateURLByName__c where Name =:TempName];
        String query='';
        String CongaQuery = '';
        String objectList = TempInfoRec.Object_Name__c;
<<<<<<< HEAD
        String fieldName =TempInfoRec.Formula_Field_Name__c+', Id,Name,Stage__c ,RecordTypeId,yearly_Call__r.year__c,RecordType.Name';
=======
        String fieldName =TempInfoRec.Formula_Field_Name__c+', Id,Name,Stage__c ,RecordTypeId,yearly_Call__r.year__c,RecordType.Name,(Select Id, Firstname , Account.BillingCountry ,Lastname from contacts__r)';
>>>>>>> company/saurabh
        String condition='id=:recordID';
        query = 'SELECT '+ fieldName +' FROM ' + objectList + ' WHERE ' + condition;
        // query = 'SELECT '+ fieldName +' FROM ' + objectList;
        System.debug('query is '+ query );
        List<Application_Proposal__c> queryData = Database.query(query);
        system.debug('queryData--'+queryData);
        
        //-------------------------------------------------------------------------
<<<<<<< HEAD
        // Validate TemplateURLByName__c record exists
        if(TempInfoRec == null){
            system.debug('TemplateURLByName__c record not found for template: ' + TempName);
            return;
        }
        
        // Validate Application_Proposal__c record exists
        if(queryData == null || queryData.isEmpty()){
            system.debug('Application_Proposal__c record not found for ID: ' + recordID);
            return;
        }
        
=======
>>>>>>> company/saurabh
        Application_Proposal__c propRec = new Application_Proposal__c();
        propRec = queryData[0];
        system.debug('PropRecord ' + propRec);
        system.debug('TemaplateInfo ' + TempInfoRec.Formula_Field_Name__c);
<<<<<<< HEAD
        
        // Query contacts via Applicant_Proposal_Association__c junction object
        List<Contact> contactList = [
            SELECT Id, Firstname, Account.BillingCountry, Lastname 
            FROM Contact 
            WHERE Id IN (
                SELECT Contact__c 
                FROM Applicant_Proposal_Association__c 
                WHERE Proposals__c = :recordID
            )
        ];
        
        if(contactList.isEmpty()){
            system.debug('No contacts found through Applicant_Proposal_Association__c for proposal: ' + recordID);
            return;
        }
        
        map<Id,List<Contact>> contactsByPropID = new map<Id,List<Contact>>();
        contactsByPropID.put(propRec.Id, contactList);
        //-------------------------------------------------------------------------- 
        
        String exCategoriesCustomLable  = Label.docCategoriesToBeExcluded;
=======
        map<Id,List<Contact>> contactsByPropID = new map<Id,List<Contact>>();
        List<Contact> conLIst = new List<Contact>();
        conLIst.addAll(propRec.contacts__r);
        contactsByPropID.put(propRec.Id ,conLIst);
        //-------------------------------------------------------------------------- 
        
        String exCategoriesCustomLable  = Label.docCategoriesToBeExcluded;
        // String tempName = '';
>>>>>>> company/saurabh
        List<String> docCategoriesToBeExcluded =  exCategoriesCustomLable.split(',');
        SYSTEM.debug('docCategoriesToBeExcluded---'+docCategoriesToBeExcluded);
        system.debug('contactsByPropID'+contactsByPropID);
        String proposalRecordID='';
        List<String> UserDocumentIds = new List<String>();
        
        //List<User_Document__c> UserDocList = [Select Id,Name from User_Document__c where Proposal_Id__c = :recordId AND Name NOT IN :docCategoriesToBeExcluded];
        List<User_Document__c> UserDocList = [Select Id,Name from User_Document__c where (Proposal_Id__c = :recordId OR Proposals__c = : recordId) AND Name NOT IN :docCategoriesToBeExcluded];
        for(User_Document__c ud : UserDocList){
            UserDocumentIds.add(ud.Id);
        }
        /*if(propRec.RecordType.Name == 'Two Plus Two'){
            List<Proposal_Document__c> proposalDocList = [Select Id,Name from Proposal_Document__c where Proposals__c = :recordId AND Name ='Project Details'];
            for(Proposal_Document__c pd : proposalDocList){
                UserDocumentIds.add(pd.Id);
            }            
        }*/
        system.debug('UserDocumentIds'+UserDocumentIds);
        
        String attIds = ''; 
        for(String usd : UserDocumentIds){
            List<Attachment> attList = [Select id , name from Attachment where parentId = :usd order by CreatedDate  Desc Limit 1];
            if(attList.size() > 0){
                String attid = attList[0].Id; 
                attIds = attIds + attid  + ',';
            }
            
        }
        attIds = attIds.removeEnd(',');
        system.debug('Attachment Ids Are ' + attIds); 
<<<<<<< HEAD
        system.debug('contactsByPropID.get(propRec.Id)'+contactsByPropID.get(propRec.Id));
        
        // Get current contacts list for this proposal
        List<Contact> currentContacts = contactsByPropID.get(propRec.Id);
        if(currentContacts == null || currentContacts.isEmpty()){
            system.debug('No contacts found in contactsByPropID for proposal: ' + propRec.Id);
            return;
        }
        
        String templateFileName = '';
        
        if(propRec.RecordType.Name == 'Industrial Fellowship'){
            proposalRecordID=propRec.id;
            if(TempName == 'IF Award Letter PIEF'){
                templateFileName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_AwardLetter_PIEF';
            }else if(TempName == 'IF Award Letter PDIF'){
                templateFileName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_AwardLetter_PDIF';
            }else if(TempName == 'IF Decision Letter'){
                templateFileName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_IF_Decision_Letter';
            }else if(TempName == 'IF DECISOIN PIEF'){
                templateFileName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_IF_Decision_Letter_PIEF';
            }
            else {
                templateFileName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName;
=======
        system.debug('contactsByPropID.get(propRec.Id)[0]'+contactsByPropID.get(propRec.Id));
        if(propRec.RecordType.Name == 'Industrial Fellowship'){
            proposalRecordID=propRec.id;
            if(TempName == 'IF Award Letter PIEF'){
                tempName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_AwardLetter_PIEF';
            }else if(TempName == 'IF Award Letter PDIF'){
                tempName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_AwardLetter_PDIF';
            }else if(TempName == 'IF Decision Letter'){
                tempName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_IF_Decision_Letter';
            }else if(TempName == 'IF DECISOIN PIEF'){
                tempName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_IF_Decision_Letter_PIEF';
            }
            else {
                tempName = propRec.Name+'_IF_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName;
>>>>>>> company/saurabh
            }
            
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('IF CONGA'+CongaQuery);
        }else if(propRec.RecordType.Name == 'PECFAR'){
            proposalRecordID=propRec.id;
<<<<<<< HEAD
            // Validate PECFAR requires at least 2 contacts
            if(currentContacts.size() < 2){
                system.debug('PECFAR requires at least 2 contacts, but only ' + currentContacts.size() + ' found for proposal: ' + propRec.Id);
                return;
            }
            //german and indian logic included
            if(currentContacts[0].Account != null && currentContacts[0].Account.BillingCountry == 'India'){
                system.debug('propRec------'+currentContacts[0].Account.BillingCountry);
                if(TempName =='Pecfar Decision letter'){
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[1].Firstname + '_Pecfar_Decision_letter';
                }else if(TempName =='Pecfar Award less then two'){
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[1].Firstname + '_Pecfar_award_less_than_two';
                }else{
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[1].Firstname;
=======
            //german and indian logic included
            if(contactsByPropID.get(propRec.Id)[0].Account.BillingCountry == 'India'){
                system.debug('propRec------'+contactsByPropID.get(propRec.Id)[0].Account.BillingCountry);
                if(TempName =='Pecfar Decision letter'){
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[1].Firstname + '_Pecfar_Decision_letter';
                }else if(TempName =='Pecfar Award less then two'){
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[1].Firstname + '_Pecfar_award_less_than_two';
                }else{
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[1].Firstname;
>>>>>>> company/saurabh
                }
            }
            else{
                if(TempName =='Pecfar Decision letter'){
<<<<<<< HEAD
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[1].Firstname +'_'+currentContacts[0].Firstname + '_Pecfar_Decision_letter';
                }else if(TempName =='Pecfar Award less then two'){
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[1].Firstname + '_Pecfar_award_less_than_two';
                }else {
                    templateFileName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[1].Firstname +'_'+currentContacts[0].Firstname ;
=======
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[1].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].Firstname + '_Pecfar_Decision_letter';
                }else if(TempName =='Pecfar Award less then two'){
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[1].Firstname + '_Pecfar_award_less_than_two';
                }else {
                    tempName = propRec.Name+'_PECFAR_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[1].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].Firstname ;
>>>>>>> company/saurabh
                    
                }
            }
            
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            system.debug('');
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
<<<<<<< HEAD
            system.debug('PECFAR CONGA'+CongaQuery); 
=======
            system.debug('PECFAR CONGA'+CongaQuery);
>>>>>>> company/saurabh
            
        }else if(propRec.RecordType.Name == 'WISER'){
            proposalRecordID=propRec.id;
            if(TempName == 'Wiser Draft Letter'){
<<<<<<< HEAD
                templateFileName = propRec.Name+'_WISER_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_WISER_Award_Letter';
            }else{
                templateFileName = propRec.Name+'_WISER_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName;
=======
                tempName = propRec.Name+'_WISER_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_WISER_Award_Letter';
            }else{
                tempName = propRec.Name+'_WISER_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName;
>>>>>>> company/saurabh
            }
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('Wiser_Conga_Url__c CONGA'+CongaQuery);
        }else if(propRec.RecordType.Name == 'SING'){
            proposalRecordID=propRec.id;
            if(TempName == 'Sing Award Letter'){
<<<<<<< HEAD
                templateFileName = propRec.Name+'_SING_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_SING_Award_Letter';
            }
            else{
                templateFileName = propRec.Name+'_SING_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName;
=======
                tempName = propRec.Name+'_SING_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_SING_Award_Letter';
            }
            else{
                tempName = propRec.Name+'_SING_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName;
>>>>>>> company/saurabh
            }
            system.debug('Attachment Ids Are ' + attIds); 
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('SING CONGA'+CongaQuery);
        }else if(propRec.RecordType.Name == 'Workshop'){
            proposalRecordID=propRec.id;
            if(TempName == 'workshop indian sanction'){
<<<<<<< HEAD
                templateFileName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_workshopIndian_sanction';
            }
            else if(TempName == 'workshop german sanction'){
                templateFileName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName + '_workshopGerman_sanction';
            }
            else{
                templateFileName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+currentContacts[0].Firstname +'_'+currentContacts[0].LastName;
=======
                tempName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_workshopIndian_sanction';
            }
            else if(TempName == 'workshop german sanction'){
                tempName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName + '_workshopGerman_sanction';
            }
            else{
                tempName = propRec.Name+'_WORKSHOP_'+propRec.yearly_Call__r.year__c+'_'+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName;
>>>>>>> company/saurabh
            }
            system.debug('Attachment Ids Are ' + attIds); 
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('WORKSHOP CONGA'+CongaQuery);
        }else if(propRec.RecordType.Name == 'Two Plus Two'){
            Application_Proposal__c proposalRec;
            proposalRecordID=propRec.id;
            string DynamcName =TempInfoRec.Formula_Field_Name__c+'_';
            if(TempName == 'TWO PLUS TWO APP PORTAL' && propRec.Stage__c == '2nd Stage' ){
                proposalRec = [SELECT Stage__c, TWO_PLUS_TWO_Query_1__c FROM Application_Proposal__c WHERE ID=:recordID LIMIT 1];
            }else{
                proposalRec=null;
            }
<<<<<<< HEAD
			//templateFileName = DynamcName+propRec.Name+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName+propRec.Stage__c;
			templateFileName = 'Application_IGSTC_2+2_Call_'+propRec.yearly_Call__r.year__c+'_'+propRec.Name;
=======
			//tempName = DynamcName+propRec.Name+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName+propRec.Stage__c;
			tempName = 'Application_IGSTC_2+2_Call_'+propRec.yearly_Call__r.year__c+'_'+propRec.Name;
>>>>>>> company/saurabh
            system.debug('Attachment Ids Are ' + attIds);
            CongaQuery = proposalRec!=null & propRec.Stage__c =='2nd Stage' ? (String)propRec.get(TempInfoRec.Formula_Field_Name__c)+proposalRec.TWO_PLUS_TWO_Query_1__c : (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('Two Plus Two CONGA'+CongaQuery);
        }
        else{
            //added by Shiva !!!!!
            proposalRecordID=propRec.id;
            string DynamcName =TempInfoRec.Formula_Field_Name__c+'_';
<<<<<<< HEAD
            templateFileName = DynamcName+propRec.Name+currentContacts[0].Firstname +'_'+currentContacts[0].LastName;
=======
            tempName = DynamcName+propRec.Name+contactsByPropID.get(propRec.Id)[0].Firstname +'_'+contactsByPropID.get(propRec.Id)[0].LastName;
>>>>>>> company/saurabh
            system.debug('Attachment Ids Are ' + attIds);
            CongaQuery = (String)propRec.get(TempInfoRec.Formula_Field_Name__c);
            CongaQuery = CongaQuery.replace('AttachmentId=00P1y000003a34i','AttachmentId='+attIds );
            system.debug('SING CONGA'+CongaQuery);
        }
<<<<<<< HEAD
        system.debug('templateFileName-----'+templateFileName);
        system.debug('proposalRecordID-----'+proposalRecordID);
        generateCongaTemplate(CongaQuery,templateFileName,proposalRecordID);	
=======
        system.debug('tempName-----'+tempName);
        system.debug('proposalRecordID-----'+proposalRecordID);
        generateCongaTemplate(CongaQuery,tempName,proposalRecordID);	
>>>>>>> company/saurabh
    }
    
    //This is asynchronous method which will be used to generate template for the proided URL.
    @future (callout=true)
    Public static void generateCongaTemplate(String var,String TemplateName,String propoID){
        system.debug('var ::'+var);
        String TemplateId = CongaHelperToolLightning.generateReport(var,TemplateName,null,null,null);
        Application_Proposal__c propRecord=[select id,name,Submitted__c,Document_generated__c from Application_Proposal__c where id=:propoID];
        propRecord.Document_generated__c=true;
        update propRecord;
        system.debug('TemplateId'+TemplateId);
    }
}
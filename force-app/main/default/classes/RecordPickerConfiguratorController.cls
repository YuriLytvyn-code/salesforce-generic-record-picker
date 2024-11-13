public with sharing class RecordPickerConfiguratorController {
    @AuraEnabled
    public static String getSObjectTypes() {
        try {
            Set<String> sobjApiNames = new Set<String>();

            for (Schema.SObjectType o : Schema.getGlobalDescribe().values()) {
                Schema.DescribeSObjectResult objResult = o.getDescribe();
                sobjApiNames.add(objResult.getName());
            }

            return JSON.serialize(sobjApiNames);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String getFieldApiNames(String sObjectType) {
        try {
            SObjectType accountType = Schema.getGlobalDescribe()
                .get(sObjectType);
            Map<String, Schema.SObjectField> mfields = accountType.getDescribe()
                .fields.getMap();

            Set<String> fieldApiNames = new Set<String>();

            for (Schema.SObjectField field : mfields.values()) {
                fieldApiNames.add(field.getDescribe().getName());
            }

            return JSON.serialize(fieldApiNames);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

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
}

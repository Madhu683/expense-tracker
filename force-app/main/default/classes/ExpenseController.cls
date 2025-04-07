public with sharing class ExpenseController {
    @AuraEnabled(cahnceable=true)
    public static List<Expense__c> getExpenses(){
        return [SELECT Name,Amount__c,Category__c,Expense_Date__c FROM Expense__c ORDER BY Expense_Date__c DESC];

    }

    @AuraEnabled
    public static void addExpense(Expense__c expense){
        insert expense;
    }

    @AuraEnabled 
    public static void deleteExpense(Id expenseId){
    Expense__c exp = [SELECT Id FROM Expense__c WHERE Id = :expenseId LIMIT 1];
    delete exp;
    }
}
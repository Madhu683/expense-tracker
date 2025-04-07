import { LightningElement, track,wire } from 'lwc';
import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';
import addExpense from '@salesforce/apex/ExpenseController.addExpense';

export default class ExpenseTracker extends LightningElement {
    @track name;
    @track amount;
    @track category;
    @track date;
    @track expenses;
    categoryOptions =[
        { label: 'Food', value: 'Food' },
        { label: 'Travel', value: 'Travel' },
        { lable: 'Rent', value: 'Rent' },
        { label:'Shopping', value: 'Shopping' },
        { label: 'Other', value: 'Other' }];

columns = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Amount', fieldName: 'Amount__c', type: 'currency'},
    {label: 'Category', fieldName: 'Category__c'},
    {label: 'Date', fieldName: 'Expense_Date__c', type: 'date'}
];

connectedCallback(){
    this.loadExpenses();
}

loadExpenses(){
    getExpenses().then(result => {
        this.expenses = result;
    });
}

handleNameChange(e){this.name = e.target.value;}
handleAmountChange(e){this.amount = parseFloat(e.target.value);}
handleCategoryChange(e){this.category =e.detail.value;}
handleDateChange(e){this.date = e.target.value;}


handleAddExpense(){
    let record = {
        Name:this.name,
        Amount__c:this.amount,
        Category__c:this.category,
        Expense_Date__c:this.date
    };

addExpense({expense:record}).then(()=>{
    this.loadExpenses();
    this.name = '';
    this.amount = '';
    this.category = '';
    this.date = '';
});
}

}
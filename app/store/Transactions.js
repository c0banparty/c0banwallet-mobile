/*
 * Transactions.js - Store
 */
Ext.define('C0banparty.wallet.store.Transactions', {
    extend: 'Ext.data.Store',
    requires:['Ext.data.proxy.LocalStorage'],

    config: {
        model: 'C0banparty.wallet.model.Transactions',
        autoLoad: true,
        autoSync: true
        // Set this proxy to store data in localStorage
        // proxy: {
        //     type: 'localstorage',
        //     id: 'Transactions'
        // },
    }
});

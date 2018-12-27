/*
 * Balances.js - Store
 */
Ext.define('C0banparty.wallet.store.Balances', {
    extend: 'Ext.data.Store',
    requires:['Ext.data.proxy.LocalStorage'],

    config: {
        model: 'C0banparty.wallet.model.Balances',
        autoLoad: true,
        autoSync: true,
        // Set this proxy to store data in localStorage
        proxy: {
            type: 'localstorage',
            id: 'Balances'
        }
    }
});

/*
 * MenuTree.js - Model
 */
Ext.define('C0banparty.wallet.model.MenuTree', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'icon', type: 'string'}
        ]
    }
});

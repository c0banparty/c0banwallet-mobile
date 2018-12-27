/*
 * Balances.js - Model
 */
Ext.define('C0banparty.wallet.model.Balances', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',              type: 'string'},  // Unique id Address-PREFIX-CURRENCY
            {name: 'prefix',          type: 'string'},  // address prefix
            {name: 'type',            type: 'integer'}, // Address Type (1=Currency, 2=Asset)
            {name: 'asset',           type: 'string'},  // Asset/Currency Name (RYO, XCB, A1234567890, BACON)
            {name: 'asset_longname',  type: 'string'},  // Asset Long name (PIZZA.DOMINOS)
            {name: 'display_name',    type: 'string'},  // Display name for asset (fix so we can use as displayField in select fields)
            {name: 'quantity',        type: 'string'},  // Quantity (1,234.12345678)
            {name: 'estimated_value', type: 'object'}   // Estimated Value (RYO, XCB, USD)
        ],
        idProperty: 'id',
        proxy: {
            type: 'localstorage',
            id: 'Balances'
        }
    }
});

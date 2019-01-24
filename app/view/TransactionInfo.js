/*
 * TransactionInfo.js - View
 *
 * Displays transaction information
 */

 Ext.define('C0banparty.wallet.view.TransactionInfo', {
    extend: 'Ext.Container',
    xtype: 'fw-transactioninfo',

    requires:[
        'Ext.Img',
        'C0banparty.wallet.view.phone.TransactionInfo',
        'C0banparty.wallet.view.tablet.TransactionInfo'
    ],

    config: {
        layout: 'card',
        items:[]
    },

    // Initialize the component
    initialize: function(){
        var me = this;
        // Setup some aliases
        me.main = C0banparty.wallet.app.getController('Main');
        me.counterparty   = C0banparty.wallet.app.getController('Counterparty');
        // Add view based on device type
        me.add({ xclass:'C0banparty.wallet.view.' + me.main.deviceType + '.TransactionInfo' });
        // Now that we have added the correct view, setup some aliases to various components
        me.tb          = me.down('fw-toptoolbar');
        me.image       = me.down('[itemId=image]');
        me.asset       = me.down('[itemId=asset]');
        me.type        = me.down('[itemId=type]');
        me.quantity    = me.down('[itemId=quantity]');
        me.source      = me.down('[itemId=source]');
        me.buying      = me.down('[itemId=buying]');
        me.selling     = me.down('[itemId=selling]');
        me.destination = me.down('[itemId=destination]');
        me.hash        = me.down('[itemId=hash]');
        me.block       = me.down('[itemId=block]');
        me.timestamp   = me.down('[itemId=timestamp]');
        me.status      = me.down('[itemId=status]');
        me.fee         = me.down('[itemId=fee]');
        me.iconholder  = me.down('[itemId=iconContainer]');
        me.message     = me.down('[itemId=message]');
        me.value       = me.down('[itemId=value]');
        me.description = me.down('[itemId=description]');
        me.divisible   = me.down('[itemId=divisible]');
        me.locked      = me.down('[itemId=locked]');
        me.transfer    = me.down('[itemId=transfer]');
        me.feePaid     = me.down('[itemId=feePaid]');
        me.issuer      = me.down('[itemId=issuer]');
        // Tablet specific fields
        me.placeholder = me.down('[itemId=placeholder]');
        me.information = me.down('[itemId=information]');
        me.callParent();
        // Handle adjusting messagebox height to text height
        me.message.on('change', function(cmp, newVal, oldVal){
            cmp.setHeight(66);
            var el = cmp.getComponent().input;
            if(el){
                el.dom.height = 'auto';
                var w = el.dom.scrollHeight + 33;
                cmp.setHeight(w);
            }
        });
        // Setup listeners on certain fields to handle copying value to clipboard
        var copyFields = ['source','issuer','destination'];
        Ext.each(copyFields, function(name){
            var field = me[name];
            // Handle native copy-to-clipboard functionality
            if(me.main.isNative){
                field.btn.on('tap', function(){
                    me.main.copyToClipboard(field.getValue());
                });
            } else {
                // Handle non-native copy-to-clipboard functionality
                var clipboard = new Clipboard('#' + field.id + ' .fa-files-o', {
                    text: function(e){
                        return field.getValue();
                    }
                });
            }
        });
    },


    // Handle updating the view
    updateView: function(cfg){
        var me   = this,
            data = cfg.data;
        // Back button
        if(cfg.back){
            me.tb.backBtn.show();
            if(typeof cfg.back === 'function')
                me.tb.onBack = cfg.back;
        } else {
            me.tb.backBtn.hide();
        }
        // Handle hiding placeholder and showing asset information
        if(me.placeholder){
            me.placeholder.hide();
            me.information.show();
        }
        // Hide most everything by default
        me.iconholder.hide();
        me.quantity.hide();
        me.destination.hide();
        me.message.hide();
        me.value.hide();
        me.description.hide();
        me.divisible.hide();
        me.locked.hide();
        me.transfer.hide();
        me.feePaid.hide();
        me.issuer.hide();
        me.buying.hide();
        me.selling.hide();
        // Handle Sends
        if(data.type=='sends' || data.type == 'send'){
            // me.image.setSrc('https://xchain.io/icon/' + data.asset.toUpperCase() + '.png');
            me.iconholder.show();
            me.quantity.show();
            me.destination.show();
        } else if(data.type=='orders'){
            me.buying.show();
            me.selling.show();
        } else if(data.type=='broadcasts'){
            // Handle Broadcasts
            me.message.show();
            me.value.show();
        } else if(data.type=='issuances'){
            // Handle Issuances
            // me.image.setSrc('https://xchain.io/icon/' + data.asset.toUpperCase() + '.png');
            me.iconholder.show();
            me.quantity.show();
            me.description.show();
            me.divisible.show();
            me.locked.show();
            me.transfer.show();
            me.feePaid.show();
            me.issuer.show();
        }
        // Hide miners fees for everything except RYO for now
        // Come back at some point and add code to determine miners fees WITHOUT having to make an extra API call
        if(data.asset=='RYO'){
            me.fee.show();
        } else {
            me.fee.hide();
        }
        me.updateData(data);
        me.getTransactionInfo(data);
    },


    // Handle updating view fields
    updateData: function(data){
        // console.log('updateData data=',data);
        var me    = this,
            fmt   = (/\./.test(data.quantity)||data.asset=='RYO') ? '0,0.00000000' : '0,0',
            // time  = (data.timestamp) ? Ext.Date.format(new Date(parseInt(data.timestamp + '000')),'m-d-Y H:i:s') : '',
            time  = (data.timestamp) ? data.timestamp : '',
            block = (data.block_index) ? numeral(data.block_index).format('0,0') : '-',
            qty   = (data.quantity) ? data.quantity : 0,
            status = (data.timestamp) ? ((data.status) ? data.status : 'Valid') : 'Pending',
            type   = (typeof data.type === 'string') ? data.type : 'Send';
            fee    = (data.fee) ? data.fee : 'NA',
            asset  = (data.asset_longname && data.asset_longname!='') ? data.asset_longname : data.asset,
            type   = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        if(type=='Orders'){
            if (data.data) {
                var order = data.data;
                var get_quantity = order.get_quantity / 100000000;
                var give_quantity = order.give_quantity / 100000000;
                var buying  = (order.get_asset) ? order.get_asset : '',
                    selling = (order.give_asset) ? order.give_asset : '',
                    fmtA    = (/\./.test(get_quantity)) ? '0,0.00000000' : '0,0',
                    fmtB    = (/\./.test(give_quantity)) ? '0,0.00000000' : '0,0';
                me.buying.setValue(numeral(get_quantity).format(fmtA) + ' ' + buying);
                me.selling.setValue(numeral(give_quantity).format(fmtB) + ' ' + selling);
            }
        }
        me.asset.setValue(asset);
        me.type.setValue(type);
        if (data.quantity)
            me.quantity.setValue(qty);
        me.source.setValue(data.source);
        me.destination.setValue(data.destination);
        me.hash.setValue(data.hash);
        me.block.setValue(block);
        me.timestamp.setValue(time);
        me.fee.setValue(fee);
        me.status.setValue(status);
        me.message.setValue(data.message);
        me.value.setValue(data.value);
        me.description.setValue(data.description);
        me.divisible.setValue(data.divisible);
        me.locked.setValue(data.locked);
        me.transfer.setValue(data.transfer);
        me.feePaid.setValue(data.feePaid);
        me.issuer.setValue(data.issuer);
    },


    // Handle requesting transaction information
    getTransactionInfo: function(data){
        var me         = this;
        // Set loading mask on panel to indicate we are loading
        me.setMasked({
            xtype: 'loadmask',
            cls: 'fw-panel',
            message: 'Loading Data',
            showAnimation: 'fadeIn',
            indicator: true
        });
        // Get RYO transaction info
        if(data.asset=='RYO'){
            // Get RYO transaction info from blocktrail
            me.main.ajaxRequest({
                url: me.counterparty.get_counterparty_api_url(),
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: {
                  	"jsonrpc": "2.0",
                  	"id": 0,
                  	"method": "get_ryo_transaction",
                  	"params": {
                  		  "txid": data.hash
                  	}
                },
                success: function(o){
                    // console.log("getTransactionInfo. ryo", o);
                    if(o.result){
                        var tx = o.result;
                        me.updateData({
                            type: 'sends',
                            asset: 'RYO',
                            // quantity: numeral(o.estimated_value).multiply(0.00000001).format('0,0.00000000'),
                            hash: tx.hash,
                            status: (tx.block_height) ? 'Valid' : 'Pending',
                            source: tx.source,
                            destination: tx.destination,
                            block_index: tx.block_height,
                            timestamp: moment.unix(tx.timestamp).format("YYYY-MM-DD H:m:s"),
                            // fee: numeral(o.total_fee).multiply(0.00000001).format('0,0.00000000')
                            fee: tx.total_fee,
                            // order
                            get_asset: (tx.get_asset) ? tx.get_asset : '',
                            give_asset: (tx.give_asset) ? tx.give_asset : '',
                            get_quantity: (tx.get_quantity) ? tx.get_quantity : '',
                            give_quantity: (tx.give_quantity) ? tx.give_quantity : ''
                        });
                    }
                    me.setMasked(false);
                },
                failure: function(o){
                    console.error("Error was occured at getTransactionInfo");
                    console.error(o);
                }
            });

        } else {
            // console.log('data=',data);
            // Handle requesting transaction info from counterpartychain.io API
            // Loop through transaction types and get latest transactions
            me.main.ajaxRequest({
                url: me.counterparty.get_counterparty_api_url(),
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: {
                  	"jsonrpc": "2.0",
                  	"id": 0,
                  	"method": "get_transaction",
                  	"params": {
                  		  "tx_hash": data.hash
                  	}
                },
                // Success function called when we receive a success response
                success: function(o){
                    // console.log("getTransactionInfo asset", o);
                    if(o.result){
                        // var fee = (data.fee=='NA') ? data.fee : numeral(String(data.fee).replace('+','').replace('-','')).format('0.00000000');
                        var result = o.result
                        var quantity = result.data.quantity / 100000000;
                        quantity *= (C0banparty.wallet.WALLET_ADDRESS.address == result.source && result.type == 'sends') ? -1 : 1;
                        me.updateData(Ext.apply(result,{
                            asset: (result.data.asset) ? result.data.asset : '',
                            quantity: quantity,
                            hash: data.hash,
                            // message: o.text,
                            description: result.data.description,
                            value: result.btc_amount / 100000000,
                            type: result.type,
                            feePaid: result.fee / 100000000,
                            transfer: (result.data.transfer) ? 'True' : 'False',
                            locked: (result.data.locked) ? 'True' : 'False',
                            divisible: (result.data.divisible) ? 'True' : 'False',
                            status : result.data.status,
                            block: result.block_index,
                            timestamp: moment.unix(result.block_time).format("YYYY-MM-DD H:m:s"),
                            source: result.source,
                            destination: result.data.destination,
                            issuer: result.data.issuer,
                        }));
                    }
                },
                // Callback function called on any response
                callback: function(){
                    me.setMasked(false);
                }
            });
        }
    }

});

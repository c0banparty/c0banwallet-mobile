/*
 * Counterparty.js - Controller
 *
 * Defines most of the counterparty-related functions
 */
Ext.define('C0banparty.wallet.controller.Counterparty', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.MessageBox',
        'Ext.data.JsonP'
    ],

    // Setup alias back to main controller
    launch: function(){
        var me = this;
        me.main = C0banparty.wallet.app.getController('Main');
    },


    // Handle sending a JSON-RPC request to a counterparty server
    request: function(request, callback){
        var me   = this,
            net  = (C0banparty.wallet.WALLET_NETWORK==1) ? 'mainnet' : (C0banparty.wallet.WALLET_NETWORK==2) ? 'testnet' : 'regtest',
            info = C0banparty.wallet.SERVER_INFO[net],
            auth = $.base64.btoa(info.cpUser + ':' + info.cpPass);
        // Stash the original success function for use later
        var successFn = request.success;
        // Define the success/callback/failure functions
        var fn = {
            // Handle processing successfull responses
            success: function(res){
                var o = res;
                // Handle trying to decode the response text
                if(res.responseText){
                    try {
                        var o = Ext.decode(res.responseText);
                    } catch(e){
                        o = false
                    }
                }
                //  Handle running the success callback and pass the decoded object
                successFn(o);
            },
            failure: function(res){
                if(res.status==0)
                    Ext.Msg.alert('Error','Error communicating with counterparty server');
                if(callback)
                    callback();
            },
            callback: request.callback
        };
        // Send request to server
        Ext.Ajax.request(Ext.merge(request, {
            url: me.get_counterparty_api_url(),
            method: 'POST',
            cors: true,
            timeout: 60000,             // timeout after 60 seconds of waiting
            useDefaultXhrHeader: false, // Set to false to make CORS requests (cross-domain)
            headers: {
                'Authorization': 'Basic ' + auth,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            success: fn.success,        // Success function called when we receive a success response
            callback: fn.callback,      // Callback function called on any response
            failure: fn.failure         // Failure function called when the request fails
        }));
    },



    // Handle creating sends
    create_send: function(source, destination, asset, quantity, fee, callback){
        // console.log('create_send=', source, destination, asset, quantity, fee);
        var me = this;
        me.request({
            jsonData: {
               method: "create_send",
               params: {
                    source: source,
                    destination: destination,
                    asset: asset,
                    quantity: parseInt(quantity),
                    fee: parseInt(fee),
                    allow_unconfirmed_inputs: true
                },
                jsonrpc: "2.0",
                id: 0
            },
            success: function(o){
                if(callback)
                    callback(o);
            }
        }, callback);
    },


    // Handle creating broadcasts
    create_broadcast: function(source, fee_fraction, text, timestamp, value, fee, callback){
        // console.log('create_broadcast=', source, fee_fraction, text, timestamp, value, fee);
        var me = this;
        me.request({
            jsonData: {
               method: "create_broadcast",
               params: {
                    source: source,
                    text: text,
                    value: parseFloat(value),
                    fee_fraction: parseFloat(fee_fraction),
                    fee: parseInt(fee),
                    timestamp: Math.round(new Date()/1000), // Use current unix time for timestamp
                    allow_unconfirmed_inputs: true
                },
                jsonrpc: "2.0",
                id: 0
            },
            success: function(o){
                if(callback)
                    callback(o);
            }
        }, callback);

    },


    // Handle creating issuances
    create_issuance: function(source, asset, quantity, divisible, description, destination, fee, callback){
        // console.log('create_issuance=', source, asset, quantity, divisible, description, destination, fee);
        var me = this;
        me.request({
            jsonData: {
               method: "create_issuance",
               params: {
                    source: source,
                    asset: asset,
                    quantity: parseInt(quantity),
                    divisible: parseInt(divisible),
                    description: description,
                    transfer_destination: (destination) ? destination : null,
                    fee: parseInt(fee),
                    allow_unconfirmed_inputs: true
                },
                jsonrpc: "2.0",
                id: 0
            },
            success: function(o){
                if(callback)
                    callback(o);
            }
        }, callback);

    },

    get_counterblock_api_url: function(){
      var serverinfo = C0banparty.wallet.COUNTERBLOCK_INFO,
          network = C0banparty.wallet.WALLET_NETWORK,
          networkstr = (network==1) ? 'mainnet' : (network==2) ? 'testnet' : 'regtest',
          api_suffix = (network==1) ? '_api' : (network==2) ? '_t_api' : '_r_api';
      return ((serverinfo[networkstr].cpSSL) ? 'https' : 'http') + '://' + serverinfo[networkstr].cpHost + ':' + serverinfo[networkstr].cpPort + '/' + api_suffix + '/';
    },

    get_counterparty_api_url: function(){
      var me = this;
      return me.get_counterparty_url() + '/api/';
    },

    get_counterparty_url: function(){
      var serverinfo = C0banparty.wallet.SERVER_INFO,
          network = C0banparty.wallet.WALLET_NETWORK,
          networkstr = (network==1) ? 'mainnet' : (network==2) ? 'testnet' : 'regtest';
      return ((serverinfo[networkstr].cpSSL) ? 'https' : 'http') + '://' + serverinfo[networkstr].cpHost + ':' + serverinfo[networkstr].cpPort;
    }
});

/*
 * Tools.js - View
 *
 * Handle displaying Tools
 */

Ext.define('C0banparty.wallet.view.Tools', {
    extend: 'Ext.Container',

    requires:[
        'C0banparty.wallet.view.phone.Tools',
        'C0banparty.wallet.view.tablet.Tools',
        'C0banparty.wallet.view.Bet',
        'C0banparty.wallet.view.Broadcast',
        'C0banparty.wallet.view.Dividend',
        'C0banparty.wallet.view.Exchange',
        'C0banparty.wallet.view.Issuance',
        'C0banparty.wallet.view.OTCMarket',
        'C0banparty.wallet.view.Send',
        'C0banparty.wallet.view.Sign'
    ],

    config: {
        id: 'toolsView',
        layout: 'card',
        items:[]
    },

    initialize: function(){
        var me = this;
        // Setup alias to main controller
        me.main  = C0banparty.wallet.app.getController('Main');
        // Add view based on device type
        me.add({ xclass:'C0banparty.wallet.view.' + me.main.deviceType + '.Tools' });
        // Setup some aliases to the various components
        me.list  = me.down('fw-toolslist');
        me.cards = me.down('[itemId=tools]');
        // Call parent function
        me.callParent();
    },

    // Handle showing a specific view in the tools card index
    showView: function(id, xclass, cfg){
        var me = this,
            cfg  = (cfg) ? cfg : {},
            view = Ext.getCmp(id);
        // Set some options for phones
        if(me.main.deviceType=='phone'){
            cfg.back = function(){
                me.cards.setActiveItem(0);
            }
        }
        // If we found existing view, update data and use it
        if(!view)
            view = me.cards.add(Ext.apply({ xclass: xclass }, cfg));
        // Handle updating the view with any passed config
        if(cfg)
            view.updateView(cfg);
        // Show view using correct method
        me.cards.setActiveItem(view);
    },

    // Define some quick aliases for showing the different views
    showSendTool:       function(cfg){ this.showView('sendView','C0banparty.wallet.view.Send',cfg);  },
    showIssueTool:      function(cfg){ this.showView('issuanceView','C0banparty.wallet.view.Issuance',cfg);  },
    showBroadcastTool:  function(cfg){ this.showView('broadcastView','C0banparty.wallet.view.Broadcast',cfg);  },
    showExchangeTool:   function(cfg){ this.showView('exchangeView','C0banparty.wallet.view.Exchange',cfg);  },
    showSignTool:       function(cfg){ this.showView('signView','C0banparty.wallet.view.Sign',cfg);  },
    showOTCMarketTool:  function(cfg){ this.showView('otcMarketView','C0banparty.wallet.view.OTCMarket',cfg);  },
    showReceiveTool:    function(cfg){ this.showView('receiveView','C0banparty.wallet.view.Receive',cfg);  },
    showDividendTool:   function(cfg){ this.showView('dividendView','C0banparty.wallet.view.Dividend',cfg);  },
    showBetTool:        function(cfg){ this.showView('betView','C0banparty.wallet.view.Bet',cfg);  }

});

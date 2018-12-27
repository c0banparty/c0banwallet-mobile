/*
 * Settings.js - View
 *
 * Handle displaying settings
 */

Ext.define('C0banparty.wallet.view.Settings', {
    extend: 'Ext.Container',

    requires:[
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Password',
        'Ext.field.Text',
        'Ext.field.Toggle',
        'C0banparty.wallet.view.field.Action'
    ],

    config: {
        layout: 'fit',
        id: 'settingsPanel',
        cls: 'fw-panel',
        items:[{
            xtype: 'fw-toptoolbar',
            title: 'Settings',
            menu: true
        },{
            xtype: 'formpanel',
            itemId: 'form',
            cls: 'fw-background no-label-ellipsis',
            defaults: {
                labelWidth: 80,
                defaults: {
                    labelWidth: 80
                }
            },
            items:[{
                xtype: 'fieldset',
                title: '<i class="fa fa-bitcoin"></i> Wallet Information',
                style: 'margin-bottom: 0px;',
                cls: 'first-fieldset',
                items:[{
                    xtype: 'fw-actionfield',
                    type: 'passwordfield',
                    name: 'passphrase',
                    label: 'Passphrase',
                    iconCls: 'fa fa-user-secret',
                    readOnly: true,
                    placeHolder: 'My Wallet Passphrase',
                    value: 'blah blah blah blah blah blah blah blah blah blah blah blah',
                    handler: function(){
                        C0banparty.wallet.app.getController('Main').showWalletPassphrase();
                    },
                    listeners: {
                        focus: function(cmp){
                            cmp.blur();
                        }
                    }
                },{
                    xtype: 'fw-actionfield',
                    type: 'textfield',
                    name: 'address',
                    label: 'Address',
                    readOnly: true,
                    iconCls: 'fa fa-edit',
                    handler: function(){
                        C0banparty.wallet.app.getController('Main').showAddressListView();
                    },
                    listeners: {
                        focus: function(cmp){
                            cmp.blur();
                        }
                    }
                }, {
                    xtype:'textfield',
                    label: 'Label',
                    name: 'label',
                    listeners: {
                        // When user changes address label, handle updating datastore
                        change: function(cmp, newVal, oldVal){
                            if(newVal!=oldVal)
                                C0banparty.wallet.app.getController('Main').setWalletAddressLabel(newVal);
                        }
                    }
                },{
                    xtype: 'fw-selectfield',
                    name: 'network',
                    label: 'Network',
                    value: 1,
                    defaultTabletPickerConfig: {
                        cls: 'fw-currency-picker',
                        itemTpl: new Ext.XTemplate(
                            '<div class="fw-pickerlist-item">' +
                                '<div class="fw-pickerlist-icon">' +
                                    '{[this.getIcon(values)]}' +
                                '</div>' +
                                '<div class="fw-pickerlist-info">' +
                                    '<div class="fw-pickerlist-currency">{text}</div>' +
                                '</div>' +
                            '</div>',
                            {
                                getIcon: function(values){
                                    var img  = (values.value==2) ? 'tbtc.png' : 'btc.png',
                                        icon = '<img src="resources/images/icons/' + img + '"/>';
                                    return icon;
                                }
                            }
                        )
                    },
                    defaultPhonePickerConfig: {
                        cls: 'fw-currency-picker',
                        itemTpl: new Ext.XTemplate(
                            '<div class="fw-pickerlist-item">' +
                                '<div class="fw-pickerlist-icon">' +
                                    '{[this.getIcon(values)]}' +
                                '</div>' +
                                '<div class="fw-pickerlist-info">' +
                                    '<div class="fw-pickerlist-currency">{text}</div>' +
                                '</div>' +
                            '</div>',
                            {
                                getIcon: function(values){
                                    var img  = (values.value=='2') ? 'tbtc.png' : 'btc.png',
                                        icon = '<img src="resources/images/icons/' + img + '" width="30"/>';
                                    return icon;
                                }
                            }
                        )
                    },
                    options: [
                        {text:"Mainnet", value:"1"},
                        {text:"Testnet", value:"2"},
                        {text:"Regtest", value:"3"}
                    ],
                    listeners: {
                        // When user changes network, handle changing wallet network and loading first address
                        change: function(cmp, newVal, oldVal){
                            if(newVal!=oldVal && newVal!=C0banparty.wallet.WALLET_NETWORK){
                                C0banparty.wallet.app.getController('Main').setWalletNetwork(newVal, true);
                            }
                        }
                    }
                },{
                    xtype: 'togglefield',
                    name: 'passcode',
                    label: 'Pass Code',
                    listeners: {
                        change: function(cmp, newVal, oldVal){
                            // Ignore the change if system is currently changing value
                            if(cmp.ignoreChange)
                                return;
                            // Handle calling enable/disable functions in main controller
                            var me  = Ext.getCmp('settingsPanel');
                            if(newVal)
                                me.main.enablePasscode();
                            else
                                me.main.disablePasscode();
                        }
                    }
                },{
                    xtype: 'togglefield',
                    name: 'touchid',
                    label: 'Touch ID',
                    hidden: true,
                    listeners: {
                        change: function(cmp, newVal, oldVal){
                            // Ignore the change if system is currently changing value
                            if(cmp.ignoreChange)
                                return;
                            var me  = Ext.getCmp('settingsPanel');
                            if(newVal){
                                me.main.enableTouchID();
                            } else {
                                me.main.disableTouchID();
                            }
                        }
                    }
                }]
            // },{
            //     xtype: 'fieldset',
            //     title: '<i class="fa fa-gears"></i> Additional Options',
            //     style: 'margin-bottom: 5px;',
            //     defaults: {
            //         labelWidth: 80,
            //     },
            //     items:[{
            //         xtype: 'selectfield',
            //         name: 'theme',
            //         label: 'Theme',
            //         value: 1,
            //         options: [
            //             {text:"Default",           value:"1"},
            //             {text:"Blackberry 10",     value:"2"},
            //             {text:"Cupertino",         value:"3"},
            //             {text:"Cupertino Classic", value:"4"},
            //             {text:"Mountain view",     value:"5"},
            //             {text:"Sencha",            value:"6"},
            //             {text:"Tizen",             value:"7"},
            //             {text:"Windows",           value:"8"}
            //         ]
            //     },{
            //         xtype: 'selectfield',
            //         name: 'background',
            //         label: 'Background',
            //         value: 1,
            //         options: [
            //             {text:"Default",           value:"1"},
            //             {text:"Background #1",     value:"2"},
            //             {text:"Background #2",     value:"3"},
            //             {text:"Background #3",     value:"4"},
            //             {text:"Background #4",     value:"5"},
            //             {text:"Custom Image",      value:"6"}
            //         ]
            //     },{
            //         xtype: 'selectfield',
            //         name: 'language',
            //         label: 'Language',
            //         options: [
            //             {text:"English",     value:"1"},
            //             {text:"Spanish",     value:"2"},
            //             {text:"Japanese",    value:"3"},
            //             {text:"Russian",     value:"4"},
            //             {text:"French",      value:"5"},
            //         ]
            //     },{
            //         xtype: 'selectfield',
            //         name: 'Currency',
            //         label: 'Currency',
            //         options: [
            //             {text:"USD", value:"1"},
            //             {text:"EUR", value:"2"},
            //             {text:"CAD", value:"3"},
            //             {text:"CNY", value:"4"},
            //             {text:"USD", value:"4"},
            //             {text:"AUD", value:"5"},
            //             {text:"GBP", value:"5"},
            //         ]
            //     }]

            },{
                xtype: 'fieldset',
                title: '<i class="fa fa-server"></i> Server Information',
                style: 'margin-bottom: 5px;',
                defaults: {
                    labelWidth: 80,
                    xtype: 'fw-actionfield',
                    type: 'textfield',
                    iconCls: 'fa fa-question-circle',
                    listeners: {
                        // Handle updating the server values and saving data to disk
                        change: function(cmp, val){
                            var me  = Ext.getCmp('settingsPanel'),
                                cfg = cmp.initialConfig,
                                o   = C0banparty.wallet.SERVER_INFO,
                                oc  = C0banparty.wallet.COUNTERBLOCK_INFO;
                            if(cfg.name=='mainnet.cpHost') o.mainnet.cpHost = val;
                            if(cfg.name=='mainnet.cpPort') o.mainnet.cpPort = val;
                            if(cfg.name=='mainnet.cpUser') o.mainnet.cpUser = val;
                            if(cfg.name=='mainnet.cpPass') o.mainnet.cpPass = val;
                            if(cfg.name=='mainnet.cpSSL')  o.mainnet.cpSSL  = val;
                            if(cfg.name=='testnet.cpHost') o.testnet.cpHost = val;
                            if(cfg.name=='testnet.cpPort') o.testnet.cpPort = val;
                            if(cfg.name=='testnet.cpUser') o.testnet.cpUser = val;
                            if(cfg.name=='testnet.cpPass') o.testnet.cpPass = val;
                            if(cfg.name=='testnet.cpSSL')  o.testnet.cpSSL  = val;
                            if(cfg.name=='regtest.cpHost') o.regtest.cpHost = val;
                            if(cfg.name=='regtest.cpPort') o.regtest.cpPort = val;
                            if(cfg.name=='regtest.cpUser') o.regtest.cpUser = val;
                            if(cfg.name=='regtest.cpPass') o.regtest.cpPass = val;
                            if(cfg.name=='regtest.cpSSL')  o.regtest.cpSSL  = val;
                            if(cfg.name=='cb.mainnet.cpHost') oc.mainnet.cpHost = val;
                            if(cfg.name=='cb.mainnet.cpPort') oc.mainnet.cpPort = val;
                            if(cfg.name=='cb.mainnet.cpUser') oc.mainnet.cpUser = val;
                            if(cfg.name=='cb.mainnet.cpPass') oc.mainnet.cpPass = val;
                            if(cfg.name=='cb.mainnet.cpSSL')  oc.mainnet.cpSSL  = val;
                            if(cfg.name=='cb.testnet.cpHost') oc.testnet.cpHost = val;
                            if(cfg.name=='cb.testnet.cpPort') oc.testnet.cpPort = val;
                            if(cfg.name=='cb.testnet.cpUser') oc.testnet.cpUser = val;
                            if(cfg.name=='cb.testnet.cpPass') oc.testnet.cpPass = val;
                            if(cfg.name=='cb.testnet.cpSSL')  oc.testnet.cpSSL  = val;
                            if(cfg.name=='cb.regtest.cpHost') oc.regtest.cpHost = val;
                            if(cfg.name=='cb.regtest.cpPort') oc.regtest.cpPort = val;
                            if(cfg.name=='cb.regtest.cpUser') oc.regtest.cpUser = val;
                            if(cfg.name=='cb.regtest.cpPass') oc.regtest.cpPass = val;
                            if(cfg.name=='cb.regtest.cpSSL')  oc.regtest.cpSSL  = val;

                            me.saveServerSettings();
                        }
                    }
                },
                items:[{
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty server Mainnet'
                },{
                    name: 'mainnet.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterparty server you would like to use.');
                    }
                },{
                    name: 'mainnet.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterparty server is running.');
                    }
                },{
                    name: 'mainnet.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterparty server.');
                    }
                },{
                    name: 'mainnet.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to the Counterparty server.');
                    }
                },{
                  type: 'togglefield',
                  name: 'mainnet.cpSSL',
                  label: 'Use SSL',
                  handler: function(){
                      Ext.Msg.alert(null, 'This determines if the Counterparty server uses an SSL certificate.');
                  }
                },{
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty server Testnet'
                },{
                    name: 'testnet.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterparty server you would like to use.');
                    }
                },{
                    name: 'testnet.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterparty server is running.');
                    }
                },{
                    name: 'testnet.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterparty server.');
                    }
                },{
                    name: 'testnet.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to the Counterparty server.');
                    }
                },{
                    type: 'togglefield',
                    name: 'testnet.cpSSL',
                    label: 'Use SSL',
                    // cls: 'x-last-field',
                    handler: function(){
                        Ext.Msg.alert(null, 'This determines if the Counterparty server uses an SSL certificate.');
                    }
                },{
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty server Regtest'
                },{
                    name: 'regtest.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterparty server you would like to use.');
                    }
                },{
                    name: 'regtest.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterparty server is running.');
                    }
                },{
                    name: 'regtest.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterparty server.');
                    }
                },{
                    name: 'regtest.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to the Counterparty server.');
                    }
                },{
                    type: 'togglefield',
                    name: 'regtest.cpSSL',
                    label: 'Use SSL',
                    // cls: 'x-last-field',
                    handler: function(){
                        Ext.Msg.alert(null, 'This determines if the Counterparty server uses an SSL certificate.');
                    }
                },
                /////////// counterblock settings
                {
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty counterblock Mainnet'
                },{
                    name: 'cb.mainnet.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterblock you would like to use.');
                    }
                },{
                    name: 'cb.mainnet.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterblock is running.');
                    }
                },{
                    name: 'cb.mainnet.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterblock.');
                    }
                },{
                    name: 'cb.mainnet.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to the Counterblock.');
                    }
                },{
                  type: 'togglefield',
                  name: 'cb.mainnet.cpSSL',
                  label: 'Use SSL',
                  handler: function(){
                      Ext.Msg.alert(null, 'This determines if the Counterblock uses an SSL certificate.');
                  }
                },{
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty counterblock Testnet'
                },{
                    name: 'cb.testnet.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterblock you would like to use.');
                    }
                },{
                    name: 'cb.testnet.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterblock is running.');
                    }
                },{
                    name: 'cb.testnet.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterblock.');
                    }
                },{
                    name: 'cb.testnet.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to the Counterblock.');
                    }
                },{
                    type: 'togglefield',
                    name: 'cb.testnet.cpSSL',
                    label: 'Use SSL',
                    // cls: 'x-last-field',
                    handler: function(){
                        Ext.Msg.alert(null, 'This determines if the Counterblock uses an SSL certificate.');
                    }
                },{
                    xtype: 'field',
                    labelAlign: 'top',
                    label: 'c0banparty counterblock Regtest'
                },{
                    name: 'cb.regtest.cpHost',
                    label: 'CP Host',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the hostname of a Counterblock you would like to use.');
                    }
                },{
                    name: 'cb.regtest.cpPort',
                    label: 'CP Port',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the port on which the Counterblock is running.');
                    }
                },{
                    name: 'cb.regtest.cpUser',
                    label: 'CP User',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the username you would like to use to login to the Counterblock.');
                    }
                },{
                    name: 'cb.regtest.cpPass',
                    label: 'CP Pass',
                    handler: function(){
                        Ext.Msg.alert(null, 'This is the password you would like to use to login to theCounterblock.');
                    }
                },{
                    type: 'togglefield',
                    name: 'cb.regtest.cpSSL',
                    label: 'Use SSL',
                    // cls: 'x-last-field',
                    handler: function(){
                        Ext.Msg.alert(null, 'This determines if the Counterblock uses an SSL certificate.');
                    }
                }]
            },{
                xtype: 'fieldset',
                title: '<i class="fa fa-mobile"></i> Device Information',
                style: 'margin-bottom: 5px;',
                defaults: {
                    labelWidth: 90,
                    xtype: 'textfield',
                    readOnly: true
                },
                items:[{
                    name: 'device',
                    label: 'Device / OS',
                    value: Ext.os.deviceType + ' (' + Ext.os.name + ')'
                },{
                    name: 'browser',
                    label: 'Browser',
                    value: Ext.browser.name + ' (' + Ext.browser.engineName + ' ' + Ext.browser.engineVersion + ')'
                },{
                    name: 'resolution',
                    label: 'Resolution',
                    value: screen.width + ' x ' + screen.height
                }]
            },{
                xtype: 'button',
                iconCls: 'fa fa-trash',
                text: 'Clear Cache',
                ui: 'action',
                margin: '5 10 5 10',
                handler: function(){
                    C0banparty.wallet.app.getController('Main').clearAppCache(true);
                }
            },{
                xtype: 'button',
                text: 'Logout / Clear Data',
                iconCls: 'fa fa-sign-out',
                ui: 'decline',
                margin: '5 10 10 10',
                handler: function(){
                    C0banparty.wallet.app.getController('Main').promptLogout();
                }
            }]
        }]
    },

    // Handle initializing the screen
    initialize: function(){
        var me  = this,
            cfg = me.config,
            sm  = localStorage,
            o   = C0banparty.wallet.SERVER_INFO,
            oc  = C0banparty.wallet.COUNTERBLOCK_INFO;
        // Setup alias to main controller
        me.main = C0banparty.wallet.app.getController('Main');
        // Setup some aliases to the various fields
        me.passphrase = me.down('[name=passphrase]');
        me.passcode   = me.down('[name=passcode]');
        me.touchid    = me.down('[name=touchid]');
        me.address    = me.down('[name=address]');
        me.label      = me.down('[name=label]');
        me.network    = me.down('[name=network]');
        // Setup some aliases to mainnet/testnet specific fields
        me.mainnet    = {
            cpHost: me.down('[name=mainnet.cpHost]'),
            cpPort: me.down('[name=mainnet.cpPort]'),
            cpUser: me.down('[name=mainnet.cpUser]'),
            cpPass: me.down('[name=mainnet.cpPass]'),
            cpSSL:  me.down('[name=mainnet.cpSSL]')
        };
        me.testnet    = {
            cpHost: me.down('[name=testnet.cpHost]'),
            cpPort: me.down('[name=testnet.cpPort]'),
            cpUser: me.down('[name=testnet.cpUser]'),
            cpPass: me.down('[name=testnet.cpPass]'),
            cpSSL:  me.down('[name=testnet.cpSSL]')
        };
        me.regtest    = {
            cpHost: me.down('[name=regtest.cpHost]'),
            cpPort: me.down('[name=regtest.cpPort]'),
            cpUser: me.down('[name=regtest.cpUser]'),
            cpPass: me.down('[name=regtest.cpPass]'),
            cpSSL:  me.down('[name=regtest.cpSSL]')
        };
        me.cb = {};
        me.cb.mainnet    = {
            cpHost: me.down('[name=cb.mainnet.cpHost]'),
            cpPort: me.down('[name=cb.mainnet.cpPort]'),
            cpUser: me.down('[name=cb.mainnet.cpUser]'),
            cpPass: me.down('[name=cb.mainnet.cpPass]'),
            cpSSL:  me.down('[name=cb.mainnet.cpSSL]')
        };
        me.cb.testnet    = {
            cpHost: me.down('[name=cb.testnet.cpHost]'),
            cpPort: me.down('[name=cb.testnet.cpPort]'),
            cpUser: me.down('[name=cb.testnet.cpUser]'),
            cpPass: me.down('[name=cb.testnet.cpPass]'),
            cpSSL:  me.down('[name=cb.testnet.cpSSL]')
        };
        me.cb.regtest    = {
            cpHost: me.down('[name=cb.regtest.cpHost]'),
            cpPort: me.down('[name=cb.regtest.cpPort]'),
            cpUser: me.down('[name=cb.regtest.cpUser]'),
            cpPass: me.down('[name=cb.regtest.cpPass]'),
            cpSSL:  me.down('[name=cb.regtest.cpSSL]')
        };
        // Handle populating the server fields
        me.mainnet.cpHost.setValue(o.mainnet.cpHost);
        me.mainnet.cpPort.setValue(o.mainnet.cpPort);
        me.mainnet.cpUser.setValue(o.mainnet.cpUser);
        me.mainnet.cpPass.setValue(o.mainnet.cpPass);
        me.mainnet.cpSSL.setValue(o.mainnet.cpSSL);
        me.testnet.cpHost.setValue(o.testnet.cpHost);
        me.testnet.cpPort.setValue(o.testnet.cpPort);
        me.testnet.cpUser.setValue(o.testnet.cpUser);
        me.testnet.cpPass.setValue(o.testnet.cpPass);
        me.testnet.cpSSL.setValue(o.testnet.cpSSL);
        me.regtest.cpHost.setValue(o.regtest.cpHost);
        me.regtest.cpPort.setValue(o.regtest.cpPort);
        me.regtest.cpUser.setValue(o.regtest.cpUser);
        me.regtest.cpPass.setValue(o.regtest.cpPass);
        me.regtest.cpSSL.setValue(o.regtest.cpSSL);
        me.cb.mainnet.cpHost.setValue(oc.mainnet.cpHost);
        me.cb.mainnet.cpPort.setValue(oc.mainnet.cpPort);
        me.cb.mainnet.cpUser.setValue(oc.mainnet.cpUser);
        me.cb.mainnet.cpPass.setValue(oc.mainnet.cpPass);
        me.cb.mainnet.cpSSL.setValue(oc.mainnet.cpSSL);
        me.cb.testnet.cpHost.setValue(oc.testnet.cpHost);
        me.cb.testnet.cpPort.setValue(oc.testnet.cpPort);
        me.cb.testnet.cpUser.setValue(oc.testnet.cpUser);
        me.cb.testnet.cpPass.setValue(oc.testnet.cpPass);
        me.cb.testnet.cpSSL.setValue(oc.testnet.cpSSL);
        me.cb.regtest.cpHost.setValue(oc.regtest.cpHost);
        me.cb.regtest.cpPort.setValue(oc.regtest.cpPort);
        me.cb.regtest.cpUser.setValue(oc.regtest.cpUser);
        me.cb.regtest.cpPass.setValue(oc.regtest.cpPass);
        me.cb.regtest.cpSSL.setValue(oc.regtest.cpSSL);
        // Handle showing TouchID field if we are on iOS and have support for it
        if(me.main.isNative && touchid){
            touchid.checkSupport(function(){
                me.touchid.show();
            }, null);
        }
        // Handle toggling passcode and touchid fields to correct status
        var p = sm.getItem('passcode'),
            t = sm.getItem('touchid');
        if(t){
            me.toggleField(me.touchid,1);
        } else if(p){
            me.toggleField(me.passcode,1);
        }
        // Update screen with current wallet address info
        if(C0banparty.wallet.WALLET_ADDRESS){
            me.address.setValue(C0banparty.wallet.WALLET_ADDRESS.address);
            me.label.setValue(C0banparty.wallet.WALLET_ADDRESS.label);
        }
        me.network.setValue(C0banparty.wallet.WALLET_NETWORK);
        // Call parent
        me.callParent();
    },


    // Handle saving the server settings to disk
    saveServerSettings: function(){
        var me = this,
            sm = localStorage;
        sm.setItem('serverInfo', Ext.encode(C0banparty.wallet.SERVER_INFO));
        sm.setItem('counterblockInfo', Ext.encode(C0banparty.wallet.COUNTERBLOCK_INFO));
    },


    // Handle toggling field ON/OFF and displaying optional message
    toggleField: function(fld, val, msg){
        var val = (val) ? 1 : 0;
        // Display message if one is specified
        // Defer msg slightly to fix known issue in sencha touch library
        if(msg){
            Ext.defer(function(){
                Ext.Msg.alert(null, msg);
            },10);
        }
        // Toggle the field to the given value
        if(fld){
            fld.ignoreChange = true;
            fld.setValue(val);
            fld.ignoreChange = false;
        }
    }


});

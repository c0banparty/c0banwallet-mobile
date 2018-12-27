/*
 * Main.js - View
 *
 * Displays main application view
 */

Ext.define('C0banparty.wallet.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    requires: [
        'Ext.TitleBar'
    ],

    config: {
        id: 'mainView',
        tabBarPosition: 'bottom',
        layout:  {
            type: 'card',
            animation: 'fade'
        },
        items: [
            {iconCls: 'piggybank',  title: 'Balances', xclass: 'C0banparty.wallet.view.Balances'},
            {iconCls: 'fa-history', title: 'History',  xclass: 'C0banparty.wallet.view.History'},
            {iconCls: 'fa-gears',   title: 'Tools',    xclass: 'C0banparty.wallet.view.Tools'},
            {iconCls: 'user',       title: 'About',    xclass: 'C0banparty.wallet.view.About'},
            {iconCls: 'settings',   title: 'Settings', xclass: 'C0banparty.wallet.view.Settings'}
        ]
    }
});

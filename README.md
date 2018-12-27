FreeWallet
=====
FreeWallet is an open source mobile wallet which supports Bitcoin and Counterparty.

Features
=====
- **Secure** - Wallet Passphrase & private keys never leave device
- **Send** - Send Bitcoin, XCP, and any counterparty token/asset
- **Receive** - Receive payments via scanning QRCode
- **Issue** - Create a Counterparty token/asset
- **Sign** - Sign any message
- **Broadcast** - Broadcast any message
- **Passcode/PIN** - Protect wallet with additional security
- **TouchID** - Fingerprint support for iOS
- **Mainnet/Testnet/Regtest** - Works on both mainnet and testnet and regtest
- **Multiple Addresses** - Supports multiple addresses
- **QR Code Authorization** - Supports [QR Code Authorization](https://github.com/Authpartyio/Spec/blob/master/QR_Authorization.spec.md)

Comments or Questions?
=====
Submit an issue here or send email to info@freewallet.io


Build Notes
=====
## Application uses :

1. Sencha Touch
2. Sencha Cmd
3. Cordova (optional)

## Setup notes

Clone source

```
git clone https://github.com/c0banparty/c0banwallet-mobile.git
cd c0banwallet-mobile
```

Sencha app initialize

```
sencha -sdk SENCHA_TOUCH_SDK_ROOT generate app c0banparty-wallet .
* SENCHA_TOUCH_SDK_ROOT ex) /Users/username/sdk/touch-2.4.2
```

Add cordova platform

```
sencha cordova init co.c0banparty.wallet c0banparty-wallet
cd cordova
cordova platform add ios
cordova platform add android
```

Install cordova plugins

```
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-cszbar
cordova plugin add https://github.com/leecrossley/cordova-plugin-touchid.git
```

Migrate sencha framework
```
cd PROJECT_ROOT/../
sencha -sdk SENCHA_TOUCH_SDK_ROOT generate app c0banparty-wallet ./tmp
* SENCHA_TOUCH_SDK_ROOT ex) /Users/username/sdk/touch-2.4.2
mv ./tmp/.sencha ./c0banwallet-mobile
mv ./tmp/touch ./c0banwallet-mobile
mv ./tmp/build ./c0banwallet-mobile
mv ./tmp/bootstrap.* ./c0banwallet-mobile
mv ./tmp/build.xml ./c0banwallet-mobile
mv ./tmp/workspace.json ./c0banwallet-mobile
mkdir ./c0banwallet-mobile/packages
```

Application refresh for bootstrap

```
sencha app refresh
```

Create production browser build with
```
sencha app build production
```

Launch web application
```
sencha app watch
```

Check web Application -> http://localhost:1841/

### Launch Android

1. Launch AVD

2. Changed platform at app.json

```
{
    "builds": {
        "web": {"default": true},
        "native": {
            "packager": "cordova",
            "cordova" : {
                "config": {
                    // Uncomment the line below and add the platforms you wish to build for
                    // "platforms": "ios",
                    "platforms": "android",
```

3. Run native
```
sencha app build -run native
```

4. Check your emulator

### Launch iOS

1. lunch iOS emulator

2. Changed platform at app.json

```
{
    "builds": {
        "web": {"default": true},
        "native": {
            "packager": "cordova",
            "cordova" : {
                "config": {
                    // Uncomment the line below and add the platforms you wish to build for
                    "platforms": "ios",
                    // "platforms": "android",
```

3. Run native
```
sencha app build -run native
```

4. Check your emulator

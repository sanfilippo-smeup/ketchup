# SmeUP - WebUP Bottoniera - Vue + Vuetify

This is a small test repository containing the source and an web component version of k-button-panel component (Bottoniera).


## Notes about this project

### About Vuetify
Even if vuetify supports a-la-carte exportation, some components throws a warning when among their
ancestors a component named [<v-app>](https://vuetifyjs.com/en/framework/pre-defined).
Vuetify uses it to perform some calculation.

### About this project's webcomponents
Currently, this project is composed of 3 different parts:

 1. k-button-panel: the Bottoniera component;
 2. v-btn: Vuetify's button component;
 3. v-menu: Vuetify's menu component.

Currently, to keep behaviour simple, this three parts are merged together into a single exported component.

The correct way to split this package would be to export those three parts into their own webcomponent and then lazy loading them in the correct order.

Currently, Vuetify does not exposes precompiled webcomponents for its own components.

A interesting idea could be, if Vue + Vuetify is preferable over other methods, to collaborate with Vuetify author to implement this kind of behaviour. 

https://github.com/vuetifyjs/vuetify/issues/5054


## About API

The full list of the components API can be found inside the following file
```
Project > src > components > KButtonPanel > KButtonPanel.vue
```
by searching for "Properties".


## Testing the project and playground

1. Download repository into the local machine.
2. ` yarn install `.
3. ` yarn run serve `.

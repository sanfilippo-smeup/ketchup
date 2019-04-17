<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ketchup-fld id="fld1" first="Runaways" last="'Call me any time"></ketchup-fld>
    <hr>
    <ketchup-button label="Sono bottone"></ketchup-button>
    <hr>
    <ketchup-radio id="krg1"></ketchup-radio>
    <hr>
    <ketchup-text-input id="int1" is-clearable initial-value="ciao"></ketchup-text-input>
    <hr>
    <ketchup-combo initial-value="sono di prova" is-clearable></ketchup-combo>
    <hr>
    <MAT :content="matrixData">CIAO</MAT>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  matrixData: {
                  "type": "EXB",
                  "key": "i123",
                  "title": "la mia matice ",
                  "options": {
                    "EXB": {
                      "": {
                        "enableSort": true
                      },
                      "A01": {
                        "showFilter": true
                      }
                    },
                    "CHA": {
                      "": {
                        "type": "BAR"
                      }
                    }
                  },
                  "data": {
                    "columns": [
                      {
                        "name": "nome della colonna -> code",
                        "title": "titolo -> text",
                        "size": ""
                      },
                      {
                        "name": "FLD1",
                        "title": "column 2",
                        "size": 10
                      }
                    ],
                    "rows": [
                      {
                        "object": "se presente, il K01",
                        "readOnly": true,
                        "cells": {
                          "FLD1": {
                            "readOnly": true,
                            "options (sarebbe il tasto destro)": true,
                            "obj": {
                              "t": "CN",
                              "p": "COL",
                              "k": "KEKBUR"
                            },
                            "style": "",
                            "type": "itx / acp / etc...",
                            "value": "mickey mouse"
                          },
                          "FLD2": {
                            "value": "value 2"
                          }
                        }
                      }
                    ]
                  },
                  "messages": [],
                  "actions": {
                    "row": [
                      {
                        "exec": "...",
                        "icon": "mdi-clock",
                        "text": "Scheda orologio"
                      }
                    ],
                    "global": [],
                    "auto (tag action attuale)": [
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC..."
                    ],
                    "command": [
                      {
                        "exec": "...",
                        "icon": "mdi-play",
                        "text": "Spotify"
                      }
                    ]
                  },
                  "variables": [],
                  "dynamisms": []
                }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

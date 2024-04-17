/* eslint-env node */
var metro = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
var config = metro.getDefaultConfig(__dirname);

module.exports = config;

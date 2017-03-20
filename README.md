# JS aync code tutorial

[![Travis-CI Status](https://travis-ci.org/pierreroth64/js-async-tutorial.svg?branch=master)](https://travis-ci.org/pierreroth64/js-async-tutorial) [![Semaphore-CI Status](https://semaphoreci.com/api/v1/pierreroth64/js-async-tutorial/branches/master/badge.svg)](https://semaphoreci.com/pierreroth64/js-async-tutorial)

Simple examples with different implementations based on:
+ callbacks
+ promises
+ async/await

## Prerequisite / install

You need a version of [NodeJS](https://nodejs.org/) supporting async/await (tested with 7.7.3).

Then, as usual, `npm install` (or `yarn install`)

## Details

This test code plays with the [Star Wars API](https://swapi.co/)

Run `npm test` and you should see the same results for all the implementations. However, you may notice that the **async/await** code is simpler to read than the **promise** based one one... and far more easy to follow than the **callback** (hell) code ;)

Compare the `getLuke()` method and you should understand why Promises were a huge improvement and async/await was waited for so long.

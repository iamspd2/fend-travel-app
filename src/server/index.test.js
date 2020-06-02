import {app} from './server';
const request = require('supertest');
const express = require('express');


test('our test', () => {
    request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
})

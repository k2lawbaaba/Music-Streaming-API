const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');
const {Artist, Album}= require('../Model/mongooseSchema');
const mongoose = require('mongoose');

const expect = chai.expect;
const request = supertest(app);


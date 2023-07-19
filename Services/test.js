// const chai = require('chai');
// const {Artist, Album}= require('../Model/mongooseSchema');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { expect } = require('chai');
// let jest = require('jest');

// const expect = chai.expect;
const request = supertest(app);

//mock artist and album data
const artistTesting = {
    name: "abbey",
    email: "k2lawbahbah@hotmail.com",
    imageURL: "images\\45cce7127fa7eaeabf76daa9117342c0",
    genre: "Pop",
    albums: null,
    createdAt:"23th of July, 2023"

};

const testAlbum= {
    title:"Testing Album",
    yearReleased : '2021',
    albumCover :'imagepath\albumart.jpg',
    genre: "Pop",
    artistId: null

    
}

beforeAll(async () => {
    // Connect to an in-memory test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/testdb')
  });
  
  afterAll(async () => {
    // Close the database connection after running all tests
    await mongoose.connection.close();
  });
  describe('Testing ARtist and Album API',()=>{
    jest.setTimeout(10000);
    test('POST. creating new artist', async ()=>{
        const res= await request.post('/api/artists').send(artistTesting);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(artistTesting.name);
        expect(res.body.email).toBe(artistTesting.email);
        expect(res.body.imageURL).toBe(artistTesting.imageURL);
        expect(res.body.genre).toBe(artistTesting.genre);
        expect(res.body.createdAt).toBe(artistTesting.createdAt);
        artistTesting._id = res.body._id;
    })

  })

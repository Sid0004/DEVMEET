import jwt from 'jsonwebtoken';

const apiKey = 'bwmsum233w3m';
const secret = '3tqcdufqbsntena9m99dpwm7r3ynzxdepzh5gdyk7v6adfymf5vajwchvvnur2tz';
const userId = 'testuser';
const exp = Math.floor(Date.now() / 1000) + 60 * 60; // Token valid for 1h

const payload = {
  user_id: userId,
  exp,
};

const token = jwt.sign(payload, secret, {
  algorithm: 'HS256',
  keyid: apiKey,
});

console.log(`✅ Created user token for "${userId}": ${token}`);

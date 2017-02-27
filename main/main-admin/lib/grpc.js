import grpc from 'grpc';
import config from './config';

var client=require('grpc-node-simple-client')(grpc, config('grpc', true), grpc.credentials.createInsecure());
// require('file-proto')(client);
// require('banner-proto')(client);
// require('article-proto')(client);
// require('activity-proto')(client);
// require('court-proto')(client);
// require('uc-proto')(client);
// require('sms-proto')(client);
export default client;

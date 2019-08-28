const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.TotalSize = 0;
  }
  
  _transform(chunk, encoding, callback) {
    
    let ChunkType = typeof chunk;
    let ChunkSize = 0;
    const err = new LimitExceededError;

    if (ChunkType == 'string') {
      ChunkSize = Buffer.from(chunk).byteLength;
    } else if (ChunkType == 'object') {

      if (Buffer.isBuffer(chunk) == true) {
        ChunkSize = Buffer.byteLength(chunk, encoding);
      } 
    }
    
    this.TotalSize += ChunkSize;
    
    //console.log(`Chunk type is ${ChunkType}`);
    //console.log(`Chunk size is ${ChunkSize}`);
    //console.log(`Total size is ${this.TotalSize}`);
    //console.log(`Limit size is ${this.limit}`);


    if (this.TotalSize <= this.limit) {
      this.push(chunk);
      callback();  
    } else {
      callback(err);  
    }
   
  }
}

module.exports = LimitSizeStream;
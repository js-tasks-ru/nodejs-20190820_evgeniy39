const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.StringBuffer = "";
  }

  _transform(chunk, encoding, callback) {
    let eol = os.EOL;
    let BufferString = Buffer.from(chunk).toString();
    let TempChunk = undefined;
    let Position = 0;
    let StartPosition = 0;

    while (Position !== -1) {
      if (StartPosition == 0) {
        Position = BufferString.indexOf(eol);    
      } else {
        Position = BufferString.indexOf(eol, StartPosition)  
      }
      
      if (Position !== -1) {
        this.StringBuffer += BufferString.slice(StartPosition, Position)
        StartPosition = Position + eol.length;
        
        TempChunk = Buffer.from(this.StringBuffer);
        
        this.push(TempChunk);
        this.StringBuffer = "";
       
      } else {
        this.StringBuffer += BufferString.slice(StartPosition);
        callback();                       
        
      }      
    }
  }

  _flush(callback) {
    if (this.StringBuffer !== "") {
      let TempChunk = undefined;

      TempChunk = Buffer.from(this.StringBuffer);
      //this.push(TempChunk);
      this.StringBuffer = "";
      callback(null, TempChunk); 
    }
  }
}

module.exports = LineSplitStream;

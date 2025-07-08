let io;

const setSocketServer=(_io)=>{
    io=_io;
};

const getSocketServer=()=>{
    if(!io){
        throw new Error('Socket.io no esta inicializado');
    }
    return io;
};

module.exports={
    setSocketServer,
    getSocketServer
};
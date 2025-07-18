const express=require('express');
const http=require('http');
const {Server: SocketServer}=require('socket.io');
const exphbs=require('express-handlebars');
const path=require('path');
const viewsRouter=require('./src/routes/views.router');
const {setSocketServer}=require('./src/app');

const app=express();
const server=http.createServer(app);
const io=new SocketServer(server);

setSocketServer(io);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(process.cwd(), 'src/public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src/views'));

app.use('/', viewsRouter);

let products=[];

io.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado');

    socket.emit('updateProducts', products);

    socket.on('addProduct', (data)=>{
        products.push(data);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (id)=>{
        products=products.filter(p=>p.id !== id);
        io.emit('updateProducts', products);
    });
});;

server.listen(3000, ()=>{
    console.log('Servidor iniciado en puerto 3000');
});
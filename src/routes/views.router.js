import {Router} from 'express';

const router=Router();

let products=[];

router.get('/', (req, res)=>{
    res.render('home', {products});
});

router.get('/realtimeProducts', (req, res)=>{
    res.render('realtimeProducts');
});

module.exports=router;
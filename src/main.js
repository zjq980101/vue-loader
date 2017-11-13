//引用全局reset.css
import './css/reset.css';

//引用框架脚本
import Vue from 'vue';
import axios from './axios/axios'
import app from './app.vue';
import router from './routes/router';
import store from './store/store'




new Vue({
    el:'.container',
    router:router,
    store,
    render:function(createElement){
        return createElement(app)
    },
    mounted:function(){
      
    }
})



if(module.hot){
    module.hot.accept()
}
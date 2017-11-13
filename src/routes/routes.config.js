import overall from '../pages/overall.vue'
import college from '../components/college.vue'
import major from '../components/major.vue'
var routes = [
    {
        path:'/',
        redirect:'/overall'
    },
    {
        name:'overall',
        path:'/overall',
        component:overall
    },
    {
        name:'college',
        path:'/college',
        component:college
    },
    {
        name:'major',
        path:'/major',
        component:major
    }
]
export default routes
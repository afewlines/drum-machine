import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SequencerPanel from '../views/SequencerPanel.vue'
import InstrumentPanel from '../views/InstrumentPanel.vue'
import MIDIPanel from '../views/MIDIPanel.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'BASE',
}, {
  path: '/Instrument',
  name: 'Instrument',
  component: InstrumentPanel
}, {
  path: '/Sequencer',
  name: 'Sequencer',
  component: SequencerPanel
}, {
  path: '/MIDI',
  name: 'MIDI',
  component: MIDIPanel
}, {
  path: '/Mixing',
  name: 'Mixing',
  component: About
}, ]

const router = new VueRouter({
  routes
})

export default router



// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
// }
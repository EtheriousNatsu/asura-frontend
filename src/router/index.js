import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import PasswordReset from '@/pages/PasswordReset';
import PasswordResetConfirm from '@/pages/PasswordResetConfirm';
import Docs from '@/pages/Docs'
import Dashboard from '@/pages/Dashboard'
import ServicesImport from '@/pages/ServicesImport'
import Services from '@/pages/Services'
import Tests from '@/pages/Tests'
import Test from '@/pages/Test'
import Results from '@/pages/Results'
import Settings from '@/pages/Settings'
import Monitoring from '@/pages/Monitoring'



import store from '../store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: App,
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: 'Asura'
        }
      },
      {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: {
          title: 'Signup'
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: 'Login'
        }
      },
      {
        path: '/docs',
        name: 'docs',
        component: Docs,
        meta: {
          title: 'Documentation'
        }
      },

      {
        path: '/account/resetpassword',
        name: 'passwordreset',
        component: PasswordReset,
        meta: {
          title: 'Reset your password'
        }
      },
      {
        path: '/account/:token([0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/resetpassword/:uidb64([0-9A-Za-z_\-]+)',
        name: 'passwordResetConfirm',
        component: PasswordResetConfirm,
        meta: {
          title: 'Reset your password'
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true,
          title: 'Dashboard'
        },
        children: [{
            path: 'services/import',
            name: 'servicesImport',
            component: ServicesImport,
            meta: {
              title: 'New service'
            }
          },
          {
            path: 'services/:serviceId(\\d+)',
            name: 'services',
            component: Services,
            meta: {
              title: 'Service'
            },
            children: [{
                path: 'tests',
                name: 'tests',
                component: Tests,
                meta: {
                  title: 'Tests'
                }
              },
              {
                path: 'monitoring',
                name: 'monitoring',
                component: Monitoring,
                meta: {
                  title: 'Monitoring'
                }
              },
              {
                path: 'results/:runId?',
                name: 'results',
                component: Results,
                meta: {
                  title: 'Results'
                }
              },
              {
                path: 'settings/:tab?',
                name: 'settings',
                component: Settings,
                meta: {
                  title: 'Settings'
                }
              },
              {
                path: 'tests/:testId(\\d+)',
                name: 'test',
                component: Test,
                meta: {
                  title: 'Test'
                }
              }
            ]
          }
        ]
      }
    ]
  }]
})


router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

export default router;

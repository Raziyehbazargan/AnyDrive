'use strict';

module.export = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig(stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/landing');
  $urlRouterProvider.when('/', 'landing');

  let states = [
    {
      name: 'landing',
      url: '/landing',
      template: require('../view/landing/landing.html')
    },
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html')
    }
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}

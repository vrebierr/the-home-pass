'use strict';

describe('Controller: StaticCtrl', function () {

  // load the controller's module
  beforeEach(module('theHomePassApp'));

  var StaticCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StaticCtrl = $controller('StaticCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

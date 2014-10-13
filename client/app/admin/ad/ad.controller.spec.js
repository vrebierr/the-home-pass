'use strict';

describe('Controller: AdCtrl', function () {

  // load the controller's module
  beforeEach(module('theHomePassApp'));

  var AdCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdCtrl = $controller('AdCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

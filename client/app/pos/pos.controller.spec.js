'use strict';

describe('Controller: PosCtrl', function () {

  // load the controller's module
  beforeEach(module('theHomePassApp'));

  var PosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PosCtrl = $controller('PosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

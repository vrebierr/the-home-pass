'use strict';

describe('Controller: AdvertiserCtrl', function () {

  // load the controller's module
  beforeEach(module('theHomePassApp'));

  var AdvertiserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdvertiserCtrl = $controller('AdvertiserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Directive: marker', function () {

  // load the directive's module
  beforeEach(module('theHomePassApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<marker></marker>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the marker directive');
  }));
});
'use strict';

describe('Directive: geoSearch', function () {

  // load the directive's module and view
  beforeEach(module('theHomePassApp'));
  beforeEach(module('components/geo-search/geo-search.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<geo-search></geo-search>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the geoSearch directive');
  }));
});
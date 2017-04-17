'use strict';

describe('The Crud Form', function () {

  beforeEach(module(
    'angularAdmin',
    'template-module'
  ));

  var element;
  var scope;
  var compile;
  var form;
  var input;
  var isolatedScope;
  var controller;
  var config;

  beforeEach(inject(function ($rootScope, $compile) {

    scope = $rootScope.$new();
    compile = $compile;
    scope.testCreateHandler = jasmine.createSpy('testCreateHandler');

    config = {
      display: true,
      actionState: 'create',
      formName: 'myCrudForm',
      crudObject: {
        name: {
          type: 'text',
          required: true,
          value: ''
        }
      }
    };

  }));

  function createFormObject() {
    isolatedScope.myCrudForm = {
      $valid: false,
      $invalid: false,
      $submitted: false,
      $name: 'myCrudForm',
      name: {
        $name: 'name',
        $invalid: false,
        $valid: true,
        $viewValue: '',
        $setViewValue: function (value) {
          this.$viewValue = value;
        }
      }
    };
  }

  function generateDirectiveTemplate() {
    var template = '<crud-form ';
    template += 'form-name="' + config.formName + '" ';
    template += 'action-state="' + config.actionState + '" ';
    //template += 'crud-object="' + config.crudObject + '" ';
    template += 'create-handler="testCreateHandler()" ';
    template += '></crud-form>';
    return template;
  }

  function compileDirective() {
    var template = angular.element(generateDirectiveTemplate());
    element = compile(template)(scope);
    scope.$digest();
    form = angular.element(element.find('form')[0]);
    input = angular.element(form.find('input')[0]);
    controller = element.controller('crudForm');
    isolatedScope = element.isolateScope();
    createFormObject();
  }

  describe('when submitting the form', function () {

    beforeEach(inject(function () {
      compileDirective();

      spyOn(isolatedScope, 'validateForm').and.callThrough();
      spyOn(isolatedScope, 'createHandler').and.callThrough();
      spyOn(isolatedScope, 'updateHandler').and.callThrough();
      isolatedScope.submitForm();
    }));

    it('should validate the form', function () {
      expect(isolatedScope.validateForm).toHaveBeenCalled();
    });

    describe('when validating the form', function () {

      it('should return if its valid or not', function () {
        var validTest = isolatedScope.validateForm();
        expect(validTest).toEqual(isolatedScope.myCrudForm.$valid);
      });

      it('should display an error', function () {
        isolatedScope.myCrudForm.$valid = false;
        isolatedScope.myCrudForm.$submitted = true;
        expect(isolatedScope.whenErrorsArePresent()).toBeTruthy();
      });

    });

    describe('when the form is valid', function () {

      it('should determine the handler to call by using the action state passed to the form', function () {
        isolatedScope.myCrudForm.$valid = true;
        isolatedScope.submitForm();
        expect(isolatedScope.createHandler).toHaveBeenCalled();
      });
    });

  });

  describe('when determing a class for the field', function () {

    beforeEach(inject(function () {
      compileDirective();
      isolatedScope.myCrudForm.name.$setViewValue('');
      scope.$digest();
    }));

    it('should return no class initially', function () {
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('');
    });

    it('should return has-success when valid', function () {
      isolatedScope.myCrudForm.name.$setViewValue('ABC123');
      isolatedScope.myCrudForm.name.$valid = true;
      isolatedScope.myCrudForm.name.$dirty = true;
      isolatedScope.submitForm();

      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-success');
    });

    it('should return has-failure when required and dirty', function () {
      isolatedScope.myCrudForm.name.$setViewValue('');
      isolatedScope.myCrudForm.name.$dirty = true;
      isolatedScope.myCrudForm.name.$invalid = true;
      isolatedScope.myCrudForm.name.$valid = false;
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-warning');
    });

    it('should return has-failure when required and submmited', function () {
      isolatedScope.myCrudForm.name.$setViewValue('');
      isolatedScope.myCrudForm.name.$invalid = true;
      isolatedScope.myCrudForm.name.$valid = false;
      isolatedScope.myCrudForm.$submitted = true;
      var classTest = isolatedScope.determineFormGroupClass('name');
      expect(classTest).toEqual('has-warning');
    });

  });

});

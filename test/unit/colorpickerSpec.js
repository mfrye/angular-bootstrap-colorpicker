'use strict';

describe('colorpicker module', function () {

  beforeEach(module('colorpicker.module'));

  describe('directive', function () {
    var $scope, $compile;

    function compileElement(elementString, scope) {
      var element = $compile(elementString)(scope);
      scope.$digest();
      return element;
    }

    beforeEach(inject(function ($rootScope, _$compile_) {
      $scope = $rootScope;
      $compile = _$compile_;
    }));


    it('should clean up element from dom', function () {
      var elm = compileElement('<input colorpicker ng-model="picker.color" type="text" value="" />', $scope);
      expect($(document).find('.colorpicker').length).toBe(1);
      elm.remove();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

    it('should change visibility of the picker element', function() {
      var elm = compileElement('<input colorpicker ng-model="picker.color" type="text" value="" />', $scope);
      elm.click();
      expect($(document).find('.colorpicker').css('display')).toEqual('block');
    });

    it('should set a default class name', function() {
      compileElement('<input colorpicker ng-model="picker.color" type="text" value="" />', $scope);
      expect($(document).find('.colorpicker').hasClass('colorpicker-position-bottom')).toBeTruthy();
    });

    it('should set a fixed position', function() {
      compileElement('<input colorpicker colorpicker-fixed-position="true" ng-model="picker.color" type="text" value="" />', $scope);
      expect($(document).find('.colorpicker').hasClass('colorpicker-fixed-position')).toBeTruthy();
    });

  });

  describe('Color', function () {
    var
      Color,
      helper;

    beforeEach(inject(function (_Color_, _helper_) {
      Color = _Color_;
      helper = _helper_;
    }));

    it('should return color as a rgb string', function () {
      Color.setColor('#ffffff');
      expect(Color.rgb()).toEqual('rgb(255,255,255)');
    });

    it('should return color as a rgba string', function () {
      Color.setColor('#ffffff');
      expect(Color.rgba()).toEqual('rgba(255,255,255,1)');
    });

    it('should return color as a hex string', function () {
      Color.setColor('rgb(255,255,255)');
      expect(Color.hex()).toEqual('#ffffff');
    });

    it('should set hue', function () {
      Color.setHue(0.25);
      expect(Color.value.h).toEqual(0.75);
    });

    it('should set saturation', function () {
      Color.setSaturation(0.25);
      expect(Color.value.s).toEqual(0.25);
    });

    it('should set lightness', function () {
      Color.setLightness(0.25);
      expect(Color.value.b).toEqual(0.75);
    });

    it('should set alpha', function () {
      Color.setAlpha(0.5);
      expect(Color.value.a).toEqual(0.5);
    });

    it('should convert value to hex', function () {
      Color.setColor('rgb(102, 204, 68)');
      expect(Color.toHex()).toEqual('#66cc44');
    });

    it('should convert value to rgb', function () {
      Color.setColor('#66CC44)');
      expect(Color.toRGB()).toEqual({r:102, g:204, b:68, a:1});
    });

  });
});
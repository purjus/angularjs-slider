(function() {
  "use strict";

  describe('Mouse controls - onlyBindHandles Single Horizontal', function() {
    var helper,
      RzSliderOptions,
      $rootScope,
      $timeout;

    beforeEach(module('test-helper'));

    beforeEach(inject(function(TestHelper, _RzSliderOptions_, _$rootScope_, _$timeout_) {
      helper = TestHelper;
      RzSliderOptions = _RzSliderOptions_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
    }));

    afterEach(function() {
      helper.clean();
    });

    beforeEach(function() {
      var sliderConf = {
        value: 0,
        options: {
          floor: 0,
          ceil: 100,
          showTicks: true,
          onlyBindHandles: true
        }
      };
      helper.createSlider(sliderConf);
    });
    afterEach(function() {
      // to clean document listener
      helper.fireMouseup();
    });

    it('should handle click and drag on minH correctly when mouse is on the middle', function() {
      sinon.spy(helper.slider, 'positionTrackingHandle');
      sinon.spy(helper.slider, 'callOnChange');
      helper.fireMousedown(helper.slider.minH, 0);
      var expectedValue = 50,
        offset = helper.slider.valueToOffset(expectedValue) + helper.slider.handleHalfDim + helper.slider.sliderElem.rzsp;
      helper.fireMousemove(offset);
      expect(helper.scope.slider.value).to.equal(expectedValue);
      helper.slider.positionTrackingHandle.called.should.be.true;
      helper.slider.callOnChange.called.should.be.true;
    });

    it('should do nothing when a click happen on another element than the handle', function() {
      helper.scope.slider.value = 100;
      helper.scope.$digest();

      sinon.spy(helper.slider, 'positionTrackingHandle');
      helper.fireMousedown(helper.slider.selBar, 0);
      helper.fireMousedown(helper.slider.fullBar, 0);
      helper.fireMousedown(helper.slider.ticks, 0);

      expect(helper.scope.slider.value).to.equal(100);
      helper.slider.positionTrackingHandle.called.should.be.false;
    });
  });
}());


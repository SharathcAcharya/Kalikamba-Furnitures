import {
  isPlatformBrowser
} from "./chunk-KONEAW4F.js";
import {
  ChangeDetectionStrategy,
  Component,
  InputFlags,
  NgModule,
  NgZone,
  PLATFORM_ID,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵqueryAdvance,
  ɵɵviewQuerySignal
} from "./chunk-BDHQ7DJM.js";
import {
  asapScheduler
} from "./chunk-SG3BCSKH.js";
import "./chunk-SAVXX6OM.js";
import "./chunk-PQ7O3X3G.js";
import {
  __async
} from "./chunk-WKYGNSYM.js";

// node_modules/ng-apexcharts/fesm2022/ng-apexcharts.mjs
var _c0 = ["chart"];
var _ChartComponent = class _ChartComponent {
  constructor() {
    this.chart = input();
    this.annotations = input();
    this.colors = input();
    this.dataLabels = input();
    this.series = input();
    this.stroke = input();
    this.labels = input();
    this.legend = input();
    this.markers = input();
    this.noData = input();
    this.fill = input();
    this.tooltip = input();
    this.plotOptions = input();
    this.responsive = input();
    this.xaxis = input();
    this.yaxis = input();
    this.forecastDataPoints = input();
    this.grid = input();
    this.states = input();
    this.title = input();
    this.subtitle = input();
    this.theme = input();
    this.autoUpdateSeries = input(true);
    this.chartReady = output();
    this.chartInstance = signal(null);
    this.chartElement = viewChild.required("chart");
    this.ngZone = inject(NgZone);
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }
  ngOnChanges(changes) {
    if (!this.isBrowser)
      return;
    this.ngZone.runOutsideAngular(() => {
      asapScheduler.schedule(() => this.hydrate(changes));
    });
  }
  ngOnDestroy() {
    this.destroy();
  }
  hydrate(changes) {
    const shouldUpdateSeries = this.autoUpdateSeries() && Object.keys(changes).filter((c) => c !== "series").length === 0;
    if (shouldUpdateSeries) {
      this.updateSeries(this.series(), true);
      return;
    }
    this.createElement();
  }
  createElement() {
    return __async(this, null, function* () {
      const {
        default: ApexCharts
      } = yield import("./apexcharts.common-YPRMFNKP.js");
      window.ApexCharts ||= ApexCharts;
      const options = {};
      const properties = ["annotations", "chart", "colors", "dataLabels", "series", "stroke", "labels", "legend", "fill", "tooltip", "plotOptions", "responsive", "markers", "noData", "xaxis", "yaxis", "forecastDataPoints", "grid", "states", "title", "subtitle", "theme"];
      properties.forEach((property) => {
        const value = this[property]();
        if (value) {
          options[property] = value;
        }
      });
      this.destroy();
      const chartInstance = this.ngZone.runOutsideAngular(() => new ApexCharts(this.chartElement().nativeElement, options));
      this.chartInstance.set(chartInstance);
      this.render();
      this.chartReady.emit({
        chartObj: chartInstance
      });
    });
  }
  render() {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.render());
  }
  updateOptions(options, redrawPaths, animate, updateSyncedCharts) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateOptions(options, redrawPaths, animate, updateSyncedCharts));
  }
  updateSeries(newSeries, animate) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateSeries(newSeries, animate));
  }
  appendSeries(newSeries, animate) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendSeries(newSeries, animate));
  }
  appendData(newData) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendData(newData));
  }
  highlightSeries(seriesName) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.highlightSeries(seriesName));
  }
  toggleSeries(seriesName) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleSeries(seriesName));
  }
  showSeries(seriesName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.showSeries(seriesName));
  }
  hideSeries(seriesName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.hideSeries(seriesName));
  }
  resetSeries() {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.resetSeries());
  }
  zoomX(min, max) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.zoomX(min, max));
  }
  toggleDataPointSelection(seriesIndex, dataPointIndex) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleDataPointSelection(seriesIndex, dataPointIndex));
  }
  destroy() {
    this.chartInstance()?.destroy();
    this.chartInstance.set(null);
  }
  setLocale(localeName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.setLocale(localeName));
  }
  paper() {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.paper());
  }
  addXaxisAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addXaxisAnnotation(options, pushToMemory, context));
  }
  addYaxisAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addYaxisAnnotation(options, pushToMemory, context));
  }
  addPointAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addPointAnnotation(options, pushToMemory, context));
  }
  removeAnnotation(id, options) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.removeAnnotation(id, options));
  }
  clearAnnotations(options) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.clearAnnotations(options));
  }
  dataURI(options) {
    return this.chartInstance()?.dataURI(options);
  }
};
_ChartComponent.ɵfac = function ChartComponent_Factory(t) {
  return new (t || _ChartComponent)();
};
_ChartComponent.ɵcmp = ɵɵdefineComponent({
  type: _ChartComponent,
  selectors: [["apx-chart"]],
  viewQuery: function ChartComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuerySignal(ctx.chartElement, _c0, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  inputs: {
    chart: [InputFlags.SignalBased, "chart"],
    annotations: [InputFlags.SignalBased, "annotations"],
    colors: [InputFlags.SignalBased, "colors"],
    dataLabels: [InputFlags.SignalBased, "dataLabels"],
    series: [InputFlags.SignalBased, "series"],
    stroke: [InputFlags.SignalBased, "stroke"],
    labels: [InputFlags.SignalBased, "labels"],
    legend: [InputFlags.SignalBased, "legend"],
    markers: [InputFlags.SignalBased, "markers"],
    noData: [InputFlags.SignalBased, "noData"],
    fill: [InputFlags.SignalBased, "fill"],
    tooltip: [InputFlags.SignalBased, "tooltip"],
    plotOptions: [InputFlags.SignalBased, "plotOptions"],
    responsive: [InputFlags.SignalBased, "responsive"],
    xaxis: [InputFlags.SignalBased, "xaxis"],
    yaxis: [InputFlags.SignalBased, "yaxis"],
    forecastDataPoints: [InputFlags.SignalBased, "forecastDataPoints"],
    grid: [InputFlags.SignalBased, "grid"],
    states: [InputFlags.SignalBased, "states"],
    title: [InputFlags.SignalBased, "title"],
    subtitle: [InputFlags.SignalBased, "subtitle"],
    theme: [InputFlags.SignalBased, "theme"],
    autoUpdateSeries: [InputFlags.SignalBased, "autoUpdateSeries"]
  },
  outputs: {
    chartReady: "chartReady"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 0,
  consts: [["chart", ""]],
  template: function ChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "div", null, 0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var ChartComponent = _ChartComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartComponent, [{
    type: Component,
    args: [{
      selector: "apx-chart",
      template: `<div #chart></div>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, null);
})();
var declarations = [ChartComponent];
var _NgApexchartsModule = class _NgApexchartsModule {
};
_NgApexchartsModule.ɵfac = function NgApexchartsModule_Factory(t) {
  return new (t || _NgApexchartsModule)();
};
_NgApexchartsModule.ɵmod = ɵɵdefineNgModule({
  type: _NgApexchartsModule,
  imports: [ChartComponent],
  exports: [ChartComponent]
});
_NgApexchartsModule.ɵinj = ɵɵdefineInjector({});
var NgApexchartsModule = _NgApexchartsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgApexchartsModule, [{
    type: NgModule,
    args: [{
      imports: [declarations],
      exports: [declarations]
    }]
  }], null, null);
})();
export {
  ChartComponent,
  NgApexchartsModule
};
//# sourceMappingURL=ng-apexcharts.js.map

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare const d3;

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss']
})
export class StackedAreaChartComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chartInit();
    window.addEventListener('resize', this.windowResizeHandler);
  }

  windowResizeHandler = () => {
    this.chartInit();
  }

  chartInit() {
    d3.selectAll('#stacked-area-container svg.stacked-area-svg > *').remove();

    const svgContainer = document.getElementById('stacked-area-container');

    const margin = {
      top: 50,
      right: 120,
      bottom: 30,
      left: 30
    };
    const width = svgContainer.clientWidth - margin.left - margin.right;
    const height = svgContainer.clientHeight - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y');

    const formatNumber = d3.format('.1f'),
      formatBillion = function (x2) {
        return formatNumber(x2 / 1e9);
      };

    const x = d3.scaleTime()
      .range([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    // const color = d3.scaleOrdinal(d3.schemeCategory20);
    const color = d3.scaleOrdinal()
      .range(['#009688', '#45ccff', '#75af27']);

    const xAxis = d3.axisBottom()
      .scale(x);

    const yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(formatBillion);

    const area = d3.area()
      .x(function (d) {
        return x(d.data.date);
      })
      .y0(function (d) {
        return y(d[0]);
      })
      .y1(function (d) {
        return y(d[1]);
      });

    const stack = d3.stack();

    const svg = d3.select('.stacked-area-svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.csv(window.location.origin + '/assets/charts-data/data.csv', function (error, data) {
      color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== 'date';
      }));
      const keys = data.columns.filter(function (key) {
        return key !== 'date';
      });
      data.forEach(function (d) {
        d.date = parseDate(d.date);
      });


      const maxDateVal = d3.max(data, function (d) {
        const vals = d3.keys(d).map(function (key) {
          return key !== 'date' ? d[key] : 0;
        });
        return d3.sum(vals);
      });

      // Set domains for axes
      x.domain(d3.extent(data, function (d) {
        return d.date;
      }));
      y.domain([0, maxDateVal]);

      stack.keys(keys);
      stack.order(d3.stackOrderNone);
      stack.offset(d3.stackOffsetNone);

      const browser = svg.selectAll('.browser')
        .data(stack(data))
        .enter().append('g')
        .attr('class', function (d) {
          return 'browser ' + d.key;
        })
        .attr('fill-opacity', 1);

      browser.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', function (d) {
          return color(d.key);
        });

      browser.append('text')
        .datum(function (d) {
          return d;
        })
        .attr('transform', function (d) {
          return 'translate(' + x(data[10].date) + ',' + y(d[10][1]) + ')';
        })
        .attr('x', -6)
        .attr('dy', '.35em')
        .attr('dx', '10px')
        .style('text-anchor', 'start')
        .text(function (d) {
          return d.key;
        })
        .attr('fill-opacity', 1);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      svg.append('text')
        .attr('x', 0 - margin.left)
        .text('Billions of liters')
        .attr('dy', '-10px');

    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { pieChartInit } from './pie-chart.js';

declare const d3;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.pieChartInit();
  }

  pieChartInit() {
    const data = [10, 20, 100];
    const dataPercent = [];
    let total = 0;

    for (let i = 0; i < data.length; i++) {
      total += data[i];
    }

    for (let i = 0; i < data.length; i++) {
      dataPercent[i] = (data[i] / total * 100).toFixed(1);
    }

    const chartWrapper = document.getElementById('pie-chart-wrapper');

    const width = chartWrapper.clientWidth;
    const height = chartWrapper.clientHeight;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .range(['#009688', '#45ccff', '#75af27']);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      // .innerRadius(radius - 70);
      .innerRadius(radius / 1.9);

    const labelArc = d3.arc()
      .outerRadius(radius - 50)
      .innerRadius(radius - 50);

    const pie = d3.pie()
      .sort(null)
      .value(function (d) {
        return d;
      });

    const svg = d3.select('#pie-chart-wrapper svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const g = svg.selectAll('.arc')
      .data(pie(dataPercent))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', function (d) {
        return color(d.data);
      });

    // g.append('text')
    //     .attr('class', 'header')
    //     .attr('transform', function (d) {
    //         console.log(d);
    //         console.log('translate(' + labelArc.centroid(d) + ')');
    //         return 'translate(' + labelArc.centroid(d) + ')';
    //     })
    //     .attr('dy', '.35em')
    //     .text(function (d) {
    //         // return d.data;
    //         return 'HEADER';
    //     });

    g.append('text')
      .attr('transform', function (d) {
        return 'translate(' + labelArc.centroid(d) + ')';
      })
      .attr('dy', '0.35em')
      .text(function (d) {
        return d.data + '%';
      });

    g.append('text')
      .attr('class', 'text-center')
      .text(function (d) {
        return '$' + total;
      });

      g.append('text')
      .attr('class', 'total')
      .text(function (d) {
        return 'Total';
      });
  }


}


import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare const d3;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartWrapper') chartWrapper: ElementRef;
  margin = {
    top: 40,
    right: 120,
    bottom: 30,
    left: 40
  };
  width;
  height;

  x;
  y;
  line;
  svg;
  xAxis;
  yAxis;
  tooltip;
  tooltipLine;
  states;
  tipBox;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.width = this.chartWrapper.nativeElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.chartWrapper.nativeElement.clientHeight - this.margin.top - this.margin.bottom;
    this.x = d3.scaleLinear().domain([1910, 2010]).range([0, this.width]);
    this.y = d3.scaleLinear().domain([0, 40000000]).range([this.height, 0]);
    this.line = d3.line().x(d => this.x(d.year)).y(d => this.y(d.population));
    this.xAxis = d3.axisBottom(this.x).tickFormat(d3.format('.4'));
    this.yAxis = d3.axisLeft(this.y).tickFormat(d3.format('.2s'));

    this.svg = d3.select('.svg-line-chat').append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.tooltip = d3.select('#line-chat-tooltip');
    this.tooltipLine = this.svg.append('line')
      .attr('stroke-dasharray', 4);

    this.svg.append('g').call(this.yAxis);
    this.svg.append('g').attr('transform', 'translate(0,' + this.height + ')').call(this.xAxis);
    this.svg.append('text').html('State Population Over Time').attr('x', 200);

    // Load the data and draw a chart
    d3.json(window.location.origin + '/assets/charts-data/state-populations.json', data => {
      this.states = data;

      this.svg.selectAll()
        .data(this.states).enter()
        .append('path')
        .attr('fill', 'none')
        // .attr("fill", "#97de37")
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .datum(d => {
          return d.history;
        })
        .attr('d', this.line);

      this.svg.selectAll()
        .data(this.states).enter()
        .append('text')
        .html(d => {
          return d.name;
        })
        .attr('fill', d => d.color)
        // .attr('alignment-baseline', 'middle')
        .attr('x', this.width)
        // .attr('dx', '.5em')
        .attr('y', d => this.y(d.currentPopulation));

      this.tipBox = this.svg.append('rect')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('opacity', 0)
        .on('mousemove', this.drawTooltip)
        .on('mouseout', this.removeTooltip);
    });
  }

  removeTooltip = () => {
    if (this.tooltip) {
      this.tooltip.style('display', 'none');
    }
    if (this.tooltipLine) {
      this.tooltipLine.attr('stroke', 'none');
    }
  }

  drawTooltip = () => {
    const c3 = this.tipBox.node();
    const c2 = d3.mouse(c3)[0];
    const c1 = this.x.invert(c2) + 5;
    const year = Math.floor(c1 / 10) * 10;

    // states.sort((a, b) => {
    //   return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
    // })

    // console.log(c3);
    // console.log(c2);
    // console.log(c1);
    // console.log('');

    this.tooltipLine.attr('stroke', 'blue')
      .attr('x1', this.x(year))
      .attr('x2', this.x(year))
      .attr('y1', 0)
      .attr('y2', this.height);

    this.tooltip.html(year)
      .style('display', 'block')
      .style('left', d3.event.pageX + 20 + 'px')
      .style('top', d3.event.pageY - 20 + 'px')
      .selectAll()
      .data(this.states).enter()
      .append('div')
      .style('color', d => d.color)
      .html(d => d.name + ': ' + d.history.find(h => h.year === year).population);
  }

}

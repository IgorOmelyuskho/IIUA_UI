import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
declare const d3;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartWrapper') chartWrapper: ElementRef;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.chartInit();
    window.addEventListener('resize', this.windowResizeHandler);
  }

  windowResizeHandler = () => {
    this.chartInit();
  }

  chartInit() {
    d3.selectAll('#chart-wrapper svg.svg-line-chat > *').remove();

    const margin = {
      top: 40,
      right: 120,
      bottom: 30,
      left: 40
    };
    let width;
    let height;

    let x;
    let y;
    let line;
    let svg;
    let xAxis;
    let yAxis;
    let tooltip;
    let tooltipLine;
    let states;
    let tipBox;


    width = this.chartWrapper.nativeElement.clientWidth - margin.left - margin.right;
    height = this.chartWrapper.nativeElement.clientHeight - margin.top - margin.bottom;
    x = d3.scaleLinear().domain([1910, 2010]).range([0, width]);
    y = d3.scaleLinear().domain([0, 40000000]).range([height, 0]);
    line = d3.line().x(d => x(d.year)).y(d => y(d.population));
    xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
    yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));

    svg = d3.select('.svg-line-chat').append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    tooltip = d3.select('#line-chat-tooltip');
    tooltipLine = svg.append('line')
      .attr('stroke-dasharray', 4);

    svg.append('g').call(yAxis);
    svg.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
    svg.append('text').html('State Population Over Time').attr('x', 100);

    // Load the data and draw a chart
    d3.json(window.location.origin + '/assets/charts-data/state-populations.json', data => {
      states = data;

      svg.selectAll()
        .data(states).enter()
        .append('path')
        .attr('fill', 'none')
        // .attr("fill", "#97de37")
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .datum(d => {
          return d.history;
        })
        .attr('d', line);

      svg.selectAll()
        .data(states).enter()
        .append('text')
        .html(d => {
          return d.name;
        })
        .attr('fill', d => d.color)
        // .attr('alignment-baseline', 'middle')
        .attr('x', width)
        // .attr('dx', '.5em')
        .attr('y', d => y(d.currentPopulation));

      tipBox = svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('opacity', 0);

      tipBox
        .on('mousemove', this.drawTooltip(tipBox, x, tooltipLine, height, states, tooltip))
        .on('mouseout', this.removeTooltip(tooltip, tooltipLine));
    });
  }

  removeTooltip = (tooltip, tooltipLine) => {
    return () => {
      if (tooltip) {
        tooltip.style('display', 'none');
      }
      if (tooltipLine) {
        tooltipLine.attr('stroke', 'none');
      }
    };
  }

  drawTooltip = (tipBox, x, tooltipLine, height, states, tooltip) => {
    return () => {
      const c3 = tipBox.node();
      const c2 = d3.mouse(c3)[0];
      const c1 = x.invert(c2) + 5;
      const year = Math.floor(c1 / 10) * 10;

      // states.sort((a, b) => {
      //   return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
      // })

      // console.log(c3);
      // console.log(c2);
      // console.log(c1);
      // console.log('');

      tooltipLine.attr('stroke', 'blue')
        .attr('x1', x(year))
        .attr('x2', x(year))
        .attr('y1', 0)
        .attr('y2', height);

      tooltip.html(year)
        .style('display', 'block')
        .style('left', d3.event.pageX + 20 + 'px')
        .style('top', d3.event.pageY - 20 + 'px')
        .selectAll()
        .data(states).enter()
        .append('div')
        .style('color', d => d.color)
        .html(d => d.name + ': ' + d.history.find(h => h.year === year).population);
    };
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

}

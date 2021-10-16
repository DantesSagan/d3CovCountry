/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import Header2 from '../../Header2';

import { pointer } from 'd3-selection';
import * as d3 from 'd3';

export default function EveryDay() {
  const [url] = useState(
    'https://gist.githubusercontent.com/DantesSagan/942626526dc1439bf93bc6eb5dc110ef/raw/ba79245bea3aeb80764658fdc468693c47bbbb2c/COVID2019.json'
  );
  const [req] = useState(new XMLHttpRequest());

  const width = 1200;
  const height = 600;
  const padding = 90;
  useEffect(() => {
    req.open('GET', url, true);
    req.onload = () => {
      data = JSON.parse(req.responseText);
      values = data;
      drawCanvas();
      generateScales();
      drawBars();
      generateAxis();
      infoText();
    };
    req.send();

    let data;
    let values = [];

    let xScale;
    let yScale;

    let xAxisScale;
    let yAxisScale;

    let svg = d3.select('#div2').attr('id', 'corona');

    const infoText = () => {
      let textContainer = d3
        .select('svg')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      textContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -350)
        .attr('y', 150)
        .text('Ежедневная статистика(тыс)');

      textContainer
        .append('text')
        .attr('x', width - 850)
        .attr('y', height - 560)
        .attr('id', 'title')
        .text('COVID 2019 в Российской Федерации(Заражённые)')
        .style('font-size', '1.5em');
    };

    const drawCanvas = () => {
      svg.attr('width', width);
      svg.attr('height', height);
    };
    const generateScales = () => {
      yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.new_cases;
          }),
        ])
        .range([padding, height - padding])
        .nice();

      const dataDate = values.map((item) => {
        return new Date(item.date);
      });
      console.log(dataDate);

      xScale = d3
        .scaleTime()
        .domain([d3.min(dataDate), d3.max(dataDate)])
        .range([width - padding, padding]);

      xAxisScale = d3
        .scaleTime()
        .domain([d3.min(dataDate), d3.max(dataDate)])
        .range([padding, width - padding]);

      yAxisScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.new_cases;
          }),
        ])
        .range([height - padding, padding]);
    };
    const validNumber = (num) => {
      return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
    };
    const drawBars = () => {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('width', 'auto')
        .style('height', 'auto');

      let xAccessor = (d) => xScale(new Date(d.date));
      let yAccessor = (d) => yScale(d.new_cases);

      console.log(xAccessor(values[4]));

      let lineGenerator = d3
        .line()
        .x((d) => xAccessor(d))
        .y((d) => yAccessor(d))
        .curve(d3.curveStep);

      svg
        .append('path')
        .datum(values)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('date', xAccessor)
        .attr('total_cases', yAccessor)
        .on('mousemove', (event, item) => {
          const [x, y] = pointer(event);
          tooltip.transition().duration(200).style('visibility', 'visible');
          tooltip
            .html(
              new Date(item.date) +
                ' -  Год/День/Месяц' +
                '</br>' +
                validNumber(item.new_cases) +
                ' - Общее количество'
            )
            .style('left', x + 50 + 'px')
            .style('top', y + 220 + 'px');

          document.querySelector('#tooltip').setAttribute('date', item.date);
        })
        .on('mouseout', () => {
          tooltip.transition().duration(200).style('visibility', 'hidden');
        });
    };

    const generateAxis = () => {
      const xAxis = d3.axisBottom(xAxisScale);
      const yAxisTwo = d3.axisLeft(yAxisScale);
      svg
        .append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height - padding) + ')')
        .style('font-size', '18px');

      svg
        .append('g')
        .call(yAxisTwo)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ',  0)')
        .style('font-size', '18px');
    };
  }, []);
  return (
    <div>
      <Header2 />
      <h2 className='text-center text-4xl p-4'>
        Статистика ежедневных заражений COVID 2019 с 2020.03 - 2021.08
      </h2>
      <svg className='App' id='div2'>
        <text x={width - 900} y={height - 20}>
          Больше информации:{' '}
          <a href='https://ourworldindata.org/coronavirus#coronavirus-country-profiles'>
            https://ourworldindata.org/coronavirus#coronavirus-country-profiles
          </a>
        </text>
      </svg>
      <div className='hoverHolder shadow-inner rounded-t-lg font-bold '></div>
    </div>
  );
}

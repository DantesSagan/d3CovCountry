/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { pointer } from 'd3-selection';
import * as d3 from 'd3';
import UsaHeader from '../../UsaHeader';

export default function EveryDay() {
  const [url] = useState(
    'https://gist.githubusercontent.com/DantesSagan/fd05ceffb3a32c2bc4008000168d98a6/raw/e8f0294d7571ec81d297544fc6b94db3f26f3069/CovidUsa.json'
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
    let heightScaleTwo;

    let xAxisScale;
    let yAxisScaleTwo;

    let svg = d3.select('#div2').attr('id', 'corona');
    const validNumber = (num) => {
      return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
    };
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
        .text('COVID 2019 в США(Заражённые)')
        .style('font-size', '1.5em');
    };

    const drawCanvas = () => {
      svg.attr('width', width);
      svg.attr('height', height);
    };
    const generateScales = () => {
      heightScaleTwo = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.new_cases;
          }),
        ])
        .range([0, height - 2 * padding]);
      console.log(heightScaleTwo);
      xScale = d3
        .scaleLinear()
        .domain([0, values.length - 1])
        .range([padding, width - padding]);

      const dataDate = values.map((item) => {
        return new Date(item.date);
      });
      console.log(dataDate);

      xAxisScale = d3
        .scaleTime()
        .domain([d3.min(dataDate), d3.max(dataDate)])
        .range([padding, width - padding]);

      yAxisScaleTwo = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.new_cases;
          }),
        ])
        .range([height - padding, padding]);

      return { xScale, dataDate };
    };

    const drawBars = () => {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('width', 'auto')
        .style('height', 'auto');

      svg
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('id', 'barTwo')
        .attr('width', (width - 2 * padding) / values.length)
        .attr('date', (item) => {
          return item.date;
        })
        .attr('new_cases', (item) => {
          return item.new_cases;
        })
        .attr('height', (item) => {
          return heightScaleTwo(item.new_cases);
        })
        .attr('x', (item, i) => {
          return xScale(i);
        })
        .attr('y', (item) => {
          return height - padding - heightScaleTwo(item.new_cases);
        })
        .on('mouseover', (event, item) => {
          const [x, y] = pointer(event);
          tooltip.transition().style('visibility', 'visible');
          tooltip
            .html(
              item.date +
                ' - Год/День/Месяц' +
                '</br>' +
                validNumber(item.new_cases) +
                ' - Новые случаи'
            )
            .style('left', x[0] + 370 + 'px')
            .style('top', y[1] + 450 + 'px');

          document.querySelector('#tooltip').setAttribute('date', item.date);
        })
        .on('mouseout', () => {
          tooltip.transition().style('visibility', 'hidden');
        });
    };

    const generateAxis = () => {
      const xAxis = d3.axisBottom(xAxisScale);
      const yAxisTwo = d3.axisLeft(yAxisScaleTwo);
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
      return { xAxis, svg, yAxisTwo };
    };
  }, []);
  return (
    <div>
      <UsaHeader />
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

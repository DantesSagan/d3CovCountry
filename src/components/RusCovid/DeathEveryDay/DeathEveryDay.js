/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header2 from '../../Header2';

import { pointer } from 'd3-selection';
import * as d3 from 'd3';

export default function DeathEveryDay() {
  const [url] = useState(
    'https://gist.githubusercontent.com/DantesSagan/942626526dc1439bf93bc6eb5dc110ef/raw/7d81b6b493ef4b35d260d0ea0f435d986dee5ea1/COVID2019.json'
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
        .text('Ежедневная статистика(ед./тыс.)');

      textContainer
        .append('text')
        .attr('x', width - 850)
        .attr('y', height - 560)
        .attr('id', 'title')
        .text('COVID 2019 в Российской Федерации(Смертности)')
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
            return item.new_deaths;
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
            return item.new_deaths;
          }),
        ])
        .range([height - padding, padding]);

      return { xScale, dataDate };
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

      svg
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('id', 'barOneDeath')
        .attr('width', (width - 2 * padding) / values.length)
        .attr('date', (item) => {
          return item.date;
        })
        .attr('new_deaths', (item) => {
          return item.new_deaths;
        })
        .attr('height', (item) => {
          return heightScaleTwo(item.new_deaths);
        })
        .attr('x', (item, i) => {
          return xScale(i);
        })
        .attr('y', (item) => {
          return height - padding - heightScaleTwo(item.new_deaths);
        })
        .on('mouseover', (event, item) => {
          const [x, y] = pointer(event);
          tooltip.transition().style('visibility', 'visible');
          tooltip
            .html(
              item.date +
                ' - день/месяц <br/> ' +
                validNumber(item.new_deaths) +
                ' - Новые случаи'
            )
            .style('left', x + 50 + 'px')
            .style('top', y + 250 + 'px');

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
        .style('font-size', '18px')
        .call((g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('y1', (-height - padding) / 2 - 80)
            .attr('stroke-opacity', 0.1)
        );

      svg
        .append('g')
        .call(yAxisTwo)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ',  0)')
        .style('font-size', '18px')
        .call((g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('x2', width - padding * 2)
            .attr('stroke-opacity', 0.1)
        );
      return { xAxis, svg, yAxisTwo };
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
    </div>
  );
}

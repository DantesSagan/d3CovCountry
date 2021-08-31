/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function TotalCases() {
  const [url] = useState(
    'https://gist.githubusercontent.com/DantesSagan/942626526dc1439bf93bc6eb5dc110ef/raw/ba79245bea3aeb80764658fdc468693c47bbbb2c/COVID2019.json'
  );
  const [req] = useState(new XMLHttpRequest());
  const width = 1200;
  const height = 600;
  const padding = 120;
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
    let heightScale;

    let xAxisScale;
    let yAxisScale;

    let svg = d3.select('#div1').attr('id', 'corona');

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
        .text('Общая статистика(млн)');

      textContainer
        .append('text')
        .attr('x', width - 850)
        .attr('y', height - 560)
        .attr('id', 'title')
        .text('COVID 2019 в Российской Федерации(Заражённые)').style('font-size','1.5em');
    };

    const drawCanvas = () => {
      svg.attr('width', width);
      svg.attr('height', height);
    };
    const generateScales = () => {
      heightScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.total_cases;
          }),
        ])
        .range([0, height - 2 * padding]);

      console.log(heightScale);

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

      yAxisScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.total_cases;
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
        .attr('width', (width - 2 * padding) / values.length)
        .attr('date', (item) => {
          return item.date;
        })
        .attr('cases_total', (item) => {
          return item.total_cases;
        })
        .attr('height', (item) => {
          return heightScale(item.total_cases);
        })
        .attr('x', (item, i) => {
          return xScale(i);
        })
        .attr('y', (item) => {
          return height - padding - heightScale(item.total_cases);
        })
        .on('mouseover', (item) => {
          tooltip.transition().style('visibility', 'visible');
          tooltip.text(
            item.date + ' год/месяц - ' + item.total_cases + ' Общее количество'
          );

          document.querySelector('#tooltip').setAttribute('date', item.date);
        })
        .on('mouseout', () => {
          tooltip.transition().style('visibility', 'hidden');
        });
    };

    const generateAxis = () => {
      const xAxis = d3.axisBottom(xAxisScale);
      const yAxis = d3.axisLeft(yAxisScale);
      svg
        .append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height - padding) + ')')
        .style('font-size', '18px');

      svg
        .append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ',  0)')
        .style('font-size', '18px');

      return { xAxis, svg, yAxis };
    };
  }, []);

  return (
    <div>
      <h2 className='text-center text-4xl p-4'>
        Общая статистика заражённых COVID 2019 с 2020.03 - 2021.08
      </h2>
      <svg className='App' id='div1'>
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

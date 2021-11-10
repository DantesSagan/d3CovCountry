/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import Header2 from '../../Header2';

import { autoType } from 'd3-dsv';
import { pointer } from 'd3-selection';
import { easeLinear } from 'd3-ease';
import * as d3 from 'd3';

export default function TotalCases() {
  const [url] = useState(
    'https://gist.githubusercontent.com/DantesSagan/942626526dc1439bf93bc6eb5dc110ef/raw/7d81b6b493ef4b35d260d0ea0f435d986dee5ea1/COVID2019.json'
  );
  const [req] = useState(new XMLHttpRequest());
  const ref = useRef();

  const width = 1200;
  const height = 600;
  const padding = 120;
  useEffect(() => {
    req.open('GET', url, autoType);
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
    let values;

    let xScale;
    let yScale;

    let yScaleTwo;

    let xAxisScale;
    let yAxisScale;

    let yAxisScaleTwo;

    let svg = d3.select(ref.current).attr('id', 'corona');

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
            return item.total_cases;
          }),
        ])
        .range([padding, height - padding])
        .nice();

      yScaleTwo = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(values, (item) => {
            return item.total_deaths;
          }),
        ])
        .range([padding * 3.9, height - padding])
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
            return item.total_cases;
          }),
        ])
        .range([height - padding, padding]);
    };

    const validNumber = (num) => {
      return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
    };

    // const lineApprove = () => {
    //   let yAccessor = (d) => d.total_cases;
    //   let dateParser = d3.timeParse('%Y/%m/%d');
    //   let xAccessor = (d) => dateParser(d.date);

    //   console.log(yAccessor(values[0]));

    //   let lineGenerator = d3
    //     .line()
    //     .x((d) => xScale(xAccessor(d)))
    //     .y((d) => yScale(yAccessor(d)))
    //     .curve(d3.curveBasis);

    //   const lineSvg = svg
    //     .append('path')
    //     .attr('d', lineGenerator(values))
    //     .attr('class', 'bar')
    //     .attr('id', 'barOne')
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-width', 1.5)
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round');

    //   return { lineSvg };
    // };

    const drawBars = () => {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('width', 'auto')
        .style('height', 'auto');

      // let dateParser = d3.timeFormat('%Y/%m/%d');
      let xAccessor = (d) => xScale(new Date(d.date));
      let yAccessor = (d) => yScale(d.total_cases);
      let yAccessorTwo = (d) => yScaleTwo(d.total_deaths);
      // if ((d) => d.people_vaccinated === '') {
      //   return 0;
      // } else if ((d) => d.people_vaccinated > 0) {
      //   let yAccessorTwo = yScaleTwo((d) => d.people_vaccinated);
      //   return yAccessorTwo;
      // }
      console.log(xAccessor(values[4]));

      let lineGenerator = d3
        .line()
        .x((d) => xAccessor(d))
        .y((d) => yAccessor(d))
        .curve(d3.curveStep);

      let lineGeneratorTwoLine = d3
        .line()
        .x((d) => xAccessor(d))
        .y((d) => yAccessorTwo(d))
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
              xScale(new Date(item.date)) +
                ' -  Год/День/Месяц' +
                '</br>' +
                validNumber(yScaleTwo(item.total_deaths)) +
                ' - Общее количество'
            )
            .style('left', x + 50 + 'px')
            .style('top', y + 220 + 'px');

          document.querySelector('#tooltip').setAttribute('date', item.date);
        })
        .on('mouseout', () => {
          tooltip.transition().duration(200).style('visibility', 'hidden');
        });

      svg
        .append('path')
        .datum(values)
        .attr('d', lineGeneratorTwoLine)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('date', xAccessor)
        .attr('total_cases', yAccessorTwo)
        .on('mousemove', (event, item) => {
          const [x, y] = pointer(event);
          tooltip.transition().duration(200).style('visibility', 'visible');
          tooltip
            .html(
              item.date +
                ' -  Год/День/Месяц' +
                '</br>' +
                validNumber(item.total_deaths) +
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
      const xAxis = d3.axisBottom(xAxisScale).ticks(10);
      const yAxis = d3.axisLeft(yAxisScale).ticks(10);
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
            .attr('y1', (-height - padding) / 2)
            .attr('stroke-opacity', 0.1)
        );

      svg
        .append('g')
        .call(yAxis)
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
    };
  }, []);

  return (
    <div>
      <Header2 />
      <h2 className='text-center text-4xl p-4'>
        Общая статистика заражённых COVID 2019 с 2020.03 - 2021.10 <br />
        (и смертей)
      </h2>
      <svg className='App' id='div1' ref={ref}>
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

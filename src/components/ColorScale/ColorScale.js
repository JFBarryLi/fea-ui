import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as fc from 'd3fc';

const ColorScale = (props) => {
  const barRef = useRef(null);

  const colorScaleLegend = () => {
    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain([props.data.min, props.data.max]);

    const container = d3.select(barRef.current);
    container.select('svg').remove();
    const domain = colorScale.domain();

    const width = 75;
    const height = 250;

    const paddedDomain = fc.extentLinear()
      .pad([0.1, 0.1])
      .padUnit('percent')(domain);
    const [min, max] = paddedDomain;
    const expandedDomain = d3.range(min, max, (max - min) / height);

    const xScale = d3
      .scaleBand()
      .domain([0, 1])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(paddedDomain)
      .range([height, 0]);

    const svgBar = fc
      .autoBandwidth(fc.seriesSvgBar())
      .xScale(xScale)
      .yScale(yScale)
      .crossValue(0)
      .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
      .mainValue(d => d)
      .decorate(selection => {
        selection.selectAll('path').style('fill', d => colorScale(d));
      });

    const axisLabel = fc
      .axisRight(yScale)
      .tickValues([...domain, (domain[1] + domain[0]) / 2])
      .tickFormat(d3.format('.2s'))
      .tickSizeOuter(0);

    const legendSvg = container.append('svg')
      .attr('height', height)
      .attr('width', width);

    const legendBar = legendSvg
      .append('g')
      .datum(expandedDomain)
      .call(svgBar);

    const barWidth = Math.abs(legendBar.node().getBoundingClientRect().width/2);
    legendSvg.append('g')
      .attr('transform', `translate(${barWidth})`)
      .datum(expandedDomain)
      .call(axisLabel)
      .select('.domain')
      .attr('visibility', 'hidden');
  }

  useEffect(() => {
    colorScaleLegend();
  }, [props.data.min, props.data.max]);

  return (
    <div ref={barRef} />
  );
}

export default ColorScale;

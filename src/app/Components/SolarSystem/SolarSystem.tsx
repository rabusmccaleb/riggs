import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './SolarSystem.css';

const SolarSystem = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const center = { x: width / 2, y: height / 2 };
    const scale = Math.min(width, height) / 2.5;

    const zoom = d3.zoom()
      .scaleExtent([1, 1])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
      svg.selectAll("g").attr("transform", event.transform);
    }

    const solarSystem = svg.append("g")
      .attr("transform", `translate(${center.x},${center.y})`);

    solarSystem.append("circle")
      .attr("r", 5)
      .attr("fill", "yellow");

    const orbits = [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1, 1.5];
    solarSystem.selectAll(".orbit")
      .data(orbits)
      .enter()
      .append("circle")
      .attr("class", "orbit")
      .attr("r", d => d * scale);

    const planets = [
      { name: "Mercury", distance: 0.1, speed: 4.74, type: "planet" },
      { name: "Venus", distance: 0.2, speed: 3.50, type: "planet" },
      { name: "Earth", distance: 0.3, speed: 2.98, type: "planet" },
      { name: "Mars", distance: 0.4, speed: 2.41, type: "planet" },
      { name: "Jupiter", distance: 0.6, speed: 1.31, type: "planet" },
      { name: "Saturn", distance: 0.7, speed: 0.97, type: "planet" },
      { name: "Uranus", distance: 0.8, speed: 0.68, type: "planet" },
      { name: "Neptune", distance: 0.9, speed: 0.54, type: "planet" },
      { name: "Pluto", distance: 1, speed: 0.47, type: "dwarf-planet" }
    ];

    const planetGroups = solarSystem.selectAll(".celestial-body")
      .data(planets)
      .enter()
      .append("g")
      .attr("class", "celestial-body");

    planetGroups.append("circle")
      .attr("class", d => d.type)
      .attr("r", d => d.type === "planet" ? 3 : 2);

    planetGroups.append("text")
      .attr("class", "label")
      .attr("x", 5)
      .attr("y", 3)
      .text(d => d.name);

    const asteroidBelt = d3.range(1000).map(() => ({
      angle: Math.random() * 2 * Math.PI,
      distance: (0.45 + Math.random() * 0.1) * scale
    }));

    solarSystem.selectAll(".asteroid")
      .data(asteroidBelt)
      .enter()
      .append("circle")
      .attr("class", "asteroid")
      .attr("r", 0.5)
      .attr("cx", d => Math.cos(d.angle) * d.distance)
      .attr("cy", d => Math.sin(d.angle) * d.distance);

    const kuiperBelt = d3.range(2000).map(() => ({
      angle: Math.random() * 2 * Math.PI,
      distance: (0.9 + Math.random() * 0.2) * scale
    }));

    solarSystem.selectAll(".kuiper-object")
      .data(kuiperBelt)
      .enter()
      .append("circle")
      .attr("class", "kuiper-object")
      .attr("r", 0.5)
      .attr("cx", d => Math.cos(d.angle) * d.distance)
      .attr("cy", d => Math.sin(d.angle) * d.distance);

    const regions = [
      { name: "ASTEROID BELT", distance: 0.5, angle: -Math.PI / 4 },
      { name: "KUIPER BELT", distance: 1, angle: Math.PI / 6 }
    ];

    solarSystem.selectAll(".region-label")
      .data(regions)
      .enter()
      .append("text")
      .attr("class", "region-label")
      .attr("x", d => Math.cos(d.angle) * d.distance * scale)
      .attr("y", d => Math.sin(d.angle) * d.distance * scale)
      .text(d => d.name);

    function animatePlanets(time) {
      planetGroups.attr("transform", d => {
        const angle = (time * d.speed / 10000) % (2 * Math.PI);
        const x = Math.cos(angle) * d.distance * scale;
        const y = Math.sin(angle) * d.distance * scale;
        return `translate(${x}, ${y})`;
      });

      requestAnimationFrame(animatePlanets);
    }

    requestAnimationFrame(animatePlanets);

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <svg ref={svgRef} id="solar-system"></svg>
  );
};

export default SolarSystem;
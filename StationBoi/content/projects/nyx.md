---
title: "Nyx — Light-Sail Dynamics Workbench"
status: "workbench released. the paper is under development"
summary: "A Python simulation workbench for investigating how different light-sail geometries respond to radiation pressure from a Gaussian laser beam."
technologies:
  - Python
  - NumPy
  - Matplotlib
  - Tkinter
  - Computational Physics
github: "https://github.com/Evyvaan-Space-Lover/Nyx"
---

# Nyx
### Light-Sail Dynamics Workbench

*Simulating the interaction between light and a sail.*

![Nyx Interface](https://github.com/user-attachments/assets/d42874e8-ed40-4090-b907-aa239a5c0d75)

Nyx is a simulation workbench I built for a research project involving light sails and radiation pressure.

The basic idea is to investigate how the geometry of a sail affects the forces and torques produced when it interacts with a laser beam.

It started as a relatively small physics simulation and eventually turned into a desktop application with configurable simulations, material presets, parameter sweeps, visualisations, and data export.

## The geometries

Nyx currently supports three idealised sail geometries:

- **Rectangular sail** — a flat rectangular surface.
- **Hemispherical sail** — an open hemispherical shell.
- **Paraboloid sail** — a parabolic surface.

![Paraboloid Sail](https://github.com/user-attachments/assets/699e4fa7-ad45-4930-8e75-ef8e19ef191a)

The goal is to compare how different geometries respond under similar illumination conditions.

## The physics

The simulation models a Gaussian laser beam propagating along the positive Z-axis.

Some of the parameters that can be configured include:

- Peak beam intensity.
- Beam waist.
- Laser wavelength.
- Beam position.
- Sail dimensions and thickness.
- Sail orientation.
- Material properties.

The sail surface is discretised into smaller elements. Radiation pressure on those elements is used to estimate the resulting force and torque.

Nyx also tracks translational and rotational motion over time.

## Materials

There are currently three material presets:

| Material | Reflectivity | Absorptivity |
|---|---:|---:|
| Graphene | 0.95 | 0.05 |
| Aluminium | 0.92 | 0.08 |
| Silicon Carbide | 0.88 | 0.12 |

These are configurable model presets, not certified material datasets. Their assumptions need to be checked before using them for physical conclusions.

## Thermal estimates

Nyx also estimates local surface temperatures using a radiative-equilibrium calculation.

This makes it possible to inspect temperature distributions across the sail and compare the estimates against the configured material temperature limits.

![Sail Temperature Visualisation](https://github.com/user-attachments/assets/cd05d842-a361-4d62-9858-153ab6c55129)

## Parameter sweeps

One of the more useful features is the parameter-sweep system.

Instead of manually running every configuration, selected parameters can be varied across multiple values. Nyx generates combinations and runs the corresponding simulations.

This can be used to investigate how changes in beam alignment, geometry, dimensions, and other parameters affect the results.

The sweep functionality is still being refined.

## Results and exports

Nyx records:

- Position and velocity histories.
- Force and torque.
- Orientation and angular velocity.
- Sail mass.
- Temperature estimates.
- Material and geometry information.

Results can be exported as CSV or JSON for further analysis.

## What's next?

Nyx is still being developed alongside the research behind it. There are plenty of things to improve, particularly the parameter-sweep workflow, simulation validation, and the range of configurations supported.

The bigger goal is to use it as a useful computational tool for investigating light-sail dynamics, rather than just producing nice-looking simulations.

## Source

[View Nyx on GitHub](https://github.com/Evyvaan-Space-Lover/Nyx)
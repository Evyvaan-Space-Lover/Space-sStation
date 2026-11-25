---
title: "Planetary Body Simulation"
status: "Released"
summary: "A real-time N-body gravitational simulator built with Python and Pygame. Explore orbital mechanics, chaotic systems, and gravitational interactions."
technologies:
  - Python
  - Pygame
  - NumPy
  - Matplotlib
github: "https://github.com/Evyvaan-Space-Lover/Planetary-Body-Simulation"
---

# Planetary Body Simulation


![Planetary Body Simulation](https://raw.githubusercontent.com/Evyvaan-Space-Lover/Planetary-Body-Simulation/main/images/CoverPageorsumidk.png)

Planetary Body Simulation started as a way for me to explore gravitational physics through code. It eventually grew into a real-time N-body simulator with multiple orbital systems, visualisation tools, and data analysis.

Instead of just showing planets moving around, the idea was to make it possible to experiment with different gravitational setups and actually inspect what happens.

## What's inside?

The simulator currently includes several systems:

- **Solar System** — a model of planetary motion.
- **Binary Stars** — two massive bodies orbiting their common centre of mass.
- **Elliptical Orbits** — exploring non-circular orbital paths.
- **Lagrange Points** — a demonstration of the L4 and L5 regions.
- **Three-Body System** — exploring chaotic gravitational interactions.
- **Horseshoe Orbits** — a rather interesting type of co-orbital motion.
- **Gravitational Slingshot** — observing how gravitational interactions change trajectories.

![Lagrange Point Simulation](https://raw.githubusercontent.com/Evyvaan-Space-Lover/Planetary-Body-Simulation/main/images/LagrangePointSim.JPG)

## The physics

The simulator uses **Verlet integration** to update the positions of bodies over time.

I also added tools to inspect the behaviour of the simulation instead of relying only on the animation:

- Kinetic, potential, and total energy plots.
- Velocity plots.
- 2D trajectory plots.
- 3D trajectory plots, with time as the third axis.

![3D Solar System Visualisation](https://raw.githubusercontent.com/Evyvaan-Space-Lover/Planetary-Body-Simulation/main/images/Position3D_SolarSys.png)

## Using it

The project has an interactive GUI launcher with controls for selecting systems and adjusting simulation parameters. There's also a CLI fallback.

It supports pausing, camera movement, zooming, orbital trails, screenshots, and changing simulation settings.

## A few things I'd like to add

- True 3D simulations.
- Adaptive timesteps.
- More orbital systems.
- More interactive simulation controls.
- Additional real-time analysis tools.

This project has been a pretty good way to learn computational physics by actually implementing and debugging the maths.
Also, the chances of me rolling out any update for this projecct is unlikely

## Cool Stuff
I originally made this project to just understand orbital mechanics and just waste time during my summer vacations but this ended up being a very cool project that I ak very proud of.

## Source

[View the repository on GitHub](https://github.com/Evyvaan-Space-Lover/Planetary-Body-Simulation)
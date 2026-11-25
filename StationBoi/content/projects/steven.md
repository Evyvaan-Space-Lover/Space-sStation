---
title: "Steven"
status: "In development"
summary: "A camera-equipped robotic arm and software project exploring robotics, control systems, and the idea of building a machine with a more capable software layer."
technologies:
  - Python
  - Raspberry Pi
  - FastAPI
  - PCA9685
  - Electronics
  - CAD
  - Computer Vision
github: "https://github.com/Evyvaan-Space-Lover/Steven-Arm"
---

# Steven

Steven is my attempt at building a robotic arm while also exploring something much bigger: how far I can take the software behind a machine, and whether I can build something that starts to feel a little more like an intelligent system.

The project combines mechanical design, electronics, hardware control, camera integration, and software.

## The hardware

Steven's mechanical design is organised around a multi-joint robotic arm.

The repository contains the CAD assembly and individual STL parts, including the base, arm sections, hand, and camera support.

![Steven's CAD model](https://github.com/Evyvaan-Space-Lover/Steven-Arm/raw/main/CAD/StevenBoi.stl)

The electronics side includes a custom servo-control PCB design built around the PCA9685.

The current software architecture supports six servo channels, with configurable channel mappings and servo limits.

## Software

Steven's software is built in Python.

The current repository includes a FastAPI server that provides a basic web interface and API for controlling the arm.

Some of its features include:

- Individual servo controls.
- Position tracking.
- A simulation backend for testing without physical hardware.
- A PCA9685 hardware-control backend.
- Configurable servo limits and calibration.
- Emergency-stop functionality.
- Camera initialisation and status reporting.
- Live camera streaming when the camera is available.

## Her eyes

Steven's camera module uses Picamera2 and OpenCV.

It captures frames, encodes them as JPEG, and provides a stream through the web server.

The camera is an important part of the project because it opens the door to visual interaction with the environment.

![Camera support component](https://github.com/Evyvaan-Space-Lover/Steven-Arm/raw/main/CAD/parts/raspberry_camera_support.stl)

## Safety and control

I didn't want motor control to just mean sending random angles to servos.

The software includes a safety layer that validates commands, checks configured limits, and supports an emergency-stop state.

The hardware controller also has an output-enable mechanism.

## The bigger idea

The robotic arm is only one part of Steven.

I also want to explore task understanding, memory, and more autonomous software behaviour. The longer-term idea is to give her a more capable way of interpreting requests and carrying out tasks.

That part is still a work in progress. The current repository contains the hardware-control and camera foundation; it shouldn't be mistaken for a finished autonomous robot.

## What's next?

- Continue developing the hardware.
- Improve camera-based perception.
- Develop more reliable movement and control.
- Connect the software's task-planning capabilities.
- Work towards more autonomous behaviour.

Steven is very much a work in progress, but she's one of the projects I'm most excited about.

## Source

[View Steven-Arm on GitHub](https://github.com/Evyvaan-Space-Lover/Steven-Arm)
# UMTYMP Grade Calculator Changelog

## Overview
This document outlines the changes between the old version (static/old/index.html) and the new version of the UMTYMP Grade Calculator.

## Major Changes

### Architecture
- **Single Page to Multi-Page**: Transformed from a single HTML page to a multi-page Svelte application with dedicated routes
- **Modern Framework**: Migrated from vanilla JavaScript with jQuery to Svelte with TypeScript
- **Component-Based Structure**: Implemented a component-based architecture for better code organization and reusability
- **Type Safety**: Added TypeScript interfaces for all data structures

### User Interface
- **Enhanced Navigation**: Added Next/Previous buttons for intuitive navigation between sections
- **Improved Input Experience**: 
  - Better input controls with dedicated add/remove buttons
  - Floating labels for form fields
  - Checkbox toggles for options
- **Animations**: Added GSAP animations for smoother transitions between pages and UI states
- **Modern Styling**: Migrated from Bulma CSS to what appears to be Tailwind CSS with DaisyUI components

### Data Management
- **Session Storage**: Implemented persistent data storage between pages using sessionStorage
- **Progressive Data Entry**: Split the form into logical sections that follow a natural progression
- **Restart Capability**: Added ability to clear all data and restart the calculator

### Technical Improvements
- **Reactive State Management**: Leveraged Svelte's reactive state management instead of manual DOM manipulation
- **Code Organization**: Separated concerns into different files and components
- **Type Safety**: Added TypeScript interfaces for all data structures
- **Modern JavaScript**: Used modern JavaScript features and patterns

## Detailed Changes by Section

### Written Homework
- Enhanced input method for homework scores
- Added visual indicator for late assignments
- Improved UI for adding/removing scores

### WeBWork
- Added animation when toggling between "all complete" and individual scores
- Improved input method for score/total pairs
- Better visual representation of the fraction format

### Exams
- Improved layout and organization of exam inputs
- Enhanced UI for the "quiz" checkbox
- Better visual hierarchy for the different exam inputs

### Participation
- Improved layout for TDQs completed/total
- Enhanced input for participation grade

### Results
- Created a dedicated page for displaying results

## Removed Features
- Some specific UI elements from the Bulma framework

## Added Features
- Multi-page navigation
- Persistent data between pages
- Improved animations and transitions
- Better mobile responsiveness
- Restart functionality
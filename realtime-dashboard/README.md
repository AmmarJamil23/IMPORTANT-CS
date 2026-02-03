# Real Time Dashboard (Production-Oriented React)

## Overview
This project is a scalable real time dashboard built with modern React and TailwindCSS.  
It demonstrates professional frontend architecture with clear separation between:

- Transport layer (services)
- Domain logic (hooks)
- Presentation (components)
- UI infrastructure (layout and context)

The dashboard visualizes live metrics with fault tolerance and performance optimization.

---

## Tech Stack

- React (Vite)
- TailwindCSS (dark theme)
- Recharts (charts)
- Feature-based architecture
- Custom hooks for data streams
- Context for shared UI state

---

## Architecture

### Folder Structure

src/
features/
metrics/
components/
hooks/
services/
connection/
layout/
pages/
App.jsx
main.jsx


### Layered Responsibility

Transport layer  
- Handles WebSocket or streaming logic  
- No React logic  
- Replaceable  

Domain layer  
- Custom hooks  
- Owns business state  
- Translates raw data to UI state  

Presentation layer  
- Stateless UI components  
- Memoized where expensive  

UI infrastructure  
- Layout  
- Error boundaries  
- Providers  

---

## Data Flow

metricsService → useMetricsStream → Dashboard → MetricCard / MetricChart


State is unidirectional and predictable.

---

## Resilience Strategy

- Error boundaries isolate rendering failures
- Reconnect logic handles unstable networks
- Bounded history prevents memory leaks
- Explicit connection states improve UX

---

## Performance Strategy

- Heavy components memoized
- No global data stores for high-volume data
- Controlled re-render boundaries
- Limited history buffer

---

## Why WebSocket (Streaming)

Polling REST APIs for real time data causes:
- Server overload
- Latency
- Battery drain

Streaming solves:
- Push-based updates
- Low latency
- Scalable delivery

---

## Development

Install dependencies:
npm install


Run dev server:
npm run dev


---

## Future Extensions

- Authentication
- Alerts feature
- Filters and time ranges
- Historical replay
- Multi-node support

---

## Design Principles

- Feature ownership
- No magic code
- Explicit state
- Fault isolation
- Replaceable infrastructure

---
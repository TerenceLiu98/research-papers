---
title: Compartmental Election Forecasting
type: concept
aliases:
  - cRUD Model
  - Republican-Undecided-Democratic Model
tags:
  - election-forecasting
  - compartmental-models
  - opinion-dynamics
---

## Overview

Compartmental election forecasting represents voting intentions as population fractions that move between preference states. Polling data fit transition rates in differential equations; stochastic simulations then produce distributions of election-day vote margins and winner probabilities. The cRUD model uses Democratic, Republican, and undecided/other compartments, borrowing the transmission-and-recovery structure of susceptible-infected-susceptible models.

## Key Ideas

- **Transitions through undecided status:** Committed voters may become undecided, while interaction with committed populations can move undecided voters into either party compartment. Transmission can connect different regions and need not be symmetric.
- **Regional aggregation:** Competitive states are modeled separately; safe states can be pooled into Democratic and Republican superstates to reduce parameter counts and compensate for sparse polling. A superstate forecast supplies a shared prediction for its constituent races.
- **Fit, then simulate:** The cRUD pipeline fits deterministic trajectories to monthly poll averages, then simulates stochastic trajectories under those parameters. Win probabilities are the share of simulations won, while predicted margins summarize terminal vote-share differences.
- **Observation processing matters:** Poll cutoffs, averaging, interpolation, and [[concepts/polling-house-effects|pollster adjustments]] change fitted trajectories even when the compartment equations stay fixed. Evaluation at historical dates should preserve the information available at each date.
- **Uncertainty needs separate scrutiny:** The studied implementation uses demographic similarities to correlate additive noise between regions. Such noise summarizes multiple uncertainty sources and can violate nonnegativity; forecast accuracy alone does not validate the assumed persuasion mechanisms.
- **Compare several outcomes:** Winner-call accuracy, swing-state margin error, and Brier score answer different questions. Historical pollster correction can improve calls and Brier scores while leaving margin error nearly unchanged or worsening particular states.

## Important Papers

- Volkening, Linder, Porter, and Rempala (2020), "Forecasting elections using compartmental models of infection," [DOI: 10.1137/19M1306658](https://doi.org/10.1137/19M1306658): source model, as described in Branstetter et al.
- [[papers/how-time-and-pollster-history-affect-us-election-forecasts-under-a-compartmental-modeling-approach|How Time and Pollster History Affect U.S. Election Forecasts under a Compartmental Modeling Approach]]: evaluates accuracy across forecast dates and election cycles and isolates one historical pollster adjustment within the cRUD framework.

## Related Concepts

- [[concepts/opinion-dynamics|Opinion Dynamics]]: the broader study of how individual interactions produce collective preference changes.
- [[concepts/polling-house-effects|Polling House Effects]]: measurement tendencies that can affect the data used to fit electoral dynamics.

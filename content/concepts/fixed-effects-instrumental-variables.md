---
title: Fixed-Effects Instrumental Variables
type: concept
aliases:
  - FE-IV
tags:
  - causal-inference
  - instrumental-variables
  - panel-data
---

## Overview

Fixed-effects instrumental-variable estimation combines control for stable unit characteristics with an instrument for an endogenous treatment in panel data. Fixed effects remove time-invariant heterogeneity; the instrument supplies treatment variation whose causal interpretation depends on relevance and credible restrictions on its relationship with the outcome.

## Key Ideas

- Individual fixed effects cannot by themselves remove confounding from unobserved characteristics that change over time. Instrument validity must be justified after accounting for the included controls and fixed effects.
- A strong first stage supports relevance. It does not establish that the instrument affects the outcome only through treatment or is unrelated to residual outcome shocks.
- When infrastructure expansion instruments individual adoption, regional economic changes and spillovers to non-users can threaten exclusion. Baseline regional characteristics interacted with trends address particular patterns of confounding, not every possible regional shock.
- The treatment population matters. Kohara and Shen interpret their estimate as local to people induced to use the Internet by provincial broadband availability; applying it to all users requires additional generalization assumptions.
- Inference should reflect the level of instrument variation. The application clusters by province and supplements conventional inference with a wild cluster bootstrap because the number of clusters is limited.

## Important Papers

- [[papers/the-cost-of-internet-use-an-examination-of-the-causal-impact-on-body-weight|The Cost of Internet Use: An Examination of the Causal Impact on Body Weight]]: Uses provincial broadband ports per capita to instrument Internet use in an individual panel and explicitly discusses regional shocks and spillovers as limitations.

## Related Concepts

- [[concepts/internet-use-and-health|Internet Use and Health]]: An application in which adoption is endogenous and infrastructure can affect more than individual users.
- [[concepts/spatial-causal-inference|Spatial Causal Inference]]: Shares concerns about geographic confounding and interference, although spatial outcome models and regional instruments use different identification strategies.

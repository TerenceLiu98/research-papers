---
title: "Rank Turbulence Divergence"
type: concept
aliases:
  - RTD
tags:
  - ranked-data
  - distribution-comparison
  - information-retrieval
---

## Overview

Rank Turbulence Divergence (RTD) compares two ranked frequency distributions while emphasizing changes near their heads. It is designed for heavy-tailed data, where a small number of items are common and many occur rarely, and it can identify which items contribute most to the aggregate difference.

## Key Ideas

- Each item contributes according to the difference between transformed inverse ranks in two lists. A parameter $\alpha$ controls the relative emphasis on high-ranked and low-ranked items.
- The aggregate is normalized to a 0-to-1 scale: values near zero indicate similar rankings, while larger values indicate substantial reordering or items prominent in only one distribution.
- Item-level contributions make the measure interpretable. In source audits, they reveal which news domains account for divergence between platforms.
- Signed variants indicate direction: a positive or negative contribution can encode which list elevates an item, but the sign convention must be stated explicitly.
- RTD describes distributional difference, not why rankings differ or whether one ranking is normatively better.

## Important Papers

- Dodds et al. (2023), "Allotaxonometry and Rank-Turbulence Divergence": presents RTD as a general instrument for comparing complex systems.
- [[papers/social-and-political-framing-in-search-engine-results|Social and Political Framing in Search Engine Results]]: applies RTD to source-frequency rankings from Google News, Bing News, and DuckDuckGo News.

## Related Concepts

- [[concepts/search-engine-auditing|Search Engine Auditing]]
- [[concepts/bregman-divergences|Bregman Divergences]]
- [[concepts/alpha-divergences|Alpha Divergences]]

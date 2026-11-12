---
title: "Decoding the city: multiscale spatial information in urban income distributions"
type: paper
authors:
  - Luís M.A. Bettencourt
  - Ivanna Rodriguez
  - Jordan T. Kemp
  - José Lobo
year: 2026
doi: 10.1140/epjds/s13688-026-00658-x
tags:
  - urban-science
  - income-segregation
  - information-theory
---

## TL;DR

The paper represents neighborhood income distributions as reweighted citywide distributions and measures spatial sorting through KL divergence and mutual information. Across 942 US metropolitan and micropolitan areas, the highest and lowest income groups show stronger sorting than middle-income groups.

## Research Question

How much additional information is needed to describe neighborhood income heterogeneity beyond an aggregate urban income distribution, and how does this vary by neighborhood, income group, and city?

## Motivation

Approximately lognormal citywide income distributions conceal substantial local variation. Neighborhood averages also conceal mixtures of income groups. A distributional approach connects aggregate urban regularities with local specificity without treating either scale as sufficient.

## Contributions

- Interprets income distribution ratios through both Bayesian updating and the replicator equation.
- Separates neighborhood atypicality, income-group spatial concentration, and citywide sorting using related information quantities.
- Applies these measures nationally and relates aggregate mutual information to established information-theoretic segregation indices.

## Method

For income bin $y_\ell$ and neighborhood $n_j$, define

$$
w_{\ell j}=\frac{p(y_\ell\mid n_j)}{p(y_\ell)}
=\frac{p(y_\ell,n_j)}{p(y_\ell)p(n_j)}.
$$

Values above one indicate local overrepresentation. Averaging $\log w_{\ell j}$ within a neighborhood gives $D_{KL}[p(y\mid n_j)\Vert p(y)]$; averaging within an income group gives $D_{KL}[p(n\mid y_\ell)\Vert p(n)]$. Their respective population-weighted averages both equal $I(Y;N)$ (Eqs. 1–5). This is [[concepts/information-theoretic-spatial-selection|Information-Theoretic Spatial Selection]]. The paper relates normalized mutual information $I(Y;N)/H(Y)$ to the spatial information theory segregation index.

Probabilities are estimated from household counts in income bins. The supplied text has an inconsistent conditional-probability denominator in Section 3.4; its count definitions and Eq. 9 imply $p(n_j\mid y_\ell)=n_{j,\ell}/N_\ell$.

## Experiments

The empirical analysis uses five-year American Community Survey releases for 2010, 2015, and 2020. Census block groups proxy neighborhoods; the national urban sample includes 942 metropolitan and micropolitan areas. The 2010 data cover over 200,000 block groups nationwide.

- **Distributional pattern:** citywide incomes are approximately lognormal over the observed range, while neighborhoods contain distinct income mixtures.
- **Sorting by income:** the richest groups show the strongest spatial selection, followed by the poorest; middle incomes are most spatially mixed (Fig. 2).
- **City comparisons:** Dallas, New York, and New Orleans have the highest reported mutual information in 2010. Smaller cities, including examples in Wisconsin, exhibit low sorting.
- **Time comparison:** 2010 and 2015 are similar; 2020 shows increased sorting and wider dispersion across cities. Pandemic-related nonresponse and population movements remain competing explanations.
- **Null comparison:** random allocation from metropolitan income distributions produces small local selection effects, reported as average log weights below 0.03, supporting the claim that block-group population variation alone does not explain the observed patterns.

## Limitations

Block-group boundaries may not match lived neighborhoods; alternative delineations and systematic scale sensitivity are outside the study. The open-ended upper income bin (above $200,000 in 2010) obscures the richest tail and may underestimate affluent sorting. Rolling survey estimates and pandemic nonresponse complicate temporal interpretation. The measures describe distributional association and do not identify causal neighborhood effects or specific household decision mechanisms. Referenced supplementary figures and tables are not reproduced in the supplied Markdown.

## Related Concepts

- [[concepts/information-theoretic-spatial-selection|Information-Theoretic Spatial Selection]]: connects local distribution ratios to aggregate segregation.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: measures geographic similarity between locations, whereas the present information measures compare income composition across units without an explicit adjacency matrix.

## Related Papers

The source situates its approach alongside Reardon and O’Sullivan’s *Measures of spatial segregation* (2004), Reardon and Bischoff’s *Income inequality and income segregation* (2011), and Schelling’s *Dynamic models of segregation* (1971). It extends the distributional interpretation of segregation measures rather than estimating a residential-choice model.

[Paper and supplementary-material landing page](https://doi.org/10.1140/epjds/s13688-026-00658-x). [Author-reported data and code](https://github.com/mansueto-institute/dkl-metric).

[[index|Library home]]

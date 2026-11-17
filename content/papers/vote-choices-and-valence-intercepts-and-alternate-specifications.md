---
title: "Vote Choices and Valence: Intercepts and Alternate Specifications"
type: paper
authors:
  - Ingrid Mauerer
  - Gerhard Tutz
year: 2024
doi: 10.1017/pan.2023.43
tags:
  - vote-choice
  - political-methodology
  - valence
---

## TL;DR

Vote-choice intercepts depend on covariate coding and absorb unobserved sources of utility, so their size alone does not establish candidate or party quality. Effect coding removes dependence on an arbitrarily selected demographic reference group; measuring valence explicitly as alternative-specific attributes offers a more informative strategy.

## Research Question

When can intercepts support an interpretation as average valence, and how should observed valence qualities enter vote-choice models?

## Motivation

Spatial competition studies often label party intercepts as valence and infer strategic advantages from their rankings. Yet these intercepts reproduce aggregate vote shares conditional on the specified covariates. A party's low intercept can therefore redescribe its low electoral support without explaining it. Demographic reference-group choices introduce further arbitrary variation.

## Contributions

- Separates identification relative to a reference alternative from coding relative to a reference population.
- Derives an effect-coding interpretation based on geometric averages across demographic subpopulations.
- Proposes observed valence attributes with alternative-specific coefficients, and contrasts this specification with treating each party's rating as a chooser attribute.

## Method

The logit choice probability is proportional to exponentiated utility. The proposed utility includes party intercepts, voter demographics, and alternative-specific attributes:

$$
u_{ij}=\beta_{j0}+x_i^T\beta_j+z_{ij}^T\alpha_j.
$$

A reference alternative identifies the intercepts and demographic coefficients. Dummy coding makes the intercept describe the demographic reference group. Effect coding instead constrains category coefficients to sum to zero. In the categorical-only case, the intercept contrast is an equally weighted mean of subgroup log odds, equivalently the logarithm of a geometric mean of odds. This is not a sample-frequency-weighted average probability. Additional covariates retain their conditional interpretation and their zero points matter.

Measured character or leader ratings enter as choice attributes, with one coefficient per alternative. Increasing an alternative's own rating changes its odds against each other alternative by the same multiplicative factor under this specification. For one continuous quality and J alternatives, this requires J valence coefficients, compared with J(J−1) when all ratings enter as chooser attributes. The latter allows a broader pattern of cross-alternative associations; parsimony changes the specification rather than merely renaming coefficients.

## Experiments

These are observational election-data illustrations, not randomized experiments.

| Application | Sample | Reported finding |
| --- | --- | --- |
| 1998 German election | 715 | Reversing gender dummy coding changes the lowest-ranked party from Greens to FDP and the valence gap from 1.90 to 2.39. Effect coding preserves the ranking and gap of 2.21 under that reversal (Table 4). |
| 2016 American National Election Study | 1,847 | Adding candidate character ratings improves fit: reported likelihood-ratio statistic 256.77 with one degree of freedom. Alternative-specific slopes improve on a common slope: 4.29 with one degree of freedom (Table 5). |
| 2010 British Election Study | 1,262 | Leader-image slopes are 0.58 for Labour, 0.92 for Conservatives, and 0.71 for Liberal Democrats, with standard errors 0.05, 0.06, and 0.05 (Table 6). |

In the U.S. alternative-specific model, the character coefficients are 2.94 for Clinton and 2.22 for Trump (both standard errors 0.31). Spatial proximity coefficients weaken after character ratings enter. These are conditional associations, not identified causal effects.

## Limitations

Effect coding does not isolate valence from other omitted determinants or remove dependence on the reference alternative and covariate set. Observed ratings require defensible measurement: leader liking may capture general affect rather than competence or character. The illustrations do not establish a universally valid operationalization.

The supplied Markdown contains inconsistent arithmetic-mean expressions beside geometric-mean derivations in Section 3.2. The summary uses the sum-to-zero interpretation and does not reproduce those inconsistent equalities. Supplementary analyses were referenced by the paper but were not supplied here.

## Related Concepts

- [[concepts/effect-coding|Effect Coding]]: defines the subgroup averaging interpretation of intercepts.
- [[concepts/ideological-voting|Ideological Voting]]: policy proximity is modeled alongside nonpolicy qualities.

## Related Papers

- Mauerer (2020), “The Neglected Role and Variability of Party Intercepts in the Spatial Valence Approach”: preceding critique extended by the present identification and specification analysis.
- Sanders et al. (2011), “Downs, Stokes and the Dynamics of Electoral Choice”: source framework for the British chooser-attribute comparison.

Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/SKWTGS). Published article: [DOI](https://doi.org/10.1017/pan.2023.43).

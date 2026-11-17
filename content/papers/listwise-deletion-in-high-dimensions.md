---
title: Listwise Deletion in High Dimensions
type: paper
authors:
  - J. Sophia Wang
  - P. M. Aronow
year: 2023
doi: 10.1017/pan.2022.5
tags:
  - missing-data
  - high-dimensional-inference
---

## TL;DR

With persistent idiosyncratic missingness and sufficiently many variables, listwise deletion can eliminate the entire sample. Wang and Aronow prove that this probability tends to one when the variable count grows faster than log sample size under their assumptions, and illustrate substantial losses in two political-science datasets.

## Research Question

Can increasing sample size rescue complete-case analysis when the number of variables also increases?

## Motivation

Critiques of listwise deletion usually emphasize bias and inefficiency. The more basic difficulty studied here is whether any observations remain available for estimation. Dropping necessary controls to preserve observations can itself compromise inference.

## Contributions

- A finite-sample lower bound on the probability that deletion removes every row.
- An asymptotic failure result allowing variable counts much smaller than sample size.
- Random-variable subsampling illustrations using Quality of Government (QoG) and State Failure data.

## Method

Let $M_{ij}=1$ indicate a missing entry, with $n$ rows and $k$ variables. The theory assumes mutually independent rows and a uniform constant $q_*<1$ bounding each variable's observation probability conditional on all preceding variables being observed. This permits dependence across variables and does not require missingness to be unrelated to outcomes.

By the probability chain rule, a row is complete with probability at most $q_*^k$. Row independence then gives (Lemma 3):

$$
P(\text{all rows deleted})\geq(1-q_*^k)^n.
$$

If $k=f(n)$ and $f(n)/\log n\to\infty$, then $nq_*^{f(n)}\to0$, and the lower bound tends to one (Proposition 5). The bound on conditional observation probabilities must persist along the sequence. The paper discusses extending the argument to groups of variables with identical missingness; details are assigned to supplementary material.

## Experiments

For each selected variable count, the authors use 25,000 random subsets drawn without replacement and measure surviving rows (§3). Probabilities describe this subsampling procedure on fixed datasets.

| Dataset | Rows | Variables | Mean missingness | Reported deletion outcomes |
| --- | ---: | ---: | ---: | --- |
| QoG, January 2021 | 194 | 351 | 35.9% | Expected row loss exceeds 50% with 2 variables and 99% with 17; probability of losing all rows exceeds 0.5 with 14 and 0.99 with 52. |
| State Failure, 1955–1998 | 8,580 | 1,205 | 66.8% | Expected row loss exceeds 50% with 1 variable and 99% with more than 3; probability of losing all rows exceeds 0.5 with 6 and 0.99 with more than 17. |

Country identifiers were removed; 19 entirely missing State Failure variables were also excluded. The main text reports that supplementary numerical illustrations show much weaker finite-sample failure under 1% idiosyncratic missingness, even with 150 variables and 100 observations.

## Limitations

The asymptotic conclusion depends on dimensional growth and persistent conditional missingness. Shared missingness across variables can violate the variable-level assumption. Independent rows are implausible for clustered countries and country-years, so the empirical illustrations are not direct tests of every theoretical assumption. Randomly sampled variable sets need not represent substantively chosen models. Supplementary materials are referenced but not included in the supplied Markdown. The paper does not establish that imputation or any other remedy is universally preferable.

## Related Concepts

- [[concepts/listwise-deletion|Listwise Deletion]]: the complete-case rule whose sample survival is analyzed.
- [[concepts/multiple-imputation|Multiple Imputation]]: an alternative discussed without a universal superiority claim.

## Related Papers

- [[papers/the-midas-touch-accurate-and-scalable-missing-data-imputation-with-deep-learning|The MIDAS Touch]]: complementary library work on scalable imputation; the present paper diagnoses sample loss rather than benchmarking that method.
- Liu et al. (2016), *Variable Selection and Prediction with Incomplete High-Dimensional Data*: cited as an approach avoiding deletion in high dimensions.
- Pepinsky (2018), *A Note on Listwise Deletion Versus Multiple Imputation*: cited for the dependence of method performance on the data-generating process.

Published in *Political Analysis* 31, 149–155 (2023); first published online March 2, 2022. [Article](https://doi.org/10.1017/pan.2022.5). [Replication materials](https://doi.org/10.7910/DVN/T8BG2K).

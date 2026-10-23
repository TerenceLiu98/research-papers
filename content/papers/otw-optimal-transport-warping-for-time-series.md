---
title: "OTW: Optimal Transport Warping for Time Series"
type: paper
authors:
  - Fabian Latorre
  - Chenghao Liu
  - Doyen Sahoo
  - Steven C. H. Hoi
year: 2023
source_job_id: e832c01b-6fc1-42b2-9f49-1135cdfb5e97
tags:
  - time-series
  - optimal-transport
  - sequence-alignment
  - distance-based-learning
---

[[index|Library home]]

## TL;DR

Optimal Transport Warping (OTW) compares one-dimensional time series through windowed cumulative sums, yielding a differentiable distance with linear time and space complexity and straightforward GPU execution. Across UCR classification and clustering experiments, OTW is often competitive with or better than Dynamic Time Warping (DTW) while running substantially faster; replacing DTW with OTW in a neural feature layer also removes the layer's quadratic bottleneck. OTW is complementary to DTW rather than a universal replacement, especially because its measure-based interpretation excludes some motion and trajectory data.

## Research Question

Can a time-series distance retain useful sensitivity to shape and temporal displacement while being linear-time, differentiable, parallelizable, and suitable for neural-network layers?

## Motivation

DTW provides flexible temporal alignment but requires quadratic time for exact computation, relies on sequential dynamic programming, and is not a metric. These properties make DTW-based layers expensive to train and evaluate. Euclidean distance is computationally convenient but compares observations index by index and therefore supplies a poor inductive bias when modest time or shape distortions should be tolerated.

## Contributions

- Defines [[concepts/optimal-transport-warping|Optimal Transport Warping]], a cumulative-sum distance derived as an upper bound on a sink-based unbalanced transport problem.
- Introduces a window parameter that interpolates between entrywise $\ell_1$ distance and global OTW, allowing the degree of temporal locality to be selected by cross-validation.
- Extends the construction to signed series and smooths the absolute value so the distance can be differentiated and implemented with standard GPU tensor operations.
- Shows how OTW can replace DTW in a neural feature-extraction layer, reducing its complexity from $O(kn^2)$ to $O(kn)$ for $k$ learned templates of length $n$.
- Compares OTW and DTW on 92 UCR datasets, hierarchical clustering, synthetic classification tasks, and the MoteStrain dataset.

## Method

For nonnegative sequences $a,b\in\mathbb R_+^n$, let $A(i)=\sum_{j=1}^i a_j$ and $B(i)=\sum_{j=1}^i b_j$. A sink with waste cost $m$ balances unequal total mass. The paper proves that the associated unbalanced transport cost is upper-bounded by

$$
\operatorname{OTW}_m(a,b)
=m|A(n)-B(n)|+\sum_{i=1}^{n-1}|A(i)-B(i)|.
$$

This expression requires only cumulative sums. To constrain matching locality, OTW replaces full cumulative sums with windowed sums of width $s$. At $s=1$ and $m=1$, the result is $\|a-b\|_1$; at $s=n$, it recovers global OTW. The waste cost $m$ controls the penalty for unequal total mass, while $s$ controls how far mass can effectively move in time.

A smooth $\ell_1$ loss with parameter $\beta$ replaces each absolute value for differentiable learning. Signed series can either be inserted directly into the resulting formula or split into positive and negative parts, with the two same-sign distances added; the choice is made by cross-validation. Because the calculation consists of windowed cumulative sums and elementwise smooth losses, it uses $O(n)$ operations and space and can be batched on GPUs.

The OTW feature layer computes the distance from an input series to each of $k$ learned template rows. This preserves the $O(kn)$ scaling of an ordinary linear layer, whereas a corresponding DTW layer costs $O(kn^2)$.

## Experiments

**1-nearest-neighbor classification.** The authors evaluate 92 fixed-length UCR datasets without missing values, tuning OTW on an 80/20 training-validation split and reporting ten runs with 95% confidence intervals. Aggregated by seven dataset types, OTW meets the paper's improvement criterion in six types and not in the sensor category. The criterion counts OTW as better when its error interval contains or lies below the single reported DTW test error, so the reported six-of-seven result is broader than strict lower mean error.

**Hierarchical clustering.** Agglomerative clustering is evaluated with Rand Index on UCR datasets having at most 500 samples. Averaged by dataset type, OTW exceeds DTW in all seven categories. The reported overall averages are 0.67 RI and 32.15 seconds for OTW versus 0.60 RI and 521.74 seconds for DTW.

**Neural feature layers.** On three synthetic four-class datasets, OTW-Net reaches zero error in about 50-60% of DTW-Net's training time. On MoteStrain, OTW-Net reaches roughly 14% test error in about 30 minutes, whereas the smaller DTW-Net reaches about 25% error after roughly 12 hours. Forward/backward timing curves on CPU and GPU also favor OTW-based layers as sequence length increases.

The paper summarizes runtime gains as roughly 10-30 times over DTW depending on the dataset. Its aim is an apples-to-apples comparison of distances, not state-of-the-art classification.

## Limitations

- The method is restricted to one-dimensional time series; extension to multivariate series is left for future work.
- OTW is designed for signals that can be interpreted as measures. The experiments exclude motion and trajectory datasets because position-valued sequences do not fit this interpretation well.
- OTW does not dominate DTW on every dataset. Sensor classification is weaker in the aggregate, and the authors explicitly present OTW as a resource-efficient complement rather than a replacement.
- The local window, waste cost, smoothing, and treatment of negative values require validation choices; different settings change the distance's inductive bias.
- The unbalanced OT formula is an upper bound on the sink-based transport problem, not its exact solution in general.
- Classification comparisons use one published DTW result against an interval from ten OTW runs, and the paper's inclusive improvement rule can count statistical parity as improvement.
- Neural comparisons use unequal first-layer widths on real data (500 OTW templates versus 100 DTW templates) to keep DTW training feasible, so they demonstrate practical scaling rather than a fully capacity-matched architecture comparison.

## Related Concepts

- [[concepts/optimal-transport-warping|Optimal Transport Warping]]: the paper's linear-time distance based on local cumulative mass differences.
- [[concepts/optimal-transport|Optimal Transport]]: supplies the mass-transport interpretation and the one-dimensional cumulative-sum identity.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: handles unequal total mass through a sink with a tunable waste cost.
- [[concepts/dynamic-time-warping|Dynamic Time Warping]]: the quadratic-time temporal alignment baseline that OTW complements.

## Related Papers

- [[papers/spatio-temporal-alignments-optimal-transport-through-space-and-time|Spatio-Temporal Alignments: Optimal transport through space and time]]: combines unbalanced spatial transport with Soft-DTW; OTW instead obtains linear scaling from one-dimensional cumulative sums.
- [[papers/averaging-spatio-temporal-signals-using-optimal-transport-and-soft-alignments|Averaging Spatio-temporal Signals using Optimal Transport and Soft Alignments]]: uses transport and smooth temporal alignment for barycenters rather than defining a linear-time scalar-series distance.
- Cuturi and Blondel (2017), "Soft-DTW: a Differentiable Loss Function for Time-Series": differentiable but quadratic-time DTW relaxation used as a comparison.
- Cai et al. (2019), "DTWNet: a Dynamic Time Warping Network": neural architecture whose DTW feature layer is replaced by OTW in this paper.
- Vallender (1974), "Calculation of the Wasserstein Distance Between Probability Distributions on the Line": source for the cumulative-distribution formula underlying the linear-time construction.

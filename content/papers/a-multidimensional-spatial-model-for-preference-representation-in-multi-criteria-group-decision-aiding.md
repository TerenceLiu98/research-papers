---
title: "A Multidimensional Spatial Model for Preference Representation in Multi-Criteria Group Decision Aiding"
type: paper
authors:
  - Arwa Khannoussi
  - Antoine Rolland
  - Julien Velcin
year: 2024
hal: hal-03782818v2
source_job_id: "33da6f8a-613c-45e4-85e7-2573751a1b47"
tags:
  - multi-criteria-decision-making
  - preference-elicitation
  - spatial-models
  - group-decision-making
  - single-peaked-preferences
---

## TL;DR

Khannoussi, Rolland, and Velcin place decision makers and known alternatives in the same attribute space, with pairwise preferences represented by weighted Euclidean proximity. Nonlinear optimization learns each decision maker's ideal position and attribute weights from holistic comparisons, optionally linking group members through shared weights or nearby positions and allowing inconsistent judgments through slack variables. Synthetic experiments show better held-out rank agreement with more comparisons but worse scalability and generalization as dimensionality grows; a two-stakeholder urban-planning illustration shows that different linking assumptions can produce different compromise alternatives.

## Research Question

Can a spatial model learn explainable, potentially non-monotonic multi-attribute preferences from pairwise judgments while also supporting comparison and compromise among multiple decision makers?

## Motivation

Many [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]] methods require decision makers to state attribute directions or model parameters directly. Those requirements are difficult when an intermediate attribute value is ideal or when stakeholders can compare complete alternatives more readily than they can specify weights. Borrowing the geometry of spatial voting makes each person's position an ideal alternative and uses distance to explain rankings directly in the original attribute space.

## Contributions

- Defines a spatial preference model in which alternatives and decision makers occupy the same multidimensional attribute space and proximity induces a total preorder.
- Specializes the model to weighted Euclidean distance, combining an ideal position with decision-maker-specific attribute weights and thereby representing additive, single-peaked rather than necessarily monotonic preferences.
- Formulates inference from strict-preference and indifference judgments for compatible and partially incompatible data.
- Introduces group variants with independent parameters, common attribute weights, nearby positions, or both shared positions and weights.
- Uses the learned geometry to rank alternatives, find an alternative minimizing total distance to the group, and, when weights are shared, cluster decision makers by position.

## Method

Each alternative $a$ is a known point in $\mathbb{R}^m$. Decision maker $i$ has an inferred ideal point $X^i$ and nonnegative weights $w_j^i$ summing to one. Preferences follow

$$
a \succsim_i b \quad\Longleftrightarrow\quad
\sum_j w_j^i(x_j^i-a_j)^2 \leq \sum_j w_j^i(x_j^i-b_j)^2.
$$

The optimization variables are the positions and weights. Constraints encode strict preferences and indifferences; slack variables minimize violations when the judgments are incompatible with the model. Group structure is imposed either by equating weights across decision makers or by bounding coordinate-wise differences between their positions by a tolerance $\mu$. The resulting nonlinear mixed-integer programs are solved with Gurobi using piecewise-linear approximations after omitting the monotonic square root.

For group choice, the proposed compromise rule selects the observed alternative minimizing the sum of distances to all decision makers. This rule depends on the inferred geometry and is not simply an aggregation of their ordinal rankings.

## Experiments

### Synthetic Evaluation

The authors sample 100 training alternatives and 1,000 held-out alternatives uniformly from $[0,1]^m$, with $m\in\{3,5,7,9\}$. Learning sets contain 5 to 100 randomly selected pairwise comparisons, and results are averaged over 100 repetitions. Held-out rankings from the generating and inferred models are compared using [[concepts/kendall-tau-distance|Kendall's tau]].

- Runtime rises with both comparisons and attributes; the reported mean is about 500 seconds for 100 comparisons in nine dimensions on a 20-core, 100 GB RAM server.
- Held-out agreement improves with more comparisons and declines with dimension. With five attributes and 100 comparisons, mean Kendall's tau is reported at about 0.9.
- Reversing 5% to 20% of 100 training comparisons lowers agreement on both training and test data. Because of runtime, the noisy experiments are limited to three attributes.

### OOCIT Application

The case study concerns 64 anonymized Lyon-area territories described by five normalized attributes for finding a place to live or establish a business. Two stakeholders rank four territories selected through hierarchical clustering. All three fitted variants reproduce those elicited rankings, but their compromise recommendations differ: $t_{62}$ with independent models, $t_3$ with shared weights, and $t_{60}$ when positions are constrained within $\mu=0.05$. The project selects the nearby-position variant because the stakeholders have similar characteristics and $t_{60}$ lies in both inferred top-four rankings.

## Limitations

- The weighted-Euclidean specification assumes additive distance contributions and single-peaked preferences. It cannot represent arbitrary interactions or preference profiles.
- Several parameterizations can satisfy the same sparse pairwise judgments. Choosing whether stakeholders share weights, positions, both, or neither requires substantive information beyond model fit and can change the compromise recommendation.
- Runtime increases sharply with dimension and query count, and robustness experiments cover only three attributes.
- The synthetic alternatives and generating models match the proposed model family, so held-out performance does not establish behavior under broader misspecification.
- The real-world illustration uses only two anonymized stakeholders and four elicitation alternatives; confidentiality prevents substantive validation of the inferred positions and weights.
- Incremental query selection, interpretable low-dimensional visualization, and negotiation procedures are left for future work.

## Related Concepts

- [[concepts/multi-criteria-decision-making|Multi-Criteria Decision Making]]: the decision-aiding setting in which alternatives have multiple, potentially conflicting attributes.
- [[concepts/euclidean-preferences|Euclidean Preferences]]: the shared-space proximity representation extended here with learned attribute weights and known alternative coordinates.
- [[concepts/kendall-tau-distance|Kendall Tau Distance]]: the rank-agreement measure used for synthetic held-out evaluation.
- [[concepts/consensus-reaching-in-group-decision-making|Consensus Reaching in Group Decision Making]]: a related family of methods for reconciling preferences across stakeholders; this paper instead infers linked spatial models and a proximity-based compromise.

## Related Papers

- Eguia (2013), "On the Spatial Representation of Preference Profiles": provides the spatial representation result adapted to the paper's multi-attribute setting.
- Jacquet-Lagreze and Siskos (2001), "Preference Disaggregation: 20 Years of MCDA Experience": motivates indirect parameter elicitation from holistic judgments.
- Chen et al. (2007), "Multiple-Criteria Sorting Using Case-Based Distance Models with an Application in Water Resources Management": a related distance-based MCDA model with non-monotonic preferences.
- [[papers/error-in-the-euclidean-preference-model|Error in the Euclidean Preference Model]]: studies representational limits and ordinal approximation error for low-dimensional Euclidean preferences.

[[index|Library home]]

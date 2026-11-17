---
title: "A Nonparametric Bayesian Model for Detecting Differential Item Functioning: An Application to Political Representation in the US"
type: paper
authors:
  - Yuki Shiraito
  - James Lo
  - Santiago Olivella
year: 2023
doi: 10.1017/pan.2023.1
tags:
  - bayesian-measurement
  - item-response-theory
  - political-representation
---

## TL;DR

The multiple policy space (MPS) model uses a Dirichlet process mixture of item response functions to identify respondents whose latent positions can be compared. In the 2008 CCES application, post-processing groups approximately 73% of voters with legislators, leaving 27% in a different policy space. These percentages describe substantive groups reconstructed from mixture components, not raw component membership.

## Research Question

Which voters and legislators share sufficiently similar item response functions to support comparisons of their estimated political preferences?

## Motivation

Common survey questions and roll-call votes do not guarantee common measurement. Standard joint scaling constrains item parameters across respondents, potentially concealing differential item functioning (DIF). Testing predefined voter and legislator groups also misses heterogeneity within the electorate.

## Contributions

- Infers respondent groups and group-specific item parameters together without prespecifying substantive group memberships.
- Separates within-group latent measurement from the additional task of interpreting and combining mixture subclusters.
- Shows how apparently robust aggregate joint scaling can coexist with a substantial subgroup whose preferences are not comparable to legislators on the same scale.

## Method

MPS extends [[concepts/item-response-theory|Item Response Theory]] with cluster-specific discrimination and difficulty parameters:

$$
P(y_{ij}=1)=\Phi(\beta_{k[i],j}^{\top}\theta_i-\gamma_{k[i],j}).
$$

A respondent's cluster assignment is constant across items. Gaussian priors govern latent positions and item parameters; [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]] provide stick-breaking allocation probabilities. Conditional on membership, each cluster is a separate probit IRT model. Positions are comparable within clusters; the model does not identify a universal cross-cluster scale.

A truncated Gibbs sampler uses latent-response augmentation. Reported analyses retain the highest-posterior-density draw as a MAP summary to avoid label-switching problems. Because DP components can subdivide a single substantive population, the authors construct graphs of item-parameter correlations and use community detection and a gap statistic to interpret broader groups.

## Experiments

**Simulation (Section 4).** With 1,000 respondents, 200 binary items, and three generating groups, ten fitted subclusters do not mix respondents from different true groups. Community detection recovers the three groups; the gap statistic suggests three or four. Discrimination estimates correlate with generating values at 0.99, 0.97, and 0.97. BIC favors MPS (232,604.7) over single-cluster IRT (252,043). In a homogeneous simulation, the gap statistic selects one substantive group and BIC favors ordinary IRT (168,430.8 versus 173,686.3).

**Political representation (Section 5).** The application uses 32,800 CCES respondents, 550 legislators, and eight bridging items. Legislators remain in one component while voters can move. Estimation runs 110,000 iterations, discards 10,000, and caps components at ten. Six components are occupied: 15,732 voters share the legislators' component directly. Combining components 1, 2, and 5 yields 24,102 voters, approximately 73%; graph analysis identifies two substantive communities.

Model-selection evidence is mixed: BIC favors standard IRT (407,033.7 versus MPS 408,016.4), whereas AIC favors MPS (355,419.4 versus standard IRT 370,214.8). The constrained refit reports BIC 407,426.8 and AIC 365,820.8. Although the text calls that refit unequivocally better than unrestricted MPS, its reported AIC is higher; the numerical evidence does not support improvement on both criteria.

Older and more politically interested respondents are more likely to enter the reconstructed legislator group; Black and Hispanic respondents are less likely than white respondents. Education, income, and gender coefficients do not reach the authors' chosen significance threshold. These are associations, not causal explanations.

## Limitations

- DP component counts do not consistently estimate substantive group counts; raw subclusters must not be interpreted as distinct political populations.
- Comparability is conditional on shared response functions and model assumptions. Separate clusters have their own scale indeterminacies.
- MAP summaries do not convey full posterior uncertainty about allocations and parameters.
- Eight bridging items provide limited information about response-function similarity. Generalization to other datasets and larger item sets remains open.
- The parsed source contains an inconsistent respondent-count string in Section 5; 32,800 is supported by the introduction and Table 2 totals. The reported information-criterion inconsistency is preserved above rather than silently corrected.

## Related Concepts

- [[concepts/differential-item-functioning|Differential Item Functioning]]: heterogeneous response functions undermine common-scale comparisons.
- [[concepts/dirichlet-process-mixtures|Dirichlet Process Mixtures]]: infer flexible respondent partitions, whose components may require substantive consolidation.
- [[concepts/item-response-theory|Item Response Theory]]: supplies the conditional measurement model.
- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: a distinct approach that permits domain-specific positions on a linked scale; MPS groups respondents by response functions.

## Related Papers

Jessee (2016), “(How) Can We Estimate the Ideology of Citizens and Political Elites on the Same Scale?” supplies the reanalyzed dataset and the predefined-group sensitivity approach that MPS extends. Miyazaki and Hoshino (2009), “A Bayesian Semiparametric Item Response Model with Dirichlet Process Priors,” is cited as earlier work combining IRT and Bayesian nonparametrics; the present paper focuses on diagnosing DIF.

Published in *Political Analysis* 31:430–447. Replication data: https://doi.org/10.7910/DVN/BCDALU.

---
title: "Multiple Ideal Points: Revealed Preferences in Different Domains"
type: paper
authors:
  - Scott Moser
  - Abel Rodríguez
  - Chelsea L. Lofland
year: 2021
doi: "10.1017/pan.2020.21"
venue: Political Analysis
source_job_id: "a6ec244b-6c81-4600-8d63-b7b886c2221c"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-measurement
---

## TL;DR

The paper estimates legislators' domain-specific ideal points on a common scale by learning which legislators have identical preferences across domains. A constrained clustering prior permits exact equality and partial pooling. Applied separately to 18 U.S. Houses, it finds increasing cross-issue consistency over much of 1981-2016, with a sharp exception in the 112th House. This consistency captures a different feature of voting from the fit of a conventional one-dimensional spatial model.

## Research Question

How can revealed preferences across predetermined groups of votes be compared on a common scale without specifying in advance which legislators' preferences remain constant?

## Motivation

Separately scaling policy domains produces incomparable latent scales. Comparing ranks avoids some scale indeterminacy, but ranks are interdependent and their uncertainty varies across legislators. Fixing the same politicians as invariant anchors instead assumes part of the substantive answer. [[concepts/multiple-ideal-points|Multiple Ideal Points]] jointly estimates domain positions and the identities of invariant voters.

## Contributions

- Extends Bayesian roll-call scaling from two vote groups to an arbitrary number of predetermined domains.
- Uses legislator-specific partitions to assign positive posterior probability to exactly equal preferences across domains.
- Links domain scales through an inferred set of full stayers, while separately anchoring the resulting common scale.
- Provides individual, issue-level, and chamber-level summaries of preference consistency and borrows information across domains.

## Method

For legislator $i$, motion $j$, and known domain assignment $\gamma_j$, the probit response model is

$$
y_{ij}\sim\operatorname{Bernoulli}\left(\Phi\left[\mu_j+\boldsymbol\alpha_j^\top\boldsymbol\beta_{i,\gamma_j}\right]\right).
$$

Here $\mu_j$ and $\boldsymbol\alpha_j$ are motion parameters, and $\boldsymbol\beta_{ik}$ is a legislator's position in domain $k$. The model writes $\boldsymbol\beta_{ik}=\widetilde{\boldsymbol\beta}_{i,\zeta_{ik}}$: domains with the same cluster label share an ideal point for that legislator. These partitions can differ between legislators. A full stayer has one cluster across all $K$ domains. With $K=1$, or with all legislators full stayers, the model reduces to standard Bayesian [[concepts/item-response-theory|Item Response Theory]] scaling (Section 2).

The partition prior is inspired by the Chinese restaurant process and constrained to contain at least $D+1$ full stayers for a $D$-dimensional space. Their identities are inferred. This restriction supplies the paper's common-scale identification condition; separate anchor constraints fix the scale's remaining arbitrariness during posterior postprocessing. The concentration parameter receives a hyperprior designed to make the full-stayer probability uniform under the unrestricted partition model. A zero-inflated prior on motion discrimination permits unanimous bills to be discounted without dropping them.

Inference combines latent-normal augmentation, a variant of collapsed Gibbs sampling for partitions and positions, and a Metropolis-Hastings update for the concentration parameter. Multiple overdispersed runs and Geweke diagnostics assess convergence. Posterior summaries avoid dependence on arbitrary cluster labels (Sections 4-4.1).

The individual staying frequency is $SF_i=\Pr(L_i=1\mid y)$, where $L_i$ is the number of distinct domain positions. The chamber's average staying frequency is the random quantity $ASF=I^{-1}\sum_i\mathbf{1}(L_i=1)$; its posterior mean averages the individual probabilities. A legislator's base cluster contains the most votes, not necessarily the most domains. Issue-specific staying probabilities measure membership in that cluster; their complements measure deviance.

## Experiments

### Data and Design

The empirical illustration fits each of the 97th-114th U.S. Houses independently, using recorded votes from 1981-2016 and $D=1$. Policy Agendas Project major topics supply the domain labels. The analysis retains 17 of 20 topics, choosing topics that tend to have at least 20 votes in most Houses, and excludes legislators missing more than 25% of session votes. This is an empirical illustration with model comparisons, not a held-out predictive benchmark (Section 5).

### Reported Findings

- **Chamber consistency:** ASF is low during the Reagan and George H. W. Bush presidencies and generally increases subsequently, with a marked fall in the 112th House. The suggested Tea Party explanation is interpretive, not causally identified (Figure 1).
- **Different sources of inconsistency:** The 104th House has substantial variation across issue-specific consistency measures; the 112th exhibits more similar inconsistency across issues despite a comparable aggregate ASF (Figure 2).
- **Dimensionality comparison:** ASF sometimes diverges from W-NOMINATE's first-eigenvalue share of the first two eigenvalues. During the Obama presidency, that share remains high while ASF fluctuates, indicating that the summaries measure different aspects of conflict (Figure 3).
- **Individual variation:** Figure 4 identifies 100 members of the 111th House with $SF_i<0.5$. Democratic movers tend to be relative centrists and Republican movers tend to lie toward their party's right. These are posterior classifications under the model.
- **Pooling and ranks:** Government Operations comparisons in the 111th House are less noisy under the joint model than under separately fitted one-dimensional models. Some movers have small rank changes, while some nonmovers have large rank changes, illustrating why ranks alone are unreliable movement diagnostics (Section 5.4).
- **Prior sensitivity:** The authors report unchanged results under two alternative Gamma priors on the concentration parameter, which induce strongly different prior beliefs about staying (Section 2).

Replication resources reported by the paper are [Code Ocean](https://doi.org/10.24433/CO.5298256.v1) and [Harvard Dataverse](https://doi.org/10.7910/DVN/STH14F). They were not executed for this Wiki entry.

## Limitations

- Common-scale comparison depends on the enforced existence of enough full stayers. Learning their identities does not remove that structural assumption.
- Domain assignments are known, mutually exclusive inputs. Interpretation as issue-specific preferences depends on the substantive validity of that coding; bills are not represented as mixtures of issues.
- Domain count $K$, latent-space dimension $D$, and the number of positions for an individual are distinct. Cluster counts are not interchangeable with conventional latent-dimensionality estimates (Sections 2.1-3).
- Independently fitting Houses does not establish a shared longitudinal scale for their ideal-point values. The temporal comparisons reported here concern consistency summaries.
- The application measures revealed voting preferences and does not identify causes of deviation, such as constituency pressure or party influence. Committee-floor and lame-duck comparisons are proposed applications rather than demonstrated tests.
- The supplied Markdown contains damaged notation and inconsistencies, including the printed normalization of the constrained prior and wording that conflates issue staying with its complement. This summary follows the stated full-stayer restriction and explicit base-cluster definitions rather than reproducing those expressions.

## Related Concepts

- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: legislator-specific domain partitions and inferred common-scale bridges.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: a related formulation using a general position plus topic-weighted offsets.
- [[concepts/item-response-theory|Item Response Theory]]: the underlying latent response model.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes common latent dimensions from substantive issue variation.

## Related Papers

- Lofland, Rodríguez, and Moser (2017), "Assessing Differences in Legislators' Revealed Preferences: A Case Study on the 107th U.S. Senate": the cited two-domain predecessor extended here to arbitrary domain partitions.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: cited related work by Gerrish and Blei using bill content and issue adjustments. The present model instead takes curated domain labels and learns exact equality through clustering.
- Shor, Berry, and McCarty (2010), "A Bridge to Somewhere: Mapping State and Congressional Ideology on a Cross-Institutional Common Space": cited bridging approach that assumes invariant actors in advance.

[[index|Library home]]

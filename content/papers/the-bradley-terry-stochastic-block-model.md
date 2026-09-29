---
title: The Bradley-Terry Stochastic Block Model
type: paper
authors:
  - Lapo Santi
  - Nial Friel
year: null
source_job_id: "06b02d31-15a6-4408-b0b4-c8bbc83576bb"
tags:
  - pairwise-comparisons
  - bayesian-clustering
  - statistical-ranking
  - stochastic-block-models
---

## TL;DR

The BT-SBM assigns a common Bradley-Terry strength to each latent block, producing tied ranks within blocks and an ordered hierarchy between them. A Gnedin partition prior and Gamma data augmentation support joint inference over memberships, strengths, and block count. Across 23 ATP seasons, the authors report better predictive performance than ordinary BT and a small elite tier during the Big Four era that broadens after 2018. Numerical and specification inconsistencies in the supplied manuscript qualify its reproducibility claims.

## Research Question

Can pairwise outcomes support an interpretable ranking of strength tiers while propagating uncertainty about both tier membership and the number of tiers?

## Motivation

Strict rankings can exaggerate small, weakly supported differences between players facing unequal schedules and opponents. Sparse tennis comparisons motivate pooling players with similar ability. The proposed [[concepts/bayesian-rank-clustering|Bayesian Rank Clustering]] explicitly permits equal latent strengths rather than interpreting every estimated difference as a distinct rank.

## Contributions

- Embeds the BT likelihood in a latent block model with one strength per block and within-block win probability exactly one half.
- Uses a Gnedin prior to learn a random, finite block structure with reinforcement of existing groups.
- Derives augmented conditional updates that create and remove blocks through single-item allocation updates, without reversible-jump proposals.
- Combines posterior block counts, membership probabilities, strength summaries, and [[concepts/bayesian-partition-credible-balls|Bayesian Partition Credible Balls]] to describe ranking uncertainty.

## Method

### Model

For match counts $n_{ij}$, wins $w_{ij}$, memberships $x_i$, and positive block strengths $\lambda_k$, the model uses

$$
w_{ij}\mid n_{ij},\mathbf{x},\boldsymbol\lambda
\sim\operatorname{Binomial}\left(n_{ij},
\frac{\lambda_{x_i}}{\lambda_{x_i}+\lambda_{x_j}}\right).
$$

It conditions on the observed comparison schedule. Independent shape-rate $\operatorname{Gamma}(a,b)$ priors govern block strengths. The partition follows the Gnedin member of the Gibbs-type family, with discount $\sigma=-1$ and $0<\gamma<1$ (Sections 4.2-4.3). Its finite population block count is random; the occupied sample count $K$ is determined by the allocations. For $n=105$ and $\gamma=0.8$, Appendix C reports prior mean $K\approx2.36$ and variance about 45.95.

### Inference and Summaries

An exponential-race representation introduces, for each observed unordered pair,

$$
Z_{ij}\mid\mathbf{x},\boldsymbol\lambda,\mathbf{N}
\sim\operatorname{Gamma}(n_{ij},\lambda_{x_i}+\lambda_{x_j}).
$$

Writing $w_i=\sum_{j\ne i}w_{ij}$ and $Z_i=\sum_{j\ne i}Z_{ij}$ gives Gamma block-strength updates with shape $a+\sum_{i:x_i=k}w_i$ and rate $b+\sum_{i:x_i=k}Z_i$. Allocation updates combine partition-prior weights with the augmented likelihood, integrating out a new block's strength before drawing it if selected. Empty blocks disappear. The stated sweep complexity is $O(|E|+nK)$ (Section 5).

The authors center log strengths each iteration and choose $b=\exp\{\psi(a)\}$ so the Gamma prior has zero mean log strength. Blocks are relabeled by descending strength. These are the manuscript's scale and label conventions; centering does not establish zero posterior expectation for every ordered block individually.

The partition estimate minimizes posterior expected variation of information (VI). A 95% credible ball describes alternative partitions around it. The number of blocks in that estimate, the posterior mode of $K$, and the range of block counts among credible-ball boundary partitions are distinct summaries (Section 6). Membership plots conditioned on a fixed $K$ omit uncertainty about $K$ itself.

## Experiments

### ATP Application

Sections 2 and 7 specify 105 players in each of 23 seasons, 2000/2001 through 2022/2023. Seasons are fitted independently with 30,000 iterations, discarding 10,000, and $\gamma=0.8$, $a=2$, $b\approx1.526$. Total reported fitting time is about 35 minutes.

For 2017/2018, $P(K=4\mid W)=0.315$ and $P(K=3\mid W)=0.259$; the reported marginal 95% interval for $K$ is 3-7. The VI estimate has three groups, with Nadal and Federer in its strongest tier. Credible-ball boundary summaries span 3-11 groups, with a six-group horizontal bound. This wider range describes uncertainty in partitions rather than the marginal interval for $K$.

Across seasons, posterior modal counts are three or four. The authors interpret shrinking top-tier size from the mid-2000s to 2018 and subsequent expansion as concentration and later loosening of elite dominance. These are descriptive comparisons of separately fitted seasons.

### Predictive Comparison

Section 7.2.1 compares BT-SBM with individual-strength BT using PSIS-LOO over observed comparisons. Table 3 reports the following season-level ELPD gains:

| Minimum | Median | Mean | Maximum |
| --- | --- | --- | --- |
| 11.17 | 22.52 | 21.99 | 35.49 |

The source reports positive gains in all seasons and gains exceeding one reported standard error in 87% of seasons. The adjacent prose instead gives median 22.99, so the exact median is inconsistent. Its displayed predictive-density and uncertainty formulas also require verification before reuse.

### Simulation and Runtime

Appendix D generates balanced blocks with strengths equally spaced from 0.1 to 3, Bernoulli(0.5) pair inclusion, and Poisson(5) match counts. There are 23 replicates per true count $K^*=3,\ldots,10$. Table 6 reports exact modal-count recovery in all replicates for $K^*=3$ through 7, 22/23 for 8, 18/23 for 9, and 9/23 for 10. For $K^*=10$, 13/23 runs return nine blocks and one returns eight. Reported median ARI exceeds 0.9 through nine blocks and is about 0.85 at ten; the authors report that the true count remains in every 95% posterior interval.

For 10,000 iterations with five generating blocks, Table 1 reports 0.35, 2.06, 4.91, and 123.07 minutes at $n=100,500,1000,5000$, respectively, on an M1 MacBook Air with 8 GB RAM. These timings demonstrate completion at larger sizes, but do not by themselves confirm the claimed linear empirical scaling.

## Limitations

- Exact within-block equality pools potentially different players. A scalar strength hierarchy still imposes transitivity and cannot represent intrinsic matchup cycles.
- Surface, injuries, timing, and tournament context are omitted. Match counts are conditioned on even though success affects tournament exposure. Seasons are independent, so the analysis does not estimate temporal transition dynamics.
- Recovery simulations use the proposed likelihood, balanced groups, and deliberately separated strengths; they do not establish robustness under misspecification or unequal blocks.
- Appendix D specifies $n=150$ in prose but $n=105$ in Algorithm 3. It reports $\gamma=4$, outside the stated Gnedin domain $(0,1)$. These discrepancies prevent an unambiguous reconstruction of the simulation settings from the text.
- Equation (18) computes entropy of proportions across all blocks, although the prose calls it top-block composition entropy. That expression is invariant to block-label permutations and does not alone identify concentration in the strongest block. Its normalization by $\log K$ also needs a convention when $K=1$.
- The abstract refers to 100 players and calendar years 2000-2022, whereas the methods specify 105 and season labels 2000/2001-2022/2023. Appendix E also conflicts with itself about the coarsest boundary's count. This summary follows explicit methods and distinguishes the reported uncertainty measures.
- Publication year, venue, DOI, and arXiv identifier are not stated in the supplied Markdown; none is inferred from cited literature.

The source's Code and Reproducibility section lists the [analysis repository](https://github.com/laposanti/BT-SBM-Bradley-Terry-Stochastic-Block-Model) and [BTSBM R package](https://laposanti.github.io/BTSBM/). They were not used to resolve the manuscript's discrepancies in this ingest.

## Related Concepts

- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]: the pairwise probability model retained at block level.
- [[concepts/bayesian-rank-clustering|Bayesian Rank Clustering]]: tied latent strengths with uncertain ordered groups.
- [[concepts/bayesian-partition-credible-balls|Bayesian Partition Credible Balls]]: partition-level uncertainty beyond a single cluster count.

## Related Papers

- Caron and Doucet (2012), "Efficient Bayesian inference for generalized Bradley-Terry models": cited basis for the augmentation.
- Pearce and Erosheva (2025), "Bayesian rank-clustering": cited strength-fusion approach using a spike-and-slab prior.
- Wade and Ghahramani (2018), "Bayesian Cluster Analysis: Point Estimation and Credible Balls (with Discussion)": cited source for partition summaries.
- [[papers/recent-advances-in-the-bradley-terry-model-theory-algorithms-and-applications|Recent advances in the Bradley-Terry model: theory, algorithms, and applications]]: library context for graph-dependent identification and ranking uncertainty; not a claimed citation in this manuscript.

[[index|Library home]]

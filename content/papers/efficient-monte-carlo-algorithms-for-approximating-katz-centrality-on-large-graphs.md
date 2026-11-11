---
title: Efficient Monte Carlo Algorithms for Approximating Katz Centrality on Large Graphs
type: paper
authors:
  - Garrett W. Cornett
  - Minh Phu Vuong
  - Chul-Ho Lee
year: 2026
doi: 10.1145/3773966.3779378
venue: WSDM 2026
tags:
  - graph-algorithms
  - centrality
  - monte-carlo
  - gpu-computing
---

[[index|Library home]]

## TL;DR

MC-Katz and MC-KatzP estimate Katz centrality using independent, degree-reweighted random walks that map naturally to GPU threads. On nine SNAP networks, the paper reports average GPU speedups of 81.68× and 94.90× over NetworkX-cuGraph, respectively, with high agreement on the top 1% of nodes under the tested attenuation setting.

## Research Question

Can random-walk Monte Carlo estimation approximate all nodes’ Katz scores accurately while exposing enough parallelism to accelerate large-graph computation?

## Motivation

Katz centrality counts walks with exponentially decreasing weights. Direct matrix inversion is expensive, while existing iterative and sampled-subgraph approaches do not necessarily exploit independent GPU work effectively.

## Contributions

- An inverse-probability-weighted estimator of graph walk counts.
- MC-Katz for a fixed truncation of the Katz series, and MC-KatzP for the full series using geometrically distributed walk lengths.
- CUDA implementations and comparisons with serial SAKE and GPU-backed NetworkX.

## Method

The estimators operate on the transposed graph to accumulate incoming-walk influence. A simple random walk selects an outgoing neighbor uniformly. Multiplying a sampled path’s contribution by the product of the degrees encountered before each transition corrects its nonuniform sampling probability (Section 3.1, Equations 4–5).

MC-Katz averages these corrected contributions at lengths 1 through a fixed cutoff, weighting length $k$ by $\alpha^k$ and adding the baseline $\beta$. Its unbiased target is the truncated Katz series, not the full series. Independent paths also yield almost-sure convergence to that truncated target.

MC-KatzP draws $L$ with $P(L=k)=(1-\alpha)\alpha^{k-1}$ for $k\geq1$. Since $P(L\geq k)=\alpha^{k-1}$, multiplying the expected cumulative walk count through $L$ by $\alpha\beta$ recovers the infinite-series contribution. This removes deterministic truncation, while retaining Monte Carlo variability.

Each GPU thread simulates one walk. Consecutive threads share a starting node for cache locality; atomic additions aggregate contributions, and a separate normalization step applies the baseline and averaging. Fixed-length MC-Katz avoids the variable walk lengths of MC-KatzP.

## Experiments

The nine datasets are soc-Epinions1, slashdot0902, email-EuAll, web-NotreDame, web-Stanford, web-Google, wiki-Talk, Pokec, and LiveJournal. Experiments use each graph’s largest strongly connected component, remove self-loops, and transpose edges. Hardware includes an Intel Xeon Gold 5218R and NVIDIA RTX Quadro 8000 with 48 GB GPU memory; implementations use C++ and CUDA 12.4.

Defaults are 1,000 walks per node, cutoff 6 for MC-Katz, $\alpha=1/n$, and $\beta=1$. SAKE uses sampling rate 0.01 and 20 loops. Scores are L2-normalized and compared with NetworkX-cuGraph using mean relative error, Jaccard similarity, precision, MAP, and nDCG.

| Reported result | MC-Katz | MC-KatzP |
| --- | ---: | ---: |
| Average speedup over NetworkX-cuGraph | 81.68× | 94.90× |
| Average top-1% similarity score | 99.96% | 98.95% |
| LiveJournal GPU runtime | 2.5372 s | 1.4871 s |
| LiveJournal mean relative error | 1.15 × 10⁻¹¹ | 1.28 × 10⁻¹⁰ |

NetworkX-cuGraph takes 273.9694 seconds on LiveJournal (Table 4). Serial MC-KatzP takes 192.801 seconds there, whereas SAKE exceeds three days (Table 3). MC-Katz has better ranking accuracy; MC-KatzP benefits from shorter walks on larger datasets. Table 2 gives MC-Katz errors ranging from 7.27 × 10⁻¹² to 2.87 × 10⁻⁸ and MC-KatzP errors from 1.28 × 10⁻¹⁰ to 1.99 × 10⁻⁶.

## Limitations

The evaluation fixes attenuation at $1/n$ and does not establish performance near the spectral convergence boundary. Interpretation: this small attenuation strongly discounts long walks, so both accuracy and runtime should be understood in that regime. Tests on largest strongly connected components do not establish behavior on arbitrary disconnected graphs or sinks. The short paper omits detailed MC-KatzP derivations and provides no finite-sample error bounds. Its prose summary of average MRE does not match a simple arithmetic average of the displayed Table 2 entries; the individual table values are retained here instead.

## Related Concepts

- [[concepts/katz-centrality|Katz Centrality]]: the attenuated walk-count target and the distinction between truncation and sampling error.
- [[concepts/heterogeneous-graph-vote-propagation|Heterogeneous Graph Vote Propagation]]: another use of random walks on graphs, aimed at predicting votes rather than estimating centrality.

## Related Papers

The paper compares against Lin et al.’s *SAKE: Estimating Katz Centrality Based on Sampling for Large-Scale Social Networks* (2021), and discusses Foster et al.’s *A Faster Katz Status Score Algorithm* (2001) and Nathan and Bader’s *Approximating Personalized Katz Centrality in Dynamic Graphs* (2018).

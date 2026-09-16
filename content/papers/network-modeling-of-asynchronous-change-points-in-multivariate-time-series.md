---
title: "Network Modeling of Asynchronous Change-Points in Multivariate Time Series"
type: paper
authors:
  - Carson McKee
  - Maria Kalli
year: null
tags:
  - change-point-detection
  - bayesian-inference
  - time-series
  - network-inference
  - particle-mcmc
---

## TL;DR

NetCP learns a latent directed network linking change-points across time series: a recent change in a leading series raises the probability of a subsequent change in a lagging series. A blocked particle Gibbs sampler jointly estimates segmentations and network parameters. Simulations favor NetCP in lead-lag settings, while independent-change settings favor simpler alternatives; seismic and EEG examples yield interpretable timing networks without establishing causal propagation.

## Research Question

Can a Bayesian model infer both asynchronous change-point locations and the unknown directed relationships linking those changes across multiple time series?

## Motivation

Independent segmentations discard information shared across sensors, while synchronized-change models can miss short propagation delays. A known undirected graph can encourage nearby change-points but cannot represent which series tends to lead another. Seismic wave arrivals and seizure-associated EEG changes motivate learning the direction, strength, and temporal decay of these relationships from data.

## Contributions

- Introduces NetCP, a multivariate run-length process with network-dependent change probabilities and a hierarchical prior on its unknown graph.
- Establishes convergence to a unique stationary distribution for the homogeneous phase and derives change rates and lagged change-indicator covariances for a two-node chain.
- Adapts discrete particle filtering and backward sampling to update each series' complete latent trajectory within a blocked particle Gibbs scheme.
- Evaluates graph recovery and model evidence in simulations, then interprets learned networks in seismic and EEG recordings.

## Method

Let $X_{j,t}$ be the run length in series $j$. It starts at one and either resets to one, indicating a change-point at $t-1$, or increments. Given the preceding run-length vector, series transition independently with reset probability (Section 2.2, Equation 14)

$$
p_{j,t}(\mathbf{x}_{t-1})=
\frac{W_{0,j}q_{0,j}+\sum_{i=1}^{d}A_{i,j}W_{i,j}g_{i,j}(x_{i,t-1})\mathbf{1}\{x_{i,t-1}<t-1\}}
{W_{0,j}+\sum_{i=1}^{d}A_{i,j}W_{i,j}}.
$$

Here $A_{i,j}=1$ represents a directed lead-lag relationship, $W_{i,j}$ controls its weight, and $q_{0,j}$ is a background rate. The indicator excludes the artificial boundary at time zero. The geometric impulse $g_{i,j}(r)=q_{i,j}(1-q_{i,j})^{r-1}$ favors short delays; smaller $q_{i,j}$ spreads influence over longer lags. With no incoming edges, the prior reduces to independent Bernoulli change arrivals. This is a weighted, normalized impulse model based on the most recent change in each series.

The graph prior excludes self-edges and reciprocal pairs. Each unordered pair has probabilities $\rho/2$, $\rho/2$, and $1-\rho$ for the two possible directions and no edge, respectively, with $\rho\sim\mathrm{Uniform}(0,0.2)$. Weights have independent $\mathrm{Gamma}(1,1)$ priors, and background and impulse-rate parameters have uniform priors. Although this construction discourages feedback through sparsity, it does not exclude directed cycles of length three or more.

The observation likelihood factorizes across series and segment densities. Conjugate priors allow segment parameters to be integrated out. Applications use autoregressive segments with changing coefficients and variance under a normal-inverse-gamma prior; simulations also use Gaussian segments with changing means and known variance.

[[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]] updates one series' complete run-length path conditional on the others, followed by Gibbs or Metropolis updates of static parameters. Conditional stratified optimal resampling retains the current trajectory, and backward sampling generates the next path. The paper reports $O(NT)$ particle-recursion cost per series, compared with $O(T^2)$ exact recursions. Taking $N=T$ recovers exact filtering without resampling; smaller $N$ preserves the target stationary distribution under the particle Gibbs construction.

## Experiments

### Simulations

Section 4.1 uses 50 datasets per setting, with four series and 500 time points. Five change structures are crossed with Gaussian-mean and AR(1) likelihoods: a directed chain (S1), two disconnected directed pairs (S2), fully synchronized changes (S3), two synchronized pairs (S4), and independent changes (S5). Graph-recovery fits use 150 particles and 5,000 iterations, discarding 500 iterations.

Mean edge-recovery AUC is 0.99 for both S1 and S2 with Gaussian means, and 0.97 for both with AR segments (Table 1). For the empty graph in S5, AUC is undefined; true-negative rates at an inclusion-probability threshold of 0.5 are 0.998 and 0.987, respectively.

Tables 2-3 compare Yao's independent Bernoulli prior and the G-CCP and NG-CCP priors of Quinlan et al. (2024). Values below are mean log Bayes factors, $\log f_M(y)-\log f_{\mathrm{NetCP}}(y)$; negative values favor NetCP.

| Likelihood | Scenario | Yao | G-CCP | NG-CCP |
| --- | --- | ---: | ---: | ---: |
| Gaussian means | S1: chain | -29.0 | -26.9 | -41.8 |
| Gaussian means | S2: directed pairs | -17.2 | -15.1 | -34.1 |
| Gaussian means | S5: independent | 6.2 | 7.5 | -15.8 |
| AR process | S1: chain | -17.8 | -16.2 | -20.8 |
| AR process | S2: directed pairs | -9.1 | -8.2 | -21.7 |
| AR process | S5: independent | 7.3 | 8.1 | -12.8 |

NetCP has the highest mean evidence in both lead-lag scenarios under both likelihoods, although some reported intervals cross zero. For Gaussian synchronized changes, NG-CCP leads S3 by 2.8 and G-CCP leads S4 by 4.2, with intervals overlapping zero. With AR segments, NetCP leads all comparators in S3 and S4. These are model-evidence comparisons, not direct localization-error measurements.

Appendix C compares samplers on a four-series, 1,000-time-point Gaussian example. For a selected change indicator, integrated autocorrelation time is 58.5 for single-site Gibbs and 1.2 for particle Gibbs with either 50 or 100 particles. The roughly 49-fold ratio concerns samples needed for that posterior estimate, not measured wall-clock speedup.

### Real Data

The seismic example uses seven Parkfield sensors over 100 seconds on September 28, 2004, with 2,000 observations per series and four catalogued microearthquakes. The inferred network places FROB early and SMNB late. For the first event, reported change delays of 1.75 and 3.45 seconds are consistent with the paper's expected P-wave travel-time ranges (Section 4.2).

The EEG example uses CHB-MIT patient CHB01, session 21, from 325 to 340 seconds, with annotated seizure onset at 327 seconds. Filtering, downsampling, differencing, and normalization yield six bipolar-montage series of length 1,279. The inferred ordering starts in T8-P8 and subsequently reaches left temporal and frontal signals, consistent with the prior clinical visual analysis cited by the authors. Both real-data fits use AR(1) segments and two 20,000-iteration chains, 200 particles, and 2,000 burn-in iterations per chain. The manuscript points to `github.com/carsonmckee/NetCP` for code and data.

## Limitations

- Evaluations involve four to seven series. Separate particle filters and a discrete, multimodal posterior limit scalability; the paper does not establish performance for large networks.
- The graph is fixed over time, geometric impulses favor short delays, and segment parameters are independently drawn. Evolving networks, recurring parameter regimes, and nonconjugate likelihoods remain extensions.
- Cycles can induce undesirable bursts of changes. Excluding self-edges and reciprocal pairs does not guarantee acyclicity.
- NetCP loses on model evidence to Yao and G-CCP for independent changes. Simulated Gaussian fits also use the true likelihood hyperparameters, limiting what the comparison establishes about misspecification.
- The real examples provide timing and network interpretations, not broad detection benchmarks or causal validation. The EEG analysis covers one short recording and lacks patient diagnostic information.
- Section 4.2 reports both 20 Hz sampling and a 2-16 Hz bandpass, whose upper cutoff exceeds the corresponding 10 Hz Nyquist frequency. The supplied text does not clarify a different filtering sample rate. Table 1 also contains an inconsistent mean/interval entry; only its mean AUCs are summarized here.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier for this manuscript; these are left unspecified.

## Related Concepts

- [[concepts/asynchronous-change-point-detection|Asynchronous Change-Point Detection]]
- [[concepts/particle-gibbs-sampling|Particle Gibbs Sampling]]
- [[concepts/neuroimaging-data-analysis|Neuroimaging Data Analysis]]: the EEG application estimates temporal relationships among electrophysiological signals.

## Related Papers

These relationships are described in the manuscript's introduction and methods:

- Hallgren, Heard, and Turcotte (2024), "Changepoint Detection on a Graph of Time Series": asynchronous changes coupled through a prespecified undirected graph.
- Quinlan, Page, and Castro (2024), "Joint Random Partition Models for Multivariate Change Point Analysis": source of the G-CCP and NG-CCP comparators.
- Whiteley, Andrieu, and Doucet (2011), "Bayesian Computational Methods for Inference in Multiple Change-points Models": particle MCMC foundation.
- Fearnhead and Liu (2007), "On-Line Inference for Multiple Changepoint Problems": discrete particle filtering and resampling foundation.
- Xie, Xie, and Moustakides (2019), "Asynchronous Multi-Sensor Change-Point Detection for Seismic Tremors": a related frequentist treatment of delayed seismic changes.

[[index|Library home]]

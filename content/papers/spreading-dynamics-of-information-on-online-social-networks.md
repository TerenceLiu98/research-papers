---
title: Spreading dynamics of information on online social networks
type: paper
authors:
  - Fanhui Meng
  - Jiarong Xie
  - Jiachen Sun
  - Cong Xu
  - Yutian Zeng
  - Xiangrong Wang
  - Tao Jia
  - Shuhong Huang
  - Youjin Deng
  - Yanqing Hu
year: null
accepted: 2024-12-16
tags:
  - information-diffusion
  - social-contagion
  - social-networks
---

## TL;DR

Repeated exposure can initially encourage forwarding but eventually reduce it as fewer friends remain uninformed. Meng et al. model these competing effects with an exposure-dependent forwarding probability, fit large cascades on WeChat and Weibo, and examine averaged small cascades on Weibo and Twitter. Simulations suggest that this balance can produce frequent, rapid outbreaks with limited coverage.

## Research Question

Can one behavioral model explain both reinforcement and declining forwarding probabilities after repeated exposure, and connect these individual responses to the size and speed of information cascades?

## Motivation

Models in which repeated exposure only increases forwarding propensity struggle to explain the observed downturn in forwarding probability. The authors treat forwarding as behavior motivated by a message's perceived importance and its remaining audience. Neighborhood overlap can increase repeated exposure while reducing the audience that a new forward would reach.

## Contributions

- Combines linear reinforcement with an audience-depletion term in a compact forwarding-probability equation.
- Connects neighborhood overlap measured from network structure to the damping of repeated-exposure effects.
- Reports nonmonotonic exposure-response curves and explains how their peak depends on the model parameters.
- Compares simulated outbreak coverage, probability, and duration with SIR and reinforcement-only models.

## Method

For message $i$, the empirical conditional forwarding probability is

$$
\beta_i(x)=\frac{m_i(x)}{r_i(x)},
$$

where $m_i(x)$ counts users forwarding at exposure $x$, and $r_i(x)$ counts users exposed at least $x$ times who have not forwarded at earlier exposures. Exposure order is reconstructed from neighbors' posting times and the neighbor from whom a user forwards. In the stated procedure, forwarding from the second posting neighbor is assigned to exposure two even if the forward occurs after a third neighbor posts.

The proposed equation is

$$
\beta_i(x)=\alpha_i x(1-\gamma)^{x^{\omega_i}}.
$$

The factor $\alpha_i x$ represents intrinsic message importance amplified by repeated exposure. The damping term represents the shrinking fresh audience, adjusted by users' uncertainty about forwarding gains. The network parameter $\gamma$ averages the proportion of common friends across neighbors and then users; $\omega_i$ controls the exposure dependence. When $\gamma$ is measured from the network, $\alpha_i=\beta_i(1)/(1-\gamma)$, leaving $\omega_i$ to fit. The paper motivates the power exponent by averaging heterogeneous uncertainty in simpler exponential damping models.

For $0<\gamma<1$ and $\omega_i>0$, the continuous exposure-response curve has stationary maximum

$$
x_i^*=\left[-\frac{1}{\omega_i\ln(1-\gamma)}\right]^{1/\omega_i}.
$$

Observed exposure counts are discrete. A peak at an observed interior count therefore depends on the parameter values and available exposure range.

## Experiments

The source initially contains 294 WeChat, 8,283 Weibo, and 66,064 Twitter trajectories. Large-cascade fitting retains curves with at least five exposure points, each supported by at least 100 forwarding users (Materials and Methods).

| Platform and analysis | Period | Messages | Forwarders per message |
| --- | --- | ---: | ---: |
| WeChat, large cascades | June-October 2019 | 182 | 10,733-468,970 |
| Weibo, large cascades | January-October 2017 | 100 | 3,235-35,045 |
| Weibo, small cascades | January-October 2017 | 7,946 | 1-100 |
| Twitter, small cascades | October 2010 | 11,072 | 1-100 |

Table 1 defines exposed-user totals as sums across messages, not distinct individuals. The approximately 7.45 billion figure corresponds to the combined large-cascade exposed-user totals for WeChat and Weibo; it should not be read as a unique-user sample size.

- **Exposure-response fits:** Figures 1 and 2 report close agreement for large-cascade curves. The maximum occurs at exposure two or three for 55% of the WeChat messages. Detailed fit metrics are referred to the supplementary material rather than numerically tabulated in the supplied text.
- **Network overlap:** WeChat's directly measured mean overlap is $\gamma=0.24\pm0.001$. Joint fitting across trajectories yields $0.28\pm0.02$, with the latter uncertainty reported as a bootstrap standard deviation. The authors interpret the proximity as support for the structural interpretation of $\gamma$.
- **Small cascades:** Averaging message-level response curves produces a rise-then-fall pattern. Twitter is restricted to this analysis because its underlying data are incomplete; this is not evidence of accurate individual fits for every small cascade.
- **Model comparisons:** The illustrated SIR, linear-threshold, and two reinforcement-only response rules lack the same nonmonotonic shape. Lower overlap increases forwarding probability in the proposed equation, providing a model-based interpretation of weak-tie effects (Figure 3).
- **Cascade simulations:** On networks with empirical WeChat features, the proposed model produces relatively small coverage, higher outbreak probability relative to coverage, and shorter mean propagation duration than the illustrated alternatives. Figure 4 fixes $\omega=0.95$ and varies intrinsic spreading power for its principal comparison. These are simulation results, not directly measured changes in platform throughput or diversity.

## Limitations

The empirical fits support a description of observed exposure-response patterns; they do not independently identify perceived importance or fresh-audience calculations as causal psychological mechanisms. Large-cascade filtering selects trajectories with adequate exposure support, while small-cascade averaging can conceal message heterogeneity. The authors explicitly leave universality across platforms for further confirmation.

Quote-forward comments and bots are not adequately covered by the available empirical data. Predicting final cascade size using the model with AI is proposed as future work. Original WeChat trajectories and network data are restricted by the platform agreement; the paper points to processed data in Figshare, reference 51, identifier `10.6084/m9.figshare.27265428.v1`.

The supplied Markdown reports acceptance on December 16, 2024, but does not establish the publication year or paper DOI. Its supplementary appendix is referenced but not included; claims dependent on that appendix are reported as the authors' descriptions.

## Related Concepts

- [[concepts/social-reinforcement-and-weakening|Social Reinforcement and Weakening]]: competing effects of repeated exposure and audience overlap.
- [[concepts/threshold-contagion|Threshold Contagion]]: an alternative way to express exposure-dependent adoption.
- [[concepts/higher-order-social-contagion|Higher-Order Social Contagion]]: explicitly models groups, whereas the present equation summarizes repeated exposure and neighborhood overlap on a social network.
- [[concepts/social-network-analysis|Social Network Analysis]]: provides the structural interpretation of common-neighbor overlap.

## Related Papers

- Centola (2010), "The spread of behavior in an online social network experiment": experimental reinforcement evidence discussed in the introduction, reference 30.
- Romero, Meeder, and Kleinberg (2011), "Differences in the mechanics of information diffusion across topics: Idioms, political hashtags, and complex contagion on Twitter": exposure-dependent diffusion patterns, reference 35.
- Ugander et al. (2012), "Structural diversity in social contagion": structural evidence discussed in relation to common neighbors and transmission, reference 36.

[[index|Library home]]

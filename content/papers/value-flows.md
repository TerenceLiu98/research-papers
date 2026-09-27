---
title: Value Flows
type: paper
authors:
  - Perry Dong
  - Chelsea Finn
  - Dorsa Sadigh
  - Benjamin Eysenbach
year: null
source_job_id: b0a76abd-d5b7-4c96-a7d4-3e05ad346baf
tags:
  - distributional-reinforcement-learning
  - flow-matching
  - offline-reinforcement-learning
  - return-uncertainty
---

## TL;DR

Value Flows learns a continuous distribution of discounted returns with a flow-based critic, combines a distributional temporal-difference objective with bootstrapped flow-matching regularization, and gives greater training weight to transitions with higher estimated return variance. The authors report a 1.3-fold average improvement across their benchmark evaluation, with especially large offline gains on manipulation puzzles. Performance is not uniformly better: visual medium-maze navigation and D4RL Adroit favor other methods, and the supplied online-results table qualifies the main text's superiority claim. The uncertainty estimate is a first-order approximation to return variability, not a separation of epistemic and aleatoric uncertainty.

## Research Question

Can an expressive continuous return model improve distribution estimation and policy learning in offline and offline-to-online reinforcement learning, while providing useful mean and variance estimates for action selection and critic training?

## Motivation

Scalar critics discard the shape of future returns. Categorical and quantile-based approaches retain more information, but motivate investigating a different continuous parameterization. Value Flows applies [[concepts/flow-matching|Flow Matching]] to the critic in [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]], using variability in predicted returns to allocate learning effort. The main continuous-control policies still select actions by estimated expected return.

## Contributions

- A distributional flow-matching formulation connecting return-density backups to learned vector fields, with an idealized fixed-policy argument based on the distributional Bellman operator (Sections 4.1-4.2; Appendix B.1).
- A sample-based conditional objective and a practical combination of target networks, bootstrapped regularization, and uncertainty weighting.
- An initial-vector-field estimate of expected return and a flow-derivative ODE for a first-order variance estimate (Section 4.3; Appendix B.2).
- Offline and online fine-tuning evaluations, return-histogram diagnostics, component ablations, and a small risk-sensitive control example.

## Method

**Return critic.** For a policy $\pi$, the target is the conditional discounted-return random variable $Z^\pi(s,a)$, with distributional backup

$$
\mathcal T^\pi Z(s,a)\overset{d}{=}r(s,a)+\gamma Z(S',A').
$$

A state-action-conditioned vector field $v_\theta(z^t\mid t,s,a)$ transports Gaussian noise to return samples through an ODE. Flow time $t$ is distinct from environment time. The paper constructs a distributional flow matching (DFM) objective and a sample-based distributional conditional flow matching (DCFM) objective, reporting equality of their gradients for a fixed historical field. Its contraction argument concerns idealized distributional policy evaluation; it does not by itself establish convergence of the practical neural actor-critic algorithm.

**Practical critic loss.** DCFM alone can produce a degenerate field and trivial task performance. A Polyak-averaged target field supplies next-state return samples. Bootstrapped conditional flow matching (BCFM) interpolates between Gaussian noise and the target return $r+\gamma z'^1$, regressing the corresponding displacement. Both objectives receive the confidence weight, giving

$$
\mathcal L_{\mathrm{Value\ Flow}}
=\mathcal L_{\mathrm{wDCFM}}+\lambda\mathcal L_{\mathrm{wBCFM}}.
$$

**Mean and variance.** The expected initial vector field estimates $Q(s,a)$:

$$
\widehat Q(s,a)=\mathbb E_{\epsilon\sim\mathcal N(0,1)}[v(\epsilon\mid0,s,a)].
$$

Writing $J_t=\partial\phi(\epsilon\mid t,s,a)/\partial\epsilon$, the sensitivity of the flow to its initial noise obeys

$$
\frac{dJ_t}{dt}=\frac{\partial v}{\partial z}(z^t\mid t,s,a)J_t,
\qquad J_0=1.
$$

The paper estimates return variance by $\mathbb E_\epsilon[J_1^2]$, using a first-order Taylor approximation. Euler integration and vector-Jacobian products compute the flow and its sensitivity together. The weight $w=\sigma(-\tau/|J_1|)+0.5$ increases with estimated spread and lies between 0.5 and 1; one noise draw supplies the practical Monte Carlo estimate. This emphasizes high-variability transitions rather than treating them as more certain predictions.

**Policy extraction.** Offline action selection samples candidates from a behavior-cloned flow policy and selects the candidate with the largest estimated Q-value. Online fine-tuning trains a stochastic one-step actor to maximize Q while remaining close to the fixed behavior policy through a squared-distance distillation term (Appendix C.2). Defaults include 10 Euler steps, 16 action candidates, batch size 256, learning rate $3\times10^{-4}$, and target-update coefficient 0.005. The implementation uses JAX, four 512-unit hidden layers, and a small IMPALA encoder for images.

## Experiments

**Protocol.** Table 1 describes 25 state-based OGBench tasks, 12 D4RL Adroit tasks, and 25 image-based OGBench tasks. OGBench reports success rates; Adroit reports normalized returns, not success percentages. Results use eight seeds for state inputs and four for image inputs. Comparators include BC, IQL, ReBRAC, FBRAC, IFQL, FQL, C51, IQN, and CODAC; the distributional baselines use adapted flow policies for continuous actions. Hyperparameters are tuned on a designated task per domain.

**Offline results (Table 1).** Selected domain means and standard deviations illustrate both gains and failures. The strongest comparator is selected separately for each row.

| Domain | Value Flows | Strongest comparator |
| --- | --- | --- |
| cube-double-play | $69\pm4$ | CODAC: $61\pm6$ |
| cube-triple-play | $14\pm3$ | IQN: $6\pm0$ |
| puzzle-3x3-play | $87\pm13$ | FQL: $30\pm4$ |
| puzzle-4x4-play | $27\pm4$ | IQN: $27\pm4$ |
| visual-antmaze-medium-navigate | $75\pm10$ | ReBRAC: $87\pm4$; IFQL: $87\pm2$ |
| D4RL Adroit, normalized return | $50\pm2$ | ReBRAC: 59 |

The authors describe best or near-best results on 9 of 11 domains, where near-best means within 95% of the best score, not a statistical significance criterion. Table 3 also includes unsolved tasks, including scene-play task 5 with zero success for every method.

**Return-distribution diagnostic (Section 5.1).** On scene-play task 2, a learned FQL policy collects 5,000 optimal and suboptimal trajectories. Histograms use 5,000 return samples and 60 bins. The authors report approximately threefold lower 1-Wasserstein discrepancy than the strongest tested alternative, comparing Value Flows with C51 and CODAC. This is a one-task distribution-fit experiment measured using [[concepts/optimal-transport|Optimal Transport]], separate from policy-success comparisons.

**Online fine-tuning (Table 4).** Across six OGBench tasks and eight seeds, Value Flows improves, for example, from $29\pm6$ to $86\pm3$ on humanoidmaze-medium and from $14\pm3$ to $51\pm12$ on puzzle-4x4. It is not the best final policy on every task: FQL reaches $92\pm3$ versus $79\pm6$ on cube-double and $83\pm12$ versus $70\pm7$ on cube-triple. Table 4 reports RLPD at $100\pm0$ on puzzle-4x4, conflicting with Section 5.2's claim that Value Flows beats all prior methods there by 15%.

**Ablations and cost (Appendix D).** On two selected tasks, tuning BCFM regularization reportedly improves mean performance 2.6-fold; confidence weighting yields a reported 60% average gain. Removing BCFM harms performance, while using BCFM alone yields near-zero success on two other tasks, supporting complementary roles for the losses. One or two critic flow steps nearly fail on the tested 3x3 puzzle; performance saturates around 10 steps. A Gaussian behavior policy improves mean performance by about 10% on four Adroit expert variants, limiting the inference that the flow policy is always preferable. Resource comparisons cover one state task and one image task: reported training time is similar to FQL and roughly half IQN's time.

**Risk-sensitive example (Appendix D.4).** An 11-state machine-replacement MDP uses 100,000 offline transitions and four seeds. With actions selected by lower-tail $\mathrm{CVaR}_{0.1}$, Value Flows and IQN reach the reported optimum after roughly 600 gradient steps, whereas C51 does not converge within 5,000. This experiment changes the policy-selection criterion and does not establish risk-sensitive performance across the main benchmarks.

## Limitations

- Return variance does not separate uncertainty about the learned model from stochasticity in transitions and future actions. Section 4.3 describes aleatoric uncertainty; Appendix E.2's isolated use of "epistemic" conflicts with that account and the conclusion's explicit limitation.
- The derivative-based variance is a first-order approximation. Neural estimation, finite noise sampling, and numerical integration add approximation beyond the idealized analysis.
- Results depend on policy extraction and task-specific hyperparameters. The Adroit policy ablation covers four expert variants, not all 12 Adroit datasets.
- Counts are inconsistent in the supplied text: the abstract and Table 1 imply 37 state-based plus 25 image-based tasks, Section 5 says 36 state-based tasks, and Table 3's caption says 49 OGBench plus 12 D4RL tasks. The parsed Table 3 also omits the visual-puzzle rows listed in Table 1. These discrepancies are not silently reconciled.
- The supplied Markdown ends at the caption of Table 6, without its domain-specific hyperparameter values. It also contains damaged equations. This summary follows readable definitions and attributes theoretical claims to the authors rather than treating the extraction as a verified proof.
- The source does not state a publication year, venue, DOI, or arXiv identifier. The author list follows its visible byline; a separate contact address is insufficient to establish another author. Source-listed resources are the [project page](https://pd-perry.github.io/value-flows) and [code repository](https://github.com/chongyi-zheng/value-flows); their current contents were not checked for this ingest.

## Related Concepts

- [[concepts/distributional-reinforcement-learning|Distributional Reinforcement Learning]]: estimating conditional return laws and extracting expectation- or risk-based decisions.
- [[concepts/flow-matching|Flow Matching]]: vector-field learning, ODE sampling, and derivative-based distribution summaries.
- [[concepts/optimal-transport|Optimal Transport]]: Wasserstein contraction in policy evaluation and distribution-fit diagnostics.

## Related Papers

- Bellemare, Dabney, and Munos (2017), "A distributional perspective on reinforcement learning": distributional Bellman analysis and categorical return modeling.
- Dabney et al. (2018), "Implicit quantile networks for distributional reinforcement learning": quantile-based comparator.
- Ma, Jayaraman, and Bastani (2021), "Conservative offline distributional reinforcement learning": CODAC comparator.
- Lipman et al. (2023), "Flow matching for generative modeling": conditional flow-matching foundation.
- Park, Li, and Levine (2025), "Flow Q-learning": implementation base, policy-distillation mechanism, and scalar-critic comparator.
- Farebrother et al. (2025), "Temporal difference flows": cited generative temporal-difference work and target-field precedent.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]]: a library comparison using generative objectives for future observations; Value Flows instead models returns. This is a conceptual connection, not a citation claimed by the source.

[[index|Library home]]

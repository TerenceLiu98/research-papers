---
title: "JEPA-Anything: Learning Predictive Models across Different Worlds"
type: paper
authors:
  - Taoyong Cui
  - Zhongyao Wang
  - Xinyue Xu
  - Weiyang Liu
  - Zhaochen Yu
  - Yuying Zhang
  - Qiang Gao
  - Mengyue Yang
  - Wanli Ouyang
  - Pheng Ann Heng
  - Yingcheng Wu
  - Zhenfei Yin
  - Ling Yang
year: null
source_job_id: "7248ebf8-4373-4057-b8ae-1d8b4f4bca57"
tags:
  - world-models
  - representation-learning
  - self-supervised-learning
  - latent-prediction
---

## TL;DR

JEPA-Anything uses orthogonal predictive factorization (OPF) to divide a latent target into complementary learned subspaces, predict each separately, and synthesize a complete state. Domain-specific implementations share this objective across seven domains. The paper reports improvements on all ten matched dynamics tasks and all four molecular systems, but continuous-control planning improves on Walker2d and HalfCheetah while worsening on Hopper. Orthogonality supports stable coordinate synthesis; it does not establish causal factors or aligned representations across domains.

## Research Question

Can a common factorized latent-prediction objective organize predictive capacity across heterogeneous systems while supporting representation readout, repeated transitions, planning, and scientific analysis?

## Motivation

In standard [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]], one prediction pathway targets a monolithic embedding. The authors argue that easily predicted or high-variance components can dominate this objective. OPF distributes target directions among branches while retaining an explicit map back to the full state needed by [[concepts/world-models|World Models]].

## Contributions

- A shared context-target interface with domain-specific tokenization, descriptors, encoders, and sampling rules.
- Learned target subspaces with dedicated predictors, within- and cross-factor orthogonality penalties, and separate factor/encoder activity regularization.
- Exact and approximate conditioning guarantees for synthesis, plus empirical tests of geometry and factor use.
- Evaluations across vision, single-cell biology, clinical trajectories, control, molecular dynamics, physical fields, and weather, with biological intervention and orbital-law diagnostics.

## Method

### Factor Prediction and Synthesis

A domain adapter creates tokens and structural descriptors. An online encoder supplies context $z_c$, and an exponential-moving-average target encoder supplies $z_t\in\mathbb R^d$. For $K$ learned basis blocks $P_k\in\mathbb R^{d\times r}$ with $Kr=d$,

$$
u_t^{(k)}=P_k^\top\operatorname{sg}(z_t),\qquad
\widehat u_t^{(k)}=q_k(z_c,s_t).
$$

The target encoder receives no gradients, but the projectors remain trainable. Predictors may use independent branches or a shared trunk with separate heads. With $P=[P_1,\ldots,P_K]$, concatenated factor predictions are synthesized as

$$
\widehat z_t=(P^\top)^\dagger\widehat u_t.
$$

Actions, interventions, or known forcing enter the context or descriptors. Synthesized states can be decoded, scored by a planner, or reused in subsequent transitions (Section 2.2).

### Objective and Guarantees

The training loss retains each domain's original base loss and adds factorwise mean squared prediction error, orthogonality regularization, a projected-target standard-deviation floor, and an online-encoder standard-deviation floor:

$$
\mathcal L_{\rm train}^{(\delta)}=\mathcal L_{\rm base}^{(\delta)}+
\mathcal L_{\rm pred}+\lambda_{\rm orth}\mathcal L_{\rm orth}
+\lambda_{\rm fac}\mathcal L_{\rm fac}+\lambda_{\rm enc}\mathcal L_{\rm enc},
$$

$$
\mathcal L_{\rm orth}=\sum_k\|P_k^\top P_k-I_r\|_F^2+
\sum_{i<j}\|P_i^\top P_j\|_F^2.
$$

The factor activity term shapes projectors because target embeddings are stopped; the encoder term supplies a direct anti-collapse gradient. At exact orthogonality, synthesis reduces to $P\widehat u$, preserves factor-error norm, and has condition number one. If $\|P^\top P-I\|_2\leq\epsilon<1$, Appendix A bounds synthesis error by $\|e\|_2/\sqrt{1-\epsilon}$. These results concern the coordinate map, not learned transition accuracy or bounded long-run rollout error.

The controlled geometry analysis uses a strict QR-based orthogonal decomposition. Predictive models instead use regularized projectors with pseudoinverse synthesis. Ordinary representation readout discards the target encoder, projectors, and heads; operational prediction retains them. Factor analysis projects online-encoder states into learned coordinates (Section 2.4).

## Experiments

Matched JEPA comparisons hold data, backbone, sampling, optimization budget, readout, and inherited base loss fixed. OPF adds both factorization and its regularizers, so these comparisons test the combined design. Most evaluations use five training seeds; visual binding uses ten and the 50-step Burgers test uses three.

### Terminal Readout

- **Visual binding:** With the same learned-grid readout, DINOv3 held-out-cell accuracy increases from 0.572 to 0.581 and SigLIP2 from 0.483 to 0.490; collapse rates decrease (Table 3).
- **Single cells:** Following pretraining on approximately 800,000 kidney cells, PBMC zero-shot AvgBIO rises from Cell-JEPA's 0.7194 to 0.7752. Norman and Adamson absolute post-perturbation expression correlations rise from 0.787/0.937 to 0.814/0.942 (Table 4). These correlations are not response-difference metrics.
- **Clinical forecasting:** A GPT-2-small encoder predicts a synthesized future patient state, decoded into more than 1,000 event risks. The source reports higher mean PRAUC than monolithic JEPA on a fixed patient split of de-identified UK Biobank data. Numerical PRAUC values are confined to a figure and are not supplied as text.

### Dynamics and Control

| Evaluation | Standard JEPA | JEPA-Anything |
| --- | --- | --- |
| Pong single-intervention one-step MSE | 0.009541 | 0.006218 |
| Pong unseen combined-intervention one-step MSE | 0.009441 | 0.008223 |
| Pong six-step free-rollout MSE | 0.009478 | 0.008665 |
| PDEBench Burgers step-six MSE | 0.006369 | 0.004014 |
| APEBench Burgers six-step rollout MSE | 0.29186 | 0.16153 |
| APEBench KS held-out late-state MSE | 1.1012 | 0.9558 |

Pong reductions are 34.83%, 12.90%, and 8.58%, respectively (Section 3.3.1). The ten-task matched benchmark reports improvements across CausalWorld, DMC, physical-field, synthetic, and weather tasks. APEBench and PDEBench have different normalizations and should be compared only within their protocols. In the capacity-matched 50-step Burgers test, relative improvements narrow from 5.84% at H20 to 3.15% at H50 in distribution, and from 5.01% to 2.82% under high-frequency OOD input (Table 8).

The geometry audit reports condition number 1.00005 versus 438.52 for unconstrained heads. Its near-zero transpose-synthesis NMSE uses exact factors, isolating coordinate geometry from prediction error (Table 5). This does not demonstrate that pseudoinverse synthesis for every unconstrained full-rank basis is biased.

Capacity-matched CEM planning improves mean return on Walker2d and HalfCheetah but loses to standard JEPA on Hopper. Factor-count variants differ by less than 0.3% in training parameters and 2% in prediction-head FLOPs. Replacing any factor by its training-set mean increases 20-step rollout error in all three environments. In HalfCheetah, masking F1/F3 lowers return in all five seeds, while masking F2/F4 does so in four of five (Sections 3.3.3-3.3.4).

### Molecular and Scientific Tests

With a TrajCast-style equivariant backbone, OPF acts on the multiplicity channels of the vector representation identically across its three spatial components. It achieves the lowest one-step displacement MAE and 100-step final-position RMSD among scratch, TrajCast-JEPA, and OPF conditions in all four systems. Mean 100-step RMSD across seeds, with each seed summarized by its median, changes from TrajCast-JEPA's 2.536 to 2.459 angstroms for water, 1.912 to 1.877 for quartz, 1.868 to 1.776 for paracetamol, and 0.0701 to 0.0645 for benzene (Table 9).

Factor analysis nominates IL-18 plus NT5E/CD73 blockade. The authors report enhanced antitumor activity in co-culture, patient-derived organoids and tumor fragments, and mice; Figure 8 covers three organoid and three fragment specimens. Separately, spectral analysis of one simulated orbital run recovers a frequency-semimajor-axis slope of -1.4991 with $R^2=0.9999999$, close to Keplerian -3/2 scaling (Section 3.4).

## Limitations

- The shared algorithm is instantiated with domain-specific models and objectives. Cross-domain representation alignment or transfer by a single jointly trained universal model is not established.
- Orthogonal subspaces need not encode statistically independent, semantic, or causal variables. Probes and masking establish accessible information and functional use, not causal identification.
- Orthogonality bounds error amplification in synthesis only. Prediction, uncertainty under distribution shift, and long-horizon reliability require separate evidence.
- Planning gains are environment-dependent, including the negative Hopper result; the 50-step Burgers gains are smaller than those at 20 steps.
- Clinical rankings and several cross-task summaries are figure-based. The supplied text lacks enough numerical detail to reconstruct these comparisons or assess clinical calibration and deployment utility.
- The biological section gives limited detail on the nomination procedure and experimental uncertainty. The orbital result is one analyzed run testing a known law, not evidence of general autonomous scientific discovery.
- The supplied Markdown contains damaged mathematical symbols and no explicit publication year, venue, or stable identifier for this paper. Metadata are left unasserted; identifiers in its bibliography describe cited works.

## Related Concepts

- [[concepts/orthogonal-predictive-factorization|Orthogonal Predictive Factorization]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/world-models|World Models]]
- [[concepts/disentangled-representations|Disentangled Representations]]

## Related Papers

- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture": the masked-image JEPA predecessor (reference [3]).
- ElSheikh et al. (2026), "Cell-JEPA: Latent representation learning for single-cell transcriptomics": the single-cell protocol and monolithic comparator (reference [10]).
- Lippe et al. (2022), "CITRIS: Causal identifiability from temporal intervened sequences": the intervention benchmark and a distinct causal-identification approach (reference [21]).
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]] is a library comparison: its conditional latent-recovery theory addresses identification, whereas OPF's guarantees concern factor-coordinate synthesis. It is not listed in this paper's bibliography.
- [[papers/nano-world-models-a-minimalist-implementation-of-future-video-prediction|Nano World Models: A Minimalist Implementation of Future Video Prediction]] is a library comparison separating predictive representations from planning performance, not a cited baseline here.

[[index|Library home]]

---
title: "JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning"
type: paper
authors:
  - Jing Yu Lim
  - Rushi Shah
  - Zarif Ikram
  - Samson Yu
  - Haozhe Ma
  - Tze-Yun Leong
  - Dianbo Liu
year: null
source_job_id: "471ed879-d857-4917-ab8f-f302cb3f0b1a"
tags:
  - world-models
  - model-based-reinforcement-learning
  - diffusion-models
  - representation-learning
---

## TL;DR

JEDI trains a latent diffusion world model and its visual encoder jointly through future-latent denoising, reward prediction, and termination prediction, without pixel reconstruction or a pretrained representation model. On Atari100k it reports competitive control performance while reducing A100 training time from DIAMOND's 98 hours to 38 hours at the same reported 13.5M parameters. The paper reports 43% less GPU memory and over threefold faster world-model sampling. Atari results select the better of two batch sizes per game; the information-bottleneck analysis motivates the predictive objective but does not establish full bottleneck optimization or collapse-free learning.

## Research Question

Can online diffusion-based reinforcement learning learn its latent representation directly from predictive denoising, retaining strong control performance while reducing the cost of pixel-space diffusion?

## Motivation

Pixel-space diffusion models must repeatedly predict visual detail, making imagined rollouts expensive. Separately learned latent spaces reduce computation but need not retain the features most useful for dynamics and control. JEDI combines [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]] with [[concepts/diffusion-models|Diffusion Models]] so that the world-model prediction objective shapes the encoder during online learning.

## Contributions

- An end-to-end predictive latent diffusion world model for online actor-critic learning, built on DIAMOND.
- A variational information-bottleneck interpretation of one-step JEPA prediction and conditional diffusion prediction, with an explicit distinction between the implemented loss and the complete regularized objective.
- Evaluation on 26 Atari100k games and four Craftium tasks, including efficiency measurements, representation-learning ablations, and stochastic frameskip experiments.
- A task-level analysis showing that similar arithmetic mean scores can conceal different strengths across games.

## Method

### Latent Dynamics and Policy Learning

The encoder maps a $64\times64\times3$ observation to a $16\times8\times8$ latent, reducing the number of scalar inputs by a factor of 12. A conditional EDM-style denoiser predicts the next latent using four past latent states and actions. During training, Gaussian noise is added to the future latent; during imagination, generation starts from noise and uses three Euler sampling steps (Sections 3.1-3.2; Tables 2-3).

The denoising target and its noised input are stop-gradient values. Denoising gradients update the encoder through the conditioning latents, while reward and termination losses also train the encoder. The encoder learning rate is 0.3 times the denoiser rate. Encoder and denoiser outputs are bounded by

$$
C(z)=3\tanh(z/3).
$$

For each trajectory batch, a uniform random switch selects encoder outputs or denoiser outputs for subsequent conditioning. This balances supervision from observed states with conditioning on model predictions. An actor-critic learns on imagined trajectories of horizon 15; its REINFORCE actor update avoids differentiating through the denoising rollout. The method performs online model-based reinforcement learning without look-ahead planning.

### Information-Bottleneck Interpretation

Under the assumed generative Markov structure and model-marginal matching conditions, Appendix A decomposes JEPA prediction into input-information, predictive-information, prior-regularization, and posterior-gap terms. Replacing a one-step predictor with a conditional reverse diffusion path yields an analogous decomposition. Its path loss comprises target-entropy, terminal prior-matching, and learnable denoising terms.

The implemented method optimizes conditional denoising rather than the full path loss plus the context-prior KL regularizer $\mathcal R_1$. Appendix A.2.1 explicitly leaves direct optimization of this regularizer to future work. The theory is therefore a motivation for predictive representation learning, not a guarantee that the implementation optimizes the complete information bottleneck. Appendix A.2.2 also distinguishes a remainder constant with respect to reverse-model parameters from one that may vary with a learnable target encoder.

## Experiments

### Atari100k and Task Profiles

Evaluation uses 26 games, 100,000 environment interactions per run, five seeds per game, RGB observations, and frame skip 4. The headline JEDI results choose the better result from denoiser batch sizes 32 and 64 separately for each game. The authors emphasize interquartile mean (IQM), optimality gap, and human-normalized score (HNS) profiles, using bootstrap uncertainty where seed-level results exist.

Section 5.1 reports arithmetic mean HNS of **1.450 for JEDI versus 1.459 for DIAMOND**. Its complementary shifted harmonic statistic is

$$
\mathrm{Har\text{-}HNS}=\left(\frac{1}{N}\sum_{i=1}^{N}\frac{1}{\mathrm{HNS}_i+0.1}\right)^{-1},
$$

where each game's HNS is averaged over seeds. JEDI scores **0.377 versus 0.319** on this statistic. The shift is part of the reported metric and is not subtracted afterward. The result emphasizes weaker-performing games; it does not imply uniform superiority across tasks.

The authors report leading IQM and optimality-gap performance among the available comparisons and seven best game scores (Figure 4; Table 5 caption). The supplied Markdown's Table 5 has merged headers and an absent final JEDI aggregate column, so exact selected-configuration IQM and gap values are not reproduced here. TWISTER lacks seed-level results needed for exact IQM, optimality-gap, and associated uncertainty comparisons.

JEDI's largest relative gains over DIAMOND occur on games where DIAMOND has low HNS. The authors associate these gains with shooter dynamics and larger action spaces, interpreting the smaller latent policy input as a possible explanation. This task-property analysis is descriptive, not a causal isolation of representation compression (Section 5).

### Transfer and Stochasticity

- **Craftium:** Four tasks, three seeds each, using 30,000 interactions for SmallRoom-v0 and 100,000 for the other three. Training-return curves favor JEDI overall over Horizon Imagination (HI); this is the clearest direct latent-diffusion comparison (Figure 5; Appendix B.1).
- **Shared Atari subset:** JEDI performs better overall on the four Atari tasks reported by HI, which does not provide a full Atari100k comparison (Figure 6).
- **Stochastic frameskip:** On three Atari environments with frameskip randomly varying between 2 and 6, the paper reports consistent improvements over DreamerV3 (Figure 7). This supports the tested stochastic setting rather than a general robustness guarantee.

### Efficiency

Table 1 reports per-run training time and parameter counts:

| Method | A100 hours | Parameters |
| --- | --- | --- |
| JEDI | 38 | 13.5M |
| DIAMOND | 98 | 13.5M |
| Horizon Imagination | 27 | 97M |

JEDI is about 2.58 times faster to train than DIAMOND in this comparison. Figure 8 reports 43% lower GPU memory use and more than threefold faster world-model sampling. HI trains faster than JEDI but relies on a separately learned representation with a pretrained perceptual model.

### Ablations

Two ablation sets each cover five Atari tasks (Figures 9-10). Full JEDI outperforms direct next-state MSE prediction, removing diffusion gradients, and separately trained VAE latents; adding reconstruction gradients slightly reduces performance. EMA targets, deterministic switching, and removing random switching also underperform the default, with further degradation when switching and clamping are both removed. These results support the joint predictive objective and its stabilization choices within the tested tasks.

## Limitations

- The best-of-two batch-size selection is part of the headline evaluation protocol, not a single fixed configuration across games.
- Evidence covers Atari100k and four Craftium tasks; DMControl, Procgen, and higher-resolution domains are not tested.
- The theoretical decomposition does not prove optimization success, representation identifiability, or prevention of collapse. The explicit context bottleneck regularizer is not optimized.
- Efficiency improvements are relative to pixel diffusion; HI and several other listed methods train faster. Cross-hardware entries elsewhere in Table 1 should not be treated as controlled speed comparisons.
- Task-profile explanations remain interpretations, and the ablations cover only five games per set.
- The supplied Markdown omits the paper's own publication year, venue, and stable identifier; these remain unasserted. Its damaged final results table limits recovery of exact aggregate values.

## Related Concepts

- [[concepts/world-models|World Models]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/diffusion-models|Diffusion Models]]

## Related Papers

- Alonso et al. (2024), "Diffusion for world modeling: Visual details matter in Atari": DIAMOND is the pixel-diffusion baseline and implementation foundation (reference 7).
- Cohen et al. (2026), "Horizon imagination: Efficient on-policy rollout in diffusion world models": the separately learned latent-diffusion comparison (reference 8, arXiv:2602.08032).
- Assran et al. (2023), "Self-supervised learning from images with a joint-embedding predictive architecture": predictive latent-learning predecessor (reference 17).
- Alemi et al. (2016), "Deep variational information bottleneck": theoretical reference for the predictive-compression interpretation (reference 31).
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]]: a related library analysis of conditional representation identifiability, distinct from JEDI's bottleneck motivation; not listed as a cited work in the supplied paper.

[[index|Library home]]

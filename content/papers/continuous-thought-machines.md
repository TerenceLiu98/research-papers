---
title: "Continuous Thought Machines"
type: paper
authors:
  - Luke Darlow
  - Ciaran Regan
  - Sebastian Risi
  - Jeffrey Seely
  - Llion Jones
year: null
tags:
  - recurrent-neural-networks
  - neural-dynamics
  - adaptive-computation
  - algorithmic-reasoning
---

## TL;DR

The Continuous Thought Machine (CTM) combines privately parameterized neuron-level models that process activation histories with [[concepts/neural-synchronization-representations|Neural Synchronization Representations]] for attention and prediction. It learns sequential strategies on mazes and cumulative parity, and supports certainty-based [[concepts/adaptive-computation|Adaptive Computation]]. The evidence establishes architectural feasibility and advantages over the tested baselines, with substantial training cost and seed sensitivity; it does not establish state-of-the-art performance.

## Research Question

Can temporal processing within individual artificial neurons, combined with synchronization between their activity histories, provide a useful representation for iterative reasoning, memory, and variable computation?

## Motivation

Conventional neural representations typically expose an activation snapshot. CTM instead makes the temporal interaction of neurons directly available to downstream computations. Its internal ticks are independent of the input's sequence dimension, allowing a model to revisit a static image or sequence before producing a decision. Biological timing motivates the architecture, but it remains a differentiable abstraction rather than a detailed biophysical model.

## Contributions

- Introduces private per-neuron MLPs over rolling pre-activation histories, coupled through a shared recurrent synapse network.
- Uses temporal inner products between neuron activations as the representation for attention queries and output projections.
- Combines losses at the minimum-loss and maximum-certainty ticks, permitting useful predictions at different times for different inputs.
- Evaluates maze navigation, image classification, cumulative parity, sorting, memory and arithmetic, and partially observable reinforcement learning; ablations examine the joint contribution of neuron-level models and synchronization.

## Method

At internal tick $t$, the synapse network processes the current post-activations $z^t$ and observed features $o^t$ to produce pre-activations $a^t$. Each neuron $d$ has its own small MLP $g_{\theta_d}$, applied to its last $M$ pre-activations:

$$
a^t=f_{\theta_{\mathrm{syn}}}([z^t,o^t]),\qquad
z_d^{t+1}=g_{\theta_d}(a_d^{t-M+1:t}).
$$

The initial activation state and pre-activation history are learned. The shared synapse model often uses a U-Net-style MLP, while individual neuron histories provide local temporal processing (Sections 3.1-3.3).

For selected neuron pairs, synchronization is an exponentially weighted inner product of post-activation histories:

$$
S_{ij}^t=
\frac{\sum_{\tau=1}^{t}e^{-r_{ij}(t-\tau)}z_i^\tau z_j^\tau}
{\sqrt{\sum_{\tau=1}^{t}e^{-r_{ij}(t-\tau)}}},\qquad r_{ij}\geq0.
$$

These are weighted inner products, not centered Pearson correlations. Learned decay rates set the temporal scale. Selected pairs form output and action representations; projections produce predictions and cross-attention queries to task-specific input features. Subsampling avoids constructing the full quadratic matrix. Appendix H gives recursive numerator and denominator updates whose synchronization overhead per tick is linear in the number of retained pairs, without storing the entire post-activation history. This does not eliminate the recurrent network's training cost.

For classification, certainty is one minus normalized prediction entropy. Training averages cross-entropy at the minimum-loss tick and the maximum-certainty tick for each example (Section 3.5). At inference, a certainty threshold can support early stopping. The training objective has no separate learned halting module or explicit penalty on tick count. Some tasks adapt the interface and objective: sorting uses CTC, while reinforcement learning uses PPO and a sliding synchronization window.

## Experiments

### Main evaluations

| Task | Setup | Reported result and scope |
| --- | --- | --- |
| Maze navigation | Train on 45,000 and test on 5,000 mazes of size $39\times39$; predict up to 100 action labels; CTM uses 75 internal ticks and no positional embeddings | Higher route accuracy than tested feed-forward and one- to three-layer LSTMs. Larger $99\times99$ mazes and longer routes are handled by repeated applications of the model, not a single unrestricted output sequence (Section 4; Appendix D). |
| ImageNet-1K | ResNet-152 backbone, 50 internal ticks, uncropped evaluation | 72.47% top-1 and 89.89% top-5 accuracy. A certainty threshold of 0.8 could stop most examples before 10 ticks; this is an early-exit opportunity, not a measured end-to-end speedup (Section 5). |
| Cumulative parity | Predict all prefix parities of a length-64 sequence, presented simultaneously with positional embeddings | CTMs with 75 or 100 ticks reach perfect accuracy in some seeds and outperform parameter-matched LSTMs. At 75 ticks, two of three illustrated runs solve the task perfectly; another converges to a suboptimal solution (Section 6; Appendix F). |

ImageNet calibration uses the probability of the selected class averaged over preceding ticks. Appendix E also compares instantaneous, most-certain, and aggregated predictions, and shows an example where further processing changes a correct prediction to an incorrect one. Attention trajectories expose learned strategies, but the authors' interpretation of maze behavior as an internal world model is not a direct mechanistic identification.

### Component ablations

On $15\times15$ mazes, the four configurations have approximately 9 million parameters and train for 100,000 iterations. Table 5 reports the following results; Figure 26 identifies uncertainty as one standard deviation across two seeds.

| Model | Per-step test accuracy (%) | Test solve rate (%) |
| --- | ---: | ---: |
| CTM | 94.6 +/- 0.7 | 65.9 +/- 5.7 |
| CTM without neuron-level models | 82.9 +/- 4.4 | 35.0 +/- 7.2 |
| CTM without synchronization | 85.1 +/- 0.5 | 37.5 +/- 0.7 |
| LSTM with synchronization | 82.4 +/- 0.9 | 33.8 +/- 3.3 |

These results support the combination of both components in this task and training regime (Appendix G.3).

### Additional evidence

- CIFAR-10 comparisons report better test performance and calibration than the tested parameter-matched baselines, using temporal probability averaging for calibration. The CTM forward pass is approximately 2.4 times slower than the LSTM in this setup (Appendix G.1, Figure 21).
- CIFAR-100 accuracy does not increase monotonically with model width or internal ticks; wider models produce more diverse activity, but performance eventually declines, and the 50-tick model performs best in the reported tick comparison (Appendix G.2).
- Sorting 30 normally distributed real numbers with CTC produces input-dependent waits between index outputs and generalization to other normal distributions (Appendix G.4).
- In Q&A MNIST, all three CTM runs with 10 ticks per input exceed 96% accuracy on four digits and four operations, while matched 10-tick LSTMs reach at most 21%. Single-tick LSTMs initially outperform CTMs, and both model families can generalize to more operations (Appendix G.5).
- PPO on partially observable CartPole, Acrobot, and MiniGrid Four Rooms gives performance comparable to LSTMs across three runs. More varied activation traces do not imply superior task performance (Appendix G.6).

## Limitations

Internal recurrence lengthens training, and private neuron models add parameters. Comparisons prioritize breadth and architectural analysis over extensive tuning or state-of-the-art baselines. Some LSTM comparisons are affected by training instability and use different loss-selection rules for stability. Parity performance depends strongly on initialization, with only three runs per configuration, and the component ablation uses two seeds.

More ticks or neurons do not guarantee better results. Calibration depends on temporal aggregation, and threshold-based early stopping does not establish hardware efficiency. Larger-maze generalization relies on reapplication. Attention and activation visualizations suggest strategies but do not prove human-like cognition; the authors explicitly leave the functional meaning of observed traveling waves unresolved. Language modeling, lifelong learning, and self-supervised video understanding are future work in this source.

The supplied Markdown does not state the paper's own publication year or stable identifier; these metadata are left unasserted.

## Related Concepts

- [[concepts/neural-synchronization-representations|Neural Synchronization Representations]]
- [[concepts/adaptive-computation|Adaptive Computation]]

## Related Papers

The following are cited in the supplied paper; no matching Paper pages were found in the library.

- Graves (2016), "Adaptive computation time for recurrent neural networks" (reference 18): recurrent computation with an explicit adaptive-computation mechanism.
- Banino, Balaguer, and Blundell (2021), "Pondernet: Learning to ponder" (reference 17): learned halting, contrasted with CTM's certainty-based approach.
- Geiping et al. (2025), "Scaling up test-time compute with latent reasoning: A recurrent depth approach" (reference 14): related use of internal recurrence for reasoning.
- Reichert and Serre (2013), "Neuronal synchrony in complex-valued deep networks" (reference 11): synchrony for gating and grouping, contrasted with CTM's direct synchronization representation.
- Schwarzschild et al. (2021), "Can you learn an algorithm? Generalizing from easy to hard problems with recurrent networks" (reference 37): recurrent algorithm learning, with a different maze output formulation.

[[index|Library home]]

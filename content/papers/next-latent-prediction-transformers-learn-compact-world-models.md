---
title: Next-Latent Prediction Transformers Learn Compact World Models
type: paper
authors:
  - Jayden Teoh
  - Manan Tomar
  - Kwangjun Ahn
  - Pratyusha Sharma
  - Akshay Krishnamurthy
  - John Langford
  - Edward S. Hu
  - Tim Pearce
  - Riashat Islam
  - Alex Lamb
year: null
tags:
  - world-models
  - representation-learning
  - speculative-decoding
---

## TL;DR

NextLat augments next-token training with prediction of the transformer's next hidden state conditioned on its current state and the next token. This encourages recurrently updateable summaries without changing the transformer backbone. The paper reports stronger synthetic planning and reasoning, compact representations, and self-speculative decoding up to 3.32× faster in its tested configuration; general language-model accuracy gains are small.

## Research Question

Can auxiliary latent-transition prediction encourage transformers to retain sufficient information about the past for future prediction while preserving parallel backbone training?

## Motivation

Attention can retrieve history on demand, so accurate next-token predictions need not imply a compact, coherent internal world model. A fixed-dimensional, token-conditioned transition predictor introduces pressure to consolidate predictive information into the current hidden state.

## Contributions

- A sufficient-condition theorem connects exact next-token and latent-transition consistency to belief states: summaries sufficient for the full future conditional distribution.
- A practical auxiliary objective combines latent regression with distribution matching and supports short teacher-forced latent rollouts.
- Recursively composing the learned transition enables speculative drafts longer than the training horizon and, in a state-tracking experiment, recurrent inference beyond the backbone's training length.

## Method

The backbone produces final-layer states $h_t$. A three-layer GELU MLP takes the normalized concatenation of $h_t$ and the next-token embedding and predicts a residual update. Training combines ordinary next-token cross-entropy, Smooth L1 regression to stop-gradient future hidden states, and KL matching between target-state and predicted-state token distributions. The output head is detached for the KL objective. Regression and KL losses are averaged across a teacher-forced rollout horizon $d$.

Theorem 3.2 assumes exact agreement with the true next-token conditional and the backbone-induced transition law. Under those conditions, backward induction establishes sufficiency for future prediction even with one-step transitions. This is a conditional characterization, not a guarantee that finite-data optimization reaches exact consistency.

Ordinary inference uses the backbone alone. Optional self-speculative inference recursively drafts through the MLP and output head, then verifies with the backbone. One-step training is parallel across sequence positions; longer auxiliary rollouts introduce sequential work proportional to $d$, rather than the full sequence length.

## Experiments

| Evaluation | Reported result | Context |
| --- | --- | --- |
| Manhattan taxi routes | Effective latent rank 52.7 versus GPT 160.1; sequence compression 0.71 versus 0.65 | All models reach 100% legal next-token predictions; NextLat achieves 98.7% valid trajectories and 95% detour robustness, tying MTP on robustness (Table 1). |
| Countdown | 54.8% accuracy at $d=1$, 58.7% at $d=8$, versus GPT 33.1% | Three-seed averages; custom integer tokenizer and eight pause tokens; held-out target numbers (Table 2). |
| Path-Star | Near-100% solve rates across three tested graph topologies | Fixed 200k training examples, 100 possible node values, five seeds (Figure 5). |
| TinyStories | Stronger future-token linear probes up to offset 20 | Frozen representations; this measures predictive information, not direct narrative quality (Figure 7). |
| FineWeb-Edu | Average downstream accuracy 59.21 versus GPT 58.82 | 1.3B-parameter backbones trained on 100B tokens, NextLat $d=2$; validation perplexity is worse than GPT, 10.88 versus 10.52 (Table 3). |
| Self-speculative decoding | 3.21× Wikipedia, 3.32× Books, 2.38× Code, 2.87× Math | NextLat $d=2$; best draft length from 2–10, measured on eight B200 GPUs (Table 4). |
| $A_5$ state tracking | Co-trained recurrent transition exceeds 95% accuracy at length 36 after length-12 training | The two-layer transformer itself does not show this length generalization (Figure 9). |

Appendix F.6.1 strengthens the decoding comparison with $d=4$ baselines: JTP reaches 2.61× on Code, exceeding NextLat's 2.38× there, while NextLat remains ahead in the other three domains. Table 5 reports 3.09 training steps/s for both GPT and NextLat $d=1$, falling to 2.79 for NextLat $d=2$ and 1.73 for $d=8$, on a single B200 with 33k-token batches.

Ablations support complementary latent regression and KL supervision, especially at longer horizons, and careful stop-gradient placement. Lower latent regression error alone does not consistently imply better predictive representations.

## Limitations

Language-model improvements are modest and uneven across tasks. The main experiments use MLP transitions and do not systematically vary their capacity. The objective changes learned representations, not the fixed-depth transformer's computational expressivity. Synthetic-task settings, including tokenization, pause tokens, and graph sampling, constrain comparisons to prior reports. Manhattan evaluation restricts shortest paths to at most 50 steps, differing from the original benchmark study.

Optimization remains incompletely understood: latent regression loss rises during learning-rate cooldown even as speculative acceptance improves. Section 7 proposes normalization changes, fixed-window multi-token states, and noise injection; these extensions should be distinguished from the main benchmark evidence. Reported decoding speedups depend on hardware, domain, and selection of draft length.

The supplied Markdown does not establish the paper's publication year or a stable publication identifier; year is left unset. Code is provided at [NextLat](https://github.com/JaydenTeoh/NextLat).

## Related Concepts

- [[concepts/world-models|World Models]]: token-conditioned latent transitions supply a predictive internal dynamics model.
- [[concepts/speculative-decoding|Speculative Decoding]]: recursive latent drafting supports variable-length draft-and-verify inference.

## Related Papers

- Hu et al., *The Belief State Transformer* (2025), learns predictive summaries through prefix–suffix objectives and a separate backward encoder; NextLat uses local latent consistency instead.
- Ahn et al., *Efficient Joint Prediction of Multiple Future Tokens* (2025), supplies the JTP baseline; this paper relates its belief-state sufficiency to the process's observability horizon.
- Gloeckle et al., *Better & Faster Large Language Models via Multi-Token Prediction* (2024), supplies the MTP baseline with token-space auxiliary supervision.
- Li et al., *EAGLE: Speculative Sampling Requires Rethinking Feature Uncertainty* (2024), predicts features for drafting after backbone training, whereas NextLat jointly shapes backbone representations.
